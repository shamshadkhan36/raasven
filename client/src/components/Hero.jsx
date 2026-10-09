import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Droplets } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero = ({ onExploreClick }) => {
  const { siteSettings } = useCart();
  const phone = (siteSettings?.supportPhone || '919876543210').replace(/[^0-9]/g, '');

  const renderHeroTitle = (title) => {
    const raw = title || 'The Signature of Your Presence.';
    if (raw.toLowerCase().includes('signature of your presence')) {
      return (
        <>
          <span className="text-[#0F3B2E]">The Signature of </span>
          <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] bg-clip-text text-transparent font-bold">
            Your Presence.
          </span>
        </>
      );
    }
    const words = raw.split(' ');
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      return (
        <>
          <span className="text-[#0F3B2E]">{words.slice(0, mid).join(' ')} </span>
          <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] bg-clip-text text-transparent font-bold">
            {words.slice(mid).join(' ')}
          </span>
        </>
      );
    }
    return (
      <span className="bg-gradient-to-r from-[#0F3B2E] via-[#1A5C47] to-[#C5A059] bg-clip-text text-transparent font-bold">
        {raw}
      </span>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F6F2E7] to-[#FAF9F5] border-b border-[#EBE3D0] py-12 md:py-20">
      {/* Decorative subtle ambient luxury glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0F3B2E]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Prestige Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#EBF3EE] to-[#FAF4E6] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0F3B2E] w-fit mb-5 shadow-sm">
              <span className="text-[#C5A059]">⚜️</span>
              <span className="tracking-wider uppercase text-[11px] font-bold">Haute Parfumerie • Pure Extraits</span>
              <span className="w-1 h-1 rounded-full bg-[#0F3B2E]"></span>
              <span className="text-[#87662B] font-medium">Kalpana Global Eximm</span>
            </div>

            {/* Main Headline (Green & Golden) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.14] mb-4 tracking-tight">
              {renderHeroTitle(siteSettings?.heroTitle)}
            </h1>

            {/* Green & Golden Luxury Divider */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-0.5 w-14 bg-[#0F3B2E] rounded-full"></span>
              <span className="text-xs text-[#C5A059]">⚜️</span>
              <span className="h-0.5 w-14 bg-gradient-to-r from-[#C5A059] to-[#E5C158] rounded-full"></span>
            </div>

            {/* Sub-headline */}
            <p className="text-stone-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
              {siteSettings?.heroSubtitle || 'Artisanal fragrances crafted with 25% French perfume oils and aged Oriental notes. Designed to linger for over 14 hours with unforgettable sillage.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="bg-gradient-to-r from-[#0F3B2E] via-[#154E3D] to-[#0F3B2E] hover:from-[#134939] hover:to-[#1b5e4b] text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-[#0F3B2E]/15 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 text-[#E6CA65] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#private-label"
                className="bg-[#FFFDF9] hover:bg-[#F6EEDC] text-[#0F3B2E] border border-[#C5A059] px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-300 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>B2B & Private Label</span>
              </a>

              <a
                href={`https://wa.me/${phone}?text=Hello%20Raasven,%20I'm%20interested%20in%20ordering%20perfumes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-full bg-[#EBF5EF] hover:bg-[#DEF0E4] text-[#125A41] text-sm font-semibold border border-[#BDE2CC] transition shadow-sm"
              >
                <span className="text-base">💬</span>
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Trust Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DFC9] max-w-lg">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EBF3EE] border border-[#C5A059]/30 flex items-center justify-center text-[#0F3B2E]">
                  <Droplets className="w-4 h-4 text-[#0F3B2E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F3B2E]">25% Oil Extrait</h4>
                  <p className="text-[11px] text-stone-500">Pure French Oils</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF5E9] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  <Clock className="w-4 h-4 text-[#8C6B28]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F3B2E]">14+ Hours</h4>
                  <p className="text-[11px] text-stone-500">High Longevity</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EBF3EE] border border-[#C5A059]/30 flex items-center justify-center text-[#0F3B2E]">
                  <Award className="w-4 h-4 text-[#0F3B2E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F3B2E]">Global Export</h4>
                  <p className="text-[11px] text-stone-500">UAE, Oman, EU</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backglow Gold Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/30 to-[#0F3B2E]/20 rounded-3xl blur-xl opacity-60"></div>

              {/* Main Visual Card */}
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden group">
                <div className="overflow-hidden rounded-xl relative">
                  <img
                    src="/images/hero-banner.jpg"
                    alt="Raasven Luxury Signature Perfumes"
                    className="w-full h-[360px] sm:h-[440px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-[11px] uppercase tracking-widest text-[#E6CA65] font-semibold block mb-1">
                        Imperial Masterpiece
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight">
                        The Quad Collection
                      </h3>
                      <p className="text-xs text-stone-200 mt-1">
                        Wild Edge • Élan • Ruby Mist • Oud Royale
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge - Top Right */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md border border-[#C5A059]/50 px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 text-xs font-bold text-[#0F3B2E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Extraits De Parfum</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
