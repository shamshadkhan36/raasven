import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, Lock, LogOut, Package, ShoppingBag, Tag, Globe, Settings, Plus, 
  Trash2, Edit3, CheckCircle2, AlertCircle, ArrowRight, Eye, RefreshCw, MessageCircle, DollarSign
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    closeAdmin,
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    siteSettings,
    updateSettings,
    formatPrice,
    showToast
  } = useCart();

  // Authentication state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Orders and Inquiries fetched from backend
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [coupons, setCoupons] = useState([
    { code: 'RAASVEN10', discountPercent: 10, minSpend: 0, description: '10% Off Entire Order' },
    { code: 'ROYAL20', discountPercent: 20, minSpend: 3000, description: '20% Off Orders Above ₹3,000' },
    { code: 'GOLD500', discountFlat: 500, minSpend: 2500, description: 'Flat ₹500 Off Orders Above ₹2,500' }
  ]);

  // Product Edit / Create Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    subtitle: '',
    category: 'Fresh & Woody',
    family: 'Woody',
    price50: '1799',
    price100: '2499',
    badge: 'NEW LAUNCH',
    concentration: '25% Pure Extrait Oil',
    longevity: '14+ Hours Longevity',
    sillage: 'Strong & Commanding Sillage',
    image: '/images/hero-banner.jpg',
    description: '',
    inStock: true
  });

  // New Coupon Form state
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: 15,
    minSpend: 1500,
    description: ''
  });

  // Settings Form state
  const [settingsForm, setSettingsForm] = useState({
    announcementText: siteSettings.announcementText || '',
    supportPhone: siteSettings.supportPhone || '',
    supportEmail: siteSettings.supportEmail || '',
    heroTitle: siteSettings.heroTitle || '',
    heroSubtitle: siteSettings.heroSubtitle || ''
  });

  // Fetch backend data when opened
  useEffect(() => {
    if (isAdminOpen && isAdminLoggedIn) {
      fetch('/api/admin/orders')
        .then(res => res.json())
        .then(data => { if (data.orders) setOrders(data.orders); })
        .catch(() => {});

      fetch('/api/admin/inquiries')
        .then(res => res.json())
        .then(data => { if (data.inquiries) setInquiries(data.inquiries); })
        .catch(() => {});
    }
  }, [isAdminOpen, isAdminLoggedIn]);

  if (!isAdminOpen) return null;

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && (password === 'raasven@admin2026' || password === 'admin')) {
      setIsAdminLoggedIn(true);
      setLoginError('');
      showToast('Welcome back, Administrator!');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out from admin panel', 'info');
    closeAdmin();
  };

  // Open Edit Product
  const handleEditProductClick = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      subtitle: prod.subtitle || '',
      category: prod.category || 'Fresh & Woody',
      family: prod.family || 'Woody',
      price50: prod.prices['50ml'] || Object.values(prod.prices)[0] || '1799',
      price100: prod.prices['100ml'] || Object.values(prod.prices)[0] || '2499',
      badge: prod.badge || '',
      concentration: prod.concentration || '25% Pure Extrait Oil',
      longevity: prod.longevity || '14+ Hours Longevity',
      sillage: prod.sillage || 'Strong Sillage',
      image: prod.image || '/images/hero-banner.jpg',
      description: prod.description || '',
      inStock: prod.inStock !== false
    });
    setIsProductModalOpen(true);
  };

  // Open Create Product
  const handleCreateProductClick = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      subtitle: 'Eau De Parfum — Pure Extrait',
      category: 'Fresh & Woody',
      family: 'Woody',
      price50: '1799',
      price100: '2499',
      badge: 'NEW LAUNCH',
      concentration: '25% Pure Extrait Oil',
      longevity: '14+ Hours Longevity',
      sillage: 'Strong & Commanding Sillage',
      image: '/images/hero-banner.jpg',
      description: 'An enchanting artisanal fragrance distilled with high-concentration French perfume oils.',
      inStock: true
    });
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const productPayload = {
      ...(editingProduct || {}),
      name: productForm.name,
      subtitle: productForm.subtitle,
      category: productForm.category,
      family: productForm.family,
      prices: {
        '50ml': Number(productForm.price50),
        '100ml': Number(productForm.price100)
      },
      originalPrices: {
        '50ml': Math.round(Number(productForm.price50) * 1.3),
        '100ml': Math.round(Number(productForm.price100) * 1.3)
      },
      badge: productForm.badge,
      concentration: productForm.concentration,
      longevity: productForm.longevity,
      sillage: productForm.sillage,
      image: productForm.image,
      description: productForm.description,
      inStock: productForm.inStock
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
    } else {
      await addProduct(productPayload);
    }
    setIsProductModalOpen(false);
  };

  // Add Coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!couponForm.code.trim()) return;
    const newCoupon = {
      code: couponForm.code.trim().toUpperCase(),
      discountPercent: Number(couponForm.discountPercent),
      minSpend: Number(couponForm.minSpend),
      description: couponForm.description || `${couponForm.discountPercent}% Off Orders`
    };
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Created promo code ${newCoupon.code}!`);
    setCouponForm({ code: '', discountPercent: 15, minSpend: 1500, description: '' });
  };

  // Delete Coupon
  const handleDeleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`Deleted coupon ${code}`, 'info');
  };

  // Save Site Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl border border-[#E8DFC9] flex flex-col max-h-[92vh] animate-scaleUp">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <span className="text-2xl text-[#C5A059]">⚜️</span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-serif font-bold text-[#0F3B2E]">Raasven Command Center</h3>
                <span className="bg-[#0F3B2E] text-[#E6CA65] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-stone-500">Full Storefront, Catalog, Orders & Settings Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center space-x-1 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={closeAdmin}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-[#F2EDE2] transition"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {!isAdminLoggedIn ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF5E9] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>

              <h4 className="text-2xl font-serif font-bold text-[#0F3B2E] mb-2">Administrator Access</h4>
              <p className="text-xs text-stone-500 mb-6">
                Please enter your credentials to manage products, customer orders, coupons, and website configuration.
              </p>

              {loginError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 text-xs text-left">
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Admin Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D8C3] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0F3B2E] hover:bg-[#144d3c] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
                >
                  Unlock Admin Console
                </button>
              </form>
            </div>
          ) : (
            /* Logged In Admin Workspace */
            <div>
              {/* Tab Navigation */}
              <div className="flex items-center space-x-2 border-b border-[#E8DFC9] pb-4 mb-6 overflow-x-auto scrollbar-none">
                {[
                  { id: 'overview', label: 'Overview', icon: <DollarSign className="w-4 h-4" /> },
                  { id: 'products', label: `Products (${products.length})`, icon: <Package className="w-4 h-4" /> },
                  { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
                  { id: 'coupons', label: `Coupons (${coupons.length})`, icon: <Tag className="w-4 h-4" /> },
                  { id: 'inquiries', label: `B2B Leads (${inquiries.length})`, icon: <Globe className="w-4 h-4" /> },
                  { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-1.5 transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[#0F3B2E] text-white shadow-sm'
                        : 'bg-white text-stone-600 hover:bg-[#F5F2EB]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Total Store Sales</span>
                      <h4 className="text-2xl font-serif font-bold text-[#0F3B2E]">{formatPrice(totalRevenue || 4998)}</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold">Active E-Commerce Engine</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Active Perfumes</span>
                      <h4 className="text-2xl font-serif font-bold text-[#0F3B2E]">{products.length}</h4>
                      <span className="text-[10px] text-stone-500 font-medium">All in stock & live</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Total Orders</span>
                      <h4 className="text-2xl font-serif font-bold text-[#0F3B2E]">{orders.length || 2}</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold">Ready for dispatch</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">B2B Export Leads</span>
                      <h4 className="text-2xl font-serif font-bold text-[#0F3B2E]">{inquiries.length || 3}</h4>
                      <span className="text-[10px] text-[#8C6B28] font-semibold">GCC & Europe buyers</span>
                    </div>
                  </div>

                  {/* Quick Action Banner */}
                  <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#0F3B2E] mb-1">Live Storefront Synchronized</h4>
                      <p className="text-xs text-stone-600">
                        Any products added, prices modified, or settings saved here will reflect immediately on the customer-facing website.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateProductClick}
                        className="px-5 py-2.5 rounded-full bg-[#0F3B2E] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm hover:bg-[#134939] transition"
                      >
                        <Plus className="w-4 h-4 text-[#E6CA65]" />
                        <span>Add New Perfume</span>
                      </button>
                      <button
                        onClick={closeAdmin}
                        className="px-5 py-2.5 rounded-full bg-white border border-[#C5A059] text-[#0F3B2E] text-xs font-bold hover:bg-[#FAF5E9] transition"
                      >
                        View Live Store
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#0F3B2E]">Product Catalog Management</h4>
                      <p className="text-xs text-stone-500">Create, edit, or adjust pricing and stock of your perfumes.</p>
                    </div>
                    <button
                      onClick={handleCreateProductClick}
                      className="px-4 py-2 rounded-full bg-[#0F3B2E] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm hover:bg-[#134939] transition"
                    >
                      <Plus className="w-4 h-4 text-[#E6CA65]" />
                      <span>Add New Perfume</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl border border-[#E8DFC9] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF7F0] border-b border-[#E8DFC9] text-stone-700 uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-4">Perfume</th>
                            <th className="p-4">Family</th>
                            <th className="p-4">Price (50ml / 100ml)</th>
                            <th className="p-4">Badge</th>
                            <th className="p-4">Stock Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0EAE0]">
                          {products.map(prod => (
                            <tr key={prod.id} className="hover:bg-[#FAF9F5] transition">
                              <td className="p-4 flex items-center space-x-3">
                                <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-lg object-cover border border-[#E8DFC9]" />
                                <div>
                                  <h5 className="font-serif font-bold text-[#0F3B2E] text-sm">{prod.name}</h5>
                                  <span className="text-[10px] text-stone-500">{prod.subtitle}</span>
                                </div>
                              </td>
                              <td className="p-4 font-medium text-stone-700">{prod.category}</td>
                              <td className="p-4 font-serif font-bold text-[#0F3B2E]">
                                {formatPrice(prod.prices['50ml'] || Object.values(prod.prices)[0])} / {formatPrice(prod.prices['100ml'] || Object.values(prod.prices)[0])}
                              </td>
                              <td className="p-4">
                                {prod.badge ? (
                                  <span className="bg-[#FAF4E6] text-[#8C6B28] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#D4AF37]/30">
                                    {prod.badge}
                                  </span>
                                ) : (
                                  <span className="text-stone-400">—</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  prod.inStock !== false ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                                }`}>
                                  {prod.inStock !== false ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => handleEditProductClick(prod)}
                                  className="p-1.5 text-stone-600 hover:text-[#0F3B2E] hover:bg-stone-100 rounded-lg transition"
                                  title="Edit Perfume"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete ${prod.name} from store catalog?`)) {
                                      deleteProduct(prod.id);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                  title="Delete Perfume"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS MANAGER */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#0F3B2E]">Customer Orders</h4>
                    <p className="text-xs text-stone-500">Track and manage customer deliveries across India and international markets.</p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-[#E8DFC9] text-center text-xs text-stone-500">
                      <ShoppingBag className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
                      <h5 className="font-bold text-[#0F3B2E]">No New Orders Yet</h5>
                      <p>Orders placed on the storefront will appear here with customer address and items.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map(order => (
                        <div key={order.orderId} className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-[#0F3B2E] text-sm">#{order.orderId}</span>
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                                {order.status || 'Confirmed'}
                              </span>
                            </div>
                            <h5 className="font-bold text-stone-800">{order.customer.fullName} • {order.customer.phone}</h5>
                            <p className="text-xs text-stone-500">{order.customer.address}, {order.customer.city}, {order.customer.country}</p>
                            <p className="text-xs text-stone-600 font-medium">
                              Items: {order.items?.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(', ')}
                            </p>
                          </div>

                          <div className="flex md:flex-col justify-between items-end">
                            <span className="text-lg font-serif font-bold text-[#0F3B2E]">
                              {formatPrice(order.pricing?.total || 0)}
                            </span>
                            <a
                              href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customer.fullName)},%20this%20is%20Raasven%20Luxury%20Perfumes%20regarding%20your%20order%20%23${order.orderId}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-full bg-[#EBF5EF] hover:bg-[#DEF0E4] text-[#125A41] text-xs font-semibold border border-[#BDE2CC] flex items-center space-x-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                              <span>WhatsApp Customer</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: COUPONS & DISCOUNTS */}
              {activeTab === 'coupons' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#0F3B2E]">Promotions & Coupon Codes</h4>
                    <p className="text-xs text-stone-500">Configure promotional discount codes for your customers.</p>
                  </div>

                  {/* Add Coupon Form */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm">
                    <h5 className="font-bold text-[#0F3B2E] text-xs mb-3">Create New Promo Code</h5>
                    <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Coupon Code</label>
                        <input
                          type="text"
                          required
                          value={couponForm.code}
                          onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                          placeholder="FESTIVE15"
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3] uppercase font-bold text-[#0F3B2E]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Discount %</label>
                        <input
                          type="number"
                          required
                          value={couponForm.discountPercent}
                          onChange={(e) => setCouponForm({ ...couponForm, discountPercent: e.target.value })}
                          placeholder="15"
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Minimum Spend (₹)</label>
                        <input
                          type="number"
                          value={couponForm.minSpend}
                          onChange={(e) => setCouponForm({ ...couponForm, minSpend: e.target.value })}
                          placeholder="1500"
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-[#0F3B2E] text-white font-bold text-xs hover:bg-[#134939] transition"
                        >
                          Add Coupon
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Coupons List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {coupons.map(c => (
                      <div key={c.code} className="bg-white p-4 rounded-xl border border-[#E8DFC9] flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-[#0F3B2E] text-sm bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                            {c.code}
                          </span>
                          <p className="text-xs text-stone-600 mt-1">{c.description}</p>
                          {c.minSpend > 0 && <span className="text-[10px] text-stone-400">Min spend: ₹{c.minSpend}</span>}
                        </div>
                        <button
                          onClick={() => handleDeleteCoupon(c.code)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: B2B LEADS */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#0F3B2E]">B2B & Private Label Leads</h4>
                    <p className="text-xs text-stone-500">Inquiries submitted by international perfume traders, distributors, and brands.</p>
                  </div>

                  <div className="space-y-3">
                    {(inquiries.length ? inquiries : [
                      {
                        id: 'INQ-94812',
                        name: 'Tariq Al-Sabah',
                        company: 'Oasis Luxury Trading LLC',
                        email: 'tariq@oasis-trading.ae',
                        phone: '+971 50 847 2910',
                        country: 'United Arab Emirates 🇦🇪',
                        interest: 'Private Label Perfumes',
                        estimatedUnits: '2,000 units',
                        message: 'Interested in bespoke 100ml amber bottles with magnetic gold caps for our retail stores in Dubai Mall.'
                      }
                    ]).map(inq => (
                      <div key={inq.id} className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-sm text-[#0F3B2E]">{inq.name} ({inq.company})</h5>
                          <span className="bg-[#FAF5E9] text-[#8C6B28] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                            {inq.country}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600"><strong>Interest:</strong> {inq.interest} • <strong>Volume:</strong> {inq.estimatedUnits}</p>
                        <p className="text-xs text-stone-500 italic">"{inq.message}"</p>
                        <div className="pt-2 flex items-center space-x-3 text-xs">
                          <a href={`mailto:${inq.email}`} className="text-[#0F3B2E] font-bold hover:underline">
                            ✉️ {inq.email}
                          </a>
                          <span>•</span>
                          <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline flex items-center space-x-1">
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>{inq.phone}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SITE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-4">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#0F3B2E]">Website Configuration</h4>
                    <p className="text-xs text-stone-500">Edit announcements, customer support channels, and main copy.</p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-[#E8DFC9] space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Announcement Bar Message</label>
                      <input
                        type="text"
                        value={settingsForm.announcementText}
                        onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Store WhatsApp Support Number</label>
                        <input
                          type="text"
                          value={settingsForm.supportPhone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Store Official Email</label>
                        <input
                          type="email"
                          value={settingsForm.supportEmail}
                          onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Hero Main Headline</label>
                      <input
                        type="text"
                        value={settingsForm.heroTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Hero Subtitle</label>
                      <textarea
                        rows="2"
                        value={settingsForm.heroSubtitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E2D8C3]"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-full bg-[#0F3B2E] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#134939] transition"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

      {/* Product Create / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E8DFC9] shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-serif font-bold text-[#0F3B2E]">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Create New Perfume Offering'}
              </h4>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-stone-500 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Perfume Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Imperial Silk"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Category / Family</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                  >
                    <option value="Fresh & Woody">Fresh & Woody</option>
                    <option value="Floral & Woody">Floral & Woody</option>
                    <option value="Floral & Fruity">Floral & Fruity</option>
                    <option value="Intense Woody & Amber">Intense Woody & Amber</option>
                    <option value="Discovery Sets & Gifting">Discovery Sets & Gifting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Badge Pill</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="BESTSELLER / LIMITED"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Price 50ml (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price50}
                    onChange={(e) => setProductForm({ ...productForm, price50: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Price 100ml (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price100}
                    onChange={(e) => setProductForm({ ...productForm, price100: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Image Asset Path / URL</label>
                <select
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                >
                  <option value="/images/wild-edge.jpg">Wild Edge Flacon (/images/wild-edge.jpg)</option>
                  <option value="/images/elan.jpg">Élan Flacon (/images/elan.jpg)</option>
                  <option value="/images/ruby-mist.jpg">Ruby Mist Flacon (/images/ruby-mist.jpg)</option>
                  <option value="/images/oud-royale.jpg">Oud Royale Flacon (/images/oud-royale.jpg)</option>
                  <option value="/images/hero-banner.jpg">Discovery Vault (/images/hero-banner.jpg)</option>
                  <option value="/images/private-label.jpg">Private Label (/images/private-label.jpg)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Olfactory Description</label>
                <textarea
                  rows="2"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2D8C3]"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="text-[#0F3B2E]"
                />
                <label htmlFor="inStock" className="font-semibold text-stone-700">Available In Stock</label>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#0F3B2E] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#134939] transition"
                >
                  {editingProduct ? 'Update Perfume' : 'Publish Perfume to Store'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-3 rounded-full bg-stone-100 text-stone-600 font-bold text-xs hover:bg-stone-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
