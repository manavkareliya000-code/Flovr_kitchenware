import { Heart, ShoppingCart, UserRound, Menu, X } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useState, useEffect } from "react";

function Headernew() {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname, location.search]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

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
          <Link
            to="/"
            className="shrink-0 font-serif text-[23px] tracking-[0.22em] text-[#4A3428] md:text-[28px]"
          >
            FLOVR
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center lg:flex">
            <div className="ml-10 flex items-center gap-8 xl:gap-10">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Shop
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/new-arrivals"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    New Arrivals
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About Us
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative py-2 text-sm transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact Us
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#A86643] transition-all duration-300 ${isActive ? "w-full" : "w-0"
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
                `relative transition-colors duration-200 ${isActive
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

           

            {/* ================= CART ================= */}
            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              className={({ isActive }) =>
                `relative transition-colors duration-200 ${isActive
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

             {/* ================= ACCOUNT ================= */}
            <NavLink
              to="/account"
              aria-label="Account"
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive
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
            
          </div>
        </div>

        {/* =================================================
            FULL SCREEN MOBILE MENU (SLIDE LEFT-TO-RIGHT)
        ================================================= */}
        <div
          className={`fixed inset-0 z-[100] flex flex-col bg-[#F8F1E7] transition-transform duration-300 ease-in-out lg:hidden ${mobileMenu ? "translate-x-0" : "-translate-x-full pointer-events-none"
            }`}
        >
          {/* Mobile Header Bar */}
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#d8c9b8] px-5 md:px-8">
            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="font-serif text-[23px] tracking-[0.22em] text-[#4A3428]"
            >
              FLOVR
            </Link>

            <button
              onClick={() => setMobileMenu(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#4A3428] transition hover:bg-[#EFE3D4]"
              aria-label="Close menu"
            >
              <X size={26} strokeWidth={1.6} />
            </button>
          </div>

          {/* Mobile Nav Content */}
          <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-4">
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `border-b border-[#ded1c2]/60 py-4 text-lg font-medium transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `border-b border-[#ded1c2]/60 py-4 text-lg font-medium transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/new-arrivals"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `border-b border-[#ded1c2]/60 py-4 text-lg font-medium transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                New Arrivals
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `border-b border-[#ded1c2]/60 py-4 text-lg font-medium transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `border-b border-[#ded1c2]/60 py-4 text-lg font-medium transition-colors duration-200 ${isActive
                    ? "font-semibold text-[#A86643]"
                    : "text-[#4A3428] hover:text-[#A86643]"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </nav>

            {/* Bottom Footer Info */}
            <div className="mt-8 border-t border-[#ded1c2] pt-6 text-center">
              <p className="font-serif text-sm tracking-widest text-[#A86643]">
                FLOVR
              </p>
              <p className="mt-1 text-xs text-[#75675D]">
                Elevate Your Everyday Home
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Headernew;
