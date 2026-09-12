import React from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { Heart, Eye, Star, ShoppingBag } from "lucide-react";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square overflow-hidden bg-[#EDE3D7]">
        {/* Product Image */}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition ${
            isInWishlist(product.id)
              ? "bg-[#A86643] text-white"
              : "bg-white/90 text-[#4A3428] hover:bg-[#4A3428] hover:text-white"
          }`}
          onClick={(e) => {
            e.preventDefault();
            console.log("Wishlist button clicked for product:", product);
            toggleWishlist(product);
          }}
        >
          <Heart
            size={18}
            fill={isInWishlist(product.id) ? "currentColor" : "none"}
          />
        </button>

        {/* Quick View */}
        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-14 items-center gap-2 rounded-full bg-[#4A3428] px-5 py-2.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#A86643]"
        >
          <Eye size={16} />
          View Product
        </Link>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 py-3">
        {/* Category */}

        <div className="flex items-center justify-between flex-row gap-0.5">
          <div className="text-[7px] md:text-xs font-medium uppercase tracking-wider text-[#75675D]">
            {product.category}
          </div>
          {/* Badges */}
          {product.isNew && (
            <span className="rounded-full bg-[#4A3428] px-2 py-1 text-[8px] md:text-[10px] font-semibold text-white">
              New
            </span>
          )}

          {product.isBestSeller && (
            <span className="rounded-full bg-[#A86643] px-1 py-1 md:px-3  text-[7px] md:text-[10px] font-semibold text-white">
              Best Seller
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-[16px] min-h-[48px] text-base font-semibold text-[#4A3428] transition-colors hover:text-[#A86643]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star size={15} fill="currentColor" className="text-[#A86643]" />

            <span className="text-sm font-medium text-[#4A3428]">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-[#75675D]">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-bold text-[#4A3428]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-xs md:text-sm text-[#75675D] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}

          {product.discount && (
            <span className="rounded-full bg-[#ffffff] px-1 py-1 text-[10px] md:text-sm font-bold text-green-600 ">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();

            console.log("Adding product:", product);

            addToCart(product, 1);
          }}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-4 py-3 text-xs md:text-sm font-medium text-white transition hover:bg-[#A86643]"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
