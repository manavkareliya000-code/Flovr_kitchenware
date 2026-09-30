// src/context/CartContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "flovr-cart";

/* =========================================================
   GET CART ITEM ID
========================================================= */

function getCartItemId(product) {
  /*
   * If ProductDetail already generated a cartItemId,
   * use that.
   *
   * Example:
   *
   * 3-small
   * 3-medium
   * 3-large
   *
   * These become separate cart items.
   */
  if (product?.cartItemId) {
    return String(product.cartItemId);
  }

  /*
   * Parent product ID
   */
  const productId =
    product?.productId ??
    product?.id;

  /*
   * Selected main variant
   */
  const variantId =
    product?.selectedVariant?.id || "";

  /*
   * Selected sub variant
   */
  const subVariantId =
    product?.selectedSubVariant?.id || "";

  /*
   * Create unique ID
   *
   * Product only:
   * 1
   *
   * Product + variant:
   * 3-small
   *
   * Product + variant + sub variant:
   * 2-black-500ml
   */
  return [
    productId,
    variantId,
    subVariantId,
  ]
    .filter(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== "",
    )
    .join("-");
}

/* =========================================================
   NORMALIZE QUANTITY
========================================================= */

function normalizeQuantity(
  quantity,
  stock,
) {
  let value =
    Number(quantity);

  /*
   * Invalid quantity
   */
  if (!Number.isFinite(value)) {
    value = 1;
  }

  /*
   * Quantity cannot be below 1
   */
  value = Math.max(
    Math.floor(value),
    1,
  );

  /*
   * If stock exists,
   * quantity cannot exceed stock.
   */
  const availableStock =
    Number(stock);

  if (
    Number.isFinite(
      availableStock,
    ) &&
    availableStock > 0
  ) {
    value = Math.min(
      value,
      availableStock,
    );
  }

  return value;
}

/* =========================================================
   PROVIDER
========================================================= */

