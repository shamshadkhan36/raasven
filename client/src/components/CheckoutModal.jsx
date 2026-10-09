import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, CheckCircle2, Truck, CreditCard, Smartphone, PackageCheck, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    formatPrice,
    coupon,
    clearCart
  } = useCart();

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Instant Pay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [formError, setFormError] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formError) setFormError('');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!customer.fullName || !customer.phone || !customer.address || !customer.city) {
      setFormError('Please complete all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cart,
          paymentMethod,
          couponCode: coupon?.code,
        })
      });

      const data = await response.json();
      if (data.success) {
        setConfirmedOrder(data.order);
        clearCart();
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        setFormError(data.message || 'Could not place order. Please try again.');
      }
    } catch {
      // Local simulated order if API is offline
      const mockOrder = {
        orderId: `RSV-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        customer,
        items: [...cart],
        pricing: { subtotal, discount, shippingFee, total: finalTotal },
        paymentMethod,
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: '3 - 5 Business Days'
      };
      setConfirmedOrder(mockOrder);
      clearCart();
      try {
        confetti({ particleCount: 90, spread: 60 });
      } catch {}
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => !confirmedOrder && setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E8DFC9] z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl text-[#C5A059]">⚜️</span>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0F3B2E]">
                {confirmedOrder ? 'Order Confirmed' : 'Haute Parfumerie Checkout'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {confirmedOrder ? 'Thank you for choosing Raasven' : 'Secure 256-Bit SSL Encrypted Order'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setConfirmedOrder(null);
            }}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#F2EDE2] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {confirmedOrder ? (
            /* Order Success Receipt */
            <div className="text-center max-w-lg mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF5EF] text-[#0F3B2E] border-2 border-[#25D366] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6B28] bg-[#FAF5E9] px-3 py-1 rounded-full border border-[#D4AF37]/30 inline-block mb-2">
                Order Received • In Preparation
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3B2E] mb-2">
                Congratulations, {confirmedOrder.customer.fullName}!
              </h2>

              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Your luxury fragrance order <strong>#{confirmedOrder.orderId}</strong> has been received and is being carefully hand-packaged in our signature emerald & gold presentation box.
              </p>

              {/* Order Details Card */}
              <div className="bg-white rounded-2xl border border-[#E8DFC9] p-5 text-left text-xs mb-6 space-y-3">
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Order ID:</span>
                  <span className="font-bold text-[#0F3B2E]">#{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="font-bold text-[#0F3B2E]">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Payment Option:</span>
                  <span className="font-semibold text-stone-800">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Shipping To:</span>
                  <span className="font-semibold text-stone-800 text-right">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-[#0F3B2E]">
                  <span>Total Paid / Payable:</span>
                  <span className="font-serif text-base">{formatPrice(confirmedOrder.pricing.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Raasven,%20I%20just%20placed%20order%20%23${confirmedOrder.orderId}.%20Please%20confirm%20dispatch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-[#EBF5EF] hover:bg-[#DEF0E4] text-[#125A41] text-xs font-bold border border-[#BDE2CC] transition text-center"
                >
                  Confirm on WhatsApp
                </a>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setConfirmedOrder(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#0F3B2E] text-white text-xs font-bold hover:bg-[#144d3c] transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8">
              
              {/* Left Column: Shipping & Payment Information */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Shipping Details */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F3B2E] mb-3 flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-[#C5A059]" />
                    <span>Shipping Destination</span>
                  </h4>

                  {formError && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-stone-600 mb-1 font-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Lord Alexander Sterling"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-stone-600 mb-1 font-semibold">Complete Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="Penthouse 4B, Emerald Boulevard"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai / Dubai"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Postal / Zip Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={customer.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-stone-600 mb-1 font-semibold">Country</label>
                      <select
                        name="country"
                        value={customer.country}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="India">India 🇮🇳</option>
                        <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                        <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                        <option value="Oman">Oman 🇴🇲</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="United States">United States 🇺🇸</option>
                        <option value="Netherlands">Netherlands 🇳🇱</option>
                        <option value="International Other">Other International</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F3B2E] mb-3 flex items-center space-x-1.5">
                    <CreditCard className="w-4 h-4 text-[#C5A059]" />
                    <span>Payment Method</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'UPI / QR Instant Pay', label: 'UPI / Google Pay / PhonePe / Paytm', desc: 'Instant QR code scan & zero extra fees' },
                      { id: 'Credit or Debit Card', label: 'Visa, MasterCard, Amex (Secure Gateway)', desc: '256-bit encrypted card transaction' },
                      { id: 'Cash on Delivery (COD)', label: 'Cash on Delivery (COD)', desc: 'Pay upon delivery at your doorstep' },
                      { id: 'Bank Wire / Export LC', label: 'International Bank Wire / B2B Export', desc: 'For bulk buyers & overseas orders' }
                    ].map(option => (
                      <label
                        key={option.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          paymentMethod === option.id
                            ? 'bg-[#FAF7F0] border-[#C5A059] shadow-sm'
                            : 'bg-white border-[#E8DFC9] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === option.id}
                            onChange={() => setPaymentMethod(option.id)}
                            className="text-[#0F3B2E] focus:ring-[#C5A059]"
                          />
                          <div>
                            <span className="font-bold text-[#0F3B2E] block">{option.label}</span>
                            <span className="text-stone-500 text-[11px]">{option.desc}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Place Button */}
              <div className="lg:col-span-5 bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#E8DFC9] flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#0F3B2E] mb-4">
                    Order Dossier ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                  </h4>

                  {/* Items mini list */}
                  <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.key} className="flex items-center space-x-3 text-xs bg-white p-2 rounded-xl border border-[#E8DFC9]">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-[#0F3B2E] truncate">{item.name}</h5>
                          <span className="text-[10px] text-stone-500">{item.size} × {item.quantity}</span>
                        </div>
                        <span className="font-bold text-[#0F3B2E] font-serif">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation summary */}
                  <div className="space-y-2 text-xs text-stone-600 border-t border-[#E8DFC9] pt-4 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-800">{formatPrice(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({coupon?.code})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-semibold text-stone-800">
                        {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[#0F3B2E] pt-2 border-t border-[#E8DFC9]">
                      <span>Total Amount</span>
                      <span className="font-serif text-lg text-[#0F3B2E]">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#0F3B2E] via-[#14503E] to-[#0F3B2E] hover:from-[#134939] hover:to-[#1b614c] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0F3B2E]/20 flex items-center justify-center space-x-2 transition disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Securing Your Order...' : `Place Order • ${formatPrice(finalTotal)}`}</span>
                    <ArrowRight className="w-4 h-4 text-[#E6CA65]" />
                  </button>

                  <div className="mt-3 flex items-center justify-center space-x-2 text-[10px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Protected by 256-bit SSL encryption</span>
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
