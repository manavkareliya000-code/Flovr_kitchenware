// src/pages/Cart/Cart.jsx

import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Package,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

/* =========================================================
   CART PAGE
========================================================= */

function Cart() {
  const navigate =
    useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
    cartSavings,
  } = useCart();

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (
    price,
  ) => {
    return Number(
      price || 0,
    ).toLocaleString(
      "en-IN",
    );
  };

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (
    !cartItems ||
    cartItems.length ===
      0
  ) {
    return (
      <div className="min-h-[70vh] bg-[#F8F1E7] px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#EFE3D4]">
            <ShoppingBag
              size={40}
              className="text-[#A86643]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#4A3428]">
            Your Cart is
            Empty
          </h1>

          <p className="mt-3 text-[#75675D]">
            Looks like you
            haven't added
            anything to your
            cart yet.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 font-semibold text-white transition hover:bg-[#A86643]"
          >
            <ShoppingBag
              size={18}
            />
            Continue
            Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* =======================================================
     CHECKOUT
  ======================================================= */

  const handleCheckout =
    () => {
      navigate(
        "/checkout",
      );
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F8F1E7]">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#75675D] transition hover:text-[#A86643]"
        >
          <ArrowLeft
            size={18}
          />
          Continue
          Shopping
        </Link>
      </div>

      {/* =================================================
          TITLE
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A86643]">
              FLOVR
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#4A3428] sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-[#75675D]">
              {cartCount}{" "}
              {cartCount ===
              1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={
              clearCart
            }
            className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-auto"
          >
            <Trash2
              size={16}
            />
            Clear Cart
          </button>
        </div>
      </div>

      {/* =================================================
          CART CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* =================================================
              ITEMS
          ================================================= */}

          <div className="space-y-4">
            {cartItems.map(
              (item) => {
                /*
                 * =================================================
                 * SELECTED VARIANT
                 * =================================================
                 */

                const variant =
                  item.selectedVariant;

                /*
                 * =================================================
                 * SELECTED SUB VARIANT
                 * =================================================
                 */

                const subVariant =
                  item.selectedSubVariant;

                /*
                 * =================================================
                 * PRODUCT URL
                 * =================================================
                 *
                 * IMPORTANT:
                 *
                 * We send selected variant
                 * IDs in URL.
                 *
                 * Example:
                 *
                 * /product/2?variant=blue&subVariant=blue-500ml
                 */

                const productUrl =
                  `/product/${item.productId || item.id}` +
                  `?variant=${encodeURIComponent(
                    variant?.id ||
                      "",
                  )}` +
                  `&subVariant=${encodeURIComponent(
                    subVariant?.id ||
                      "",
                  )}`;

                const quantity =
                  Number(
                    item.quantity,
                  ) || 1;

                const stock =
                  Number(
                    item.stock,
                  ) || 0;

                const price =
                  Number(
                    item.price,
                  ) || 0;

                const originalPrice =
                  Number(
                    item.originalPrice,
                  ) || 0;

                const itemTotal =
                  price *
                  quantity;

                return (
                  <div
                    key={
                      item.cartItemId
                    }
                    className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-3 shadow-sm transition hover:shadow-md  "
                  >
                    <div className="flex gap-4">
                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <Link
                        to={
                          productUrl
                        }
                        className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#EDE3D7] sm:h-36 sm:w-36"
                      >
                        <img
                          src={
                            item.image ||
                            item.images?.[0]
                          }
                          alt={
                            item.name
                          }
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                      </Link>

                      {/* =================================================
                          PRODUCT INFO
                      ================================================= */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A86643]">
                              {
                                item.category
                              }
                            </p>

                            <Link
                              to={
                                productUrl
                              }
                            >
                              <h2 className="mt-1 line-clamp-2 text-base font-bold text-[#4A3428] transition hover:text-[#A86643] sm:text-lg">
                                {
                                  item.name
                                }
                              </h2>
                            </Link>
                          </div>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                item.cartItemId,
                              )
                            }
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#75675D] transition hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove product"
                          >
                            <Trash2
                              size={
                                17
                              }
                            />
                          </button>
                        </div>

                        {/* =================================================
                            VARIANTS
                        ================================================= */}

                        {(variant ||
                          subVariant) && (
                          <div className="mt-0.5 flex flex-wrap gap-2">
                            {variant && (
                              <span className="rounded-lg bg-[#F8F1E7] px-2.5 py-1 text-xs font-medium text-[#4A3428]">
                                {
                                  variant.name
                                }
                                {variant.value &&
                                variant.name !==
                                  variant.value
                                  ? `: ${variant.value}`
                                  : ""}
                              </span>
                            )}

                            {subVariant && (
                              <span className="rounded-lg bg-[#F8F1E7] px-2.5 py-1 text-xs font-medium text-[#4A3428]">
                                {
                                  subVariant.name
                                }
                                {subVariant.value &&
                                subVariant.name !==
                                  subVariant.value
                                  ? `: ${subVariant.value}`
                                  : ""}
                              </span>
                            )}
                          </div>
                        )}

                        {/* =================================================
                            SKU
                        ================================================= */}

                        {item.sku && (
                          <p className="mt-2 text-[11px] text-[#75675D]">
                            SKU:{" "}
                            {
                              item.sku
                            }
                          </p>
                        )}

                        {/* =================================================
                            PRICE
                        ================================================= */}

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-lg font-bold text-[#4A3428]">
                            ₹
                            {formatPrice(
                              price,
                            )}
                          </span>

                          {originalPrice >
                            price && (
                            <span className="text-xs text-[#75675D] line-through">
                              ₹
                              {formatPrice(
                                originalPrice,
                              )}
                            </span>
                          )}

                          {item.discount >
                            0 && (
                            <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
                              {
                                item.discount
                              }
                              % OFF
                            </span>
                          )}
                          {stock >
                          0 && (
                          <p
                            className={`ml-3 text-xs font-medium ${
                              stock <=
                              5
                                ? "text-red-600"
                                : "text-green-700"
                            }`}
                          >
                            {stock <=
                            5
                              ? `Only ${stock} left`
                              : "In stock"}
                          </p>
                        )}
                        </div>

                        {/* =================================================
                            BOTTOM
                        ================================================= */}

                        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          {/* QUANTITY */}

                          <div className="flex h-10 w-fit items-center rounded-lg border border-[#D9CBBE] bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.cartItemId,
                                )
                              }
                              disabled={
                                quantity <=
                                1
                              }
                              className="flex h-full w-10 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus
                                size={
                                  15
                                }
                              />
                            </button>

                            <span className="w-9 text-center text-sm font-semibold text-[#4A3428]">
                              {
                                quantity
                              }
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.cartItemId,
                                )
                              }
                              disabled={
                                stock >
                                  0 &&
                                quantity >=
                                  stock
                              }
                              className="flex h-full w-10 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus
                                size={
                                  15
                                }
                              />
                            </button>
                          </div>

                          {/* ITEM TOTAL */}

                          <div className="text-left sm:text-right">
                            <p className="text-xs text-[#75675D]">
                              Item
                              Total
                            </p>

                            <p className="text-lg font-bold text-[#4A3428]">
                              ₹
                              {formatPrice(
                                itemTotal,
                              )}
                            </p>
                          </div>
                        </div>

                        {/* =================================================
                            STOCK
                        ================================================= */}

                        
                      </div>
                    </div>

                    {/* =================================================
                        VIEW PRODUCT
                    ================================================= */}

                    {/* <div className="mt-4 border-t border-[#E8DDD3] pt-3">
                      <Link
                        to={
                          productUrl
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A86643] transition hover:text-[#4A3428]"
                      >
                        View product
                        <ArrowRight
                          size={
                            14
                          }
                        />
                      </Link>
                    </div> */}
                  </div>
                );
              },
            )}
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-[#4A3428]">
                Order Summary
              </h2>

              {/* =================================================
                  ITEMS
              ================================================= */}

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#75675D]">
                    Items
                  </span>

                  <span className="font-medium text-[#4A3428]">
                    {
                      cartCount
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#75675D]">
                    Subtotal
                  </span>

                  <span className="font-medium text-[#4A3428]">
                    ₹
                    {formatPrice(
                      cartTotal,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#75675D]">
                    Delivery
                  </span>

                  <span className="font-semibold text-green-700">
                    FREE
                  </span>
                </div>

                {cartSavings >
                  0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#75675D]">
                      You Save
                    </span>

                    <span className="font-semibold text-green-700">
                      ₹
                      {formatPrice(
                        cartSavings,
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="my-5 border-t border-[#D9CBBE]" />

              {/* =================================================
                  TOTAL
              ================================================= */}

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[#4A3428]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#4A3428]">
                  ₹
                  {formatPrice(
                    cartTotal,
                  )}
                </span>
              </div>

              {/* =================================================
                  CHECKOUT
              ================================================= */}

              <button
                type="button"
                onClick={
                  handleCheckout
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 font-semibold text-white transition hover:bg-[#A86643]"
              >
                Proceed to
                Checkout
                <ArrowRight
                  size={18}
                />
              </button>

              {/* =================================================
                  CONTINUE SHOPPING
              ================================================= */}

              <Link
                to="/shop"
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-[#D9CBBE] bg-white px-5 py-3 text-sm font-semibold text-[#4A3428] transition hover:border-[#A86643] hover:text-[#A86643]"
              >
                Continue
                Shopping
              </Link>

              {/* =================================================
                  SECURE INFO
              ================================================= */}

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F8F1E7] p-4">
                <Package
                  size={20}
                  className="mt-0.5 shrink-0 text-[#A86643]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#4A3428]">
                    Secure
                    Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#75675D]">
                    Your selected
                    variants and
                    quantities are
                    saved securely
                    in your cart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;