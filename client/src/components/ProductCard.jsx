import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, formatPrice, setQuickViewProduct, setIsCheckoutOpen } = useCart();
  
  // Available sizes (20ml, 30ml, 50ml)
  const sizes = Object.keys(product.prices);
  const [selectedSize, setSelectedSize] = useState(sizes.includes('50ml') ? '50ml' : sizes[0]);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const currentPrice = product.prices[selectedSize];
  const originalPrice = product.originalPrices?.[selectedSize] || Math.round(currentPrice * 1.3);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, 1);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EBE3D0] hover:border-[#C5A059] p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      
      {/* Top Floating Badges & Wishlist */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-[#0F3B2E] text-[#E6CA65] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm border border-[#C5A059]/40">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FAF4E6] text-[#8C6B28] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C5A059]/30 w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#E8DFC9] hover:border-[#C5A059] text-stone-600 hover:text-[#C5A059] shadow-sm transition"
          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
        </button>

        {/* Product Image with Quick View Hover Overlay */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FBF9F5] mb-4 flex items-center justify-center cursor-pointer"
             onClick={() => setQuickViewProduct(product)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Quick View Button Hover Layer */}
          <div className="absolute inset-0 bg-[#0F3B2E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="bg-white/95 text-[#0F3B2E] hover:text-[#C5A059] px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-lg border border-[#C5A059]/50 flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Family */}
          <div className="flex items-center justify-between text-xs text-[#8C6B28] mb-1 font-semibold tracking-wider uppercase">
            <span>{product.category}</span>
            <span className="text-[10px] font-bold text-[#0F3B2E] bg-[#EBF3EE] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
              {product.concentration || 'Pure Extrait'}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-xl sm:text-2xl font-serif font-bold text-[#0F3B2E] hover:text-[#C5A059] transition cursor-pointer mb-1 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Olfactory Notes Preview Pills */}
          {product.notes && product.notes.top && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.notes.top.slice(0, 2).map((note, idx) => (
                <span key={idx} className="text-[10px] bg-[#F5F2EB] text-[#0F3B2E] px-2 py-0.5 rounded-md font-medium border border-[#E8DFC9]">
                  {note}
                </span>
              ))}
              {product.notes.heart && product.notes.heart[0] && (
                <span className="text-[10px] bg-[#FAF5E9] text-[#8C6B28] px-2 py-0.5 rounded-md font-medium border border-[#E8DFC9]">
                  {product.notes.heart[0]}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Size Selector & Price Display */}
        <div className="pt-3 border-t border-[#F0EAE0]">
          {/* Size Pills */}
          {sizes.length > 1 && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] text-stone-500 font-medium">Select Size:</span>
              <div className="flex gap-1.5">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold transition ${
                      selectedSize === size
                        ? 'bg-[#0F3B2E] text-white shadow-sm'
                        : 'bg-[#F5F1E8] text-stone-600 hover:bg-[#EBE5D8]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-serif text-[#0F3B2E]">
                {formatPrice(currentPrice)}
              </span>
              {originalPrice > currentPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
              In Stock
            </span>
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2.5 px-3 rounded-full text-xs font-bold tracking-wide flex items-center justify-center space-x-1.5 transition-all duration-300 ${
                isAddedAnimation 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#FFFDF9] hover:bg-[#0F3B2E] text-[#0F3B2E] hover:text-white border border-[#0F3B2E]'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-[#C5A059] to-[#AA7C1E] hover:from-[#B5914A] hover:to-[#966C15] text-white shadow-md shadow-[#C5A059]/20 flex items-center justify-center space-x-1 transition"
            >
              <span>Instant Buy</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
