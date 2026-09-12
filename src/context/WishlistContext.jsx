import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = "flovr-wishlist";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        WISHLIST_STORAGE_KEY
      );

      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  });

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlistItems]);

  // Add product
  const addToWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  // Remove product
  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Wishlist count
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}