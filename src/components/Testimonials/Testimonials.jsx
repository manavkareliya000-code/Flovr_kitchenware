import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const testimonials = [
  {
    id: 1,
    name: "Aarav Shah",
    role: "Customer",
    message:
      "I really loved the quality of the kitchen products. Everything feels useful, premium and beautifully designed.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Riya Patel",
    role: "Customer",
    message:
      "The storage products helped me organize my kitchen perfectly. The quality is great and delivery was very smooth.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    name: "Kabir Mehta",
    role: "Customer",
    message:
      "FLOVR has some really practical household products. I liked the design, finishing and overall shopping experience.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 4,
    name: "Anaya Desai",
    role: "Customer",
    message:
      "The products look beautiful in my home and are actually very useful. I will definitely shop from FLOVR again.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 5,
    name: "Vivaan Joshi",
    role: "Customer",
    message:
      "Everything from the product quality to the packaging was impressive. The products feel worth the price.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: 6,
    name: "Meera Shah",
    role: "Customer",
    message:
      "I bought a few organizers for my home and they made such a difference. Simple products with beautiful designs.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=44",
  },
];

/* =========================================================
   RATING
========================================================= */

function Rating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={17}
          fill={
            index < rating
              ? "currentColor"
              : "none"
          }
          className={
            index < rating
              ? "text-[#A86643]"
              : "text-[#D9CBBE]"
          }
        />
      ))}
    </div>
  );
}

/* =========================================================
   TESTIMONIAL CARD
========================================================= */

function TestimonialCard({
  testimonial,
  index,
  pairIndex,
}) {
  /*
   * First card and second card have
   * different positions/rotations.
   *
   * This gives the same stacked
   * composition as the reference.
   */

  const isFirst = index === 0;

  /*
   * Change direction for every pair.
   *
   * Pair 0:
   * first  -> left/up
   * second -> right/down
   *
   * Pair 1:
   * first  -> right/up
   * second -> left/down
   *
   * Pair 2:
   * first  -> left/up
   * second -> right/down
   */

  const reverse = pairIndex % 2 !== 0;

  let rotate;
  let x;
  let y;

  if (!reverse) {
    if (isFirst) {
      rotate = -2;
      x = -8;
      y = 0;
    } else {
      rotate = 2;
      x = 8;
      y = -4;
    }
  } else {
    if (isFirst) {
      rotate = 2;
      x = 8;
      y = 0;
    } else {
      rotate = -2;
      x = -8;
      y = -4;
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: reverse ? -40 : 40,
        y: 35,
        rotate: rotate + (reverse ? -4 : 4),
      }}
      animate={{
        opacity: 1,
        x,
        y,
        rotate,
      }}
      exit={{
        opacity: 0,
        x: reverse ? 40 : -40,
        y: -30,
        rotate: rotate + (reverse ? 4 : -4),
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-[28px] border px-5 py-5 shadow-[0_18px_35px_rgba(74,52,40,0.10)] sm:px-7 sm:py-6 ${
        isFirst
          ? "border-[#D9CBBE] bg-[#FFFDFC]"
          : "border-[#D9CBBE] bg-[#EFE3D4]"
      }`}
    >
      {/* =================================================
          TOP CONTENT
      ================================================= */}

      <div className="flex items-start justify-between gap-4">

        {/* CUSTOMER */}

        <div className="flex min-w-0 items-center gap-3">

          {/* AVATAR */}

          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#4A3428] bg-[#E8DCD0] sm:h-14 sm:w-14">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* NAME */}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-bold text-[#4A3428] sm:text-base">
                {testimonial.name}
              </h3>

              <BadgeCheck
                size={16}
                className="shrink-0 text-[#A86643]"
                fill="#F8F1E7"
              />
            </div>

            <p className="mt-0.5 text-xs text-[#75675D] sm:text-sm">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* RATING */}

        <div className="shrink-0 rounded-full border border-[#D9CBBE] bg-[#FFFDFC] px-3 py-2 shadow-sm sm:px-4">
          <Rating
            rating={testimonial.rating}
          />
        </div>
      </div>

      {/* =================================================
          MESSAGE
      ================================================= */}

      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#4A3428] sm:text-base sm:leading-8">
        {testimonial.message}
      </p>
    </motion.div>
  );
}

/* =========================================================
   TESTIMONIAL SECTION
========================================================= */

function Testimonials() {
  const [pairIndex, setPairIndex] = useState(0);

  /*
   * Each pair contains two testimonials.
   */

  const totalPairs = Math.ceil(
    testimonials.length / 2,
  );

  /* =======================================================
     AUTO CHANGE
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setPairIndex((current) => {
        return (current + 1) % totalPairs;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPairs]);

  /* =======================================================
     CURRENT TWO TESTIMONIALS
  ======================================================= */

  const firstIndex = pairIndex * 2;

  const visibleTestimonials = [
    testimonials[firstIndex],
    testimonials[
      (firstIndex + 1) %
        testimonials.length
    ],
  ];

  return (
    <section className="relative overflow-hidden bg-[#fcf8f3] px-4 py-20 sm:px-6 lg:px-8 lg:py-10">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* BIG SOFT CIRCLE */}

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full border-[45px] border-[#F1E9DF]" />

        <div className="absolute -right-48 bottom-0 h-[550px] w-[550px] rounded-full border-[45px] border-[#F1E9DF]" />

        {/* DOT PATTERN */}

        <div className="absolute left-[7%] top-[15%] grid grid-cols-5 gap-2 opacity-40">
          {Array.from({ length: 25 }).map(
            (_, index) => (
              <span
                key={index}
                className="h-1 w-1 rounded-full bg-[#A86643]"
              />
            ),
          )}
        </div>

        <div className="absolute right-[7%] top-[15%] grid grid-cols-5 gap-2 opacity-40">
          {Array.from({ length: 25 }).map(
            (_, index) => (
              <span
                key={index}
                className="h-1 w-1 rounded-full bg-[#A86643]"
              />
            ),
          )}
        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="relative mx-auto max-w-5xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-12 text-center sm:mb-16">

          <p className="text-2xl font-medium italic text-[#A86643] sm:text-3xl">
            Guest Testimonials
          </p>

          <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-[#4A3428] sm:text-5xl lg:text-6xl">
            What They Say?
          </h2>

        </div>

        {/* =================================================
            TWO TESTIMONIALS
        ================================================= */}

        <div className="mx-auto max-w-4xl">

          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={pairIndex}
              className="space-y-5 sm:space-y-7"
            >
              {visibleTestimonials.map(
                (
                  testimonial,
                  index,
                ) => (
                  <TestimonialCard
                    key={
                      testimonial.id
                    }
                    testimonial={
                      testimonial
                    }
                    index={
                      index
                    }
                    pairIndex={
                      pairIndex
                    }
                  />
                ),
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* =================================================
            SMALL PROGRESS
        ================================================= */}

        <div className="mt-10 flex justify-center gap-2">

          {Array.from({
            length: totalPairs,
          }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setPairIndex(index)
              }
              className={`h-2 rounded-full transition-all duration-500 ${
                pairIndex === index
                  ? "w-8 bg-[#A86643]"
                  : "w-2 bg-[#D9CBBE]"
              }`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;