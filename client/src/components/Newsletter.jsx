import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Newsletter = () => {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        showToast('Welcome to the Connoisseurs Circle! Use code RAASVEN10 for 10% off.');
      }
    } catch {
      setSubscribed(true);
      showToast('Subscribed! Use code RAASVEN10 for 10% off.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#F6F2E7] border-b border-[#E8DFC9]">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <div className="w-12 h-12 rounded-full bg-[#FAF5E9] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A059]">
          <Sparkles className="w-6 h-6" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6B28] mb-2 block">
          Private Circle Privileges
        </span>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F3B2E] mb-3">
          Join the Raasven Connoisseurs Circle
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Be the first to access limited harvest Extraits, private cask oud releases, and receive an instant <strong>10% welcome voucher</strong>.
        </p>

        {subscribed ? (
          <div className="bg-white p-5 rounded-2xl border border-[#25D366] max-w-md mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#0F3B2E] mb-1">Welcome to the Private Circle!</h4>
            <p className="text-xs text-stone-600 mb-2">Use your secret promotion code during checkout:</p>
            <span className="text-base font-mono font-bold text-[#8C6B28] bg-[#FAF5E9] px-4 py-1.5 rounded-full border border-[#D4AF37]/40 inline-block">
              RAASVEN10
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your VIP email address..."
              className="flex-1 px-4 py-3 rounded-full bg-white border border-[#E2D8C3] text-xs text-stone-800 focus:outline-none focus:border-[#C5A059] shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-[#0F3B2E] hover:bg-[#144d3c] text-white text-xs font-bold uppercase tracking-wider shadow-md transition whitespace-nowrap"
            >
              {loading ? 'Joining...' : 'Claim 10% Voucher'}
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
