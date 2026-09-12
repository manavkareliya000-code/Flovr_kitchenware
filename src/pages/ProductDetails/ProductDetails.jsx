import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Star,
} from "lucide-react";

import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // Find current product
  const product = products.find((item) => item.id === Number(id));

  const { addToCart } = useCart();

  const { showToast } = useToast();

  // Wishlist
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Image states
  const [selectedImage, setSelectedImage] = useState(0);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Active information tab
  const [activeTab, setActiveTab] = useState("description");

  // Reset when product changes
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setActiveTab("description");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Product not found
  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#F7F1E8] px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE3D4]">
            <ShoppingBag size={32} className="text-[#4A3428]" />
          </div>

          <h1 className="text-3xl font-bold text-[#4A3428]">
            Product Not Found
          </h1>

          <p className="mt-3 text-[#75675D]">
            Sorry, the product you're looking for doesn't exist.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4A3428] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Related products
  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  // Quantity handlers
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  // Previous image
  const previousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Next image
  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);

    showToast(`${quantity} × ${product.name}`);
  };

  // Buy now
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="bg-[#F7F1E8] text-[#4A3428]">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="border-b border-[#D9CBBE] bg-[#FFFDFC]">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm">
            <Link
              to="/"
              className="text-[#75675D] transition hover:text-[#A86643]"
            >
              Home
            </Link>

            <ChevronRight size={15} className="shrink-0 text-[#D6AE8C]" />

            <Link
              to="/shop"
              className="text-[#75675D] transition hover:text-[#A86643]"
            >
              Shop
            </Link>

            <ChevronRight size={15} className="shrink-0 text-[#D6AE8C]" />

            <Link
              to={`/${product.category.toLowerCase()}`}
              className="text-[#75675D] transition hover:text-[#A86643]"
            >
              {product.category}
            </Link>

            <ChevronRight size={15} className="shrink-0 text-[#D6AE8C]" />

            <span className="max-w-[220px] truncate font-medium text-[#4A3428]">
              {product.name}
            </span>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mx-8 mt-5 inline-flex  items-center border rounded-full bg-[#FFFDFC]  border-[#4A3428] px-2.5 py-1.5 gap-2 text-sm font-semibold text-[#4A3428] hover:text-[#FFFDFC] hover:bg-[#4A3428] transition"
        >
          <ArrowLeft size={18} className="" />
          Back
        </button>
      </div>

      {/* =====================================================
          PRODUCT MAIN SECTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8 lg:pt-7 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* =================================================
              LEFT - IMAGE GALLERY
          ================================================== */}

          <div>
            <div className="relative overflow-hidden rounded-3xl border border-[#D9CBBE] bg-[#EDE3D7]">
              {/* Main Image */}

              <div className="aspect-square overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Previous */}

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4A3428] shadow-md backdrop-blur transition hover:bg-[#4A3428] hover:text-white"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={18} />
                </button>
              )}

              {/* Next */}

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4A3428] shadow-md backdrop-blur transition hover:bg-[#4A3428] hover:text-white"
                  aria-label="Next image"
                >
                  <ArrowRight size={18} />
                </button>
              )}
            </div>

            {/* =================================================
                THUMBNAILS
            ================================================== */}

            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 bg-[#EDE3D7] transition ${
                    selectedImage === index
                      ? "border-[#4A3428]"
                      : "border-[#D9CBBE] hover:border-[#A86643]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT - PRODUCT INFORMATION
          ================================================== */}

          <div className="flex flex-col">
            {/* Category */}
            <div className="flex items-center justify-between flex-wrap">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86643]">
                {product.category}
              </p>

              {/* Badges */}

              {product.isNew && (
                <span className="rounded-full bg-[#4A3428] px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                  New Arrival
                </span>
              )}

              {product.isBestSeller && (
                <span className="rounded-full bg-[#A86643] px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                  Best Seller
                </span>
              )}
            </div>

            {/* Product Name */}

            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#4A3428] sm:text-4xl lg:text-[42px]">
              {product.name}
            </h1>

            {/* Short Description */}

            <p className="mt-4 text-base leading-7 text-[#75675D]">
              {product.shortDescription}
            </p>

            {/* Rating */}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-[#EFE3D4] px-3 py-1.5">
                <Star
                  size={16}
                  fill="currentColor"
                  className="text-[#A86643]"
                />

                <span className="text-sm font-semibold text-[#4A3428]">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-[#75675D]">
                {product.reviews} customer reviews
              </span>
            </div>

            <div className="my-6 h-px bg-[#D9CBBE]" />

            {/* Price */}

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-[#4A3428]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.originalPrice && (
                <span className="text-lg text-[#75675D] line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}

              {product.discount && (
                <span className="rounded-full mx-1 bg-amber-50 border border-green-600 text-green-600 px-2 py-1 text-sm font-bold ">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Stock */}

            <div className="mt-4 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

                  <span className="text-sm font-medium text-green-700">
                    In Stock
                  </span>

                  <span className="text-sm text-[#75675D]">
                    • {product.stock} available
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                  <span className="text-sm font-medium text-red-600">
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* SKU */}

            <p className="mt-2 text-xs text-[#75675D]">SKU: {product.sku}</p>

            {/* Quantity + Wishlist */}

            <div className="mt-7 flex flex-wrap gap-7">
              {/* Quantity */}

              <div className="flex h-12 items-center rounded-xl border border-[#D9CBBE] bg-[#FFFDFC]">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-full w-11 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="flex w-10 justify-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="flex h-full w-11 items-center justify-center text-[#4A3428] transition hover:text-[#A86643] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>

              {/* Wishlist */}

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                  isInWishlist(product.id)
                    ? "border-[#A86643] bg-[#A86643] text-white"
                    : "border-[#D9CBBE] bg-[#FFFDFC] text-[#4A3428] hover:border-[#A86643] hover:text-[#A86643]"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  fill={isInWishlist(product.id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex h-13 items-center justify-center gap-2 rounded-xl border-2 border-[#4A3428] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#4A3428] transition hover:bg-[#4A3428] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
                <ArrowRight size={18} />
              </button>
            </div>

            {/* =================================================
                DELIVERY INFORMATION
            ================================================== */}

            <div className="mt-7 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                  <Truck size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#4A3428]">
                    Delivery Information
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#75675D]">
                    {product.delivery}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                TRUST FEATURES
            ================================================== */}

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
              <div className="flex flex-col items-center rounded-xl bg-[#EFE3D4] px-2 py-4 text-center">
                <Truck size={20} className="text-[#A86643]" />

                <span className="mt-2 text-xs font-medium text-[#4A3428]">
                  Fast Delivery
                </span>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-[#EFE3D4] px-2 py-4 text-center">
                <ShieldCheck size={20} className="text-[#A86643]" />

                <span className="mt-2 text-xs font-medium text-[#4A3428]">
                  Quality Assured
                </span>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-[#EFE3D4] px-2 py-4 text-center">
                <RotateCcw size={20} className="text-[#A86643]" />

                <span className="mt-2 text-xs font-medium text-[#4A3428]">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <section className="border-y border-[#D9CBBE] bg-[#FFFDFC]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Tabs */}

          <div className="flex overflow-x-auto border-b border-[#D9CBBE]">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`whitespace-nowrap border-b-2 px-5 pb-4 text-sm font-semibold transition ${
                activeTab === "description"
                  ? "border-[#4A3428] text-[#4A3428]"
                  : "border-transparent text-[#75675D] hover:text-[#A86643]"
              }`}
            >
              Description
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("features")}
              className={`whitespace-nowrap border-b-2 px-5 pb-4 text-sm font-semibold transition ${
                activeTab === "features"
                  ? "border-[#4A3428] text-[#4A3428]"
                  : "border-transparent text-[#75675D] hover:text-[#A86643]"
              }`}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`whitespace-nowrap border-b-2 px-5 pb-4 text-sm font-semibold transition ${
                activeTab === "specifications"
                  ? "border-[#4A3428] text-[#4A3428]"
                  : "border-transparent text-[#75675D] hover:text-[#A86643]"
              }`}
            >
              Specifications
            </button>
          </div>

          {/* Tab Content */}

          <div className="pt-8">
            {/* Description */}

            {activeTab === "description" && (
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  About this product
                </h2>

                <p className="mt-4 text-base leading-8 text-[#75675D]">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}

            {activeTab === "features" && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Product Features
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-[#F7F1E8] p-4"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6AE8C]">
                        <Check size={14} className="text-[#4A3428]" />
                      </div>

                      <span className="text-sm leading-6 text-[#4A3428]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}

            {activeTab === "specifications" && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Product Specifications
                </h2>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#D9CBBE]">
                  {product.specifications &&
                    Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <div
                          key={key}
                          className={`grid grid-cols-2 ${
                            index !==
                            Object.entries(product.specifications).length - 1
                              ? "border-b border-[#D9CBBE]"
                              : ""
                          }`}
                        >
                          <div className="bg-[#F7F1E8] px-4 py-4 text-sm font-semibold text-[#4A3428] sm:px-6">
                            {key}
                          </div>

                          <div className="bg-[#FFFDFC] px-4 py-4 text-sm text-[#75675D] sm:px-6">
                            {value}
                          </div>
                        </div>
                      ),
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ====================================================== */}

      {relatedProducts.length > 0 && (
        <section className="bg-[#F7F1E8]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86643]">
                  You may also like
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#4A3428] sm:text-3xl">
                  More from {product.category}
                </h2>
              </div>

              <Link
                to={`/${product.category.toLowerCase()}`}
                className="hidden items-center gap-1 text-sm font-semibold text-[#4A3428] transition hover:text-[#A86643] sm:flex"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
