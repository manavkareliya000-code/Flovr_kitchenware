import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/products";
import Reveal from "../common/Reveal";

function NewArrivals() {
  // Get new products and show ONLY 4 on Home
  const newProducts = products.filter((product) => product.isNew).slice(0, 4);

  return (
    <section className="bg-[#F8F1E7] px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        {/* ================= HEADER ================= */}
        <Reveal direction="up" duration={900}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-[#9A542C] md:text-[16px]">
                Just Arrived
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#171717] md:text-5xl">
                New Arrivals
              </h2>

              <p className="mt-4 max-w-[500px] text-sm leading-6 text-[#6d6259] sm:text-base">
                Fresh additions to the FLOVR collection, thoughtfully chosen for
                modern everyday living.
              </p>
            </div>

            {/* Desktop View All */}
            <Link
              to="/new-arrivals"
              className="group hidden items-center gap-2 border-b border-[#171717] pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#171717] md:flex"
            >
              View All New Arrivals
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </Reveal>

        {/* ================= PRODUCTS ================= */}
        {newProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {newProducts.map((product, index) => (
              <Reveal
                key={product.id}
                direction="up"
                delay={index * 120}
                duration={700}
              >
                <ProductCard key={product.id} product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal direction="up" duration={700}>
            <div className="mt-12 flex min-h-[250px] items-center justify-center border border-[#d8c9b8]">
              <div className="text-center">
                <p className="font-serif text-2xl text-[#171717]">
                  New Arrivals Coming Soon
                </p>

                <p className="mt-2 text-sm text-[#777]">
                  Stay tuned for our latest collection.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* ================= MOBILE VIEW ALL ================= */}
        <Reveal direction="up" delay={500} duration={600}>
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              to="/new-arrivals"
              className="group flex items-center gap-2 border-b border-[#171717] pb-1 text-xs font-medium uppercase tracking-[0.16em] text-[#171717]"
            >
              View All New Arrivals
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default NewArrivals;
