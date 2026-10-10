import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts as defaultProducts, currencies } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Products dynamic catalog
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('raasven_custom_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Site Settings
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('raasven_site_settings');
      return saved ? JSON.parse(saved) : {
        announcementText: 'Complimentary 10ml Discovery Sample on orders over ₹1,999 • Code: RAASVEN10',
        supportPhone: '+91 98765 43210',
        supportEmail: 'export@kalpanaglobaleximm.com',
        heroTitle: 'The Signature of Your Presence.',
        heroSubtitle: 'Raasven represents the essence of elegance — where Indian sensibility meets modern luxury. Artisanal Extraits de Parfum crafted with 25% French perfume oils.'
      };
    } catch {
      return {
        announcementText: 'Complimentary 10ml Discovery Sample on orders over ₹1,999 • Code: RAASVEN10',
        supportPhone: '+91 98765 43210',
        supportEmail: 'export@kalpanaglobaleximm.com',
        heroTitle: 'The Signature of Your Presence.',
        heroSubtitle: 'Raasven represents the essence of elegance — where Indian sensibility meets modern luxury. Artisanal Extraits de Parfum crafted with 25% French perfume oils.'
      };
    }
  });

  // Admin Session & Route-Based Access (/admin or #admin)
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/admin' || path === '/admin/' || hash === '#admin';
    }
    return false;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('raasven_admin_logged_in') === 'true';
  });

  // Listen for direct URL access to /admin or back/forward navigation
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        setIsAdminOpen(true);
      } else {
        setIsAdminOpen(false);
      }
    };

    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  const openAdmin = () => {
    setIsAdminOpen(true);
    if (typeof window !== 'undefined' && window.location.pathname.toLowerCase() !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/admin/') {
        window.history.pushState(null, '', '/');
      } else if (hash === '#admin') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  // LocalStorage initialization
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('raasven_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('raasven_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [coupon, setCoupon] = useState(null);
  const [orderNotes, setOrderNotes] = useState('');

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch initial products and settings from API if available
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.products?.length) {
          setProducts(data.products);
          localStorage.setItem('raasven_custom_products', JSON.stringify(data.products));
        }
      })
      .catch(() => {});

    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSiteSettings(data.settings);
          localStorage.setItem('raasven_site_settings', JSON.stringify(data.settings));
        }
      })
      .catch(() => {});
  }, []);

  // Persist cart, wishlist, products, and settings
  useEffect(() => {
    localStorage.setItem('raasven_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('raasven_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('raasven_custom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('raasven_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('raasven_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Toast notifier
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Currency Formatter
  const formatPrice = (inrAmount) => {
    const curr = currencies[currency] || currencies.INR;
    const converted = Math.round(inrAmount * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  // Admin CRUD operations
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        showToast(`Added ${newProduct.name} to the store catalog!`);
        return true;
      }
    } catch {}
    // Fallback local update
    const productWithId = {
      ...newProduct,
      id: newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`Added ${newProduct.name} to the store catalog!`);
    return true;
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        showToast(`Updated ${updatedProduct.name}!`);
        return true;
      }
    } catch {}
    // Fallback local update
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    showToast(`Updated ${updatedProduct.name}!`);
    return true;
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        showToast('Product removed from catalog', 'info');
        return true;
      }
    } catch {}
    // Fallback local update
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
    return true;
  };

  const updateSettings = async (newSettings) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (data.success) {
        setSiteSettings(data.settings);
        showToast('Site settings updated successfully!');
        return true;
      }
    } catch {}
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Site settings updated!');
    return true;
  };

  // Add to Cart
  const addToCart = (product, selectedSize = '100ml', quantity = 1) => {
    const size = product.prices[selectedSize] ? selectedSize : Object.keys(product.prices)[0];
    const price = product.prices[size];
    const itemKey = `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.key === itemKey);
      if (existing) {
        return prev.map(item => 
          item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, {
        key: itemKey,
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        size,
        price,
        originalPrice: product.originalPrices?.[size] || Math.round(price * 1.3),
        image: product.image,
        quantity
      }];
    });

    showToast(`Added ${product.name} (${size}) to your bag!`);
  };

  // Remove from Cart
  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.key !== itemKey));
  };

  // Update Quantity
  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart(prev => prev.map(item => item.key === itemKey ? { ...item, quantity } : item));
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // Toggle Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your private wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Calculations
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const freeShippingThreshold = 1999;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discount = 0;
  if (coupon) {
    discount = coupon.discountAmount || 0;
  }

  const shippingFee = (subtotal >= freeShippingThreshold || coupon?.freeShipping || cart.length === 0) ? 0 : 150;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  // Apply Coupon
  const applyCouponCode = async (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a coupon code' };

    try {
      const res = await fetch('/api/cart/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, subtotal })
      });
      const data = await res.json();
      if (data.success) {
        setCoupon(data);
        showToast(`Promo code ${data.code} applied successfully!`);
        return { success: true };
      } else {
        showToast(data.message || 'Invalid coupon code', 'error');
        return { success: false, message: data.message };
      }
    } catch {
      if (clean === 'RAASVEN10') {
        const discountAmount = Math.round(subtotal * 0.1);
        setCoupon({ code: 'RAASVEN10', discountAmount, description: '10% Off Entire Order' });
        showToast('Promo code RAASVEN10 applied (10% off)!');
        return { success: true };
      }
      if (clean === 'ROYAL20' && subtotal >= 3000) {
        const discountAmount = Math.round(subtotal * 0.2);
        setCoupon({ code: 'ROYAL20', discountAmount, description: '20% Off Orders Above ₹3,000' });
        showToast('Promo code ROYAL20 applied (20% off)!');
        return { success: true };
      }
      return { success: false, message: 'Could not validate coupon' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  return (
    <CartContext.Provider value={{
      products,
      setProducts,
      siteSettings,
      updateSettings,
      addProduct,
      updateProduct,
      deleteProduct,
      isAdminOpen,
      setIsAdminOpen,
      openAdmin,
      closeAdmin,
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      cart,
      wishlist,
      currency,
      setCurrency,
      currencies,
      formatPrice,
      totalCount,
      subtotal,
      discount,
      shippingFee,
      finalTotal,
      freeShippingThreshold,
      progressToFreeShipping,
      amountNeededForFreeShipping,
      coupon,
      applyCouponCode,
      removeCoupon,
      orderNotes,
      setOrderNotes,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      quickViewProduct,
      setQuickViewProduct,
      isInquiryOpen,
      setIsInquiryOpen,
      toasts,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
