import {
  Sparkles,
  ShieldCheck,
  Heart,
  Home,
} from "lucide-react";

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
        <div className="mx-auto max-w-[650px] text-center">

          <p className="mb-3 text-[16px] font-medium uppercase tracking-[0.28em] text-[#9A542C]">
            Why FLOVR
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#171717] sm:text-5xl">
            Designed for Better Living
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#6d6259] sm:text-base">
            We believe everyday products should be more than
            useful. They should make your home feel simpler,
            calmer and more beautiful.
          </p>

        </div>

        {/* ================= FEATURES ================= */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className={`group px-6 py-10 text-center rounded-4xl sm:px-8 lg:py-12 bg-[#9A542C]  hover:scale-105 transition-all duration-300 ${
                  index !== 0
                    ? "border-t border-[#d8c9b8] sm:border-l sm:border-t-0"
                    : ""
                } ${
                  index === 2
                    ? "lg:border-l"
                    : ""
                }`}
              >

                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#cdbdaa] text-[#f5f3f2] transition-all duration-300 group-hover:border-[#9A542C] group-hover:bg-white group-hover:text-[#9A542C] ">
                  <Icon
                    size={23}
                    strokeWidth={1.3}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 font-serif text-xl text-[#fefefe]">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-[250px] text-sm leading-6 text-[#d8d3ce]">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default WhyFlovr;