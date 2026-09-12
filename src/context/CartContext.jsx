import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "flovr-cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      console.log("Cart loaded from localStorage:", savedCart);

      if (!savedCart) {
        return [];
      }

      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      console.log("Saving cart:", cartItems);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // Add product
  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.stock),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item,
      ),
    );
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, 1), item.stock),
            }
          : item,
      ),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
