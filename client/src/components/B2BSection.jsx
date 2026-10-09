import React, { useState } from 'react';
import { Globe2, Sparkles, Building2, CheckCircle2, ArrowRight, X, Mail, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const B2BSection = () => {
  const { isInquiryOpen, setIsInquiryOpen, showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    interest: 'Private Label Perfumes',
    estimatedUnits: '500 - 2,000 units',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        showToast('Inquiry submitted! Our export director will contact you within 24 hours.');
      }
    } catch {
      setSubmitted(true);
      showToast('Inquiry received! We will reach out promptly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="private-label" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF9F5] via-[#F6F2E7] to-[#FAF9F5] border-b border-[#E8DFC9]">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6B28] bg-white px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm inline-block mb-3">
              ⚜️ Kalpana Global Eximm B2B Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              <span className="text-[#0F3B2E]">Export & </span>
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#8A6214] bg-clip-text text-transparent">
                Private Label Parfumerie
              </span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We empower luxury brands, boutique houses, and international distributors with turnkey fragrance manufacturing, regulatory compliance, and worldwide freight logistics.
            </p>
          </div>

          {/* Dual Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Card 1: Global Export Markets */}
            <div id="export" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="flex items-center space-x-2.5 text-[#0F3B2E] mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EBF3EE] border border-[#C5A059]/40 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-[#0F3B2E]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8C6B28] font-bold block">International Reach</span>
                    <h3 className="text-2xl font-serif font-bold text-[#0F3B2E]">Global Fragrance Export</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  Connecting premium Indian formulations and Middle Eastern accords to verified importers across the Gulf Cooperation Council (GCC), Africa, and the European Union.
                </p>

                {/* Logistics Image */}
                <div className="rounded-2xl overflow-hidden mb-6 border border-[#E8DFC9] h-48 relative">
                  <img
                    src="/images/export-markets.jpg"
                    alt="Raasven Global Export Logistics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">
                      Door-to-Port & Air Express Freight to Over 14 Countries
                    </span>
                  </div>
                </div>

                {/* Country Badges */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs text-stone-700 mb-6">
                  <div className="bg-[#FAF7F0] p-2 rounded-xl border border-[#E8DFC9]">🇦🇪 UAE</div>
                  <div className="bg-[#FAF7F0] p-2 rounded-xl border border-[#E8DFC9]">🇸🇦 Saudi</div>
                  <div className="bg-[#FAF7F0] p-2 rounded-xl border border-[#E8DFC9]">🇴🇲 Oman</div>
                  <div className="bg-[#FAF7F0] p-2 rounded-xl border border-[#E8DFC9]">🇳🇱 EU</div>
                  <div className="bg-[#FAF7F0] p-2 rounded-xl border border-[#E8DFC9]">🌍 Africa</div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#0F3B2E] hover:bg-[#144d3c] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center space-x-2"
                >
                  <span>Inquire for Wholesale Export</span>
                  <ArrowRight className="w-4 h-4 text-[#E6CA65]" />
                </button>
              </div>

            </div>

            {/* Card 2: Private Label Formulation */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F3B2E]/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="flex items-center space-x-2.5 text-[#0F3B2E] mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5E9] border border-[#C5A059]/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8C6B28] font-bold block">Custom Brand Formulation</span>
                    <h3 className="text-2xl font-serif font-bold text-[#0F3B2E]">Private Label Manufacturing</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  Build your own proprietary fragrance house with our comprehensive turnkey services: from nose-curated scent oils to custom Italian crystal bottles and luxury gold foil packaging.
                </p>

                {/* Private Label Image */}
                <div className="rounded-2xl overflow-hidden mb-6 border border-[#E8DFC9] h-48 relative">
                  <img
                    src="/images/private-label.jpg"
                    alt="Raasven Private Label Solutions"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold">
                      Custom Flacons, Magnetic Caps & Rigid Gift Box Assembly
                    </span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="grid grid-cols-2 gap-2.5 text-xs text-stone-700 mb-6">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Custom Olfactory Accords</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Low MOQs (From 500 pcs)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>IFRA Certified Formulations</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Turnkey Export Documentation</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C5A059] to-[#AA7C1E] hover:from-[#B5914A] hover:to-[#966C15] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center space-x-2"
                >
                  <span>Build Your Own Perfume Brand</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div 
            onClick={() => setIsInquiryOpen(false)}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
          ></div>

          <div className="relative bg-[#FFFDF9] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DFC9] z-10 p-6 sm:p-8 animate-scaleUp">
            <button
              onClick={() => {
                setIsInquiryOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#F2EDE2]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#EBF5EF] text-[#0F3B2E] border border-[#25D366] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0F3B2E] mb-2">Inquiry Lodged</h3>
                <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                  Thank you, {formData.name}. Our B2B export and formulation director will prepare custom pricing and reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsInquiryOpen(false);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0F3B2E] text-white text-xs font-bold"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg text-[#C5A059]">⚜️</span>
                  <h3 className="text-xl font-serif font-bold text-[#0F3B2E]">
                    B2B & Private Label Quotation
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mb-5">
                  Direct commercial inquiries for bulk distribution or proprietary brand manufacturing.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. Tariq Al-Mansoor"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Company / Brand</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        placeholder="Luxury Retail LLC"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Destination Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        placeholder="UAE, Saudi, Oman..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        placeholder="trade@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Area of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Private Label Perfumes">Private Label Perfumes (Custom Flacons)</option>
                      <option value="Wholesale Bulk Bottles">Wholesale Raasven Finished Bottles (Retail/Export)</option>
                      <option value="Fragrance Oils & Compounds">Pure French & Oriental Oils (Barrels / Kg)</option>
                      <option value="Custom Gift Sets">Corporate & Royal Event Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Additional Specifications</label>
                    <textarea
                      rows="2"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                      placeholder="Target volumes, desired note profile, timeline..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[#0F3B2E] hover:bg-[#144d3c] text-white font-bold text-xs uppercase tracking-wider transition"
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Submit Commercial Request'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
