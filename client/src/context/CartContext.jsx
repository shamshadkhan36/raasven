import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencies } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
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

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('raasven_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('raasven_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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
  
  // Free shipping threshold ₹1,999
  const freeShippingThreshold = 1999;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Discount Calculation
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
      // Offline fallback
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
