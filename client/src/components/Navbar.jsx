import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';

export const Navbar = ({ onSearchClick }) => {
  const { totalCount, wishlist, setIsCartOpen, setIsWishlistOpen, currency, setCurrency, currencies } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFC9] transition-all duration-300">
      {/* Top Announcement Bar - Soft Sage & Gold Accent */}
      <div className="bg-[#0F3B2E] text-[#F3EAD3] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-between">
        <div className="hidden lg:flex items-center space-x-2 text-[11px] opacity-90 pl-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span>100% French Fragrance Oils & Pure Artisanal Extraits</span>
        </div>
        
        <div className="mx-auto flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Complimentary 10ml Discovery Sample on orders over ₹1,999 • Code: <strong className="text-[#E6CA65] tracking-wider">RAASVEN10</strong></span>
        </div>

        <div className="hidden md:flex items-center space-x-4 pr-4">
          {/* Currency Switcher */}
          <div className="flex items-center space-x-1 text-[11px]">
            <span className="text-stone-300">Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#144738] text-[#F3EAD3] border border-[#236854] rounded px-1.5 py-0.5 text-xs font-semibold focus:outline-none cursor-pointer"
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
      <div className="container mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0F3B2E] hover:text-[#C5A059] transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo - Light Luxury Emerald & Gold */}
        <div className="flex flex-col items-start">
          <a href="#" className="flex items-center space-x-2 group">
            <span className="text-xl text-[#C5A059] group-hover:rotate-12 transition-transform duration-300">⚜️</span>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.22em] text-[#0F3B2E] group-hover:text-[#185342] transition">
                RAASVEN
              </span>
              <span className="block text-[9px] uppercase tracking-[0.28em] text-[#8C764D] -mt-1 font-medium">
                Haute Parfumerie
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-700">
          <a href="#collection" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            Our Collection
          </a>
          <a href="#features" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            Artisanal Notes
          </a>
          <a href="#private-label" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            Private Label (B2B)
          </a>
          <a href="#export" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            Global Export
          </a>
          <a href="#about" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            About Us
          </a>
          <a href="#reviews" className="hover:text-[#0F3B2E] hover:border-b-2 hover:border-[#C5A059] pb-1 transition">
            Reviews
          </a>
        </nav>

        {/* Actions (Search, Wishlist, WhatsApp, Bag) */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* Search Trigger */}
          <button 
            onClick={onSearchClick}
            className="p-2 text-stone-600 hover:text-[#0F3B2E] hover:bg-[#F2EDE2] rounded-full transition"
            title="Search Fragrances"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-600 hover:text-[#0F3B2E] hover:bg-[#F2EDE2] rounded-full transition"
            title="View Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C5A059] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Order Button */}
          <a 
            href="https://wa.me/919876543210?text=Hello%20Raasven,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20perfume%20collection." 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#EBF5EF] hover:bg-[#DDF0E4] text-[#125A41] text-xs font-semibold border border-[#BCE1CB] transition"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>

          {/* Cart / Shopping Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-2 bg-gradient-to-r from-[#0F3B2E] to-[#175240] hover:from-[#134939] hover:to-[#1e6651] text-white px-3.5 py-2 rounded-full shadow-md shadow-[#0F3B2E]/10 transition-all transform hover:scale-[1.02]"
            title="View Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#E6CA65]" />
            <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
            <span className="bg-[#D4AF37] text-[#0F3B2E] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-t border-[#E8DFC9] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center pb-3 border-b border-[#F0E8D7]">
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

          <div className="flex flex-col space-y-3 text-sm font-medium text-stone-800">
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
              About Kalpana Global Eximm
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0F3B2E]"
            >
              Customer Reviews
            </a>
          </div>

          <div className="pt-3 border-t border-[#F0E8D7]">
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#EBF5EF] text-[#125A41] text-xs font-semibold border border-[#BCE1CB] flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Direct WhatsApp Inquiry: +91 98765 43210</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
