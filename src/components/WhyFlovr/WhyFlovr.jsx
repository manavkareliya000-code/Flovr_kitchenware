import { Sparkles, ShieldCheck, Heart, Home } from "lucide-react";
import Reveal from "../common/Reveal";

const features = [
  {
    id: 1,
    icon: Sparkles,
    title: "Thoughtfully Designed",
    description:
      "Products designed with a focus on simplicity, functionality and modern living.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "We focus on practical products made to become a useful part of your everyday home.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Made for Everyday Life",
    description:
      "From kitchen essentials to storage solutions, everything is selected for everyday convenience.",
  },
  {
    id: 4,
    icon: Home,
    title: "Beautifully Organized",
    description:
      "Bring more order and simplicity to your spaces without compromising on style.",
  },
];

function WhyFlovr() {
  return (
    <section className="bg-[#F8F1E7] px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        {/* ================= HEADER ================= */}
        <Reveal direction="up" duration={800}>
          <div className="mx-auto max-w-[650px] text-center">
            <p className="mb-3 text-[16px] font-medium uppercase tracking-[0.28em] text-[#9A542C]">
              Why FLOVR
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
              Designed for Better Living
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#6d6259] sm:text-base">
              We believe everyday products should be more than useful. They
              should make your home feel simpler, calmer and more beautiful.
            </p>
          </div>
        </Reveal>

        {/* ================= FEATURES ================= */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal
                key={feature.id}
                direction="up"
                delay={index * 120}
                duration={700}
              >
                <div
                  className="
                    group relative h-full overflow-hidden
                    rounded-[28px]
                    border border-[#A86643]
                    bg-[#9A542C]
                    px-6 py-10
                    text-center
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_20px_45px_rgba(74,52,40,0.18)]
                    sm:px-8
                    lg:py-12
                  "
                >
                  {/* Decorative background circle */}
                  <div
                    className="
                      absolute -right-12 -top-12
                      h-32 w-32 rounded-full
                      bg-white/5
                      transition-all duration-500
                      group-hover:scale-150
                    "
                  />

                  {/* Icon */}
                  <div
                    className="
                      relative mx-auto flex h-16 w-16
                      items-center justify-center
                      rounded-full
                      border border-white/30
                      bg-white/10
                      text-white
                      transition-all duration-500
                      group-hover:rotate-6
                      group-hover:bg-white
                      group-hover:text-[#9A542C]
                    "
                  >
                    <Icon size={25} strokeWidth={1.4} />
                  </div>

                  {/* Number */}
                  <span
                    className="
                      absolute right-5 top-5
                      font-serif text-sm
                      text-white/30
                    "
                  >
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="
                      relative mt-6
                      font-serif text-xl
                      text-white
                      transition-colors duration-300
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      relative mx-auto mt-3
                      max-w-[250px]
                      text-sm leading-6
                      text-white/75
                    "
                  >
                    {feature.description}
                  </p>

                  {/* Bottom line */}
                  <div
                    className="
                      mx-auto mt-7
                      h-px w-8
                      bg-white/30
                      transition-all duration-500
                      group-hover:w-16
                      group-hover:bg-white/70
                    "
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyFlovr;
