import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  // Original total
  const totalOriginalPrice = cartItems.reduce(
    (total, item) => total + (item.originalPrice || item.price) * item.quantity,
    0,
  );

  // Total savings
  const totalSavings = totalOriginalPrice - cartTotal;

  // Delivery
  const deliveryCharge = cartTotal >= 499 || cartTotal === 0 ? 0 : 49;

  // Final total
  const finalTotal = cartTotal + deliveryCharge;

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] bg-[#F7F1E8] px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-14 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
            <ShoppingBag size={34} />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[#4A3428]">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#75675D]">
            Looks like you haven't added anything to your cart yet. Discover
            something beautiful for your home.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F1E8] px-3 py-7 sm:px-4 md:px-8 md:py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col justify-between gap-3 md:mb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A86643] md:text-xs">
              Your Selection
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-[#4A3428] md:mt-2 md:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-1 text-xs text-[#75675D] md:mt-2 md:text-sm">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="flex w-fit items-center gap-2 text-xs font-medium text-[#A86643] transition hover:text-[#4A3428] md:text-sm"
          >
            <Trash2 size={15} />
            Clear Cart
          </button>
        </div>

        {/* ================= FREE DELIVERY ================= */}
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] px-3 py-3 md:mb-6 md:px-4 md:py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428] md:h-10 md:w-10">
            <Truck size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#4A3428] md:text-sm">
              {cartTotal >= 499
                ? "You've unlocked FREE delivery!"
                : `Add ₹${(499 - cartTotal).toLocaleString(
                    "en-IN",
                  )} more for FREE delivery`}
            </p>

            <p className="mt-0.5 text-[10px] text-[#75675D] md:text-xs">
              Delivered safely to your doorstep.
            </p>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-6">
          {/* ================= CART ITEMS ================= */}
          <div className="space-y-3 md:space-y-4">
            {cartItems.map((item) => {
              const itemOriginalPrice = item.originalPrice || item.price;

              const itemSavings =
                (itemOriginalPrice - item.price) * item.quantity;

              const itemTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-3 shadow-sm transition hover:shadow-md md:p-5"
                >
                  {/* SAME HORIZONTAL LAYOUT ON MOBILE + DESKTOP */}
                  <div className="flex gap-3 md:gap-4">
                    {/* ================= IMAGE ================= */}
                    <Link
                      to={`/product/${item.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EDE3D7] sm:h-28 sm:w-28 md:h-36 md:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* ================= PRODUCT INFO ================= */}
                    <div className="min-w-0 flex-1">
                      {/* Top */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#A86643] md:text-[10px]">
                            {item.category}
                          </p>

                          <Link to={`/product/${item.id}`}>
                            <h2 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-5 text-[#4A3428] transition hover:text-[#A86643] md:text-lg md:leading-6">
                              {item.name}
                            </h2>
                          </Link>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 text-[#75675D] transition hover:text-red-600"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2
                            size={17}
                            className="md:h-[18px] md:w-[18px]"
                          />
                        </button>
                      </div>

                      {/* ================= PRICE ================= */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 md:gap-2">
                        <span className="text-base font-bold text-[#4A3428] md:text-lg">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        {item.originalPrice && (
                          <span className="text-xs text-[#75675D] line-through md:text-sm">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}

                        {item.discount && (
                          <span className="rounded-full bg-[#EFE3D4] px-2 py-1 text-[9px] font-semibold text-[#A86643] md:text-[10px]">
                            {item.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* ================= BOTTOM ================= */}
                      <div className="mt-3 flex items-center justify-between gap-2 md:mt-5">
                        {/* Quantity */}
                        <div className="flex h-9 items-center rounded-xl border border-[#D9CBBE] bg-[#F7F1E8] md:h-10">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            className="flex h-9 w-8 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:opacity-30 md:h-10 md:w-9"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-7 text-center text-xs font-semibold text-[#4A3428] md:w-8 md:text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            disabled={item.quantity >= item.stock}
                            className="flex h-9 w-8 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:opacity-30 md:h-10 md:w-9"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="min-w-0 text-right">
                          <p className="text-[10px] text-[#75675D] md:text-xs">
                            Item total
                          </p>

                          <p className="text-base font-bold text-[#4A3428] md:text-lg">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>

                          {itemSavings > 0 && (
                            <p className="whitespace-nowrap text-[10px] font-medium text-green-600 md:text-xs">
                              You save ₹{itemSavings.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-sm md:p-6">
              <h2 className="text-lg font-semibold text-[#4A3428] md:text-xl">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 md:mt-6 md:space-y-4">
                {/* Original */}
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#75675D]">Original price</span>

                  <span className="font-medium text-[#4A3428]">
                    ₹{totalOriginalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Savings */}
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#75675D]">Product savings</span>

                  <span className="font-medium text-green-600">
                    - ₹{totalSavings.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#75675D]">Delivery</span>

                  <span className="font-medium text-green-600">
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>

                {/* Total */}
                <div className="border-t border-[#D9CBBE] pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-[#4A3428]">Total</span>

                    <span className="text-xl font-bold text-[#4A3428] md:text-2xl">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              {totalSavings > 0 && (
                <div className="mt-4 rounded-xl bg-[#EFE3D4] px-3 py-3 text-center md:mt-5 md:px-4">
                  <p className="text-xs font-semibold text-[#4A3428] md:text-sm">
                    You're saving ₹{totalSavings.toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              {/* Checkout */}
              <Link
                to="/checkout"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643] md:mt-5"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>   
              {/* Continue */}
              <Link
                to="/shop"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-5 py-3 text-sm font-medium text-[#4A3428] transition hover:border-[#A86643] hover:text-[#A86643]"
              >
                Continue Shopping
              </Link>

              {/* Secure */}
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#D9CBBE] pt-4 text-[10px] text-[#75675D] md:mt-6 md:pt-5 md:text-xs">
                <ShieldCheck size={15} />
                Secure & safe checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
