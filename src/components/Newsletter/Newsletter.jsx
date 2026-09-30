import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "../common/Reveal";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative overflow-hidden rounded-2xl bg-[#171717] px-6 py-14 sm:px-10 md:px-16 md:py-16 lg:px-20">
          {/* ================= DECORATIVE BACKGROUND ================= */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/20" />

          <div className="relative z-10 mx-auto max-w-[750px] text-center">
            {/* ================= SMALL HEADING ================= */}

            <Reveal direction="up" duration={700}>
              <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#E7B894]">
                Stay Connected
              </p>
            </Reveal>

            {/* ================= MAIN HEADING ================= */}

            <Reveal direction="up" delay={120} duration={800}>
              <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                Bring More FLOVR
                <br />
                <span className="text-[#E7B894]">Into Your Home.</span>
              </h2>
            </Reveal>

            {/* ================= DESCRIPTION ================= */}

            <Reveal direction="up" delay={240} duration={800}>
              <p className="mx-auto mt-5 max-w-[560px] text-sm leading-6 text-white/65 sm:text-base">
                Be the first to discover new arrivals, special offers and ideas
                for creating a more beautiful, organized home.
              </p>
            </Reveal>

            {/* ================= FORM ================= */}

            <Reveal direction="up" delay={360} duration={800}>
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="
                      h-12 flex-1
                      border border-white/20
                      bg-white/10
                      px-4
                      py-4
                      text-sm text-white
                      outline-none
                      placeholder:text-white/40
                      transition-colors duration-300
                      focus:border-[#E7B894]
                    "
                  />

                  <button
                    type="submit"
                    className="
                      group flex h-12
                      items-center justify-center
                      gap-2
                      bg-white
                      px-7
                      text-xs font-medium
                      uppercase tracking-[0.15em]
                      text-[#171717]
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#9A542C]
                      hover:text-white
                    "
                  >
                    Subscribe
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>
                </form>
              ) : (
                /* ================= SUCCESS ================= */
                <div className="mx-auto mt-8 flex max-w-[560px] items-center justify-center gap-2 border border-white/20 bg-white/10 px-5 py-4 text-sm text-white">
                  <Check
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#E7B894]"
                  />

                  <span>You're successfully subscribed to FLOVR.</span>
                </div>
              )}
            </Reveal>

            {/* ================= PRIVACY TEXT ================= */}

            <Reveal direction="up" delay={480} duration={600}>
              <p className="mt-4 text-[10px] text-white/40">
                By subscribing, you agree to receive updates from FLOVR.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
