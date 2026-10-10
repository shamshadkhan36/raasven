import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Heart, ShoppingBag, Droplets, Clock, Sparkles, Check, Shield } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, formatPrice, setIsCheckoutOpen } = useCart();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const sizes = Object.keys(product.prices);
  const [selectedSize, setSelectedSize] = useState(sizes.includes('50ml') ? '50ml' : sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = product.prices[selectedSize] || Object.values(product.prices)[0];
  const originalPrice = product.originalPrices?.[selectedSize] || Math.round(currentPrice * 1.3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFC9] z-10 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-sm border border-[#E8DFC9] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          
          {/* Left: Product Visual */}
          <div className="relative bg-[#FAF7F0] p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E8DFC9]">
            <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden shadow-lg border border-[#C5A059]/40 bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0F3B2E] text-[#E6CA65] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge || 'Haute Parfumerie'}
              </div>
            </div>
          </div>

          {/* Right: Detailed Perfume Dossier */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Header Details */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#8C6B28]">
                  {product.category}
                </span>
                <span className="text-[11px] font-bold text-[#0F3B2E] bg-[#EBF3EE] px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">
                  {product.concentration || 'Pure Extrait'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3B2E] mb-2 leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Olfactory Notes Pyramid */}
              {product.notes && (
                <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E8DFC9] mb-5 space-y-2 text-xs">
                  <div className="font-bold text-[#0F3B2E] flex items-center space-x-1.5 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Olfactory Notes Pyramid</span>
                  </div>
                  
                  {product.notes.top && (
                    <div className="flex text-stone-700">
                      <span className="w-16 font-semibold text-[#8C6B28] shrink-0 text-[11px]">Top:</span>
                      <span className="text-stone-600">{product.notes.top.join(' • ')}</span>
                    </div>
                  )}

                  {product.notes.heart && (
                    <div className="flex text-stone-700">
                      <span className="w-16 font-semibold text-[#8C6B28] shrink-0 text-[11px]">Heart:</span>
                      <span className="text-stone-600">{product.notes.heart.join(' • ')}</span>
                    </div>
                  )}

                  {product.notes.base && (
                    <div className="flex text-stone-700">
                      <span className="w-16 font-semibold text-[#8C6B28] shrink-0 text-[11px]">Base:</span>
                      <span className="text-stone-600">{product.notes.base.join(' • ')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Concentration & Longevity Badges */}
              <div className="grid grid-cols-2 gap-2 mb-5 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-[#E8DFC9] flex items-center space-x-2 text-stone-700">
                  <Droplets className="w-3.5 h-3.5 text-[#0F3B2E]" />
                  <span>{product.concentration}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#E8DFC9] flex items-center space-x-2 text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{product.longevity}</span>
                </div>
              </div>

              {/* Size Selector */}
              {sizes.length > 1 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-stone-600 mb-2">
                    Select Bottle Volume:
                  </label>
                  <div className="flex gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                          selectedSize === size
                            ? 'bg-[#0F3B2E] text-white shadow-sm'
                            : 'bg-[#F2EDE2] text-stone-700 hover:bg-[#E8DFC9]'
                        }`}
                      >
                        {size} ({formatPrice(product.prices[size])})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Quantity */}
              <div className="flex items-center justify-between mb-6 pt-3 border-t border-[#F0EAE0]">
                <div>
                  <span className="text-2xl font-serif font-bold text-[#0F3B2E]">
                    {formatPrice(currentPrice)}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="ml-2 text-xs text-stone-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 bg-[#F5F2EB] px-3 py-1 rounded-full border border-[#E2D8C3]">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-600 font-bold hover:text-[#0F3B2E]"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#0F3B2E]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-600 font-bold hover:text-[#0F3B2E]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition ${
                    added 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-[#0F3B2E] hover:bg-[#144d3c] text-white shadow-md'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-[#E6CA65]" />}
                  <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#C5A059] to-[#AA7C1E] hover:from-[#B5914A] hover:to-[#966C15] text-white shadow-md transition"
                >
                  <span>Instant Buy</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-full py-2 text-xs font-semibold text-stone-600 hover:text-[#C5A059] flex items-center justify-center space-x-1.5 transition"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Private Wishlist'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
