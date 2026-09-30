// src/pages/ProductDetails/ProductDetails.jsx

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

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
  Package,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

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

/* =========================================================
   PRODUCT DETAILS
========================================================= */

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const { showToast } = useToast();

  /* =======================================================
     URL VARIANTS
  ======================================================= */

  const urlVariantId =
    searchParams.get("variant");

  const urlSubVariantId =
    searchParams.get("subVariant");

  /* =======================================================
     PRODUCT
  ======================================================= */

  const product = useMemo(() => {
    return products.find(
      (item) =>
        String(item.id) === String(id)
    );
  }, [id]);

  /* =======================================================
     CART
  ======================================================= */

  const {
    cartItems,
    addToCart,
    increaseQuantity: increaseCartQuantity,
    decreaseQuantity: decreaseCartQuantity,
    removeFromCart,
  } = useCart();

  /* =======================================================
     WISHLIST
  ======================================================= */

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  /* =======================================================
     VARIANTS
  ======================================================= */

  const variants = Array.isArray(
    product?.variants
  )
    ? product.variants
    : [];

  const hasVariants =
    product?.hasVariants === true ||
    variants.length > 0;

  /* =======================================================
     INITIAL VARIANT
  ======================================================= */

  const getInitialVariant = () => {
    if (!variants.length) {
      return null;
    }

    if (urlVariantId) {
      const found = variants.find(
        (variant) =>
          String(variant.id) ===
          String(urlVariantId)
      );

      if (found) {
        return found;
      }
    }

    return variants[0];
  };

  /* =======================================================
     INITIAL SUB VARIANT
  ======================================================= */

  const getInitialSubVariant = () => {
    const variant = getInitialVariant();

    const subVariants =
      getSubVariants(variant);

    if (!subVariants.length) {
      return null;
    }

    if (urlSubVariantId) {
      const found = subVariants.find(
        (subVariant) =>
          String(subVariant.id) ===
          String(urlSubVariantId)
      );

      if (found) {
        return found;
      }
    }

    return subVariants[0];
  };

  /* =======================================================
     STATES
  ======================================================= */

  const [
    selectedVariant,
    setSelectedVariant,
  ] = useState(getInitialVariant);

  const [
    selectedSubVariant,
    setSelectedSubVariant,
  ] = useState(
    getInitialSubVariant
  );

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(product?.image || "");

  const [
    activeTab,
    setActiveTab,
  ] = useState("description");

  /* =======================================================
     PRODUCT CHANGE
  ======================================================= */

  useEffect(() => {
    if (!product) {
      return;
    }

    const variant = getInitialVariant();

    const subVariants =
      getSubVariants(variant);

    let subVariant =
      subVariants[0] || null;

    if (urlSubVariantId) {
      const matched =
        subVariants.find(
          (item) =>
            String(item.id) ===
            String(urlSubVariantId)
        );

      if (matched) {
        subVariant = matched;
      }
    }

    setSelectedVariant(variant);
    setSelectedSubVariant(subVariant);

    const image =
      subVariant?.image ||
      subVariant?.images?.[0] ||
      variant?.image ||
      variant?.images?.[0] ||
      product.image ||
      "";

    setSelectedImage(image);

    setActiveTab("description");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [
    product,
    urlVariantId,
    urlSubVariantId,
  ]);

  /* =======================================================
     PRODUCT NOT FOUND
  ======================================================= */

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#F7F1E8] px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE3D4]">
            <ShoppingBag
              size={32}
              className="text-[#4A3428]"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#4A3428]">
            Product Not Found
          </h1>

          <p className="mt-3 text-[#75675D]">
            Sorry, the product you're looking
            for doesn't exist.
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

  /* =======================================================
     ACTIVE VARIANT
  ======================================================= */

  const activeVariant =
    selectedVariant ||
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
    selectedSubVariant &&
    subVariants.some(
      (item) =>
        String(item.id) ===
        String(selectedSubVariant.id)
    )
      ? selectedSubVariant
      : subVariants[0] || null;

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
    Number(product.price) ||
    0;

  /* =======================================================
     ORIGINAL PRICE
  ======================================================= */

  const currentOriginalPrice =
    Number(currentItem?.originalPrice) ||
    Number(product.originalPrice) ||
    0;

  /* =======================================================
     DISCOUNT
  ======================================================= */

  const currentDiscount =
    Number(currentItem?.discount) ||
    Number(product.discount) ||
    0;

  /* =======================================================
     STOCK
  ======================================================= */

  const currentStock =
    currentItem?.stock !== undefined &&
    currentItem?.stock !== null
      ? Number(currentItem.stock) || 0
      : Number(product.stock) || 0;

  /* =======================================================
     SKU
  ======================================================= */

  const currentSku =
    currentItem?.sku ||
    activeVariant?.sku ||
    product.sku ||
    "";

  /* =======================================================
     WEIGHT
  ======================================================= */

  const currentWeight =
    currentItem?.weight ??
    activeVariant?.weight ??
    product.weight ??
    null;

  /* =======================================================
     UNIT
  ======================================================= */

  const currentUnit =
    currentItem?.unit ||
    activeVariant?.unit ||
    product.unit ||
    "";

  /* =======================================================
     DIMENSIONS
  ======================================================= */

  const dimensions =
    currentItem?.dimensions ||
    activeVariant?.dimensions ||
    product.dimensions ||
    null;

  /* =======================================================
     DELIVERY
  ======================================================= */

  const delivery =
    product.delivery ||
    "Fast and safe delivery to your doorstep.";

  /* =======================================================
     IMAGE GALLERY
  ======================================================= */

  const productImages = [
    ...(Array.isArray(product.images)
      ? product.images
      : []),

    ...(product.image
      ? [product.image]
      : []),

    ...(Array.isArray(
      activeVariant?.images
    )
      ? activeVariant.images
      : []),

    ...(activeVariant?.image
      ? [activeVariant.image]
      : []),

    ...(Array.isArray(
      activeSubVariant?.images
    )
      ? activeSubVariant.images
      : []),

    ...(activeSubVariant?.image
      ? [activeSubVariant.image]
      : []),
  ].filter(Boolean);

  const uniqueImages = [
    ...new Set(productImages),
  ];

  const galleryImages =
    uniqueImages.length > 0
      ? uniqueImages
      : [product.image];

  /* =======================================================
     RELATED PRODUCTS
  ======================================================= */

  const relatedProducts =
    products
      .filter(
        (item) =>
          item.category ===
            product.category &&
          item.id !== product.id
      )
      .slice(0, 4);

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

  const currentCartItem =
    cartItems.find(
      (item) =>
        String(item.cartItemId) ===
        String(cartItemId)
    );

  const cartQuantity =
    Number(
      currentCartItem?.quantity
    ) || 0;

  const isInCart =
    Boolean(currentCartItem);

  /* =======================================================
     IMAGE CHANGE
  ======================================================= */

  const handleImageChange = (
    image
  ) => {
    setSelectedImage(image);
  };

  /* =======================================================
     PREVIOUS IMAGE
  ======================================================= */

  const previousImage = () => {
    const currentIndex =
      galleryImages.indexOf(
        selectedImage
      );

    const safeIndex =
      currentIndex === -1
        ? 0
        : currentIndex;

    const nextIndex =
      safeIndex === 0
        ? galleryImages.length - 1
        : safeIndex - 1;

    setSelectedImage(
      galleryImages[nextIndex]
    );
  };

  /* =======================================================
     NEXT IMAGE
  ======================================================= */

  const nextImage = () => {
    const currentIndex =
      galleryImages.indexOf(
        selectedImage
      );

    const safeIndex =
      currentIndex === -1
        ? 0
        : currentIndex;

    const nextIndex =
      safeIndex ===
      galleryImages.length - 1
        ? 0
        : safeIndex + 1;

    setSelectedImage(
      galleryImages[nextIndex]
    );
  };

  /* =======================================================
     VARIANT CHANGE
  ======================================================= */

  const handleVariantChange = (
    variant
  ) => {
    const options =
      getSubVariants(variant);

    const firstSub =
      options[0] || null;

    setSelectedVariant(variant);
    setSelectedSubVariant(firstSub);

    const params = {};

    if (variant?.id) {
      params.variant =
        variant.id;
    }

    if (firstSub?.id) {
      params.subVariant =
        firstSub.id;
    }

    setSearchParams(params);

    const image =
      firstSub?.image ||
      firstSub?.images?.[0] ||
      variant?.image ||
      variant?.images?.[0] ||
      product.image;

    setSelectedImage(image);
  };

  /* =======================================================
     SUB VARIANT CHANGE
  ======================================================= */

  const handleSubVariantChange = (
    subVariant
  ) => {
    const stock =
      Number(subVariant?.stock) || 0;

    if (stock <= 0) {
      return;
    }

    setSelectedSubVariant(
      subVariant
    );

    const params = {};

    if (activeVariant?.id) {
      params.variant =
        activeVariant.id;
    }

    if (subVariant?.id) {
      params.subVariant =
        subVariant.id;
    }

    setSearchParams(params);

    const image =
      subVariant?.image ||
      subVariant?.images?.[0] ||
      activeVariant?.image ||
      activeVariant?.images?.[0] ||
      product.image;

    setSelectedImage(image);
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = () => {
    if (currentStock <= 0) {
      return;
    }

    const cartProduct = {
      ...product,

      id: product.id,

      productId: product.id,

      cartItemId,

      selectedVariant:
        activeVariant
          ? {
              id: activeVariant.id,
              name:
                getVariantName(
                  activeVariant
                ),
              value:
                activeVariant.value ||
                activeVariant.name ||
                "",
            }
          : null,

      selectedSubVariant:
        activeSubVariant
          ? {
              id:
                activeSubVariant.id,

              name:
                getSubVariantName(
                  activeSubVariant
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

      sku: currentSku,

      image:
        selectedImage ||
        product.image,

      images:
        activeSubVariant?.images ||
        activeVariant?.images ||
        product.images ||
        [],

      weight:
        currentWeight,

      unit:
        currentUnit,

      dimensions,

      quantity: 1,
    };

    addToCart(
      cartProduct,
      1
    );

    showToast(
      `${getVariantName(
        activeVariant
      )}${
        activeSubVariant
          ? ` - ${getSubVariantName(
              activeSubVariant
            )}`
          : ""
      } added to cart`
    );
  };

  /* =======================================================
     PLUS
  ======================================================= */

  const handleIncrease = () => {
    if (!currentCartItem) {
      handleAddToCart();
      return;
    }

    if (
      cartQuantity >=
      currentStock
    ) {
      return;
    }

    increaseCartQuantity(
      cartItemId
    );
  };

  /* =======================================================
     MINUS
  ======================================================= */

  const handleDecrease = () => {
    if (!currentCartItem) {
      return;
    }

    if (cartQuantity <= 1) {
      removeFromCart(
        cartItemId
      );

      showToast(
        "Product removed from cart"
      );

      return;
    }

    decreaseCartQuantity(
      cartItemId
    );
  };

  /* =======================================================
     BUY NOW
  ======================================================= */

  const handleBuyNow = () => {
    if (currentStock <= 0) {
      return;
    }

    if (!currentCartItem) {
      handleAddToCart();
    }

    navigate("/cart");
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const wishlistActive =
    isInWishlist(product.id);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="bg-[#F7F1E8] text-[#4A3428]">

      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="border-b border-[#D9CBBE] bg-[#FFFDFC]">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm">

            <Link
              to="/"
              className="text-[#75675D] hover:text-[#A86643]"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              className="text-[#D6AE8C]"
            />

            <Link
              to="/shop"
              className="text-[#75675D] hover:text-[#A86643]"
            >
              Shop
            </Link>

            <ChevronRight
              size={15}
              className="text-[#D6AE8C]"
            />

            <span className="font-medium">
              {product.category}
            </span>

            <ChevronRight
              size={15}
              className="text-[#D6AE8C]"
            />

            <span className="max-w-[220px] truncate font-semibold">
              {product.name}
            </span>

          </div>

        </div>
      </div>

      {/* =================================================
          BACK
      ================================================= */}

      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-6 lg:px-8">

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="inline-flex items-center gap-2 rounded-full border border-[#4A3428] bg-[#FFFDFC] px-3 py-1.5 text-sm font-semibold transition hover:bg-[#4A3428] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

      </div>

      {/* =================================================
          MAIN PRODUCT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">

          {/* =================================================
              LEFT IMAGE - STICKY
          ================================================= */}

          <div className="lg:sticky lg:top-24">

            {/* MAIN IMAGE */}

            <div className="relative mx-auto max-w-[440px] overflow-hidden rounded-3xl border border-[#D9CBBE] bg-[#EDE3D7]">

              <div className="aspect-square">

                <img
                  src={
                    selectedImage ||
                    product.image
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500"
                />

              </div>

              {/* PREVIOUS */}

              {galleryImages.length >
                1 && (
                <button
                  type="button"
                  onClick={
                    previousImage
                  }
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4A3428] shadow-md transition hover:bg-[#4A3428] hover:text-white"
                >
                  <ArrowLeft
                    size={17}
                  />
                </button>
              )}

              {/* NEXT */}

              {galleryImages.length >
                1 && (
                <button
                  type="button"
                  onClick={
                    nextImage
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4A3428] shadow-md transition hover:bg-[#4A3428] hover:text-white"
                >
                  <ArrowRight
                    size={17}
                  />
                </button>
              )}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  toggleWishlist(
                    product
                  )
                }
                className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition ${
                  wishlistActive
                    ? "bg-[#A86643] text-white"
                    : "bg-white text-[#4A3428] hover:bg-[#4A3428] hover:text-white"
                }`}
              >
                <Heart
                  size={18}
                  fill={
                    wishlistActive
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* THUMBNAILS */}

            {galleryImages.length >
              1 && (
              <div className="mx-auto mt-3 flex max-w-[540px] gap-2 overflow-x-auto pb-1">

                {galleryImages.map(
                  (
                    image,
                    index
                  ) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        handleImageChange(
                          image
                        )
                      }
                      className={`h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                        selectedImage ===
                        image
                          ? "border-[#4A3428]"
                          : "border-[#D9CBBE] hover:border-[#A86643]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>
            )}

          </div>

          {/* =================================================
              RIGHT INFORMATION
          ================================================= */}

          <div>

            {/* CATEGORY + BADGE */}

            <div className="flex flex-wrap items-center justify-between gap-3">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86643]">
                {product.category}
              </p>

              <div className="flex gap-2">

                {product.isNew && (
                  <span className="rounded-full bg-[#4A3428] px-3 py-1 text-xs font-semibold text-white">
                    New Arrival
                  </span>
                )}

                {product.isBestSeller && (
                  <span className="rounded-full bg-[#A86643] px-3 py-1 text-xs font-semibold text-white">
                    Best Seller
                  </span>
                )}

              </div>

            </div>

            {/* NAME */}

            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#4A3428] sm:text-4xl">
              {product.name}
            </h1>

            {/* RATING */}

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1 rounded-full bg-[#EFE3D4] px-3 py-1">
                <Star
                  size={15}
                  fill="currentColor"
                  className="text-[#A86643]"
                />

                <span className="text-sm font-semibold">
                  {product.rating ||
                    0}
                </span>
              </div>

              <span className="text-sm text-[#75675D]">
                {product.reviews ||
                  0}{" "}
                customer reviews
              </span>

            </div>

            {/* PRICE */}

            <div className="mt-5 flex flex-wrap items-center gap-3">

              <span className="text-3xl font-bold text-[#4A3428]">
                ₹
                {currentPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

              {currentOriginalPrice >
                currentPrice && (
                <span className="text-lg text-[#75675D] line-through">
                  ₹
                  {currentOriginalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

              {currentDiscount >
                0 && (
                <span className="rounded-full border border-green-600 bg-green-50 px-3 py-1 text-sm font-bold text-green-600">
                  Save{" "}
                  {currentDiscount}%
                </span>
              )}

            </div>

            {/* DESCRIPTION */}

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75675D]">
              {product.shortDescription ||
                product.description}
            </p>

            <div className="my-5 h-px bg-[#D9CBBE]" />

            {/* =================================================
                VARIANT SELECTION
            ================================================= */}

            {hasVariants &&
              variants.length >
                0 && (
                <div>

                  <div className="mb-3 flex items-center justify-between">

                    <h3 className="text-sm font-bold text-[#4A3428]">
                      Choose Variant
                    </h3>

                    {activeVariant && (
                      <span className="text-sm font-medium text-[#A86643]">
                        {getVariantName(
                          activeVariant
                        )}
                      </span>
                    )}

                  </div>

                  {/* NEW VARIANT STYLE */}

                  <div className="flex flex-wrap gap-2">

                    {variants.map(
                      (
                        variant
                      ) => {
                        const active =
                          String(
                            activeVariant?.id
                          ) ===
                          String(
                            variant.id
                          );

                        const variantImage =
                          variant?.image ||
                          variant?.images?.[0];

                        return (
                          <button
                            key={
                              variant.id
                            }
                            type="button"
                            onClick={() =>
                              handleVariantChange(
                                variant
                              )
                            }
                            className={`group flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${
                              active
                                ? "border-[#A86643] bg-[#F3E5D8] text-[#4A3428] shadow-sm"
                                : "border-[#D9CBBE] bg-[#FFFDFC] text-[#4A3428] hover:border-[#A86643]"
                            }`}
                          >

                            {variantImage ? (
                              <span className="h-9 w-9 overflow-hidden rounded-xl border border-[#D9CBBE] bg-white">
                                <img
                                  src={
                                    variantImage
                                  }
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </span>
                            ) : (
                              <span
                                className={`md:flex h-9 w-9 hidden items-center justify-center rounded-xl ${
                                  active
                                    ? "bg-[#A86643] text-white"
                                    : "bg-[#EFE3D4] text-[#4A3428]"
                                }`}
                              >
                                {active ? (
                                  <Check
                                    size={
                                      16
                                    }
                                  />
                                ) : (
                                  <Package
                                    size={
                                      16
                                    }
                                  />
                                )}
                              </span>
                            )}

                            <span>
                              {getVariantName(
                                variant
                              )}
                            </span>

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

            {/* =================================================
                SUB VARIANT
            ================================================= */}

            {subVariants.length >
              0 && (
              <div className="mt-5">

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="text-sm font-bold text-[#4A3428]">
                    Size / Quantity
                  </h3>

                  {activeSubVariant && (
                    <span className="text-sm font-medium text-[#A86643]">
                      {getSubVariantName(
                        activeSubVariant
                      )}
                    </span>
                  )}

                </div>

                <div className="flex flex-wrap gap-2.5">

                  {subVariants.map(
                    (
                      subVariant
                    ) => {
                      const active =
                        String(
                          activeSubVariant?.id
                        ) ===
                        String(
                          subVariant.id
                        );

                      const stock =
                        Number(
                          subVariant.stock
                        ) || 0;

                      return (
                        <button
                          key={
                            subVariant.id
                          }
                          type="button"
                          disabled={
                            stock <= 0
                          }
                          onClick={() =>
                            handleSubVariantChange(
                              subVariant
                            )
                          }
                          className={`relative min-w-[90px] rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                            active
                              ? "border-[#A86643] bg-[#A86643] text-white shadow-sm"
                              : stock <=
                                  0
                                ? "cursor-not-allowed border-[#D9CBBE] bg-[#F7F1E8] text-[#B5A79D]"
                                : "border-[#D9CBBE] bg-[#FFFDFC] text-[#4A3428] hover:border-[#A86643]"
                          }`}
                        >
                          {active && (
                            <Check
                              size={
                                13
                              }
                              className="absolute right-2 top-2"
                            />
                          )}

                          {getSubVariantName(
                            subVariant
                          )}

                        </button>
                      );
                    }
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                SELECTED
            ================================================= */}

            {(activeVariant ||
              activeSubVariant) && (
              <div className="mt-5 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-3.5">

                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#A86643]">
                  Selected
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  {activeVariant && (
                    <span className="rounded-lg bg-[#F7F1E8] px-3 py-1.5 text-xs font-semibold text-[#4A3428]">
                      {getVariantName(
                        activeVariant
                      )}
                    </span>
                  )}

                  {activeSubVariant && (
                    <span className="rounded-lg bg-[#F7F1E8] px-3 py-1.5 text-xs font-semibold text-[#4A3428]">
                      {getSubVariantName(
                        activeSubVariant
                      )}
                    </span>
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                STOCK
            ================================================= */}

            <div className="mt-4">

              {currentStock > 0 ? (
                <div className="flex items-center gap-2">

                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      currentStock <= 5
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  />

                  <span
                    className={`text-sm font-semibold ${
                      currentStock <= 5
                        ? "text-red-600"
                        : "text-green-700"
                    }`}
                  >
                    {currentStock <=
                    5
                      ? `Only ${currentStock} left in stock`
                      : "In Stock"}
                  </span>

                </div>
              ) : (
                <span className="text-sm font-semibold text-red-600">
                  Out of Stock
                </span>
              )}

            </div>

            {/* SKU */}

            {currentSku && (
              <p className="mt-1 text-xs text-[#75675D]">
                SKU: {currentSku}
              </p>
            )}

            {/* =================================================
                CART BUTTON + COUNTER
            ================================================= */}

            {currentStock > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {/* COUNTER */}

                {isInCart ? (
                  <div className="flex h-12 items-center justify-between rounded-xl border text-[#ffff]  border-[#4A3428] bg-[#4A3428]">

                    <button
                      type="button"
                      onClick={
                        handleDecrease
                      }
                      className="flex h-full w-15 items-center font-bold justify-center rounded-xl text-[#ffff] transition bg-[#4A3428]"
                    >
                      <Minus
                        size={17}
                      />
                    </button>

                    <span className="text-md font-bold">
                      {cartQuantity}
                    </span>

                    <button
                      type="button"
                      onClick={
                        handleIncrease
                      }
                      disabled={
                        cartQuantity >=
                        currentStock
                      }
                      className="flex h-full w-15 items-center font-bold justify-center rounded-xl text-[#ffff]  transition bg-[#4A3428] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus
                        size={17}
                      />
                    </button>

                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={
                      handleAddToCart
                    }
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-4 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                  >
                    <ShoppingBag
                      size={18}
                    />
                    Add to Cart
                  </button>
                )}

                {/* BUY NOW */}

                <button
                  type="button"
                  onClick={
                    handleBuyNow
                  }
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#4A3428] bg-transparent px-5 text-sm font-semibold text-[#4A3428] transition hover:bg-[#4A3428] hover:text-white"
                >
                  Buy Now
                  <ArrowRight
                    size={18}
                  />
                </button>

              </div>
            )}

            {/* =================================================
                DELIVERY
            ================================================= */}

            <div className="mt-5 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFE3D4]">
                  <Truck
                    size={18}
                    className="text-[#A86643]"
                  />
                </div>

                <div>

                  <h3 className="text-sm font-bold">
                    Delivery Information
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#75675D]">
                    {delivery}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SPECIFICATIONS
            ================================================= */}

            {(currentWeight ||
              dimensions ||
              currentSku) && (
              <div className="mt-5 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4">

                <h3 className="text-base font-bold">
                  Product Specifications
                </h3>

                <div className="mt-2 divide-y divide-[#E8DDD3]">

                  {currentWeight && (
                    <div className="flex justify-between gap-4 py-2.5 text-sm">

                      <span className="text-[#75675D]">
                        Weight
                      </span>

                      <span className="font-semibold">
                        {currentWeight}{" "}
                        {currentUnit}
                      </span>

                    </div>
                  )}

                  {dimensions && (
                    <div className="flex justify-between gap-4 py-2.5 text-sm">

                      <span className="text-[#75675D]">
                        Dimensions
                      </span>

                      <span className="text-right font-semibold">
                        {dimensions.length}
                        {" × "}
                        {dimensions.width}
                        {" × "}
                        {dimensions.height}
                        {" "}
                        {dimensions.unit ||
                          "cm"}
                      </span>

                    </div>
                  )}

                  {currentSku && (
                    <div className="flex justify-between gap-4 py-2.5 text-sm">

                      <span className="text-[#75675D]">
                        SKU
                      </span>

                      <span className="font-semibold">
                        {currentSku}
                      </span>

                    </div>
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                TRUST FEATURES
            ================================================= */}

            <div className="mt-5 grid grid-cols-3 gap-2">

              <div className="rounded-xl bg-[#EFE3D4] p-3 text-center">

                <Truck
                  size={19}
                  className="mx-auto text-[#A86643]"
                />

                <p className="mt-1.5 text-[11px] font-semibold">
                  Fast Delivery
                </p>

              </div>

              <div className="rounded-xl bg-[#EFE3D4] p-3 text-center">

                <ShieldCheck
                  size={19}
                  className="mx-auto text-[#A86643]"
                />

                <p className="mt-1.5 text-[11px] font-semibold">
                  Quality Assured
                </p>

              </div>

              <div className="rounded-xl bg-[#EFE3D4] p-3 text-center">

                <RotateCcw
                  size={19}
                  className="mx-auto text-[#A86643]"
                />

                <p className="mt-1.5 text-[11px] font-semibold">
                  Easy Returns
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <section className="border-y border-[#D9CBBE] bg-[#FFFDFC]">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

          {/* TABS */}

          <div className="flex overflow-x-auto border-b border-[#D9CBBE]">

            {[
              ["description", "Description"],
              ["features", "Features"],
              [
                "specifications",
                "Specifications",
              ],
            ].map(
              ([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      key
                    )
                  }
                  className={`whitespace-nowrap border-b-2 px-5 pb-3 text-sm font-semibold transition ${
                    activeTab === key
                      ? "border-[#4A3428] text-[#4A3428]"
                      : "border-transparent text-[#75675D] hover:text-[#A86643]"
                  }`}
                >
                  {label}
                </button>
              )
            )}

          </div>

          {/* CONTENT */}

          <div className="pt-7">

            {/* DESCRIPTION */}

            {activeTab ===
              "description" && (
              <div className="max-w-4xl">

                <h2 className="text-2xl font-bold">
                  About this product
                </h2>

                <p className="mt-3 text-sm leading-8 text-[#75675D]">
                  {product.description ||
                    product.shortDescription}
                </p>

              </div>
            )}

            {/* FEATURES */}

            {activeTab ===
              "features" && (
              <div className="max-w-4xl">

                <h2 className="text-2xl font-bold">
                  Product Features
                </h2>

                {Array.isArray(
                  product.features
                ) &&
                product.features
                  .length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    {product.features.map(
                      (
                        feature,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="flex items-start gap-3 rounded-xl bg-[#F7F1E8] p-4"
                        >

                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6AE8C]">
                            <Check
                              size={
                                14
                              }
                            />
                          </div>

                          <span className="text-sm leading-6">
                            {
                              feature
                            }
                          </span>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <p className="mt-4 text-sm text-[#75675D]">
                    Product features
                    information is
                    currently
                    unavailable.
                  </p>
                )}

              </div>
            )}

            {/* SPECIFICATIONS */}

            {activeTab ===
              "specifications" && (
              <div className="max-w-4xl">

                <h2 className="text-2xl font-bold">
                  Product Specifications
                </h2>

                {product.specifications &&
                Object.keys(
                  product.specifications
                ).length > 0 ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#D9CBBE]">

                    {Object.entries(
                      product.specifications
                    ).map(
                      (
                        [key, value],
                        index,
                        entries
                      ) => (
                        <div
                          key={
                            key
                          }
                          className={`grid grid-cols-2 ${
                            index !==
                            entries.length -
                              1
                              ? "border-b border-[#D9CBBE]"
                              : ""
                          }`}
                        >

                          <div className="bg-[#F7F1E8] px-4 py-3 text-sm font-semibold sm:px-6">
                            {key}
                          </div>

                          <div className="bg-[#FFFDFC] px-4 py-3 text-sm text-[#75675D] sm:px-6">
                            {value}
                          </div>

                        </div>
                      )
                    )}

                  </div>
                ) : (
                  <div className="mt-5 rounded-xl bg-[#F7F1E8] p-5 text-sm text-[#75675D]">
                    No additional
                    specifications
                    available.
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      {relatedProducts.length >
        0 && (
        <section className="bg-[#F7F1E8]">

          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

            <div className="mb-7 flex items-end justify-between gap-4">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86643]">
                  You may also like
                </p>

                <h2 className="mt-1.5 text-2xl font-bold sm:text-3xl">
                  More from{" "}
                  {product.category}
                </h2>

              </div>

              <Link
                to="/shop"
                className="hidden items-center gap-1 text-sm font-semibold transition hover:text-[#A86643] sm:flex"
              >
                View All
                <ArrowRight
                  size={16}
                />
              </Link>

            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">

              {relatedProducts.map(
                (item) => (
                  <ProductCard
                    key={
                      item.id
                    }
                    product={
                      item
                    }
                  />
                )
              )}

            </div>

          </div>

        </section>
      )}

    </div>
  );
}

export default ProductDetails;