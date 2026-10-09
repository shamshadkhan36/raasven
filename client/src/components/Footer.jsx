import React from 'react';
import { MessageCircle, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="about" className="bg-[#FAF7F0] text-stone-700 text-xs border-t-2 border-[#C5A059]/40 pt-16 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl text-[#C5A059]">⚜️</span>
              <div>
                <span className="text-2xl font-serif font-bold tracking-[0.2em] text-[#0F3B2E]">
                  RAASVEN
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8C6B28] font-semibold -mt-1">
                  Haute Parfumerie
                </span>
              </div>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
              A luxury fragrance house by <strong>Kalpana Global Eximm</strong>. Dedicated to formulating master-grade Extraits de Parfum that unite Indian botanical heritage with French distillation artistry.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-stone-500">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-[#E8DFC9] hover:border-[#C5A059] flex items-center justify-center text-stone-700 hover:text-[#0F3B2E] transition">
                <span>IG</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-[#E8DFC9] hover:border-[#C5A059] flex items-center justify-center text-stone-700 hover:text-[#0F3B2E] transition">
                <span>FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-[#E8DFC9] hover:border-[#C5A059] flex items-center justify-center text-stone-700 hover:text-[#0F3B2E] transition">
                <span>IN</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-[#0F3B2E] uppercase tracking-wider text-[11px] mb-4">
              Our Collection
            </h5>
            <ul className="space-y-2.5 text-stone-600">
              <li><a href="#collection" className="hover:text-[#0F3B2E] transition">Wild Edge (Fresh/Woody)</a></li>
              <li><a href="#collection" className="hover:text-[#0F3B2E] transition">Élan (Floral/Bourbon)</a></li>
              <li><a href="#collection" className="hover:text-[#0F3B2E] transition">Ruby Mist (Damask Rose)</a></li>
              <li><a href="#collection" className="hover:text-[#0F3B2E] transition">Oud Royale (Aged Oud)</a></li>
              <li><a href="#collection" className="hover:text-[#0F3B2E] transition">Imperial Discovery Vault</a></li>
            </ul>
          </div>

          {/* Corporate & B2B */}
          <div>
            <h5 className="font-bold text-[#0F3B2E] uppercase tracking-wider text-[11px] mb-4">
              Commercial & B2B
            </h5>
            <ul className="space-y-2.5 text-stone-600">
              <li><a href="#private-label" className="hover:text-[#0F3B2E] transition">Private Label Flacons</a></li>
              <li><a href="#export" className="hover:text-[#0F3B2E] transition">Global Export Divisions</a></li>
              <li><a href="#private-label" className="hover:text-[#0F3B2E] transition">Turnkey Formulation</a></li>
              <li><a href="#reviews" className="hover:text-[#0F3B2E] transition">Verified Buyer Reviews</a></li>
              <li><a href="#about" className="hover:text-[#0F3B2E] transition">About Kalpana Global Eximm</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h5 className="font-bold text-[#0F3B2E] uppercase tracking-wider text-[11px] mb-4">
              Direct Contact
            </h5>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start space-x-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>+91 98765 43210 (WhatsApp)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>export@kalpanaglobaleximm.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Globe className="w-4 h-4 text-[#0F3B2E] shrink-0 mt-0.5" />
                <span>Mumbai, India • Dubai, UAE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Markets Footnote Banner */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DFC9] flex flex-col md:flex-row items-center justify-between text-xs text-stone-600 mb-8 gap-3">
          <div className="flex items-center space-x-2 text-[#0F3B2E] font-semibold">
            <Globe className="w-4 h-4 text-[#C5A059]" />
            <span>Serving Discerning Clients & Importers Across:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-medium">
            <span>🇦🇪 UAE</span>
            <span>🇸🇦 Saudi Arabia</span>
            <span>🇴🇲 Oman</span>
            <span>🇳🇱 Netherlands</span>
            <span>🇬🇧 United Kingdom</span>
            <span>🇺🇸 USA</span>
            <span>🌍 Kenya & Mauritius</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="border-t border-[#E8DFC9] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} RAASVEN. A Registered Brand by Kalpana Global Eximm. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SSL Secured Checkout</span>
            </span>
            <span>•</span>
            <a href="#" className="hover:text-stone-800">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-800">Terms of Export</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
