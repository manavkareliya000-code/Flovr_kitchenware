import React from "react";
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* =========================================================
   TRUSTED PARTNERS DATA
========================================================= */

const partners = [
  {
    name: "Amazon",
    logo: "https://m.media-amazon.com/images/I/51HCHFclmmL.jpg",
    description: "Shop FLOVR",
  },
  {
    name: "Flipkart",
    logo: "https://www.itln.in/h-upload/2022/04/29/25071-flipkart1.webp",
    description: "Shop FLOVR",
  },
  {
    name: "Meesho",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/050/816/807/small_2x/meesho-transparent-icon-free-png.png",
    description: "Shop FLOVR",
  },
  {
    name: "Amazon",
    logo: "https://m.media-amazon.com/images/I/51HCHFclmmL.jpg",
    description: "Shop FLOVR",
  },
  {
    name: "Flipkart",
    logo: "https://www.itln.in/h-upload/2022/04/29/25071-flipkart1.webp",
    description: "Shop FLOVR",
  },
  {
    name: "Meesho",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/050/816/807/small_2x/meesho-transparent-icon-free-png.png",
    description: "Shop FLOVR",
  },
];

/* =========================================================
   PARTNER CARD
========================================================= */

function PartnerCard({ partner, index }) {
  return (
    <div
      className="group w-[250px] shrink-0"
      style={{
        animation: `partnerFloat ${
          3 + (index % 3) * 0.6
        }s ease-in-out infinite`,
        animationDelay: `${index * 0.25}s`,
      }}
    >
      <div className="relative overflow-hidden rounded-[24px] border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-[0_8px_30px_rgba(74,52,40,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#A86643] group-hover:shadow-[0_18px_40px_rgba(74,52,40,0.14)]">

        {/* =================================================
            SHINE EFFECT
        ================================================= */}

        <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 -skew-x-12 bg-white/60 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />

        {/* =================================================
            TOP
        ================================================= */}

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A86643]">
            Marketplace
          </span>

          <ArrowUpRight
            size={17}
            className="text-[#75675D] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#A86643]"
          />
        </div>

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="mt-1 flex h-[90px] items-center justify-center rounded-2xl">

          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-h-19 max-w-[190px] object-contain transition-transform duration-500 group-hover:scale-110"
          />

        </div>

        {/* =================================================
            NAME
        ================================================= */}

        <div className="mt-1 text-center">

          {/* <h3 className="text-lg font-bold text-[#4A3428]">
            {partner.name}
          </h3> */}

          <p className="mt-1 text-xs text-[#75675D]">
            {partner.description}
          </p>

        </div>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="mt-5 flex items-center justify-between border-t border-[#E8DDD3] pt-4">

          <span className="text-xs font-medium text-[#75675D]">
            Available here
          </span>

          <ExternalLink
            size={14}
            className="text-[#A86643]"
          />

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   TRUSTED PARTNERS
========================================================= */

function TrustedPartners() {
  return (
    <section className="relative overflow-hidden bg-[#F8F1E7] py-16 sm:py-20 lg:py-24">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#D6AE8C]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#A86643]/10 blur-3xl" />

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A86643]">

            <Sparkles size={14} />

            Trusted Partners

          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#4A3428] sm:text-4xl lg:text-5xl">
            FLOVR, wherever you shop.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#75675D] sm:text-base">
            Find your favourite FLOVR products across popular
            marketplaces and shop from the platform you love.
          </p>

        </div>

        {/* =================================================
            PARTNER TRACK
        ================================================= */}

        <div className="relative mt-12">

          {/* LEFT FADE */}

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#F8F1E7] to-transparent" />

          {/* RIGHT FADE */}

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#F8F1E7] to-transparent" />

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden overflow-hidden py-6 lg:block">

            <div
              className="flex w-max gap-6"
              style={{
                animation:
                  "partnerSlide 25s linear infinite",
              }}
            >

              {/* FIRST SET */}

              {partners.map((partner, index) => (
                <PartnerCard
                  key={`first-${partner.name}`}
                  partner={partner}
                  index={index}
                />
              ))}

              {/* SECOND SET */}

              {partners.map((partner, index) => (
                <PartnerCard
                  key={`second-${partner.name}`}
                  partner={partner}
                  index={index + partners.length}
                />
              ))}

            </div>

          </div>

          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="flex gap-4 overflow-x-auto py-6 pb-7 lg:hidden scrollbar-hide">

            {partners.map((partner, index) => (
              <PartnerCard
                key={partner.name}
                partner={partner}
                index={index}
              />
            ))}

          </div>

        </div>

        {/* =================================================
            BOTTOM TEXT
        ================================================= */}

        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-[#75675D] sm:text-sm">

          <span className="h-px w-10 bg-[#D9CBBE]" />

          <span>
            One brand · Multiple marketplaces
          </span>

          <span className="h-px w-10 bg-[#D9CBBE]" />

        </div>

      </div>

      {/* =================================================
          ANIMATIONS
      ================================================= */}

      <style>{`

        @keyframes partnerSlide {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(
              calc(-50% - 12px)
            );
          }

        }

        @keyframes partnerFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }

        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {

          .scrollbar-hide {
            scroll-behavior: auto;
          }

        }

      `}</style>

    </section>
  );
}

export default TrustedPartners;