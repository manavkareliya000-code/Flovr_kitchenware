import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

function BestSellers() {
  // Show ALL best-selling products
  const bestProducts = products.filter(
    (product) => product.isBestSeller
  );

  return (
    <main className="min-h-screen bg-[#F7F1E8]">

      {/* ================= HERO ================= */}
      <section className="bg-[#F7F1E8] px-5 py-8 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">

          <div className="grid overflow-hidden rounded-[28px] bg-[#4A3428] lg:grid-cols-2">

            {/* LEFT */}
            <div className="flex items-center px-7 py-12 sm:px-10 md:px-14 lg:px-16">

              <div className="max-w-xl">

                <div className="mb-6 flex items-center gap-3">
                  <Star
                    size={16}
                    fill="currentColor"
                    className="text-[#D6AE8C]"
                  />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6AE8C]">
                    Loved by Customers
                  </span>
                </div>

                <h1 className="font-serif text-5xl leading-[1] text-white md:text-6xl">
                  The pieces
                  <br />
                  <span className="italic text-[#D6AE8C]">
                    everyone loves.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
                  Discover the products customers keep coming back to.
                  From smart storage to everyday kitchen essentials,
                  these are the FLOVR favorites.
                </p>

                <Link
                  to="#best-sellers"
                  className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#FFFDFC] px-6 py-3.5 text-sm font-semibold text-[#4A3428] transition hover:bg-[#D6AE8C]"
                >
                  Shop Customer Favorites

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">

              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85"
                alt="Beautiful organized kitchen"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />

              {/* Floating label */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <div className="rounded-full border border-white/40 bg-white/80 px-4 py-2.5 backdrop-blur-md">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A3428]">
                    FLOVR Favorites
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section
        id="best-sellers"
        className="mx-auto max-w-[1500px] px-5 py-12 sm:px-6 md:px-8 md:py-16 lg:px-10 lg:py-20"
      >

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86643]">
              Customer Favorites
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#4A3428] sm:text-4xl">
              Best Selling Products
            </h2>
          </div>

          <p className="text-sm text-[#75675D]">
            {bestProducts.length} products
          </p>

        </div>

        {bestProducts.length > 0 ? (

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">

            {bestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        ) : (

          <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-16 text-center">

            <Star
              size={28}
              className="mx-auto text-[#A86643]"
            />

            <h3 className="mt-4 font-serif text-2xl text-[#4A3428]">
              No Best Sellers Yet
            </h3>

            <p className="mt-2 text-sm text-[#75675D]">
              Customer favorites will appear here soon.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
            >
              Explore Shop
              <ArrowRight size={17} />
            </Link>

          </div>

        )}

      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-14 sm:px-6 md:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-3xl bg-[#EFE3D4] px-6 py-12 text-center sm:px-10 md:py-16">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A86643]">
            More to Explore
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight text-[#4A3428] sm:text-4xl md:text-5xl">
            Your next everyday favorite might be here.
          </h2>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#A86643]"
          >
            Explore All Products
            <ArrowRight size={17} />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default BestSellers;