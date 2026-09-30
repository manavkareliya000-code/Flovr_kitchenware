import { BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "./pages/Account/Account";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";

import Headernew from "./components/Header/Headernew";
import Footer from "./components/Footer/Footer";

import Hero from "./components/Hero/Hero";
import CategorySection from "./components/CategorySection/CategorySection";
import BestSeller from "./components/BestSellers/BestSellers";
import PromoSection from "./components/PromoSection/PromoSection";
import NewArrival from "./components/NewArrivals/NewArrivals";
import InquiryProducts from "./components/InquiryProducts/InquiryProducts";
import WhyFlovr from "./components/WhyFlovr/WhyFlovr";
import Newsletter from "./components/Newsletter/Newsletter";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import BestSellers from "./pages/BestSellers/BestSellers";
import Testimonials from "./components/Testimonials/Testimonials";
import TrustedPartners from "./components/TrustedPartners/TrustedPartners";
import FloatingButtons from "./components/common/FloatingButtons";

import Shop from "./pages/Shop/Shop";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSeller />
      <PromoSection />
      <NewArrival />
      {/* <InquiryProducts /> */}
      <WhyFlovr />
      <Testimonials  />
      <TrustedPartners />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-[#F7F1E8]">
              <Headernew />

              <main>
                <Routes>
                  {/* HOME */}
                  <Route path="/" element={<Home />} />

                  {/* ALL PRODUCTS */}
                  <Route path="/shop" element={<Shop />} />

                  {/* CATEGORY PAGES - SAME SHOP COMPONENT */}
                  <Route
                    path="/kitchenware"
                    element={<Shop category="Kitchenware" />}
                  />

                  <Route
                    path="/household"
                    element={<Shop category="Household" />}
                  />

                  <Route
                    path="/storage"
                    element={<Shop category="Storage" />}
                  />

                  <Route
                    path="/cleaning"
                    element={<Shop category="Cleaning" />}
                  />

                  <Route
                    path="/bathroom"
                    element={<Shop category="Bathroom" />}
                    
                  />
                  <Route path="/new-arrivals" element={<NewArrivals />} />

                  <Route path="/product/:id" element={<ProductDetails />} />

                  <Route path="/cart" element={<Cart />} />

                  <Route path="/wishlist" element={<Wishlist />} />

                  <Route path="/checkout" element={<Checkout />} />

                  <Route path="/OrderSuccess" element={<OrderSuccess />} />

                  <Route path="/account" element={<Account />} />

                  <Route path="/about" element={<About />} />

                  <Route path="/contact" element={<Contact />} />

                  <Route path="/best-sellers" element={<BestSellers />} />
                </Routes>
              </main>

              <Footer />
              <FloatingButtons />
            </div>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

export default App;
