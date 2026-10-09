import React, { useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductCatalog } from './components/ProductCatalog';
import { B2BSection } from './components/B2BSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Toast } from './components/Toast';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageCircle } from 'lucide-react';

function RaasvenStore() {
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    const catalogElem = document.getElementById('collection');
    catalogElem?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    const catalogElem = document.getElementById('collection');
    catalogElem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800 selection:bg-[#E2D4B7] selection:text-[#0C382A]">
      {/* Navigation */}
      <Navbar onSearchClick={handleSearchClick} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Luminous Light Luxury Hero */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Quality Pillars & Craftsmanship */}
        <Features />

        {/* Interactive E-Commerce Product Catalog */}
        <ProductCatalog searchInputRef={searchInputRef} />

        {/* B2B Private Label & Global Export */}
        <B2BSection />

        {/* VIP Circle Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Luxury Light Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <WishlistDrawer />
      <AdminDashboard />
      <Toast />

      {/* Floating Concierge WhatsApp Widget (Bottom Left) */}
      <aside aria-label="Customer Support Concierge" className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/919876543210?text=Hello%20Raasven,%20I'd%20like%20assistance%20with%20choosing%20a%20luxury%20perfume."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 bg-white/95 hover:bg-white text-[#0F3B2E] border border-[#25D366]/40 px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Perfume Concierge</span>
            <span className="text-xs font-bold text-[#0F3B2E]">Chat on WhatsApp</span>
          </div>
        </a>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <RaasvenStore />
    </CartProvider>
  );
}
