import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

function Shop({ category = "All" }) {
  const [activeCategory, setActiveCategory] = useState(category);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [newOnly, setNewOnly] = useState(false);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);

  // Update category when URL changes
  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  const categories = ["All", "Kitchenware", "Household", "Storage", "Cleaning", "Bathroom"];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText),
      );
    }

    // Price filter
    if (priceRange === "under500") {
      result = result.filter((product) => product.price < 500);
    }

    if (priceRange === "500-1000") {
      result = result.filter(
        (product) => product.price >= 500 && product.price <= 1000,
      );
    }

    if (priceRange === "1000-1500") {
      result = result.filter(
        (product) => product.price >= 1000 && product.price <= 1500,
      );
    }

    if (priceRange === "above1500") {
      result = result.filter((product) => product.price > 1500);
    }

    // Rating filter
    if (ratingFilter > 0) {
      result = result.filter((product) => product.rating >= ratingFilter);
    }

    // New arrivals
    if (newOnly) {
      result = result.filter((product) => product.isNew);
    }

    // Best sellers
    if (bestSellerOnly) {
      result = result.filter((product) => product.isBestSeller);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;

      default:
        break;
    }

    return result;
  }, [
    activeCategory,
    search,
    sortBy,
    priceRange,
    ratingFilter,
    newOnly,
    bestSellerOnly,
  ]);

  const pageTitle =
    activeCategory === "All"
      ? "Everything For Your Home."
      : `${activeCategory} Collection.`;

  const pageDescription =
    activeCategory === "All"
      ? "Thoughtfully designed products for a more organized, beautiful and comfortable home."
      : `Explore our carefully selected ${activeCategory.toLowerCase()} products designed for everyday living.`;

  return (
    <div className="min-h-screen bg-[#F7F1E8]">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden px-6 py-16 md:px-10 lg:px-20 bg-[#A86643]/5">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D6AE8C]/22" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#A86643]/16" />

        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#A86643]">
            The FLOVR Collection
          </p>

          <h1 className="text-4xl font-bold text-[#4A3428] md:text-5xl lg:text-6xl">
            {pageTitle}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#75675D] md:text-base">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* SHOP */}
      <section className="px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* CATEGORY LINKS */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const path = cat === "All" ? "/shop" : `/${cat.toLowerCase()}`;

              return (
                <Link
                  key={cat}
                  to={path}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                    activeCategory === cat
                      ? "bg-[#4A3428] text-white"
                      : "border border-[#D9CBBE] bg-[#FFFDFC] text-[#75675D] hover:border-[#A86643] hover:text-[#A86643]"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* SEARCH + FILTER */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75675D]"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-[#D9CBBE] bg-[#FFFDFC] py-3 pl-11 pr-10 text-sm text-[#4A3428] outline-none transition focus:border-[#A86643]"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#75675D]"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* FILTER / SORT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-full border border-[#D9CBBE] bg-[#FFFDFC] px-5 py-3 text-sm text-[#4A3428]"
              >
                <SlidersHorizontal size={17} />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-[#D9CBBE] bg-[#FFFDFC] px-5 py-3 text-sm text-[#4A3428] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          {/* FILTER PANEL */}
          {showFilters && (
            <div className="mb-8 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-6">
              {/* Filter Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#4A3428]">
                    Filters
                  </h3>

                  <p className="mt-1 text-sm text-[#75675D]">
                    Refine your product selection
                  </p>
                </div>

                <button
                  onClick={() => {
                    setPriceRange("all");
                    setRatingFilter(0);
                    setNewOnly(false);
                    setBestSellerOnly(false);
                  }}
                  className="text-sm font-medium text-[#A86643] hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* PRICE */}
                <div>
                  <h4 className="mb-4 font-medium text-[#4A3428]">Price</h4>

                  <div className="space-y-3 text-sm text-[#75675D]">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === "all"}
                        onChange={() => setPriceRange("all")}
                      />
                      All Prices
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === "under500"}
                        onChange={() => setPriceRange("under500")}
                      />
                      Under ₹500
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === "500-1000"}
                        onChange={() => setPriceRange("500-1000")}
                      />
                      ₹500 - ₹1000
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === "1000-1500"}
                        onChange={() => setPriceRange("1000-1500")}
                      />
                      ₹1000 - ₹1500
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === "above1500"}
                        onChange={() => setPriceRange("above1500")}
                      />
                      Above ₹1500
                    </label>
                  </div>
                </div>

                {/* RATING */}
                <div>
                  <h4 className="mb-4 font-medium text-[#4A3428]">Rating</h4>

                  <div className="space-y-3 text-sm text-[#75675D]">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 0}
                        onChange={() => setRatingFilter(0)}
                      />
                      All Ratings
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 4}
                        onChange={() => setRatingFilter(4)}
                      />
                      4★ & above
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 3}
                        onChange={() => setRatingFilter(3)}
                      />
                      3★ & above
                    </label>
                  </div>
                </div>

                {/* PRODUCT TYPE */}
                <div>
                  <h4 className="mb-4 font-medium text-[#4A3428]">
                    Product Type
                  </h4>

                  <div className="space-y-3 text-sm text-[#75675D]">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newOnly}
                        onChange={(e) => setNewOnly(e.target.checked)}
                      />
                      New Arrivals
                    </label>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={bestSellerOnly}
                        onChange={(e) => setBestSellerOnly(e.target.checked)}
                      />
                      Best Sellers
                    </label>
                  </div>
                </div>

                {/* RESULTS */}
                <div className="flex flex-col justify-center rounded-xl bg-[#EFE3D4] p-5">
                  <p className="text-sm text-[#75675D]">Matching Products</p>

                  <p className="mt-1 text-3xl font-bold text-[#4A3428]">
                    {filteredProducts.length}
                  </p>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="mt-4 rounded-full bg-[#4A3428] px-4 py-2 text-sm text-white transition hover:bg-[#A86643]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT COUNT */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[#75675D]">
              Showing{" "}
              <span className="font-semibold text-[#4A3428]">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {search && (
              <p className="text-sm text-[#75675D]">Search: "{search}"</p>
            )}
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE3D4]">
                <Search className="text-[#A86643]" size={25} />
              </div>

              <h2 className="text-xl font-semibold text-[#4A3428]">
                No products found
              </h2>

              <p className="mt-2 text-sm text-[#75675D]">
                Try another category or search for something else.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-block rounded-full bg-[#4A3428] px-6 py-3 text-sm text-white"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Shop;
