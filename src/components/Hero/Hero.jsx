import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import heroImage from "../../assets/images/flovr-desktop-banner1.png";
import heroMobileImage from "../../assets/images/flovr-mobile-banner.png";

// =========================================================
// HERO SLIDES
// =========================================================
//
// Add your future images here:
//
import heroImage2 from "../../assets/images/flovr-desktop-banner2.png";
import heroImage3 from "../../assets/images/flovr-desktop-banner3.png";
//
// import heroMobileImage2 from "../../assets/images/flovr-mobile-banner2.png";
// import heroMobileImage3 from "../../assets/images/flovr-mobile-banner3.png";
//

const slides = [
  {
    id: 1,

    desktopImage: heroImage,
    mobileImage: heroMobileImage,

    smallText: "FLOVR",

    title: (
      <>
        Beautifully
        <br />
        <span>Organized</span>
        <br />
        Living.
      </>
    ),

    description:
      "Thoughtfully designed kitchenware and household essentials that bring simplicity, style and organization to everyday living.",

    primaryButton: "SHOP NOW",

    secondaryButton: "EXPLORE COLLECTION",
  },

  {
    id: 2,

    // Replace these with banner 2 later
    desktopImage: heroImage2,
    mobileImage: heroMobileImage,

    smallText: "EVERYDAY ESSENTIALS",

    title: (
      <>
        Simple Things.
        <br />
        <span>Beautiful</span>
        <br />
        Living.
      </>
    ),

    description:
      "Discover practical pieces designed to make your kitchen and home feel cleaner, calmer and more beautiful.",

    primaryButton: "SHOP NOW",

    secondaryButton: "VIEW COLLECTION",
  },

  {
    id: 3,

    // Replace these with banner 3 later
    desktopImage: heroImage3,
    mobileImage: heroMobileImage,

    smallText: "SMARTER HOME",

    title: (
      <>
        Make Space.
        <br />
        Make It
        <br />
        <span>Beautiful.</span>
      </>
    ),

    description:
      "From clever storage to everyday kitchenware, bring effortless organization into every corner of your home.",

    primaryButton: "SHOP NOW",

    secondaryButton: "DISCOVER FLOVR",
  },
];

