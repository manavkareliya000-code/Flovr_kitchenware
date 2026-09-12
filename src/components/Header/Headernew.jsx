import { Heart, ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { useState } from "react";

function Headernew() {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-[#d8c9b8] bg-[#F8F1E7]">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 md:px-8 lg:px-10">
          {/* ================= MOBILE MENU ================= */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex items-center justify-center lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={23} strokeWidth={1.6} />
            ) : (
              <Menu size={23} strokeWidth={1.6} />
            )}
          </button>

          {/* ================= LOGO ================= */}
          <a
            href="/"
            className="shrink-0 font-serif text-[23px] tracking-[0.22em] text-[#4A3428] md:text-[28px]"
          >
            FLOVR
          </a>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center lg:flex">
            <div className="ml-10 flex items-center gap-8 xl:gap-10">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#A86643]"
                      : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#A86643]"
                      : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Shop
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/new-arrivals"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#A86643]"
                      : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    New Arrivals
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#A86643]"
                      : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About Us
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#A86643]"
                      : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact Us
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </div>
          </nav>

          {/* ================= RIGHT ICONS ================= */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* ================= WISHLIST ================= */}
            <NavLink
              to="/wishlist"
              aria-label="Wishlist"
              className={({ isActive }) =>
                `relative transition-colors duration-200 ${
                  isActive
                    ? "text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Heart
                    size={20}
                    strokeWidth={isActive ? 2 : 1.5}
                    fill={isActive ? "currentColor" : "none"}
                  />

                  {wishlistCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#A86643] px-1 text-[8px] text-white">
                      {wishlistCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* ================= ACCOUNT ================= */}
            <NavLink
              to="/account"
              aria-label="Account"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? "text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                }`
              }
            >
              {({ isActive }) => (
                <UserRound
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  fill={isActive ? "currentColor" : "none"}
                />
              )}
            </NavLink>

            {/* ================= CART ================= */}
            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              className={({ isActive }) =>
                `relative transition-colors duration-200 ${
                  isActive
                    ? "text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ShoppingCart
                    size={20}
                    strokeWidth={isActive ? 2 : 1.5}
                    fill={isActive ? "currentColor" : "none"}
                  />

                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A86643] px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}
        <div
          className={`border-t border-[#d8c9b8] bg-[#F8F1E7] lg:hidden ${
            mobileMenu ? "block" : "hidden"
          }`}
        >
          <nav className="max-h-[calc(100vh-76px)] overflow-y-auto px-6">
            <a
              href="/"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-[#ded1c2] py-4 text-sm text-[#4A3428]"
            >
              Home
            </a>

            <a
              href="/shop"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-[#ded1c2] py-4 text-sm text-[#4A3428]"
            >
              Shop
            </a>

            <a
              href="/new-arrivals"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-[#ded1c2] py-4 text-sm font-medium text-[#A86643]"
            >
              New Arrivals
            </a>

            <a
              href="/about"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-[#ded1c2] py-4 text-sm text-[#4A3428]"
            >
              About Us
            </a>

            <a
              href="/contact"
              onClick={() => setMobileMenu(false)}
              className="block border-b border-[#ded1c2] py-4 text-sm text-[#4A3428]"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Headernew;
