import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/images/flovr-desktop-banner1.png";
import heromobileImage from "../../assets/images/flovr-mobile-banner.png";

function Hero() {
  return (
    <section className="w-full bg-[#F8F1E7]">
      {/* =========================
          DESKTOP HERO
      ========================= */}
      <div className="relative hidden min-h-[calc(100vh-76px)] overflow-hidden lg:block">
        <div>
          {/* Background Image */}
          <img
            src={heroImage}
            alt="FLOVR beautifully organized living"
            className="absolute inset-0 h-full object-cover object-center"
          />
        </div>

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-[#F8F1E7]/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-125px)] max-w-[1500px] items-center px-10 xl:px-20">
          <div className="max-w-[580px]">
            {/* Small Brand Text */}
            {/* <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-[#9A542C]">
              FLOVR
            </p> */}

            {/* Main Heading */}
            <h1 className="font-serif text-6xl leading-[1.05] tracking-tight text-[#171717] xl:text-6xl">
              Beautifully
              <br />
              <span className="text-[#9A542C]">Organized</span>
              <br />
              Living.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[470px] text-base leading-7 text-[#4A4038] xl:text-md">
              Thoughtfully designed kitchenware and household essentials that
              bring simplicity, style and organization to everyday living.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/shop"
                className="group flex h-12 items-center gap-3 bg-[#171717] px-7 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#9A542C]"
              >
                SHOP NOW
                <ArrowRight
                  size={17}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="/kitchenware"
                className="flex h-12 items-center border border-[#171717] bg-white/40 px-7 text-sm font-medium tracking-wide text-[#171717] transition-all duration-300 hover:bg-[#171717] hover:text-white"
              >
                EXPLORE KITCHENWARE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE HERO
      ========================= */}
      <div className="relative block overflow-hidden lg:hidden">
        {/* Mobile Image */}
        <img
          src={heromobileImage}
          alt="FLOVR home organization"
          className="h-auto min-h-[400px] opacity-25 w-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/55 via-transparent to-transparent" />

        {/* Mobile Content */}
        <div className="absolute inset-x-0 top-10 md:bottom-0 px-5 pb-8 sm:px-8 sm:pb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#9A542C]">
            FLOVR
          </p>

          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-[#171717] ">
            Beautifully
            <br />
            <span className="text-[#9A542C]">Organized</span>
            <br />
            Living.
          </h1>

          <p className="mt-4 max-w-[360px] text-sm leading-6 text-black/90">
            Thoughtfully designed essentials for a beautiful, organized home.
          </p>

          {/* Mobile Buttons */}
          <div className="mt-6 flex gap-3">
            <a
              href="/shop"
              className="flex h-9 items-center justify-center bg-[#171717] px-5 text-xs font-medium tracking-wide text-[#ffff]"
            >
              SHOP NOW
            </a>

            <a
              href="/kitchenware"
              className="flex h-9 items-center justify-center border border-[#171717] bg-white/80  px-5 text-xs font-medium tracking-wide text-black"
            >
              KITCHENWARE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
