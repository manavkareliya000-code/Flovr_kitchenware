import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Truck,
  WalletCards,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [saveAddress, setSaveAddress] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load the saved shipping address from the user's profile
  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem("flovr-shipping-address");

      if (savedAddress) {
        setFormData(JSON.parse(savedAddress));
      }
    } catch (error) {
      console.error("Error loading shipping address:", error);
    }
  }, []);

  const deliveryCharge = cartTotal >= 499 ? 0 : 49;

  const finalTotal = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (saveAddress) {
      localStorage.setItem("flovr-shipping-address", JSON.stringify(formData));
    }

    const orderId = `FLV${Date.now().toString().slice(-8)}`;

    const order = {
      orderId,
      customer: formData,
      paymentMethod,
      items: cartItems,
      total: finalTotal,
      orderDate: new Date().toISOString(),
    };

    console.log("Order:", order);

    // Save every order so the Account page can show order history
    try {
      const existingOrders = JSON.parse(
        localStorage.getItem("flovr-orders") || "[]",
      );

      const updatedOrders = Array.isArray(existingOrders)
        ? [order, ...existingOrders]
        : [order];

      localStorage.setItem("flovr-orders", JSON.stringify(updatedOrders));

      // Keep the latest order separately for the Order Success page / overview
      localStorage.setItem("flovr-last-order", JSON.stringify(order));
    } catch (error) {
      console.error("Error saving order history:", error);
    }

    // Clear cart
    clearCart();

    // Go to success page
    navigate("/OrderSuccess", {
      state: {
        orderId,
      },
    });
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section className="min-h-[70vh] bg-[#F7F1E8] px-4 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-14 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
            <ShoppingBag size={34} />
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[#4A3428]">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-[#75675D]">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F1E8] px-3 py-7 sm:px-4 md:px-8 md:py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-7">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#75675D] transition hover:text-[#4A3428]"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A86643] md:text-xs">
            FLOVR Checkout
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#4A3428] md:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-2 text-sm text-[#75675D]">
            Enter your details and choose your preferred payment method.
          </p>
        </div>

        {/* ================= CHECKOUT ================= */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* ================= LEFT ================= */}
            <div className="space-y-5">
              {/* Customer Information */}
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                    <ShoppingBag size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#4A3428]">
                      Customer Information
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Enter your contact details
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                      className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                      className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#4A3428]">
                      Delivery Address
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Address */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                      Full Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="House / Flat number, Street, Area"
                      className="w-full resize-none rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* City */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="State"
                        className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                        Pincode
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        maxLength="6"
                        placeholder="Pincode"
                        className="w-full rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99A8D] focus:border-[#A86643]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Address */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] p-4">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#4A3428]"
                />

                <div>
                  <p className="text-sm font-medium text-[#4A3428]">
                    Save this address to my profile
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#75675D]">
                    Your saved address will automatically appear the next time
                    you checkout.
                  </p>
                </div>
              </label>

              {/* Payment */}
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#4A3428]">
                      Payment Method
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Choose how you'd like to pay
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* COD */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-[#A86643] bg-[#EFE3D4]"
                        : "border-[#D9CBBE] bg-[#FFFDFC] hover:border-[#A86643]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#4A3428]"
                    />

                    <WalletCards size={20} className="text-[#4A3428]" />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#4A3428]">
                        Cash on Delivery
                      </p>

                      <p className="mt-0.5 text-xs text-[#75675D]">
                        Pay when your order arrives
                      </p>
                    </div>

                    {paymentMethod === "cod" && (
                      <Check size={18} className="text-[#A86643]" />
                    )}
                  </label>

                  {/* Dummy Online Payment */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === "online"
                        ? "border-[#A86643] bg-[#EFE3D4]"
                        : "border-[#D9CBBE] bg-[#FFFDFC] hover:border-[#A86643]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#4A3428]"
                    />

                    <CreditCard size={20} className="text-[#4A3428]" />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#4A3428]">
                        Online Payment
                      </p>

                      <p className="mt-0.5 text-xs text-[#75675D]">
                        UPI, Card & Net Banking
                      </p>
                    </div>

                    {paymentMethod === "online" && (
                      <Check size={18} className="text-[#A86643]" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="h-fit lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-sm md:p-6">
                <h2 className="text-lg font-semibold text-[#4A3428] md:text-xl">
                  Your Order
                </h2>

                {/* Products */}
                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#EDE3D7]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A3428] px-1 text-[9px] font-bold text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-semibold text-[#4A3428]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#75675D]">
                          ₹{item.price.toLocaleString("en-IN")} ×{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-[#4A3428]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-5 space-y-3 border-t border-[#D9CBBE] pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75675D]">Subtotal</span>

                    <span className="font-medium text-[#4A3428]">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#75675D]">Delivery</span>

                    <span className="font-medium text-green-600">
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  <div className="border-t border-[#D9CBBE] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#4A3428]">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-[#4A3428]">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                >
                  Place Order
                  <ArrowRight size={18} />
                </button>

                {/* Delivery */}
                <div className="mt-5 flex items-center gap-3 border-t border-[#D9CBBE] pt-5">
                  <Truck size={18} className="shrink-0 text-[#A86643]" />

                  <p className="text-xs leading-5 text-[#75675D]">
                    Free delivery on orders above ₹499.
                  </p>
                </div>

                {/* Security */}
                <div className="mt-3 flex items-center gap-3">
                  <ShieldCheck size={18} className="shrink-0 text-[#A86643]" />

                  <p className="text-xs leading-5 text-[#75675D]">
                    Your information is safe and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
