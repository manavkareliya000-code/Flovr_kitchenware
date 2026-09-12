import { Search, Heart, ShoppingCart, UserRound, Menu, X } from "lucide-react";

import { useState } from "react";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F1E7]">
      {/* =========================
          TOP HEADER
      ========================= */}
      <div className="border-b border-[#d8c9b8]">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex items-center justify-center lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={24} strokeWidth={1.7} />
            ) : (
              <Menu size={24} strokeWidth={1.7} />
            )}
          </button>

          {/* LOGO */}
          <div>
            <a
              href="/"
              className="font-serif text-[22px] tracking-[0.22em] text-[#171717] md:text-[34px]"
            >
              FLOVR
            </a>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden flex-1 px-12 lg:block">
            <div className="relative mx-auto max-w-[550px]">
              <Search
                size={19}
                strokeWidth={1.6}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d6259]"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="h-[44px] w-full rounded-full border border-[#cdbdaa] bg-white/60 pl-12 pr-4 text-sm text-[#171717] outline-none transition focus:border-[#9A542C]"
              />
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* ACCOUNT */}
            <button className="flex items-center gap-2 taxt-xs md:text-sm lg:flex">
              <UserRound size={20} strokeWidth={1.6} />

              <span className="hidden">Account</span>
            </button>

            {/* WISHLIST */}
            <button
              className="relative flex items-center taxt-xs md:text-sm lg:flex"
              aria-label="Wishlist"
            >
              <Heart size={21} strokeWidth={1.6} />

              {/* Wishlist Count */}
              <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#9A542C] px-1 text-[9px] text-white">
                0
              </span>
            </button>

            {/* CART */}
            <button
              className="relative flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={21} strokeWidth={1.6} />

              {/* Cart Count */}
              <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#9A542C] px-1 text-[9px] text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE SEARCH
      ========================= */}
      <div className="border-b border-[#d8c9b8] px-4 py-3 lg:hidden">
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.6}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d6259]"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="h-[44px] w-full rounded-full border border-[#cdbdaa] bg-white/60 pl-11 pr-4 text-sm outline-none transition focus:border-[#9A542C]"
          />
        </div>
      </div>

      {/* =========================
          DESKTOP NAVIGATION
      ========================= */}
      {/* =========================
    DESKTOP NAVIGATION
========================= */}
      <nav className="hidden border-b border-[#d8c9b8] lg:block">
        <div className="mx-auto flex h-[52px] max-w-[850px] text-md items-center justify-center gap-14 px-6">
          <div>
            <a href="/" className="transition-colors hover:text-[#9A542C]">
              Home
            </a>
          </div>

          <div>
            <a href="/shop" className="transition-colors hover:text-[#9A542C]">
              Shop
            </a>
          </div>

          <div>
            <a
              href="/new-arrivals"
              className="font-medium transition-colors hover:text-[#9A542C]"
            >
              Best Sellers
            </a>
          </div>

          <div>
            <a
              href="/new-arrivals"
              className="font-medium text-[#9A542C] transition-colors hover:text-[#171717]"
            >
              New Arrivals
            </a>
          </div>

          <div>
            <a href="/about" className="transition-colors hover:text-[#9A542C]">
              About Us
            </a>
          </div>

          <div>
            <a
              href="/contact"
              className="transition-colors hover:text-[#9A542C]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* =========================
          MOBILE MENU
      ========================= */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden border-b border-[#d8c9b8] bg-[#F8F1E7] transition-all duration-300 lg:hidden ${
          mobileMenu
            ? "visible max-h-[calc(100vh-130px)] overflow-y-auto opacity-100"
            : "invisible max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <nav className="px-6 py-5">
          <ul className="flex flex-col">
            <div className="border-b border-[#ded1c2]">
              <a
                href="/"
                className="block py-4 text-sm"
                onClick={() => setMobileMenu(false)}
              >
                Home
              </a>
            </div>

            <div className="border-b border-[#ded1c2]">
              <a
                href="/shop"
                className="block py-4 text-sm"
                onClick={() => setMobileMenu(false)}
              >
                Shop
              </a>
            </div>

            <div className="border-b border-[#ded1c2]">
              <a
                href="/new-arrivals"
                className="block py-4 text-sm font-medium text-[#9A542C]"
                onClick={() => setMobileMenu(false)}
              >
                New Arrivals
              </a>
            </div>

            <div>
              <a
                href="/contact"
                className="block py-4 text-sm"
                onClick={() => setMobileMenu(false)}
              >
                Best Sellers
              </a>
            </div>

            <div className="border-b border-[#ded1c2]">
              <a
                href="/about"
                className="block py-4 text-sm"
                onClick={() => setMobileMenu(false)}
              >
                About Us
              </a>
            </div>

            <div>
              <a
                href="/contact"
                className="block py-4 text-sm"
                onClick={() => setMobileMenu(false)}
              >
                Contact Us
              </a>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
