import React from 'react';
import { useCart } from '../context/CartContext';
import { initialProducts } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, formatPrice } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = initialProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-[#E8DFC9]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
              <h3 className="text-lg font-serif font-bold text-[#0F3B2E]">Your Private Wishlist</h3>
              <span className="bg-[#FAF4E6] text-[#8C6B28] text-xs font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#F2EDE2] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <Heart className="w-12 h-12 text-stone-300 mb-3" />
                <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-1">Your Wishlist is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-4">
                  Tap the heart icon on any perfume in our collection to save your favorite fragrances here.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#0F3B2E] text-white text-xs font-semibold hover:bg-[#144d3c] transition"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map(product => {
                const defaultSize = Object.keys(product.prices)[0];
                const price = product.prices[defaultSize];

                return (
                  <div key={product.id} className="bg-white p-3.5 rounded-xl border border-[#E8DFC9] flex items-center space-x-3.5 shadow-sm">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-[#E8DFC9]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif font-bold text-[#0F3B2E] truncate">{product.name}</h4>
                      <p className="text-[11px] text-[#8C6B28] font-semibold">{defaultSize} • {formatPrice(price)}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => {
                            addToCart(product, defaultSize, 1);
                            toggleWishlist(product.id);
                          }}
                          className="px-3 py-1 bg-[#0F3B2E] text-white rounded-full text-[11px] font-bold flex items-center space-x-1 hover:bg-[#134939] transition"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#E6CA65]" />
                          <span>Move to Bag</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
