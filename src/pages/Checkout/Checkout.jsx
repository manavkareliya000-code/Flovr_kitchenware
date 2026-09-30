import React, { useEffect, useMemo, useState } from "react";
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
  Tag,
  X,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const COUPON_KEY = "flovr-admin-coupons";
const SHIPPING_KEY = "flovr-shipping-address";
const ORDERS_KEY = "flovr-orders";
const LAST_ORDER_KEY = "flovr-last-order";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [saveAddress, setSaveAddress] = useState(true);

  const [formData, setFormData] = useState(initialForm);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // --------------------------------------------------
  // LOAD SAVED SHIPPING ADDRESS
  // --------------------------------------------------

  useEffect(() => {
    const savedAddress = localStorage.getItem(SHIPPING_KEY);

    if (savedAddress) {
      try {
        const parsedAddress = JSON.parse(savedAddress);

        setFormData({
          ...initialForm,
          ...parsedAddress,
        });
      } catch (error) {
        console.error("Failed to load saved address:", error);
      }
    }
  }, []);

  // --------------------------------------------------
  // FORM CHANGE
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // DELIVERY CHARGE
  // --------------------------------------------------

  const deliveryCharge = cartTotal >= 499 ? 0 : 49;

  // --------------------------------------------------
  // COUPON DISCOUNT
  // --------------------------------------------------

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) {
      return 0;
    }

    let discount = 0;

    if (appliedCoupon.type === "Percentage") {
      const percentage = Number(appliedCoupon.value) || 0;

      // Maximum amount on which percentage discount can be calculated
      const maxDiscountAmount =
        Number(appliedCoupon.maxDiscountAmount) || cartTotal;

      // If cart is ₹2000 and max discount amount is ₹500,
      // discount will be calculated only on ₹500.
      const discountableAmount = Math.min(cartTotal, maxDiscountAmount);

      discount = (discountableAmount * percentage) / 100;
    } else {
      // Fixed discount
      discount = Number(appliedCoupon.value) || 0;
    }

    // Discount can never be greater than cart subtotal
    discount = Math.min(discount, cartTotal);

    return Math.round(discount);
  }, [cartTotal, appliedCoupon]);

  const finalTotal = Math.max(0, cartTotal - couponDiscount + deliveryCharge);

  // --------------------------------------------------
  // APPLY COUPON
  // --------------------------------------------------

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    const savedCoupons = localStorage.getItem(COUPON_KEY);

    if (!savedCoupons) {
      setCouponError("This coupon is not available.");
      return;
    }

    let coupons = [];

    try {
      coupons = JSON.parse(savedCoupons);
    } catch (error) {
      console.error("Failed to read coupons:", error);
      setCouponError("Unable to check coupon right now.");
      return;
    }

    const coupon = coupons.find(
      (item) => String(item.code).toUpperCase() === code,
    );

    if (!coupon) {
      setCouponError("Invalid coupon code.");
      return;
    }

    // Status validation
    if (coupon.status !== "Active") {
      setCouponError("This coupon is not active.");
      return;
    }

    // Expiry validation
    if (coupon.expires) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiryDate = new Date(`${coupon.expires}T23:59:59`);

      if (expiryDate < today) {
        setCouponError("This coupon has expired.");
        return;
      }
    }

    // Usage limit validation
    if (
      Number(coupon.limit) > 0 &&
      Number(coupon.usage || 0) >= Number(coupon.limit)
    ) {
      setCouponError("This coupon has reached its usage limit.");
      return;
    }

    // Minimum order validation
    if (
      Number(coupon.minOrder || 0) > 0 &&
      cartTotal < Number(coupon.minOrder)
    ) {
      setCouponError(
        `Minimum order value for this coupon is ₹${Number(
          coupon.minOrder,
        ).toLocaleString("en-IN")}.`,
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponSuccess(`Coupon ${coupon.code} applied successfully.`);
    setCouponCode("");
  };

  // --------------------------------------------------
  // REMOVE COUPON
  // --------------------------------------------------

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setCouponSuccess("");
    setCouponCode("");
  };

  // --------------------------------------------------
  // PLACE ORDER
  // --------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    setIsPlacingOrder(true);

    // Save shipping address
    if (saveAddress) {
      localStorage.setItem(SHIPPING_KEY, JSON.stringify(formData));
    }

    const orderId = `FLV${Date.now().toString().slice(-8)}`;

    const orderDate = new Date().toISOString();

    // Initial payment status
    const paymentStatus = paymentMethod === "cod" ? "Pending" : "Paid";

    // Initial order status
    const initialStatus = "Pending";

    const order = {
      orderId,

      customer: {
        ...formData,
      },

      items: cartItems,

      // Price breakdown
      subtotal: cartTotal,

      coupon: appliedCoupon
        ? {
            code: appliedCoupon.code,
            type: appliedCoupon.type,
            value: Number(appliedCoupon.value),
            discount: couponDiscount,
          }
        : null,

      discount: couponDiscount,

      deliveryCharge,

      total: finalTotal,

      paymentMethod,

      paymentStatus,

      status: initialStatus,

      statusHistory: [
        {
          status: initialStatus,
          date: orderDate,
        },
      ],

      orderDate,

      // Useful later for tracking
      trackingNumber: "",
      courier: "",
      expectedDelivery: "",
    };

    // --------------------------------------------------
    // SAVE CUSTOMER ORDER
    // --------------------------------------------------

    const existingOrders = localStorage.getItem(ORDERS_KEY);

    let orders = [];

    try {
      orders = existingOrders ? JSON.parse(existingOrders) : [];
    } catch (error) {
      orders = [];
    }

    const updatedOrders = [order, ...orders];

    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

    // Save latest order
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));

    // --------------------------------------------------
    // UPDATE COUPON USAGE
    // --------------------------------------------------

    if (appliedCoupon) {
      const savedCoupons = localStorage.getItem(COUPON_KEY);

      if (savedCoupons) {
        try {
          const coupons = JSON.parse(savedCoupons);

          const updatedCoupons = coupons.map((coupon) => {
            if (coupon.id === appliedCoupon.id) {
              return {
                ...coupon,
                usage: Number(coupon.usage || 0) + 1,
              };
            }

            return coupon;
          });

          localStorage.setItem(COUPON_KEY, JSON.stringify(updatedCoupons));
        } catch (error) {
          console.error("Failed to update coupon usage:", error);
        }
      }
    }

    // Clear cart
    clearCart();

    // Small delay so button feedback is visible
    setTimeout(() => {
      navigate("/OrderSuccess", {
        state: {
          orderId,
        },
      });
    }, 500);
  };

  // --------------------------------------------------
  // EMPTY CART
  // --------------------------------------------------

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F1E8] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E1D3] text-[#A86643]">
            <ShoppingBag size={28} />
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#4A3428]">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#75675D]">
            Add some beautiful essentials to your cart before proceeding to
            checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5A4032]"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1E8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#75675D] transition hover:text-[#A86643]"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A86643]">
              Secure checkout
            </p>

            <h1 className="mt-1 font-serif text-3xl text-[#4A3428] sm:text-4xl">
              Complete your order
            </h1>

            <p className="mt-2 text-sm text-[#75675D]">
              Enter your details and choose your preferred payment method.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* CHECKOUT GRID */}
        {/* ------------------------------------------------ */}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div className="space-y-6">
              {/* ------------------------------------------------ */}
              {/* CUSTOMER INFORMATION */}
              {/* ------------------------------------------------ */}

              <section className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                    <ShoppingBag size={19} />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#4A3428]">
                      Customer information
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Your contact details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First name">
                    <input
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="input"
                    />
                  </FormField>

                  <FormField label="Last name">
                    <input
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="input"
                    />
                  </FormField>

                  <FormField label="Phone number">
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="input"
                    />
                  </FormField>

                  <FormField label="Email address">
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="input"
                    />
                  </FormField>
                </div>
              </section>

              {/* ------------------------------------------------ */}
              {/* DELIVERY ADDRESS */}
              {/* ------------------------------------------------ */}

              <section className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#4A3428]">
                      Delivery address
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField label="Address">
                    <textarea
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="House / Flat / Street / Area"
                      className="input resize-none"
                    />
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="City">
                      <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="input"
                      />
                    </FormField>

                    <FormField label="State">
                      <input
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="input"
                      />
                    </FormField>

                    <FormField label="Pincode">
                      <input
                        required
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="input"
                      />
                    </FormField>
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9CBBE] bg-[#F7F1E8]/60 p-3">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="h-4 w-4 accent-[#A86643]"
                    />

                    <span className="text-sm text-[#4A3428]">
                      Save this address for future orders
                    </span>
                  </label>
                </div>
              </section>

              {/* ------------------------------------------------ */}
              {/* COUPON */}
              {/* ------------------------------------------------ */}

              <section className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                    <Tag size={19} />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#4A3428]">
                      Coupon & discount
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Have a coupon code?
                    </p>
                  </div>
                </div>

                {appliedCoupon ? (
                  <div className="rounded-2xl border border-[#CFE0C9] bg-[#F1F7EF] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#477044]">
                          <Check size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-bold tracking-wide text-[#477044]">
                            {appliedCoupon.code}
                          </p>

                          <p className="mt-1 text-xs text-[#75675D]">
                            {appliedCoupon.type === "Percentage"
                              ? `${appliedCoupon.value}% discount`
                              : `₹${appliedCoupon.value} discount`}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-[#477044]">
                            You save ₹{couponDiscount.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="rounded-lg p-2 text-[#75675D] transition hover:bg-white hover:text-red-600"
                        title="Remove coupon"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-1 ">
                        {/* <Tag
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A86643]"
                        /> */}

                        <input
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError("");
                            setCouponSuccess("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplyCoupon();
                            }
                          }}
                          placeholder="Enter coupon code"
                          className="input pl-10 uppercase"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5A4032]"
                      >
                        Apply Coupon
                      </button>
                    </div>

                    {couponError && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
                        <AlertCircle size={15} className="mt-0.5 shrink-0" />
                        <span>{couponError}</span>
                      </div>
                    )}

                    {couponSuccess && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl bg-green-50 p-3 text-xs text-green-700">
                        <Check size={15} className="mt-0.5 shrink-0" />
                        <span>{couponSuccess}</span>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* ------------------------------------------------ */}
              {/* PAYMENT */}
              {/* ------------------------------------------------ */}

              <section className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                    <WalletCards size={19} />
                  </div>

                  <div>
                    <h2 className="font-serif text-xl text-[#4A3428]">
                      Payment method
                    </h2>

                    <p className="text-xs text-[#75675D]">
                      Choose how you want to pay
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* COD */}
                  <PaymentOption
                    active={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                    icon={<Truck size={19} />}
                    title="Cash on Delivery"
                    description="Pay when your order arrives"
                  />

                  {/* ONLINE */}
                  <PaymentOption
                    active={paymentMethod === "online"}
                    onClick={() => setPaymentMethod("online")}
                    icon={<CreditCard size={19} />}
                    title="Online Payment"
                    description="Dummy payment for demo"
                  />
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-[#75675D]">
                  <ShieldCheck size={15} className="text-[#A86643]" />
                  Your payment information is secure.
                </div>
              </section>
            </div>

            {/* ================================================= */}
            {/* RIGHT — ORDER SUMMARY */}
            {/* ================================================= */}

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <section className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A86643]">
                      Your order
                    </p>

                    <h2 className="mt-1 font-serif text-2xl text-[#4A3428]">
                      Order summary
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                    <ShoppingBag size={19} />
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-[#E8DED5] pb-4 last:border-0"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#EDE3D7]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#A86643]">
                            <ShoppingBag size={18} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-[#4A3428]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#75675D]">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-[#4A3428]">
                        ₹
                        {(Number(item.price) * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="mt-5 space-y-3 border-t border-[#D9CBBE] pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#75675D]">Subtotal</span>

                    <span className="font-medium text-[#4A3428]">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#477044]">Discount</span>

                      <span className="font-semibold text-[#477044]">
                        -₹
                        {couponDiscount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[#75675D]">Delivery</span>

                    {deliveryCharge === 0 ? (
                      <span className="font-semibold text-[#477044]">Free</span>
                    ) : (
                      <span className="font-medium text-[#4A3428]">
                        ₹{deliveryCharge}
                      </span>
                    )}
                  </div>

                  {deliveryCharge === 0 && (
                    <p className="rounded-xl bg-[#F1F7EF] px-3 py-2 text-xs text-[#477044]">
                      You unlocked free delivery.
                    </p>
                  )}
                </div>

                {/* TOTAL */}
                <div className="mt-5 flex items-end justify-between border-t border-[#D9CBBE] pt-5">
                  <div>
                    <p className="text-xs text-[#75675D]">Total amount</p>

                    <p className="mt-1 text-2xl font-bold text-[#4A3428]">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {couponDiscount > 0 && (
                    <span className="rounded-full bg-[#F1F7EF] px-3 py-1 text-xs font-semibold text-[#477044]">
                      Saved ₹{couponDiscount.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* PLACE ORDER */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5A4032] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPlacingOrder ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#75675D]">
                  <ShieldCheck size={14} className="text-[#A86643]" />
                  Secure & safe checkout
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>

      {/* ------------------------------------------------ */}
      {/* INPUT STYLE */}
      {/* ------------------------------------------------ */}

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #D9CBBE;
          background: #FFFDFC;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          color: #4A3428;
          outline: none;
          transition: 0.2s;
        }

        .input::placeholder {
          color: #9A8D83;
        }

        .input:focus {
          border-color: #A86643;
          box-shadow: 0 0 0 3px rgba(168, 102, 67, 0.10);
        }
      `}</style>
    </div>
  );
}

/* ===================================================== */
/* FORM FIELD */
/* ===================================================== */

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#4A3428]">
        {label}
      </span>

      {children}
    </label>
  );
}

/* ===================================================== */
/* PAYMENT OPTION */
/* ===================================================== */

function PaymentOption({ active, onClick, icon, title, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#A86643] bg-[#F7F1E8] shadow-sm"
          : "border-[#D9CBBE] bg-[#FFFDFC] hover:border-[#A86643]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-[#4A3428] text-white" : "bg-[#F0E1D3] text-[#A86643]"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#4A3428]">{title}</p>

        <p className="mt-1 text-xs leading-5 text-[#75675D]">{description}</p>
      </div>

      <div
        className={`ml-auto mt-1 h-4 w-4 shrink-0 rounded-full border ${
          active ? "border-[#A86643] bg-[#A86643]" : "border-[#C8B9AD] bg-white"
        }`}
      >
        {active && (
          <div className="m-[3px] h-1.5 w-1.5 rounded-full bg-white" />
        )}
      </div>
    </button>
  );
}
