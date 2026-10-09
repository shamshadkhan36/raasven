import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Tariq Al-Mansoor',
      location: 'Dubai, UAE 🇦🇪',
      perfume: 'Oud Royale (Extrait)',
      rating: 5,
      review: 'The Cambodian Oud in Oud Royale is on par with niche European and Gulf houses costing 5 times as much. The sillage lasted well past 16 hours during a humid Dubai evening.'
    },
    {
      id: 2,
      name: 'Dr. Ananya Sharma',
      location: 'Mumbai, India 🇮🇳',
      perfume: 'Élan & Ruby Mist',
      rating: 5,
      review: 'Élan has become my undisputed signature scent. The bourbon vanilla and jasmine blend seamlessly without being overly sweet. The presentation box feels like pure royalty.'
    },
    {
      id: 3,
      name: 'Alexander Van Dijk',
      location: 'Amsterdam, Netherlands 🇳🇱',
      perfume: 'Wild Edge (100ml)',
      rating: 5,
      review: 'Imported a trial batch of Wild Edge for our boutique. Sold out within two weeks. The juniper and vetiver combination is crisp, clean, and unmistakably premium.'
    }
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8DFC9]">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6B28] bg-white px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm inline-block mb-3">
            ⭐ Verified Connoisseur Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F3B2E] mb-3">
            Acclaimed Across Continents
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Read how perfume enthusiasts, luxury buyers, and international traders experience Raasven.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC9] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE0] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#0F3B2E]">{rev.name}</h4>
                  <span className="text-stone-500 text-[11px]">{rev.location}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#8C6B28] bg-[#FAF5E9] px-2 py-0.5 rounded-md border border-[#E8DFC9]">
                  {rev.perfume}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
