// src/components/ProductCard/ProductCard.jsx

import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  Heart,
  Eye,
  Star,
  ShoppingBag,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

/* =========================================================
   HELPERS
========================================================= */

function getVariantName(variant) {
  return (
    variant?.value ||
    variant?.name ||
    variant?.title ||
    "Variant"
  );
}

function getSubVariantName(subVariant) {
  return (
    subVariant?.value ||
    subVariant?.name ||
    subVariant?.title ||
    "Option"
  );
}

function getSubVariants(variant) {
  if (Array.isArray(variant?.subVariants)) {
    return variant.subVariants;
  }

  return [];
}

/*
 * Convert common color names into actual colors.
 *
 * If your variant has:
 *
 * { value: "Blue" }
 *
 * this will automatically create a blue
 * circular option.
 */

function getColorValue(value) {
  const color = String(value || "").trim().toLowerCase();

  const colors = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    orange: "#f97316",
    purple: "#a855f7",
    pink: "#ec4899",
    black: "#111111",
    white: "#ffffff",
    grey: "#6b7280",
    gray: "#6b7280",
    brown: "#8b5e3c",
    beige: "#d6c2a8",
    cream: "#f5ead8",
    navy: "#1e3a5f",
    maroon: "#7f1d1d",
    gold: "#d4af37",
    silver: "#c0c0c0",
    teal: "#14b8a6",
    sky: "#38bdf8",
    lavender: "#c4b5fd",
  };

  return colors[color] || "#d6c8bb";
}

/*
 * Check whether a variant looks like a color.
 *
 * We keep this flexible because your admin
 * variant generator can create different
 * variant names.
 */

function isColorVariant(variant) {
  const value = getVariantName(variant).toLowerCase();

  return [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "black",
    "white",
    "grey",
    "gray",
    "brown",
    "beige",
    "cream",
    "navy",
    "maroon",
    "gold",
    "silver",
    "teal",
    "sky",
    "lavender",
  ].some((color) => value.includes(color));
}

/*
 * Check if a sub variant is size-like.
 */

