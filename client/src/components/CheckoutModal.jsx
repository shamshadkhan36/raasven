import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, CheckCircle2, Truck, MessageCircle, PackageCheck, ArrowRight, Sparkles } from 'lucide-react';
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
    clearCart,
    siteSettings
  } = useCart();

  const phone = siteSettings?.supportPhone || '+91 98765 43210';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

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
      setFormError('Please enter your full name, phone/WhatsApp number, address, and city.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `RSV-${Date.now().toString().slice(-6)}`;
    const itemsText = cart.map(item => `• ${item.name} (${item.size}) x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n');
    
    const whatsappMessage = 
`⚜️ *RAASVEN HAUTE PARFUMERIE - ORDER #${generatedOrderId}* ⚜️\n\n` +
`👤 *Customer:* ${customer.fullName}\n` +
`📞 *Phone:* ${customer.phone}\n` +
(customer.email ? `✉️ *Email:* ${customer.email}\n` : '') +
`📍 *Delivery Address:*\n${customer.address}, ${customer.city}${customer.pincode ? ` - ${customer.pincode}` : ''}, ${customer.country}\n\n` +
`🛍️ *Ordered Fragrances:*\n${itemsText}\n\n` +
`💳 *Order Dossier:*\n` +
`• Subtotal: ${formatPrice(subtotal)}\n` +
(discount > 0 ? `• Discount (${coupon?.code || 'PROMO'}): -${formatPrice(discount)}\n` : '') +
`• Shipping: ${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}\n` +
`*TOTAL AMOUNT: ${formatPrice(finalTotal)}*\n\n` +
`✨ Please confirm my order formulation and delivery schedule!`;

    const targetPhone = cleanPhone || '919876543210';
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    let orderData = {
      orderId: generatedOrderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      pricing: { subtotal, discount, shippingFee, total: finalTotal },
      paymentMethod: 'WhatsApp Concierge Confirmation',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: '3 - 5 Business Days',
      whatsappUrl: waUrl
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cart,
          paymentMethod: 'WhatsApp Concierge Confirmation',
          couponCode: coupon?.code,
          whatsappUrl: waUrl
        })
      });

      const data = await response.json();
      if (data.success && data.order) {
        orderData = { ...data.order, whatsappUrl: waUrl, estimatedDelivery: '3 - 5 Business Days' };
      }
    } catch {
      // Local order record retained if offline
    }

    setConfirmedOrder(orderData);
    clearCart();

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {}

    // Launch WhatsApp directly
    window.open(waUrl, '_blank');
    setIsSubmitting(false);
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
                  <span className="font-bold text-[#0F3B2E]">{confirmedOrder.estimatedDelivery || '3 - 5 Business Days'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Ordering Mode:</span>
                  <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                    <span>WhatsApp Concierge ({phone})</span>
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#F0EAE0]">
                  <span className="text-stone-500">Shipping To:</span>
                  <span className="font-semibold text-stone-800 text-right">
                    {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-[#0F3B2E]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-base">{formatPrice(confirmedOrder.pricing.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={confirmedOrder.whatsappUrl || `https://wa.me/${cleanPhone || '919876543210'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 transition text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Order</span>
                </a>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setConfirmedOrder(null);
                  }}
                  className="flex-1 py-3.5 px-4 rounded-full bg-[#0F3B2E] text-white text-xs font-bold hover:bg-[#144d3c] transition"
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
                      <label className="block text-stone-600 mb-1 font-semibold">Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Phone / WhatsApp Number *</label>
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

                {/* Direct WhatsApp Concierge Notice (Zero online gateway) */}
                <div className="bg-[#FAF7F0] border-2 border-[#C5A059]/40 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#EBF5EF] flex items-center justify-center border border-[#25D366]/40 text-[#25D366]">
                      <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F3B2E]">
                        Direct WhatsApp Order & Concierge
                      </h4>
                      <p className="text-[11px] text-[#8C6B28] font-medium">
                        Zero Online Gateway Hassle • Personalized Dispatch Confirmation
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mt-2 mb-3">
                    We process all orders directly via WhatsApp concierge to give you bespoke service. When you click below, your order dossier will be generated and you will be connected directly with our fragrance concierge on WhatsApp (<strong>{phone}</strong>) to confirm your bottles and delivery.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700 font-medium pt-2 border-t border-[#E8DFC9]">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#25D366] font-bold">✓</span>
                      <span>Direct verification with perfumer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#25D366] font-bold">✓</span>
                      <span>Real-time dispatch tracking on WhatsApp</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#25D366] font-bold">✓</span>
                      <span>Convenient UPI / settlement on chat</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#25D366] font-bold">✓</span>
                      <span>Complimentary discovery vials included</span>
                    </div>
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
                    className="w-full py-3.5 px-4 rounded-full bg-[#0F3B2E] hover:bg-[#144d3c] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0F3B2E]/20 flex items-center justify-center space-x-2 transition disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                    <span>{isSubmitting ? 'Opening WhatsApp...' : `Confirm & Order on WhatsApp • ${formatPrice(finalTotal)}`}</span>
                    <ArrowRight className="w-4 h-4 text-[#E6CA65]" />
                  </button>

                  <div className="mt-3 flex items-center justify-center space-x-2 text-[10px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Direct Concierge Service • Official Raasven Parfumerie</span>
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
