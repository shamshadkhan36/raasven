import React from 'react';
import { Droplet, Award, ShieldCheck, Sparkles, Flame, HeartHandshake } from 'lucide-react';

export const Features = () => {
  const pillars = [
    {
      icon: <Droplet className="w-6 h-6 text-[#0F3B2E]" />,
      bg: 'bg-[#EBF3EE]',
      title: '25% Pure Extrait Oil',
      desc: 'High concentration French perfume oils that linger for 14-18 hours without reapplying.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
      bg: 'bg-[#FAF5E9]',
      title: 'Artisanal Cambodian Oud',
      desc: 'Rare wild agarwood aged over 12 years, yielding a smoky, golden warmth prized by royalty.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#0F3B2E]" />,
      bg: 'bg-[#EBF3EE]',
      title: 'Heavy Crystal Flacons',
      desc: 'Weighted 150g Italian glass with precision micro-fine mist atomizers and magnetic gold caps.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
      bg: 'bg-[#FAF5E9]',
      title: 'IFRA & Export Certified',
      desc: '100% compliant with International Fragrance Association global safety and export protocols.'
    }
  ];

  return (
    <section id="features" className="py-16 bg-white border-b border-[#E8DFC9]">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-[#FAF9F5] p-6 rounded-2xl border border-[#EBE3D0] hover:border-[#C5A059]/60 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl ${pillar.bg} border border-[#E8DFC9] flex items-center justify-center mb-4`}>
                {pillar.icon}
              </div>
              <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-2">{pillar.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
