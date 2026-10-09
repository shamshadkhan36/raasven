import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { Search, SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';

export const ProductCatalog = ({ searchInputRef }) => {
  const { products } = useCart();
  const [selectedFamily, setSelectedFamily] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const families = [
    { label: 'All Fragrances', value: 'All' },
    { label: 'Woody & Fresh', value: 'Woody' },
    { label: 'Floral & Vanilla', value: 'Floral' },
    { label: 'Amber & Royal Oud', value: 'Amber & Oud' },
    { label: 'Discovery Sets', value: 'Discovery Sets' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];

    if (selectedFamily !== 'All') {
      result = result.filter(p => p.family === selectedFamily);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.notes?.top && p.notes.top.some(n => n.toLowerCase().includes(q))) ||
        (p.notes?.heart && p.notes.heart.some(n => n.toLowerCase().includes(q))) ||
        (p.notes?.base && p.notes.base.some(n => n.toLowerCase().includes(q)))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => Object.values(a.prices)[0] - Object.values(b.prices)[0]);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const aMax = Math.max(...Object.values(a.prices));
        const bMax = Math.max(...Object.values(b.prices));
        return bMax - aMax;
      });
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedFamily, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8DFC9]">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C6B28] font-bold mb-2">
            <span className="w-8 h-px bg-[#C5A059]"></span>
            <span>The Signature Vault</span>
            <span className="w-8 h-px bg-[#C5A059]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            <span className="text-[#0F3B2E]">Curated </span>
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#8A6214] bg-clip-text text-transparent">
              Artisanal Fragrances
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Distilled from the world's most coveted botanical absolutes, aged ouds, and precious resins. Each bottle is a private olfactory identity.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EBE3D0] shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {families.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedFamily(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedFamily === cat.value
                      ? 'bg-[#0F3B2E] text-white shadow-sm'
                      : 'bg-[#F7F4EC] text-stone-600 hover:bg-[#EDE7D9] hover:text-[#0F3B2E]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes, bergamot, oud..."
                  className="w-full pl-9 pr-8 py-2 rounded-full bg-[#FAF8F2] border border-[#E2D8C3] text-xs text-stone-800 focus:outline-none focus:border-[#C5A059] focus:bg-white transition"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F2] border border-[#E2D8C3] text-stone-700 text-xs rounded-full px-3.5 py-2 font-medium focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-[#C5A059]/40 p-12 text-center max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
            <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-1">No Fragrances Found</h4>
            <p className="text-xs text-stone-500 mb-4">
              We couldn't find any fragrances matching "{searchQuery}". Try searching for floral, bergamot, oud, or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedFamily('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#0F3B2E] text-white text-xs font-semibold hover:bg-[#144d3c] transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Discovery Set Banner Callout */}
        <div className="mt-16 bg-gradient-to-r from-[#FAF4E6] via-[#F5EEDC] to-[#EBF3EE] rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6B28] bg-white/70 px-3 py-1 rounded-full border border-[#D4AF37]/30 inline-block mb-3">
              ⚜️ The Connoisseur's First Step
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3B2E] mb-2">
              Unsure Which Scent Defines You?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Order our signature <strong>Imperial Discovery Vault</strong> featuring all 4 miniature atomizers (4 x 10ml). Includes a <strong>₹500 gift voucher</strong> redeemable on your favorite full-sized bottle.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                const vault = initialProducts.find(p => p.id === 'discovery-vault');
                if (vault) {
                  const elem = document.getElementById('collection');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                  setSelectedFamily('Discovery Sets');
                }
              }}
              className="bg-[#0F3B2E] hover:bg-[#144d3c] text-white px-7 py-3 rounded-full text-xs font-bold tracking-wide shadow-md transition flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#E6CA65]" />
              <span>Explore Discovery Coffret</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