export function CartProvider({
  children,
}) {
  /* =======================================================
     LOAD CART
  ======================================================= */

  const [cartItems, setCartItems] =
    useState(() => {
      try {
        const savedCart =
          localStorage.getItem(
            CART_STORAGE_KEY,
          );

        if (!savedCart) {
          return [];
        }

        const parsedCart =
          JSON.parse(savedCart);

        if (
          !Array.isArray(
            parsedCart,
          )
        ) {
          return [];
        }

        /*
         * Convert old cart data
         * into the new structure.
         */
        return parsedCart
          .map((item) => {
            const cartItemId =
              getCartItemId(item);

            const stock =
              Number(item?.stock) || 0;

            const quantity =
              normalizeQuantity(
                item?.quantity,
                stock,
              );

            return {
              ...item,

              /*
               * Always keep a unique
               * cart item ID.
               */
              cartItemId,

              /*
               * Keep quantity numeric.
               */
              quantity,
            };
          })
          .filter(
            (item) =>
              item.cartItemId,
          );
      } catch (error) {
        console.error(
          "Error loading cart:",
          error,
        );

        return [];
      }
    });

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
          cartItems,
        ),
      );
    } catch (error) {
      console.error(
        "Error saving cart:",
        error,
      );
    }
  }, [cartItems]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (
    product,
    quantity = 1,
  ) => {
    setCartItems(
      (currentItems) => {
        /*
         * =================================================
         * UNIQUE CART ITEM ID
         * =================================================
         */
        const cartItemId =
          getCartItemId(product);

        /*
         * =================================================
         * PRODUCT STOCK
         * =================================================
         */
        const stock =
          Number(product?.stock) || 0;

        /*
         * =================================================
         * REQUESTED QUANTITY
         * =================================================
         */
        const requestedQuantity =
          normalizeQuantity(
            quantity,
            stock,
          );

        /*
         * =================================================
         * FIND EXISTING ITEM
         * =================================================
         *
         * IMPORTANT:
         *
         * We DO NOT use:
         *
         * item.id === product.id
         *
         * because:
         *
         * Product 3 Small
         * Product 3 Medium
         *
         * have the same parent product ID.
         *
         * Instead:
         *
         * item.cartItemId
         */
        const existingItem =
          currentItems.find(
            (item) =>
              String(
                item.cartItemId,
              ) ===
              String(
                cartItemId,
              ),
          );

        /* =================================================
           EXISTING ITEM
        ================================================= */

        if (existingItem) {
          const existingStock =
            Number(
              existingItem.stock,
            ) || stock;

          const oldQuantity =
            Number(
              existingItem.quantity,
            ) || 0;

          /*
           * Add requested quantity
           */
          const requestedTotal =
            oldQuantity +
            requestedQuantity;

          /*
           * Respect stock
           */
          const newQuantity =
            existingStock > 0
              ? Math.min(
                  requestedTotal,
                  existingStock,
                )
              : requestedTotal;

          return currentItems.map(
            (item) => {
              if (
                String(
                  item.cartItemId,
                ) !==
                String(
                  cartItemId,
                )
              ) {
                return item;
              }

              return {
                ...item,

                quantity:
                  newQuantity,
              };
            },
          );
        }

        /* =================================================
           NEW ITEM
        ================================================= */

        const newItem = {
          ...product,

          /*
           * VERY IMPORTANT
           *
           * Store unique cart ID.
           */
          cartItemId,

          /*
           * Store numeric quantity.
           */
          quantity:
            requestedQuantity,
        };

        /*
         * Add new item
         */
        return [
          ...currentItems,
          newItem,
        ];
      },
    );
  };

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (
    cartItemId,
  ) => {
    setCartItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            String(
              item.cartItemId,
            ) !==
            String(
              cartItemId,
            ),
        ),
    );
  };

  /* =======================================================
     INCREASE QUANTITY
  ======================================================= */

  const increaseQuantity = (
    cartItemId,
  ) => {
    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            /*
             * Not selected item
             */
            if (
              String(
                item.cartItemId,
              ) !==
              String(
                cartItemId,
              )
            ) {
              return item;
            }

            const currentQuantity =
              Number(
                item.quantity,
              ) || 1;

            const stock =
              Number(
                item.stock,
              ) || 0;

            /*
             * If stock exists,
             * don't exceed stock.
             */
            const newQuantity =
              stock > 0
                ? Math.min(
                    currentQuantity +
                      1,
                    stock,
                  )
                : currentQuantity +
                  1;

            return {
              ...item,

              quantity:
                newQuantity,
            };
          },
        ),
    );
  };

  /* =======================================================
     DECREASE QUANTITY
  ======================================================= */

  const decreaseQuantity = (
    cartItemId,
  ) => {
    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            /*
             * Not selected item
             */
            if (
              String(
                item.cartItemId,
              ) !==
              String(
                cartItemId,
              )
            ) {
              return item;
            }

            const currentQuantity =
              Number(
                item.quantity,
              ) || 1;

            /*
             * Never go below 1.
             */
            const newQuantity =
              Math.max(
                currentQuantity -
                  1,
                1,
              );

            return {
              ...item,

              quantity:
                newQuantity,
            };
          },
        ),
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (
    cartItemId,
    quantity,
  ) => {
    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            /*
             * Not selected item
             */
            if (
              String(
                item.cartItemId,
              ) !==
              String(
                cartItemId,
              )
            ) {
              return item;
            }

            const newQuantity =
              normalizeQuantity(
                quantity,
                item.stock,
              );

            return {
              ...item,

              quantity:
                newQuantity,
            };
          },
        ),
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount =
    cartItems.reduce(
      (
        total,
        item,
      ) =>
        total +
        (Number(
          item.quantity,
        ) || 0),
      0,
    );

  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal =
    cartItems.reduce(
      (
        total,
        item,
      ) => {
        const price =
          Number(
            item.price,
          ) || 0;

        const quantity =
          Number(
            item.quantity,
          ) || 0;

        return (
          total +
          price *
            quantity
        );
      },
      0,
    );

  /* =======================================================
     CART SAVINGS
  ======================================================= */

  const cartSavings =
    cartItems.reduce(
      (
        total,
        item,
      ) => {
        const originalPrice =
          Number(
            item.originalPrice,
          ) || 0;

        const price =
          Number(
            item.price,
          ) || 0;

        const quantity =
          Number(
            item.quantity,
          ) || 0;

        if (
          originalPrice >
          price
        ) {
          return (
            total +
            (
              originalPrice -
              price
            ) *
              quantity
          );
        }

        return total;
      },
      0,
    );

  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <CartContext.Provider
      value={{
        /*
         * Cart data
         */
        cartItems,

        /*
         * Cart actions
         */
        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        updateQuantity,

        clearCart,

        /*
         * Cart calculations
         */
        cartCount,

        cartTotal,

        cartSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================================================
   USE CART HOOK
========================================================= */

export function useCart() {
  const context =
    useContext(
      CartContext,
    );

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}