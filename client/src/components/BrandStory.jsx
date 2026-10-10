import React from 'react';
import { Sparkles, Globe, Heart, Compass, ShieldCheck } from 'lucide-react';

export const BrandStory = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-[#E8DFC9] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0F3B2E]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C6B28] font-bold mb-3 bg-white px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
            <span>⚜️</span>
            <span>Brand Story & Positioning</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 tracking-tight">
            <span className="text-[#0F3B2E]">The Essence of </span>
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#8A6214] bg-clip-text text-transparent">
              Elegance
            </span>
          </h2>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="h-0.5 w-12 bg-[#0F3B2E] rounded-full"></span>
            <span className="text-xs text-[#C5A059]">⚜️</span>
            <span className="h-0.5 w-12 bg-gradient-to-r from-[#C5A059] to-[#E5C158] rounded-full"></span>
          </div>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-serif italic max-w-2xl mx-auto">
            "Raasven represents the essence of elegance — where Indian sensibility meets modern luxury."
          </p>
        </div>

        {/* Dual Cultural Harmony Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#E8DFC9] shadow-xl max-w-5xl mx-auto mb-16 relative overflow-hidden">
          {/* Subtle gold watermarked emblem */}
          <div className="absolute -right-10 -bottom-10 text-[180px] text-[#C5A059]/5 select-none pointer-events-none font-serif">
            ⚜️
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: English Brand Story Philosophy */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C6B28] bg-[#FAF5E9] px-3 py-1 rounded-full border border-[#D4AF37]/30 inline-block">
                Our Foundational Vision
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3B2E] leading-snug">
                Where Heritage Meets Haute Parfumerie
              </h3>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Born under the visionary stewardship of <strong>Kalpana Global Eximm</strong>, <strong>Raasven</strong> was conceived to redefine modern olfactory art. We weave the soulful authenticity of Indian botanicals, rare ouds, and precious resins with the uncompromising rigor of French perfume formulation.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#0F3B2E]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                  <span>Authentic Indian Heritage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#0F3B2E]"></span>
                  <span>25% Pure French Perfume Oils</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                  <span>International Luxury Formulation</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Marathi Cultural Heritage Plaque */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#FAF8F2] via-[#F6F1E3] to-[#FAF5E9] p-6 sm:p-7 rounded-2xl border-2 border-[#C5A059]/50 shadow-md text-left relative">
                <div className="flex items-center justify-between mb-3 border-b border-[#E8DFC9] pb-2">
                  <span className="text-xs font-bold text-[#8C6B28] uppercase tracking-wider flex items-center space-x-1.5">
                    <span>🇮🇳</span>
                    <span>मराठीत (Marathi Essence)</span>
                  </span>
                  <span className="text-xs text-[#C5A059]">⚜️</span>
                </div>

                <blockquote className="text-base sm:text-lg font-serif text-[#0F3B2E] font-medium leading-relaxed mb-3">
                  “Resven म्हणजे सुगंधातुन व्यक्त होणारी अभिजातता — भारतीय संवेदनशीलता आणि आधुनिक लक्झरी यांचा संगम.”
                </blockquote>

                <p className="text-[11px] text-stone-500 leading-normal border-t border-[#E8DFC9] pt-2">
                  <em>Expressing timeless elegance through fragrance — a harmonious union of Indian emotional sensibility and contemporary luxury.</em>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Brand Positioning Architecture (3 Pillars) */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F3B2E]">
              Brand Positioning Architecture
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Indian-Inspired Origin + International Luxury
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Indian-Inspired Origin */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8DFC9] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] border border-[#BCE1CB] text-[#0F3B2E] flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-[#0F3B2E]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6B28] block mb-1">
                  Pillar 01 • Origin
                </span>
                <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-2">
                  Indian-Inspired Origin
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Grounded in India’s millennia-old olfactory heritage — from sacred Assam oud and Kannauj floral distillations to spicy Mysore woods and spiritual ambergris.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F0EAE0] text-[11px] font-semibold text-[#8C6B28]">
                भारतीय मूळ व संवेदनशीलता
              </div>
            </div>

            {/* Pillar 2: International Luxury Standards */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8DFC9] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF5E9] border border-[#E8DFC9] text-[#C5A059] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#8C6B28]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6B28] block mb-1">
                  Pillar 02 • Formulation
                </span>
                <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-2">
                  International Luxury
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Crafted with 25% pure French perfume oils, IFRA-certified European safety compliance, 150g Italian crystal flacons, and magnetic gold closures.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F0EAE0] text-[11px] font-semibold text-[#8C6B28]">
                आंतरराष्ट्रीय लक्झरी दर्जा
              </div>
            </div>

            {/* Pillar 3: Cross-Cultural Harmony & Export */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8DFC9] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md text-left flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] border border-[#BCE1CB] text-[#0F3B2E] flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-[#0F3B2E]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6B28] block mb-1">
                  Pillar 03 • Global Presence
                </span>
                <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-2">
                  Modern Luxury & Soul
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Targeted at connoisseurs across India and international markets (UAE, Oman, EU, USA). Subtly Indian, universally magnetic, and unmistakably refined.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F0EAE0] text-[11px] font-semibold text-[#8C6B28]">
                जागतिक अभिजातता व संगम
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
