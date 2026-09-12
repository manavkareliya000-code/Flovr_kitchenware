import { ArrowRight } from "lucide-react";
import promoImage from "../../assets/images/flovr-promo.png";

function PromoSection() {
  return (
    <section className="bg-[#F8F1E7]  ">
      <div className="mx-auto w-full">
        <div className="relative min-h-[520px] overflow-hidden bg-[#E8DDD0] md:min-h-[580px]">
          {/* ================= IMAGE ================= */}
          <img
            src={promoImage}
            alt="FLOVR home essentials collection"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* ================= OVERLAY ================= */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-[#171717]/75 to-transparent" />

          {/* ================= CONTENT ================= */}
          <div className="relative z-10 flex min-h-[520px] items-center px-7 py-12 sm:px-10 md:min-h-[580px] md:px-14 lg:px-20">
            <div className="max-w-[500px] text-white">
              <p className="mb-4 text-[10px] md:text-sm font-medium uppercase tracking-[0.3em] text-[#E7B894]">
                The FLOVR Collection
              </p>

              <h2 className="font-serif text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                Make Space
                <br />
                <span className="text-[#E7B894]">For What Matters.</span>
              </h2>

              <p className="mt-6 max-w-[430px] text-sm leading-7 text-white/85 sm:text-base">
                Discover thoughtfully designed essentials that transform
                everyday spaces into beautiful, organized homes.
              </p>

              <a
                href="/shop"
                className="group mt-8 inline-flex h-8 md:h-12 items-center gap-3 bg-white px-4 md:px-7 text-[7px] md:text-xs font-semibold uppercase tracking-[0.15em] text-[#171717] transition-all duration-300 hover:bg-[#9A542C] hover:text-white"
              >
                Explore Collection
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoSection;
