import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

export const Navbar = ({ onSearchClick }) => {
  const { 
    totalCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    currency, 
    setCurrency, 
    currencies, 
    siteSettings
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFC9] transition-all duration-300">
      {/* Top Announcement Bar - Responsive & Zero Horizontal Overflow */}
      <div className="bg-[#0F3B2E] text-[#F3EAD3] text-[11px] sm:text-xs py-2 px-3 sm:px-6 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="hidden xl:flex items-center space-x-2 text-[11px] opacity-90 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>100% French Fragrance Oils & Pure Extraits</span>
          </div>
          
          <div className="mx-auto flex items-center space-x-1.5 text-center truncate max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="truncate">
              {siteSettings?.announcementText || 'Complimentary 10ml Discovery Sample on orders over ₹1,999 • Code: RAASVEN10'}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <span className="text-stone-300 text-[11px]">Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#144738] text-[#F3EAD3] border border-[#236854] rounded px-1.5 py-0.5 text-[11px] font-semibold focus:outline-none cursor-pointer"
            >
              {Object.keys(currencies).map(code => (
                <option key={code} value={code} className="bg-[#0F3B2E] text-white">
                  {code} ({currencies[code].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Hamburger & Brand Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#0F3B2E] hover:text-[#C5A059] transition rounded-lg hover:bg-[#F2EDE2]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-1.5 sm:space-x-2 group">
            <span className="text-lg sm:text-xl text-[#C5A059] group-hover:rotate-12 transition-transform duration-300 shrink-0">⚜️</span>
            <div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-[0.18em] sm:tracking-[0.22em] text-[#0F3B2E] group-hover:text-[#185342] transition block leading-tight">
                RAASVEN
              </span>
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#8C6B28] font-medium -mt-0.5">
                The Essence of Elegance
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium text-stone-700">
          <a href="#collection" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-0.5 transition">
            Our Collection
          </a>
          <a href="#features" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-0.5 transition">
            Artisanal Notes
          </a>
          <a href="#private-label" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-0.5 transition">
            Private Label (B2B)
          </a>
          <a href="#export" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-0.5 transition">
            Global Export
          </a>
          <a href="#about" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-0.5 transition">
            Brand Story
          </a>
        </nav>

        {/* Right Actions: Search, Wishlist, WhatsApp, Admin, Cart Bag */}
        <div className="flex items-center space-x-1 sm:space-x-2.5 shrink-0">
          
          {/* Search Trigger */}
          <button 
            onClick={onSearchClick}
            className="p-1.5 sm:p-2 text-stone-600 hover:text-[#0F3B2E] hover:bg-[#F2EDE2] rounded-full transition"
            title="Search Fragrances"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Button (hidden on tiny screens, always in mobile menu) */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="hidden sm:inline-flex relative p-2 text-stone-600 hover:text-[#0F3B2E] hover:bg-[#F2EDE2] rounded-full transition"
            title="View Wishlist"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C5A059] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Order Button (Visible on large desktop only) */}
          <a 
            href={`https://wa.me/${(siteSettings?.supportPhone || '919876543210').replace(/[^0-9]/g, '')}?text=Hello%20Raasven,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20perfume%20collection.`}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#EBF5EF] hover:bg-[#DDF0E4] text-[#125A41] text-xs font-semibold border border-[#BCE1CB] transition"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>

          {/* Cart / Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-1.5 bg-gradient-to-r from-[#0F3B2E] to-[#175240] hover:from-[#134939] hover:to-[#1e6651] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-md shadow-[#0F3B2E]/10 transition-all transform hover:scale-[1.02] shrink-0"
            title="View Fragrance Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E6CA65]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
            <span className="bg-[#D4AF37] text-[#0F3B2E] text-[10px] sm:text-xs font-bold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0">
              {totalCount}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-t border-[#E8DFC9] px-5 py-4 space-y-3.5 shadow-xl animate-fadeIn">
          {/* Currency in Mobile Drawer */}
          <div className="flex justify-between items-center pb-2.5 border-b border-[#F0E8D7]">
            <span className="text-xs font-semibold uppercase text-stone-500 tracking-wider">Select Currency</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white text-[#0F3B2E] border border-[#C5A059] rounded px-3 py-1 text-xs font-semibold"
            >
              {Object.keys(currencies).map(code => (
                <option key={code} value={code}>
                  {code} ({currencies[code].symbol.trim()})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2.5 text-sm font-medium text-stone-800">
            <a 
              href="#collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E] flex items-center justify-between"
            >
              <span>Our Signature Collection</span>
              <span className="text-xs text-[#C5A059]">Shop Now →</span>
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E]"
            >
              Artisanal Olfactory Notes
            </a>
            <a 
              href="#private-label" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E]"
            >
              Private Label Manufacturing (B2B)
            </a>
            <a 
              href="#export" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E]"
            >
              Global Export Markets
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E]"
            >
              Brand Story & Philosophy
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="py-1 text-left hover:text-[#0F3B2E] flex items-center justify-between"
            >
              <span>Private Wishlist</span>
              <span className="text-xs font-bold text-[#C5A059]">({wishlist.length} saved)</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#F0E8D7]">
            <a 
              href={`https://wa.me/${(siteSettings?.supportPhone || '919876543210').replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#EBF5EF] text-[#125A41] text-xs font-semibold border border-[#BCE1CB] flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
