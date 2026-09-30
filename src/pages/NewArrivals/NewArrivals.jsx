import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

function NewArrivals() {
  // Get all products marked as new
  const newProducts = products.filter((product) => product.isNew);

  return (
    <main className="min-h-screen bg-[#F7F1E8]">
      {/* Hero */}
      <section className="bg-[#F7F1E8]">
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-6 md:px-8 lg:px-10">
          <div className="grid overflow-hidden rounded-[28px] bg-[#EFE3D4] lg:grid-cols-2">
            {/* ================= LEFT CONTENT ================= */}
            <div className="flex items-center px-7 py-12 sm:px-10 md:px-14 lg:px-12 lg:py-12">
              <div className="max-w-xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#A86643]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
                    The Latest Edit
                  </span>
                </div>

                <h1 className="font-serif text-3xl leading-[1.05] text-[#4A3428] md:text-5xl">
                  New things
                  <br />
                  <span className="italic">for better living.</span>
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-6 text-[#75675D] sm:text-base">
                  Meet the newest additions to FLOVR — thoughtfully designed
                  kitchenware and household essentials made for beautiful,
                  organized everyday spaces.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#new-arrivals"
                    className="group inline-flex items-center gap-3 rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                  >
                    Explore New Arrivals
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <span className="text-[8px] md:text-xs uppercase tracking-[0.15em] text-[#75675D]">
                    Fresh • Functional • FLOVR
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative min-h-[320px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85"
                alt="Modern organized kitchen"
                className="absolute inset-0 h-full w-full md:h-[420px] object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFE3D4]/20 via-transparent to-black/10" />

              {/* Floating label */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="inline-flex items-center rounded-full border border-white/40 bg-white/80 px-4 py-2.5 backdrop-blur-md">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A3428]">
                    New Season · FLOVR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-6 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86643]">
              Latest Collection
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#4A3428] sm:text-4xl">
              Just In
            </h2>
          </div>

          <p className="text-sm text-[#75675D]">
            {newProducts.length} new products
          </p>
        </div>

        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-16 text-center">
            <h3 className="font-serif text-2xl text-[#4A3428]">
              No new arrivals yet
            </h3>

            <p className="mt-2 text-sm text-[#75675D]">
              New FLOVR products will appear here soon.
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

      {/* Bottom CTA */}
      <section className="px-5 pb-14 sm:px-6 md:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-3xl bg-[#4A3428] px-6 py-12 text-center sm:px-10 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6AE8C]">
            Discover FLOVR
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            Find something made for your everyday.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
            Explore our complete collection of kitchenware, storage, household
            and cleaning essentials.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FFFDFC] px-6 py-3 text-sm font-semibold text-[#4A3428] transition hover:bg-[#D6AE8C]"
          >
            Shop All Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NewArrivals;
