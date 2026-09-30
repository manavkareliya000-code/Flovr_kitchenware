import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Heart,
  Sparkles,
  ShieldCheck,
  Home,
} from "lucide-react";

function About() {
  const values = [
    {
      icon: Sparkles,
      title: "Thoughtful Design",
      description:
        "Every product is chosen with a focus on practical design, modern living and everyday convenience.",
    },
    {
      icon: Home,
      title: "Made for Everyday Life",
      description:
        "From the kitchen to the bathroom, FLOVR brings useful products that fit naturally into your home.",
    },
    {
      icon: ShieldCheck,
      title: "Quality First",
      description:
        "We believe household essentials should be reliable, functional and made to be part of your daily routine.",
    },
    {
      icon: Heart,
      title: "Simple Living",
      description:
        "Our goal is to make everyday spaces feel more organized, comfortable and enjoyable.",
    },
  ];

  const categories = [
    {
      title: "Kitchenware",
      description: "Useful essentials for a better kitchen.",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
      link: "/kitchenware",
    },
    {
      title: "Storage",
      description: "Smart solutions to organize your space.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      link: "/storage",
    },
    {
      title: "Household",
      description: "Everyday products for modern homes.",
      image:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
      link: "/household",
    },
  ];

  return (
    <main className="bg-[#F7F1E8] text-[#4A3428]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-5 py-6 pt-16 sm:px-8 md:py-20 lg:px-10 lg:py-2">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-2">
          {/* Content */}
          <div className="flex items-center justify-center">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
                About FLOVR
              </p>

              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Designed for
                <span className="block text-[#A86643]">
                  Better Living.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#75675D] sm:text-base">
                FLOVR brings together thoughtfully selected kitchenware,
                household essentials and organization products designed to
                make everyday living simpler and more beautiful.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
              >
                Explore Collection
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden hidden lg:block flex items-center lg:pb-24 lg:mt-1">
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"
              alt="Modern FLOVR home"
              className=" w-full h-full aspect-[4/3] rounded-3xl object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F1E8]/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="overflow-hidden rounded-3xl bg-[#EDE3D7]">
            <img
              src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85"
              alt="FLOVR kitchen essentials"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Small things can make
              <span className="block text-[#A86643]">
                everyday life better.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#75675D] sm:text-base">
              <p>
                FLOVR was created with a simple idea — everyday household
                products should be useful, beautiful and easy to live with.
              </p>

              <p>
                From organizing your kitchen counter to keeping your home
                neat and comfortable, we focus on products that solve real
                everyday needs.
              </p>

              <p>
                We believe good design does not always have to be complicated.
                Sometimes, the simplest product can make the biggest
                difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="border-y border-[#D9CBBE] bg-[#FFFDFC]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
              What We Believe
            </p>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Made with purpose.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#75675D] sm:text-base">
              Everything we do is guided by a few simple principles that
              keep our products useful and our experience effortless.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#D9CBBE] bg-[#F7F1E8] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A3428] text-white">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-5 text-base font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#75675D]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY FLOVR ================= */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
              Why FLOVR
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Everything your home needs,
              <span className="block text-[#A86643]">
                thoughtfully selected.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#75675D] sm:text-base">
              We focus on practical products that combine everyday
              functionality with a clean, modern aesthetic.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Practical products for everyday use",
                "Modern and functional designs",
                "Kitchen & household essentials",
                "Smart organization solutions",
                "Simple shopping experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
                    <Check size={14} />
                  </span>

                  <span className="text-sm font-medium text-[#4A3428]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"
                alt="FLOVR kitchen"
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl sm:mt-12">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                alt="Organized home"
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-[#EDE3D7]">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
                Explore FLOVR
              </p>

              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Find what fits your home.
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A3428] transition hover:text-[#A86643]"
            >
              View All Products
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.link}
                className="group overflow-hidden rounded-3xl bg-[#FFFDFC]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-[#4A3428]">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#75675D]">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#A86643]">
                    Shop Now
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
    </main>
  );
}

export default About;