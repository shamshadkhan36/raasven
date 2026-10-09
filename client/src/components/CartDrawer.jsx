import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, MessageCircle, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    formatPrice,
    coupon,
    applyCouponCode,
    removeCoupon,
    progressToFreeShipping,
    amountNeededForFreeShipping,
    setIsCheckoutOpen,
    siteSettings
  } = useCart();

  const phone = siteSettings?.supportPhone || '+91 98765 43210';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    await applyCouponCode(couponInput);
    setIsApplyingCoupon(false);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(i => `• ${i.name} (${i.size}) x${i.quantity} = ₹${i.price * i.quantity}`).join('%0A');
    const msg = `Hello Raasven,%0A%0AI would like to place an order:%0A${itemsList}%0A%0A*Total: ₹${finalTotal}*%0A%0APlease assist me with dispatch.`;
    window.open(`https://wa.me/${cleanPhone || '919876543210'}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-[#E8DFC9]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#0F3B2E]" />
              <h3 className="text-lg font-serif font-bold text-[#0F3B2E]">Your Fragrance Bag</h3>
              <span className="bg-[#FAF4E6] text-[#8C6B28] text-xs font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#F2EDE2] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FAF7F0] px-5 py-3 border-b border-[#E8DFC9] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <div className="flex items-center justify-between text-stone-600 mb-1.5">
                  <span className="flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5 text-[#0F3B2E]" />
                    <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> for <strong>Free Express Shipping</strong></span>
                  </span>
                  <span className="font-bold text-[#0F3B2E]">{progressToFreeShipping}%</span>
                </div>
                <div className="w-full bg-[#E8DFC9] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#C5A059] to-[#0F3B2E] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-emerald-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>🎉 You've unlocked Free Express Worldwide Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#C5A059] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-bold text-[#0F3B2E] mb-2">Your Bag is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our signature artisanal perfumes and discover your personal scent identity.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0F3B2E] text-white text-xs font-bold hover:bg-[#134939] transition"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.key}
                  className="bg-white p-3.5 rounded-xl border border-[#EBE3D0] shadow-sm flex items-center space-x-3.5 hover:border-[#C5A059]/50 transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#E8DFC9] bg-[#FAF8F2]"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-serif font-bold text-[#0F3B2E] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-stone-400 hover:text-rose-600 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[11px] text-[#8C6B28] font-semibold block mb-1">
                      {item.size} • Extrait
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-[#F5F2EB] rounded-full px-2 py-0.5 border border-[#E2D8C3]">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="text-stone-600 hover:text-[#0F3B2E] p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#0F3B2E] px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="text-stone-600 hover:text-[#0F3B2E] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <span className="text-sm font-bold text-[#0F3B2E] font-serif">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculation */}
          {cart.length > 0 && (
            <div className="border-t border-[#E8DFC9] p-5 bg-white space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {coupon ? (
                  <div className="bg-[#EBF5EF] border border-[#BCE1CB] p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-[#0F3B2E]">
                      <Tag className="w-4 h-4 text-[#25D366]" />
                      <span>
                        Code <strong>{coupon.code}</strong> applied ({coupon.description})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-stone-800 font-bold ml-2 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (try RAASVEN10)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3] text-xs text-stone-800 uppercase focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon}
                      className="px-4 py-2 bg-[#FAF5E9] hover:bg-[#F2E8D2] text-[#8C6B28] font-bold text-xs rounded-xl border border-[#D4AF37]/40 transition"
                    >
                      {isApplyingCoupon ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-stone-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#0F3B2E] pt-2 border-t border-[#F0EAE0]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0F3B2E] via-[#14503E] to-[#0F3B2E] hover:from-[#134939] hover:to-[#1b614c] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0F3B2E]/20 flex items-center justify-center space-x-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E6CA65]" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 rounded-full bg-[#EBF5EF] hover:bg-[#DEF0E4] text-[#125A41] font-semibold text-xs border border-[#BDE2CC] flex items-center justify-center space-x-2 transition"
                >
                  <span>Quick WhatsApp Enquiry</span>
                </button>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Direct WhatsApp Concierge • 100% Authentic Guaranteed</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
