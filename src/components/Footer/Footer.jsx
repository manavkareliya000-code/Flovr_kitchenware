import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4A3428] text-white">

      {/* ================= TOP FOOTER ================= */}
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-6 md:px-8 md:py-16 lg:px-10 lg:py-24">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-10">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">

            <a
              href="/"
              className="font-serif text-4xl tracking-wide text-[#FFFDFC]"
            >
              FLOVR
            </a>

            <p className="mt-5 max-w-[380px] text-sm leading-7 text-white">
              Thoughtfully designed kitchenware and household essentials
              that bring simplicity, style and organization to everyday
              living.
            </p>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="mt-7 flex items-center gap-3">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#D6AE8C] hover:bg-[#A86643] hover:text-white"
              >
                <FaInstagram size={17} />
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#D6AE8C] hover:bg-[#A86643] hover:text-white"
              >
                <FaFacebookF size={15} />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#D6AE8C] hover:bg-[#A86643] hover:text-white"
              >
                <FaYoutube size={18} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#D6AE8C] hover:bg-[#A86643] hover:text-white"
              >
                <FaWhatsapp size={18} />
              </a>

            </div>
          </div>

          {/* ================= SHOP ================= */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D6AE8C]">
              Shop
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="/shop"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="/kitchenware"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Kitchenware
                </a>
              </li>

              <li>
                <a
                  href="/household"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Household
                </a>
              </li>

              <li>
                <a
                  href="/storage"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Storage & Organization
                </a>
              </li>

              <li>
                <a
                  href="/cleaning"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Cleaning
                </a>
              </li>

              <li>
                <a
                  href="/new-arrivals"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  New Arrivals
                </a>
              </li>

            </ul>
          </div>

          {/* ================= CUSTOMER CARE ================= */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D6AE8C]">
              Customer Care
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="/contact"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Contact Us
                </a>
              </li>

               <li>
                <a
                  href="/about"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  About Us
                </a>
              </li>

              

              <li>
                <a
                  href="/returns"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Returns & Exchanges
                </a>
              </li>

             

              <li>
                <a
                  href="/privacy"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>
          </div>

          {/* ================= GET IN TOUCH ================= */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D6AE8C]">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-5">

              {/* WhatsApp */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                  WhatsApp
                </p>

                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  <FaWhatsapp size={16} />
                  Chat with us
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                  Email
                </p>

                <a
                  href="mailto:hello@flovr.in"
                  className="mt-1 block text-sm text-white transition-colors hover:text-[#D6AE8C]"
                >
                  hello@flovr.in
                </a>
              </div>

              {/* Support */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                  Support
                </p>

                <p className="mt-1 text-sm leading-6 text-white">
                  Monday – Saturday
                  <br />
                  10:00 AM – 6:00 PM
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-white/15">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-5 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          <p className="text-[11px] text-white/50">
            © {currentYear} FLOVR. All rights reserved.
          </p>

          <p className="text-[11px] text-white/50">
            Designed for better living.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;