import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const { addToCart } = useCart();

  // ================= EMPTY WISHLIST =================
  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-[70vh] bg-[#F7F1E8] px-4 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#EFE3D4] text-[#A86643]">
            <Heart size={42} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-bold text-[#4A3428]">
            Your Wishlist is Empty
          </h1>

          <p className="mt-3 max-w-md text-[#75675D]">
            Save the products you love and come back to them whenever you want.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 font-medium text-white transition hover:bg-[#A86643]"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F1E8] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="mb-4 inline-flex  items-center border rounded-full bg-[#FFFDFC]  border-[#4A3428] px-2.5 py-1.5 gap-2 text-sm font-semibold text-[#4A3428] hover:text-[#FFFDFC] hover:bg-[#4A3428] transition"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-[#A86643]">
                FLOVR
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#4A3428] sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-[#75675D]">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "product" : "products"} saved
              </p>
            </div>

            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#A86643] transition hover:text-[#4A3428]"
            >
              <Trash2 size={16} />
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden bg-[#EDE3D7]">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Remove */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#A86643] shadow-sm backdrop-blur transition hover:bg-[#A86643] hover:text-white"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={18} fill="currentColor" />
                </button>

                {/* Discount */}
                {product.discount && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#4A3428] px-3 py-1 text-xs font-semibold text-white">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-[#75675D]">
                  {product.category}
                </p>

                <Link to={`/product/${product.id}`}>
                  <h2 className="mt-1 line-clamp-2 min-h-[48px] text-base font-semibold text-[#4A3428] transition hover:text-[#A86643]">
                    {product.name}
                  </h2>
                </Link>

                {/* PRICE */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-[#4A3428]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  {product.originalPrice && (
                    <span className="text-sm text-[#75675D] line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
                >
                  <ShoppingBag size={17} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