// =========================================================
// HERO
// =========================================================

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length;

  // =======================================================
  // NEXT SLIDE
  // =======================================================

  const nextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % totalSlides);
  };

  // =======================================================
  // PREVIOUS SLIDE
  // =======================================================

  const previousSlide = () => {
    setCurrentSlide((previous) => (previous - 1 + totalSlides) % totalSlides);
  };

  // =======================================================
  // GO TO SLIDE
  // =======================================================

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // =======================================================
  // AUTO SLIDER
  // =======================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % totalSlides);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [totalSlides]);

  // =======================================================
  // CURRENT SLIDE
  // =======================================================

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#F8F1E7]">
      {/* ===================================================
          DESKTOP HERO
      =================================================== */}

      <div className="relative hidden min-h-[calc(100vh-76px)] overflow-hidden lg:block">
        {/* =================================================
            BACKGROUND IMAGE
        ================================================= */}

        <div className="absolute inset-0">
          <img
            key={`desktop-${slide.id}`}
            src={slide.desktopImage}
            alt="FLOVR organized home"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              animate-[heroImageIn_1s_ease-out]
            "
          />
        </div>

        {/* =================================================
            SOFT OVERLAY
        ================================================= */}

        <div className="absolute inset-0 bg-[#F8F1E7]/10" />

        {/* =================================================
            LEFT SOFT FADE
        ================================================= */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            w-[62%]
            bg-gradient-to-r
            from-[#F8F1E7]/90
            via-[#F8F1E7]/65
            to-transparent
          "
        />

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(100vh-125px)]
            max-w-[1500px]
            items-center
            px-10
            xl:px-20
          "
        >
          <div
            key={`content-${slide.id}`}
            className="
              max-w-[580px]
              animate-[heroContentIn_0.8s_ease-out]
            "
          >
            {/* =================================================
                DECORATIVE TOP LINE
            ================================================= */}

            <div className="mb-6 mt-4 flex items-center gap-4">
              <span className="h-px w-12 bg-[#9A542C]" />

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#9A542C]
                "
              >
                {slide.smallText}
              </p>
            </div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1
              className="
                font-serif
                text-6xl
                leading-[1.02]
                tracking-tight
                text-[#171717]
                xl:text-[68px]
              "
            >
              {slide.title}
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-7
                max-w-[470px]
                text-base
                leading-7
                text-[#4A4038]
              "
            >
              {slide.description}
            </p>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-9 flex flex-wrap gap-4">
              {/* SHOP NOW */}

              <a
                href="/shop"
                className="group relative flex h-12 items-center gap-3 overflow-hidden bg-[#171717] px-7 text-sm font-medium tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-x-1 hover:shadow-lg"
              >
                {/* Animated background */}
                <span className="absolute inset-0 -translate-x-full bg-[#9A542C] transition-transform duration-500 ease-out group-hover:translate-x-0" />

                {/* Button content */}
                <span className="relative z-10">{slide.primaryButton}</span>

                <ArrowRight
                  size={17}
                  strokeWidth={1.6}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-2"
                />
              </a>

              {/* SECONDARY BUTTON */}

              <a
                href="/shop"
                className="group relative flex h-12 items-center gap-3 overflow-hidden border border-[#171717] bg-transparent px-7 text-sm font-medium tracking-wide text-[#171717] shadow-sm transition-all duration-300 hover:-translate-x-1 hover:text-white hover:shadow-lg"
              >
                {/* Animated background */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#171717] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                {/* Button content */}
                <span className="relative z-10">
                  {slide.secondaryButton} 
                  </span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-2"
                />
              </a>
            </div>

            {/* =================================================
                DECORATIVE BOTTOM LINE
            ================================================= */}
          </div>
        </div>
      </div>

      {/* ===================================================
          MOBILE HERO
      =================================================== */}

      <div className="relative block min-h-[450px] overflow-hidden lg:hidden">
        {/* =================================================
            MOBILE IMAGE
        ================================================= */}

        <img
          key={`mobile-${slide.id}`}
          src={slide.mobileImage}
          alt="FLOVR home organization"
          className="
            absolute
            inset-0
            h-[430px]
            w-full
            object-cover
            object-center
            animate-[heroImageIn_1s_ease-out]
          "
        />

        {/* =================================================
            MOBILE OVERLAY
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#F8F1E7]/95
            via-[#F8F1E7]/65
            to-[#F8F1E7]/15
          "
        />

        {/* =================================================
            MOBILE CONTENT
        ================================================= */}

        <div
          key={`mobile-content-${slide.id}`}
          className="
            relative
            z-10
            px-5
            pt-2
            sm:px-8
            
            animate-[heroContentIn_0.8s_ease-out]
          "
        >
          {/* TOP LINE */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-[#9A542C]" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#9A542C]
              "
            >
              {slide.smallText}
            </p>
          </div>

          {/* HEADING */}

          <h1
            className="
              max-w-[390px]
              font-serif
              text-[42px]
              leading-[1.04]
              tracking-tight
              text-[#171717]
              sm:text-5xl
            "
          >
            {slide.title}
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-[360px]
              text-sm
              leading-6
              text-[#4A4038]
            "
          >
            {slide.description}
          </p>

          {/* BUTTONS */}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/shop"
              className="
                group
                flex
                h-11
                items-center
                justify-center
                gap-2
                bg-[#171717]
                px-5
                text-xs
                font-medium
                tracking-wide
                text-white
                transition-all
                duration-300
                hover:bg-[#9A542C]
              "
            >
              {slide.primaryButton}

              <ArrowRight size={14} />
            </a>

            <a
              href="/shop"
              className="
                group
                flex
                h-11
                items-center
                justify-center
                gap-2
                border
                border-[#171717]
                bg-white/70
                px-5
                text-xs
                font-medium
                tracking-wide
                text-[#171717]
                backdrop-blur
                transition-all
                duration-300
                hover:bg-[#171717]
                hover:text-white
              "
            >
              {slide.secondaryButton}

              <ArrowRight size={14} />
            </a>
          </div>

          {/* MOBILE DECORATION */}
        </div>
      </div>

      {/* ===================================================
          ANIMATIONS
      =================================================== */}

      <style>{`

        @keyframes heroImageIn {

          from {
            opacity: 0;
            transform: scale(1.04);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }

        }


        @keyframes heroContentIn {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        @media (prefers-reduced-motion: reduce) {

          [class*="animate-"] {
            animation: none !important;
          }

        }

      `}</style>
    </section>
  );
}

export default Hero;