function isSizeOption(value) {
  const text = String(value || "").trim().toLowerCase();

  return [
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "small",
    "medium",
    "large",
    "extra large",
  ].includes(text);
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product }) {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    addToCart,
    cartItems = [],
    updateQuantity,
    removeFromCart,
  } = useCart();

  /* =======================================================
     PRODUCT ID
  ======================================================= */

  const productId =
    product.productId ??
    product.id;

  /* =======================================================
     VARIANTS
  ======================================================= */

  const variants = useMemo(() => {
    return Array.isArray(product?.variants)
      ? product.variants
      : [];
  }, [product]);

  const hasVariants =
    product?.hasVariants === true ||
    variants.length > 0;

  /* =======================================================
     SELECTED MAIN VARIANT
  ======================================================= */

  const [selectedVariantId, setSelectedVariantId] =
    useState(
      variants.length > 0
        ? variants[0]?.id
        : null,
    );

  /* =======================================================
     SELECTED SUB VARIANT
  ======================================================= */

  const [selectedSubVariantId, setSelectedSubVariantId] =
    useState(null);

  /* =======================================================
     RESET WHEN PRODUCT CHANGES
  ======================================================= */

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariantId(null);
      setSelectedSubVariantId(null);
      return;
    }

    const firstVariant = variants[0];

    setSelectedVariantId(firstVariant?.id);

    const subVariants =
      getSubVariants(firstVariant);

    setSelectedSubVariantId(
      subVariants.length
        ? subVariants[0]?.id
        : null,
    );
  }, [product?.id, variants]);

  /* =======================================================
     ACTIVE VARIANT
  ======================================================= */

  const activeVariant =
    variants.find(
      (variant) =>
        String(variant.id) ===
        String(selectedVariantId),
    ) ||
    variants[0] ||
    null;

  /* =======================================================
     SUB VARIANTS
  ======================================================= */

  const subVariants =
    getSubVariants(activeVariant);

  /* =======================================================
     ACTIVE SUB VARIANT
  ======================================================= */

  const activeSubVariant =
    subVariants.find(
      (subVariant) =>
        String(subVariant.id) ===
        String(selectedSubVariantId),
    ) ||
    subVariants[0] ||
    null;

  /* =======================================================
     CURRENT ITEM
  ======================================================= */

  const currentItem =
    activeSubVariant ||
    activeVariant ||
    product;

  /* =======================================================
     CURRENT PRICE
  ======================================================= */

  const currentPrice =
    Number(currentItem?.price) ||
    Number(product?.price) ||
    0;

  /* =======================================================
     ORIGINAL PRICE
  ======================================================= */

  const currentOriginalPrice =
    Number(currentItem?.originalPrice) ||
    Number(product?.originalPrice) ||
    0;

  /* =======================================================
     DISCOUNT
  ======================================================= */

  const currentDiscount =
    Number(currentItem?.discount) ||
    Number(product?.discount) ||
    0;

  /* =======================================================
     STOCK
  ======================================================= */

  const currentStock =
    currentItem?.stock !== undefined &&
    currentItem?.stock !== null
      ? Number(currentItem.stock) || 0
      : Number(product?.stock) || 0;

  /* =======================================================
     IMAGE
  ======================================================= */

  const currentImage =
    activeSubVariant?.image ||
    activeSubVariant?.images?.[0] ||
    activeVariant?.image ||
    activeVariant?.images?.[0] ||
    product?.image;

  /* =======================================================
     CART ITEM ID
  ======================================================= */

  const cartItemId = [
    product.id,
    activeVariant?.id || "",
    activeSubVariant?.id || "",
  ]
    .filter(Boolean)
    .join("-");

  /* =======================================================
     FIND CURRENT CART ITEM
  ======================================================= */

  const cartItem = useMemo(() => {
    return cartItems.find((item) => {
      /*
       * New variant-aware cart items.
       */

      if (item.cartItemId) {
        return (
          String(item.cartItemId) ===
          String(cartItemId)
        );
      }

      /*
       * Fallback for old normal products.
       */

      return (
        String(item.productId ?? item.id) ===
          String(productId) &&
        !item.selectedVariant &&
        !item.selectedSubVariant
      );
    });
  }, [
    cartItems,
    cartItemId,
    productId,
  ]);

  /* =======================================================
     CART QUANTITY
  ======================================================= */

  const cartQuantity =
    Number(cartItem?.quantity) || 0;

  /* =======================================================
     ADD TO CART OBJECT
  ======================================================= */

  const createCartProduct = () => {
    return {
      ...product,

      id: product.id,

      productId: product.id,

      cartItemId,

      selectedVariant: activeVariant
        ? {
            id: activeVariant.id,

            name: getVariantName(
              activeVariant,
            ),

            value:
              activeVariant.value ||
              activeVariant.name ||
              "",
          }
        : null,

      selectedSubVariant: activeSubVariant
        ? {
            id: activeSubVariant.id,

            name: getSubVariantName(
              activeSubVariant,
            ),

            value:
              activeSubVariant.value ||
              activeSubVariant.name ||
              "",
          }
        : null,

      price: currentPrice,

      originalPrice:
        currentOriginalPrice,

      discount:
        currentDiscount,

      stock: currentStock,

      sku:
        activeSubVariant?.sku ||
        activeVariant?.sku ||
        product.sku ||
        "",

      image:
        currentImage ||
        product.image,

      images:
        activeSubVariant?.images ||
        activeVariant?.images ||
        product.images ||
        [],
    };
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (currentStock <= 0) {
      return;
    }

    const cartProduct =
      createCartProduct();

    addToCart(
      cartProduct,
      1,
    );
  };

  /* =======================================================
     INCREASE CART
  ======================================================= */

  const handleIncrease = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!cartItem) {
      handleAddToCart(event);
      return;
    }

    if (cartQuantity >= currentStock) {
      return;
    }

    if (typeof updateQuantity === "function") {
      updateQuantity(
        cartItem.cartItemId ||
          cartItem.id,
        cartQuantity + 1,
      );
    }
  };

  /* =======================================================
     DECREASE CART
  ======================================================= */

  const handleDecrease = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!cartItem) {
      return;
    }

    /*
     * When quantity is 1:
     *
     * remove product completely.
     *
     * Then button becomes:
     *
     * Add to Cart
     */

    if (cartQuantity <= 1) {
      if (
        typeof removeFromCart ===
        "function"
      ) {
        removeFromCart(
          cartItem.cartItemId ||
            cartItem.id,
        );
      }

      return;
    }

    if (typeof updateQuantity === "function") {
      updateQuantity(
        cartItem.cartItemId ||
          cartItem.id,
        cartQuantity - 1,
      );
    }
  };

  /* =======================================================
     VARIANT CHANGE
  ======================================================= */

  const handleVariantChange = (
    event,
    variant,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedVariantId(
      variant.id,
    );

    const nextSubVariants =
      getSubVariants(variant);

    setSelectedSubVariantId(
      nextSubVariants.length
        ? nextSubVariants[0]?.id
        : null,
    );
  };

  /* =======================================================
     SUB VARIANT CHANGE
  ======================================================= */

  const handleSubVariantChange = (
    event,
    subVariant,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const stock =
      Number(subVariant?.stock) || 0;

    if (stock <= 0) {
      return;
    }

    setSelectedSubVariantId(
      subVariant.id,
    );
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  /* =======================================================
     VARIANT DISPLAY
  ======================================================= */

  const mainVariantIsColor =
    variants.length > 0 &&
    variants.every(isColorVariant);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative aspect-square overflow-hidden bg-[#EDE3D7]">

        <Link
          to={`/product/${productId}`}
        >
          <img
            src={currentImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* =================================================
            BADGES
        ================================================= */}

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">

          {product.isNew && (
            <span className="rounded-full bg-[#4A3428] px-2.5 py-1 text-[9px] font-semibold text-white shadow-sm md:text-[10px]">
              New
            </span>
          )}

          {product.isBestSeller && (
            <span className="rounded-full bg-[#A86643] px-2.5 py-1 text-[9px] font-semibold text-white shadow-sm md:text-[10px]">
              Best Seller
            </span>
          )}

        </div>

       

        {/* =================================================
            WISHLIST
        ================================================= */}

        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition ${
            isInWishlist(product.id)
              ? "bg-[#A86643] text-white"
              : "bg-white/90 text-[#4A3428] hover:bg-[#4A3428] hover:text-white"
          }`}
        >
          <Heart
            size={17}
            fill={
              isInWishlist(product.id)
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* =================================================
            VIEW PRODUCT
        ================================================= */}

        <Link
          to={`/product/${productId}`}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-14 items-center gap-2 rounded-full bg-[#4A3428] px-5 py-2.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#A86643]"
        >
          <Eye size={15} />
          View Product
        </Link>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="px-4 py-3">

        {/* =================================================
            CATEGORY
        ================================================= */}
        <div className="flex justify-between items-center"> 
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#75675D] md:text-xs">
          {product.category}
        </div>

         {/* =================================================
            RATING BADGE
        ================================================= */}

        <div className=" flex items-center gap-1 rounded-full  px-2.5 py-1.5 shadow-md backdrop-blur">

          <Star
            size={13}
            fill="currentColor"
            className="text-[#A86643]"
          />

          <span className="text-[11px] font-semibold text-[#4A3428]">
            {product.rating || 0}
          </span>

        </div>
        </div>

        {/* =================================================
            PRODUCT NAME
        ================================================= */}
      <div className=" min-h-[90px] ">
        <Link
          to={`/product/${productId}`}
        >
          <h3 className="text-base font-semibold text-[#4A3428] transition-colors hover:text-[#A86643]">
            {product.name}
          </h3>
        </Link>

        {/* =================================================
            VARIANT OPTIONS
        ================================================= */}

        {hasVariants &&
          variants.length > 0 && (
            <div className="mt-2 space-y-2">

              {/* ================================
                  MAIN VARIANT
              ================================= */}

              <div className="flex items-center gap-2">

                <span className="shrink-0 text-[10px] font-medium text-[#75675D]">
                  {mainVariantIsColor
                    ? "Color:"
                    : "Option:"}
                </span>

                <div className="flex flex-wrap items-center gap-1.5">

                  {variants.map(
                    (variant) => {
                      const active =
                        String(
                          activeVariant?.id,
                        ) ===
                        String(
                          variant.id,
                        );

                      const label =
                        getVariantName(
                          variant,
                        );

                      /*
                       * COLOR STYLE
                       */

                      if (
                        mainVariantIsColor
                      ) {
                        return (
                          <button
                            key={
                              variant.id
                            }
                            type="button"
                            title={
                              label
                            }
                            onClick={(
                              event,
                            ) =>
                              handleVariantChange(
                                event,
                                variant,
                              )
                            }
                            className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition ${
                              active
                                ? "border-[#4A3428] ring-2 ring-[#D6AE8C] ring-offset-1"
                                : "border-[#D9CBBE] hover:border-[#A86643]"
                            }`}
                          >
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/10"
                              style={{
                                backgroundColor:
                                  getColorValue(
                                    label,
                                  ),
                              }}
                            />

                            {active && (
                              <Check
                                size={
                                  9
                                }
                                className="absolute text-white drop-shadow"
                              />
                            )}
                          </button>
                        );
                      }

                      /*
                       * NORMAL OPTION
                       */

                      return (
                        <button
                          key={
                            variant.id
                          }
                          type="button"
                          onClick={(
                            event,
                          ) =>
                            handleVariantChange(
                              event,
                              variant,
                            )
                          }
                          className={`rounded-md border px-2 py-1 text-[10px] font-medium transition ${
                            active
                              ? "border-[#A86643] bg-[#A86643] text-white"
                              : "border-[#D9CBBE] bg-white text-[#4A3428] hover:border-[#A86643]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    },
                  )}

                </div>
              </div>

              {/* ================================
                  SUB VARIANT
              ================================= */}

              {subVariants.length >
                0 && (
                <div className="flex items-center gap-2">

                  <span className="shrink-0 text-[10px] font-medium text-[#75675D]">
                    Size:
                  </span>

                  <div className="flex flex-wrap gap-1.5">

                    {subVariants.map(
                      (
                        subVariant,
                      ) => {
                        const active =
                          String(
                            activeSubVariant?.id,
                          ) ===
                          String(
                            subVariant.id,
                          );

                        const stock =
                          Number(
                            subVariant.stock,
                          ) || 0;

                        const label =
                          getSubVariantName(
                            subVariant,
                          );

                        return (
                          <button
                            key={
                              subVariant.id
                            }
                            type="button"
                            disabled={
                              stock <=
                              0
                            }
                            onClick={(
                              event,
                            ) =>
                              handleSubVariantChange(
                                event,
                                subVariant,
                              )
                            }
                            className={`rounded-md border px-2 py-1 text-[10px] font-medium transition ${
                              active
                                ? "border-[#4A3428] bg-[#4A3428] text-white"
                                : stock <=
                                    0
                                  ? "cursor-not-allowed border-[#E5DCD3] bg-[#F7F1E8] text-[#B8ACA3]"
                                  : "border-[#D9CBBE] bg-white text-[#4A3428] hover:border-[#A86643]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      },
                    )}

                  </div>

                </div>
              )}

            </div>
          )}
          </div>

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="mt-2 flex flex-wrap items-center gap-2">

          <span className="text-lg font-bold text-[#4A3428]">
            ₹
            {currentPrice.toLocaleString(
              "en-IN",
            )}
          </span>

          {currentOriginalPrice >
            currentPrice && (
            <span className="text-xs text-[#75675D] line-through md:text-sm">
              ₹
              {currentOriginalPrice.toLocaleString(
                "en-IN",
              )}
            </span>
          )}

          {currentDiscount > 0 && (
            <span className="rounded-full bg-[#F0F8EE] px-1.5 py-0.5 text-[9px] font-bold text-green-600 md:text-xs">
              {currentDiscount}% OFF
            </span>
          )}

        </div>

        {/* =================================================
            ADD TO CART / COUNTER
        ================================================= */}

        {currentStock <= 0 ? (
          <button
            type="button"
            disabled
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D9CBBE] px-4 text-xs font-semibold text-[#75675D] md:text-sm"
          >
            Out of Stock
          </button>
        ) : cartQuantity <= 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-4 text-xs font-semibold text-white transition hover:bg-[#A86643] md:text-sm"
          >
            <ShoppingBag size={17} />
            Add to Cart
          </button>
        ) : (
          <div className="mt-2 flex h-11 w-full items-center overflow-hidden rounded-xl bg-[#4A3428] text-white">

            {/* MINUS */}

            <button
              type="button"
              onClick={
                handleDecrease
              }
              className="flex h-full w-12 items-center justify-center transition hover:bg-[#A86643]"
              aria-label="Decrease quantity"
            >
              <Minus size={17} />
            </button>

            {/* QUANTITY */}

            <div className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold">
              <ShoppingBag
                size={16}
              />

              <span>
                {cartQuantity}
              </span>
            </div>

            {/* PLUS */}

            <button
              type="button"
              onClick={
                handleIncrease
              }
              disabled={
                cartQuantity >=
                currentStock
              }
              className="flex h-full w-12 items-center justify-center transition hover:bg-[#A86643] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus size={17} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProductCard;