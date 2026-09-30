import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function FloatingButtons() {
  const [showTopButton, setShowTopButton] = useState(false);

  /* =========================================================
     SHOW / HIDE BACK TO TOP
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     WHATSAPP
  ========================================================= */

  const openWhatsApp = () => {
    const phoneNumber = "919999999999";

    const message =
      "Hello FLOVR, I would like to know more about your products.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* =====================================================
          FLOATING BUTTONS
      ===================================================== */}

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">

        {/* =================================================
            BACK TO TOP
        ================================================= */}

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`group flex h-11 w-11 items-center justify-center rounded-full border border-[#D9CBBE] bg-[#FFFDFC] text-[#4A3428] shadow-[0_8px_25px_rgba(74,52,40,0.15)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#4A3428] hover:text-white hover:shadow-[0_12px_30px_rgba(74,52,40,0.22)] ${
            showTopButton
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-4 scale-75 opacity-0"
          }`}
        >
          <ArrowUp
            size={19}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </button>

        {/* =================================================
            WHATSAPP
        ================================================= */}

        <button
          type="button"
          onClick={openWhatsApp}
          aria-label="Chat with FLOVR on WhatsApp"
          className="group relative flex h-12 w-12 md:h-13 md:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.30)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_14px_35px_rgba(37,211,102,0.40)]"
        >
          {/* Pulse ring */}

          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-60 animate-ping" />

          {/* Icon */}

          <FaWhatsapp
            size={29}
            className="relative z-10 transition-transform duration-300 group-hover:rotate-6"
          />

          {/* Small online dot */}

          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#4CAF50]" />
        </button>

      </div>
    </>
  );
}

export default FloatingButtons;