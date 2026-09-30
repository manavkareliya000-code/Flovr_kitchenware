import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";

import {
  ChefHat,
  Home,
  Package,
  Sparkles,
  Bath,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    name: "Kitchenware",
    description: "Cook & dine beautifully",
    path: "/Kitchenware",
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR-UUFvf18FsHCiuqU-e5oA4sfLqPNAqNDRaack1NHjcjzegX4r",
    icon: ChefHat,
  },
  {
    name: "Household",
    description: "Essentials for everyday living",
    path: "/Household",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    icon: Home,
  },
  {
    name: "Storage",
    description: "Organize your space",
    path: "/Storage",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSBSmzv2z6UURt6ktaB9OAkPEUBRSWDV7xTdLylpZhtHg7nk5qD234rsizfgqF-fLHUkHHFGLaAu7QKJicyd5HhK9Csxs6j0c68-m2864q9",
    icon: Package,
  },
  {
    name: "Cleaning",
    description: "Keep your home fresh",
    path: "/Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
    icon: Sparkles,
  },
  {
    name: "Bathroom",
    description: "Simple & smart essentials",
    path: "/Bathroom",
    image:
      "https://novatech.ind.in/wp-content/uploads/2025/08/Corner-Shelf-Organizer.webp",
    icon: Bath,
  },
];

function CategorySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================================================
     MOBILE SLIDER
  ========================================================= */

  const nextCategory = () => {
    setActiveIndex((current) =>
      current === categories.length - 1 ? 0 : current + 1,
    );
  };

  const previousCategory = () => {
    setActiveIndex((current) =>
      current === 0 ? categories.length - 1 : current - 1,
    );
  };

  return (
    <section className="bg-[#FFFF] px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADING
        ===================================================== */}

        <Reveal direction="up" duration={700}>
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 animate-[heroFadeUp_0.7s_ease-out_forwards] text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643] opacity-0">
              Explore FLOVR
            </p>

            <h2 className="animate-[heroFadeUp_0.8s_ease-out_0.15s_forwards] text-3xl font-semibold tracking-tight text-[#4A3428] opacity-0 sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mx-auto mt-3 max-w-xl animate-[heroFadeUp_0.8s_ease-out_0.3s_forwards] text-sm leading-6 text-[#75675D] opacity-0 sm:text-base">
              Discover thoughtfully selected essentials made for a beautiful,
              organized and comfortable home.
            </p>
          </div>
        </Reveal>


        {/* =====================================================
    MOBILE TOUCH CAROUSEL
===================================================== */}

        <div className="block lg:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="w-[82vw] shrink-0 snap-center"
                >
                  <Link
                    to={category.path}
                    className="group flex flex-col items-center text-center"
                  >
                    {/* =========================
                IMAGE
            ========================= */}

                    <div className="relative">
                      <div className="h-40 w-40 overflow-hidden rounded-full border-[7px] border-[#FFFDFC] bg-[#EDE3D7] shadow-[0_12px_35px_rgba(74,52,40,0.14)] transition-all duration-500 active:scale-[0.98]">
                        <img
                          src={category.image}
                          alt={category.name}
                          draggable="false"
                          className="h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
                        />
                      </div>

                      {/* ICON */}

                      <div className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#FFFDFC] bg-[#4A3428] text-white shadow-lg">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>

                      {/* ARROW */}

                      <div className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFFDFC] bg-[#FFFDFC] text-[#4A3428] shadow-md">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    {/* =========================
                CATEGORY NAME
            ========================= */}

                    <h3 className="mt-5 text-xl font-semibold text-[#4A3428]">
                      {category.name}
                    </h3>

                    {/* =========================
                DESCRIPTION
            ========================= */}

                    <p className="mt-1 max-w-[220px] text-sm leading-5 text-[#75675D]">
                      {category.description}
                    </p>

                    {/* =========================
                EXPLORE
            ========================= */}

                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#A86643]">
                      Explore
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          

          <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#A08F82]">
            Swipe to explore
          </p>
        </div>

        {/* =====================================================
            DESKTOP CATEGORY LAYOUT
            Your original design
        ===================================================== */}

        <div className="hidden flex-wrap justify-center gap-7 px-2 pb-4 sm:gap-8 lg:flex lg:gap-12">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Reveal
                key={category.name}
                direction="up"
                delay={index * 120}
                duration={700}
              >
                <Link
                  to={category.path}
                  className="group flex flex-col items-center text-center opacity-0 animate-[categoryReveal_0.8s_ease-out_forwards]"
                  style={{
                    animationDelay: `${0.15 + index * 0.12}s`,
                  }}
                >
                  {/* =============================
                      CIRCLE
                  ============================== */}

                  <div className="relative">
                    {/* MAIN CIRCLE */}

                    <div className="h-30 w-30 overflow-hidden rounded-full border-[6px] border-[#FFFDFC] bg-[#EDE3D7] shadow-[0_8px_25px_rgba(74,52,40,0.10)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#A86643] group-hover:shadow-[0_18px_35px_rgba(74,52,40,0.18)] md:h-36 md:w-36 lg:h-44 lg:w-44">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* FLOATING ICON */}

                    <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFFDFC] bg-[#4A3428] text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#A86643]">
                      <Icon size={16} strokeWidth={1.8} />
                    </div>

                    {/* ARROW */}

                    <div className="absolute left-1 top-1 flex h-8 w-8 -translate-x-2 -translate-y-2 items-center justify-center rounded-full border-2 border-[#FFFDFC] bg-[#FFFDFC] text-[#4A3428] opacity-0 shadow-md transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-6 group-hover:opacity-100 group-hover:bg-[#A86643] group-hover:text-white">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* CATEGORY NAME */}

                  <h3 className="mt-5 text-base font-semibold text-[#4A3428] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#A86643] sm:text-lg">
                    {category.name}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-1 max-w-[100px] text-xs leading-5 text-[#75675D] transition-all duration-300 group-hover:text-[#4A3428] sm:text-sm">
                    {category.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
