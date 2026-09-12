import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  LayoutDashboard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

function Account() {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [mode, setMode] = useState("login");
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      id: "address",
      label: "Saved Address",
      icon: MapPin,
    },
  ];

  // Load account data
  useEffect(() => {
    const loggedIn = localStorage.getItem("flovr-logged-in");
    const savedUser = localStorage.getItem("flovr-user");
    const savedOrder = localStorage.getItem("flovr-last-order");
    const savedOrders = localStorage.getItem("flovr-orders");
    const storedAddress = localStorage.getItem("flovr-shipping-address");

    if (loggedIn === "true" && savedUser) {
      try {
        setIsLoggedIn(true);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("User data error:", error);
      }
    }

    // Load complete order history.
    // If the older version only has flovr-last-order, migrate that order
    // into the new order-history array automatically.
    try {
      let parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];

      if (!Array.isArray(parsedOrders)) {
        parsedOrders = [];
      }

      if (parsedOrders.length === 0 && savedOrder) {
        const oldLatestOrder = JSON.parse(savedOrder);
        parsedOrders = oldLatestOrder ? [oldLatestOrder] : [];

        if (parsedOrders.length > 0) {
          localStorage.setItem("flovr-orders", JSON.stringify(parsedOrders));
        }
      }

      setOrders(parsedOrders);

      if (parsedOrders.length > 0) {
        setLastOrder(parsedOrders[0]);
      } else if (savedOrder) {
        setLastOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Order history data error:", error);
    }

    if (storedAddress) {
      try {
        const parsedAddress = JSON.parse(storedAddress);
        setSavedAddress(parsedAddress);
        setAddressForm(parsedAddress);
      } catch (error) {
        console.error("Shipping address error:", error);
      }
    }
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Shipping address change
  const handleAddressChange = (e) => {
    setAddressForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    localStorage.setItem("flovr-shipping-address", JSON.stringify(addressForm));

    setSavedAddress(addressForm);
    setIsEditingAddress(false);
  };

  const handleEditAddress = () => {
    setAddressForm(
      savedAddress || {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      },
    );
    setIsEditingAddress(true);
  };

  // Login / Register
  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("flovr-user");

    // REGISTER
    if (mode === "register") {
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      localStorage.setItem("flovr-user", JSON.stringify(newUser));
      localStorage.setItem("flovr-logged-in", "true");

      setUser(newUser);
      setIsLoggedIn(true);
      setActiveTab("overview");

      return;
    }

    // LOGIN
    if (!savedUser) {
      alert("No account found. Please create an account first.");
      return;
    }

    try {
      const existingUser = JSON.parse(savedUser);

      if (
        existingUser.email === formData.email &&
        existingUser.password === formData.password
      ) {
        localStorage.setItem("flovr-logged-in", "true");

        setUser(existingUser);
        setIsLoggedIn(true);
        setActiveTab("overview");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please register again.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("flovr-logged-in");

    setIsLoggedIn(false);
    setUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setMode("login");
    setActiveTab("overview");

    navigate("/account");
  };

  // -------------------------
  // LOGIN / REGISTER SCREEN
  // -------------------------

  if (!isLoggedIn) {
    return (
      <section className="min-h-screen bg-[#F7F1E8] px-3 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-7 text-center sm:mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A86643]">
              FLOVR
            </p>

            <h1 className="text-2xl font-semibold text-[#4A3428] sm:text-3xl">
              {mode === "login" ? "Welcome Back" : "Create Your Account"}
            </h1>

            <p className="mt-2 text-sm text-[#75675D]">
              {mode === "login"
                ? "Login to manage your FLOVR account."
                : "Join FLOVR and manage your orders easily."}
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-7">
            {/* Tabs */}
            <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#F7F1E8] p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  mode === "login"
                    ? "bg-[#4A3428] text-white shadow-sm"
                    : "text-[#75675D] hover:text-[#4A3428]"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setMode("register")}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  mode === "register"
                    ? "bg-[#4A3428] text-white shadow-sm"
                    : "text-[#75675D] hover:text-[#4A3428]"
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              {mode === "register" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#4A3428]">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#75675D]"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-[#D9CBBE] bg-white py-3 pl-10 pr-4 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#4A3428]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#75675D]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-[#D9CBBE] bg-white py-3 pl-10 pr-4 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#4A3428]">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#75675D]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-[#D9CBBE] bg-white py-3 pl-10 pr-11 text-sm text-[#4A3428] outline-none transition placeholder:text-[#A99B91] focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#75675D] hover:text-[#4A3428]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
              >
                {mode === "login" ? "Login to Account" : "Create Account"}
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#75675D] transition hover:text-[#A86643]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-[#75675D]">
            FLOVR — Everything for your home.
          </p>
        </div>
      </section>
    );
  }

  // -------------------------
  // DASHBOARD
  // -------------------------

  return (
    <section className="min-h-screen bg-[#F7F1E8] px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A86643]">
            My Account
          </p>

          <h1 className="text-2xl font-semibold text-[#4A3428] sm:text-3xl lg:text-4xl">
            Account Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#75675D]">
            Manage your profile, orders, wishlist and saved address.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid min-w-0 gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden h-fit rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-3 shadow-sm lg:block">
            {/* User */}
            <div className="mb-3 rounded-xl bg-[#F7F1E8] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
                  <User size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#4A3428]">
                    {user?.name || "FLOVR User"}
                  </h3>

                  <p className="truncate text-xs text-[#75675D]">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeTab === item.id
                        ? "bg-[#4A3428] text-white"
                        : "text-[#75675D] hover:bg-[#F7F1E8] hover:text-[#4A3428]"
                    }`}
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>

                    {item.id === "wishlist" && wishlistCount > 0 && (
                      <span
                        className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          activeTab === item.id
                            ? "bg-white/20 text-white"
                            : "bg-[#4A3428] text-white"
                        }`}
                      >
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="my-3 border-t border-[#D9CBBE]" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#A86643] transition hover:bg-[#F7F1E8]"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <div className="min-w-0">
            {/* MOBILE MENU */}
            <div className="mb-5 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-3 shadow-sm lg:hidden">
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#F7F1E8] p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
                  <User size={18} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#4A3428]">
                    {user?.name || "FLOVR User"}
                  </h3>

                  <p className="truncate text-xs text-[#75675D]">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* 2 Column Mobile Menu */}
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`relative flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-2 py-2 text-xs font-medium transition sm:text-sm ${
                        activeTab === item.id
                          ? "bg-[#4A3428] text-white"
                          : "bg-[#F7F1E8] text-[#75675D] hover:text-[#4A3428]"
                      }`}
                    >
                      <Icon size={16} />

                      <span>{item.label}</span>

                      {item.id === "wishlist" && wishlistCount > 0 && (
                        <span className="absolute right-2 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A86643] px-1 text-[9px] font-bold text-white">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#F7F1E8] px-2 py-2 text-xs font-medium text-[#A86643] transition hover:text-[#4A3428] sm:text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            {/* =========================
                OVERVIEW
            ========================= */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {/* Welcome */}
                <div className="overflow-hidden rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] shadow-sm">
                  <div className="p-5 sm:p-6 md:p-8">
                    <p className="text-sm font-medium text-[#A86643]">
                      Welcome back,
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[#4A3428] sm:text-2xl">
                      {user?.name || "FLOVR User"}
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#75675D]">
                      Everything you need to manage your FLOVR shopping
                      experience is right here.
                    </p>

                    <Link
                      to="/shop"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#A86643]"
                    >
                      Continue Shopping
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 sm:p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7F1E8] text-[#4A3428]">
                      <Package size={18} />
                    </div>

                    <p className="text-xs text-[#75675D]">Orders</p>

                    <p className="mt-1 text-xl font-bold text-[#4A3428]">
                      {orders.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 sm:p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7F1E8] text-[#4A3428]">
                      <Heart size={18} />
                    </div>

                    <p className="text-xs text-[#75675D]">Wishlist</p>

                    <p className="mt-1 text-xl font-bold text-[#4A3428]">
                      {wishlistCount}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 sm:col-span-1 sm:p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7F1E8] text-[#4A3428]">
                      <MapPin size={18} />
                    </div>

                    <p className="text-xs text-[#75675D]">Address</p>

                    <p className="mt-1 text-xl font-bold text-[#4A3428]">
                      {savedAddress ? "Saved" : "None"}
                    </p>
                  </div>
                </div>

                {/* Latest Order */}
                <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-[#4A3428] sm:text-lg">
                      Latest Order
                    </h3>

                    {lastOrder && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("orders")}
                        className="text-xs font-medium text-[#A86643] hover:underline sm:text-sm"
                      >
                        View Order
                      </button>
                    )}
                  </div>

                  {lastOrder ? (
                    <div className="rounded-xl bg-[#F7F1E8] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
                          <CheckCircle size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#4A3428]">
                            Order #{lastOrder.orderId}
                          </p>

                          <p className="mt-1 text-xs text-[#75675D]">
                            Order placed successfully
                          </p>

                          <p className="mt-2 text-sm font-bold text-[#A86643]">
                            ₹
                            {Number(lastOrder.total || 0).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#F7F1E8] p-6 text-center">
                      <Package size={28} className="mx-auto text-[#A86643]" />

                      <p className="mt-3 text-sm font-medium text-[#4A3428]">
                        No orders yet
                      </p>

                      <p className="mt-1 text-xs text-[#75675D]">
                        Your recent orders will appear here.
                      </p>

                      <Link
                        to="/shop"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#A86643] hover:underline"
                      >
                        Start Shopping
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =========================
                PROFILE
            ========================= */}
            {activeTab === "profile" && (
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6 md:p-7">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#4A3428]">
                    Profile Information
                  </h2>

                  <p className="mt-1 text-sm text-[#75675D]">
                    Your account details.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-[#D9CBBE] p-4">
                    <p className="text-xs text-[#75675D]">Full Name</p>
                    <p className="mt-1 break-words text-sm font-semibold text-[#4A3428]">
                      {user?.name || "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#D9CBBE] p-4">
                    <p className="text-xs text-[#75675D]">Email Address</p>
                    <p className="mt-1 break-all text-sm font-semibold text-[#4A3428]">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =========================
                ORDERS
            ========================= */}
            {activeTab === "orders" && (
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#4A3428]">
                    My Orders
                  </h2>

                  <p className="mt-1 text-sm text-[#75675D]">
                    View all your previous orders and order details.
                  </p>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderId}
                        className="overflow-hidden rounded-xl border border-[#D9CBBE]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F7F1E8] p-4">
                          <div>
                            <p className="text-xs text-[#75675D]">Order ID</p>
                            <p className="mt-1 text-sm font-semibold text-[#4A3428]">
                              #{order.orderId}
                            </p>
                            <p className="mt-1 text-xs text-[#75675D]">
                              {order.orderDate
                                ? new Date(order.orderDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "Date unavailable"}
                            </p>
                          </div>

                          <span className="rounded-full bg-[#4A3428] px-3 py-1.5 text-xs font-semibold text-white">
                            {order.status || "Confirmed"}
                          </span>
                        </div>

                        <div className="p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="text-sm text-[#75675D]">
                              {order.items?.length || 0} item
                              {(order.items?.length || 0) !== 1 ? "s" : ""}
                            </span>

                            <span className="text-lg font-bold text-[#4A3428]">
                              ₹
                              {Number(order.total || 0).toLocaleString("en-IN")}
                            </span>
                          </div>

                          {order.items?.length > 0 && (
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={`${order.orderId}-${item.id}`}
                                  className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F7F1E8] p-3"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
                                  />

                                  <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-semibold text-[#4A3428]">
                                      {item.name}
                                    </p>

                                    <p className="mt-1 text-xs text-[#75675D]">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>

                                  <p className="shrink-0 text-sm font-bold text-[#4A3428]">
                                    ₹
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString("en-IN")}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#F7F1E8] p-7 text-center">
                    <Package size={32} className="mx-auto text-[#A86643]" />

                    <p className="mt-3 text-sm font-semibold text-[#4A3428]">
                      No orders found
                    </p>

                    <Link
                      to="/shop"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#A86643] hover:underline"
                    >
                      Shop Now
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* =========================
                WISHLIST
            ========================= */}
            {activeTab === "wishlist" && (
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[#4A3428]">
                      Wishlist
                    </h2>

                    <p className="mt-1 text-sm text-[#75675D]">
                      {wishlistCount} item
                      {wishlistCount !== 1 ? "s" : ""} saved.
                    </p>
                  </div>

                  <Link
                    to="/wishlist"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#4A3428] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A86643] sm:text-sm"
                  >
                    Open Wishlist
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {wishlistCount === 0 && (
                  <div className="rounded-xl bg-[#F7F1E8] p-7 text-center">
                    <Heart size={32} className="mx-auto text-[#A86643]" />

                    <p className="mt-3 text-sm font-semibold text-[#4A3428]">
                      Your wishlist is empty
                    </p>

                    <p className="mt-1 text-xs text-[#75675D]">
                      Save products you love for later.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* =========================
                ADDRESS
            ========================= */}
            {activeTab === "address" && (
              <div className="rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[#4A3428]">
                      Shipping Address
                    </h2>

                    <p className="mt-1 text-sm text-[#75675D]">
                      Save your delivery address for faster checkout.
                    </p>
                  </div>

                  {savedAddress && !isEditingAddress && (
                    <button
                      type="button"
                      onClick={handleEditAddress}
                      className="rounded-xl border border-[#D9CBBE] px-4 py-2.5 text-xs font-semibold text-[#4A3428] transition hover:border-[#A86643] hover:text-[#A86643]"
                    >
                      Edit Address
                    </button>
                  )}
                </div>

                {isEditingAddress || !savedAddress ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={addressForm.firstName}
                          onChange={handleAddressChange}
                          required
                          placeholder="First name"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={addressForm.lastName}
                          onChange={handleAddressChange}
                          required
                          placeholder="Last name"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          required
                          maxLength="10"
                          placeholder="10-digit mobile number"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={addressForm.email}
                          onChange={handleAddressChange}
                          required
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                        Full Address
                      </label>
                      <textarea
                        name="address"
                        value={addressForm.address}
                        onChange={handleAddressChange}
                        required
                        rows="3"
                        placeholder="House / Flat number, Street, Area"
                        className="w-full resize-none rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          required
                          placeholder="City"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          required
                          placeholder="State"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-[#4A3428]">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleAddressChange}
                          required
                          maxLength="6"
                          placeholder="Pincode"
                          className="w-full rounded-xl border border-[#D9CBBE] bg-white px-4 py-3 text-sm text-[#4A3428] outline-none focus:border-[#A86643]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <button
                        type="submit"
                        className="rounded-xl bg-[#4A3428] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A86643]"
                      >
                        Save Address
                      </button>

                      {savedAddress && (
                        <button
                          type="button"
                          onClick={() => {
                            setAddressForm(savedAddress);
                            setIsEditingAddress(false);
                          }}
                          className="rounded-xl border border-[#D9CBBE] px-5 py-3 text-sm font-semibold text-[#4A3428] transition hover:border-[#4A3428]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="rounded-xl border border-[#D9CBBE] bg-[#F7F1E8] p-4 sm:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#4A3428]">
                          Default Shipping Address
                        </p>
                        <p className="text-xs text-[#75675D]">
                          This address will be used at checkout.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-[#4A3428]">
                      <p className="font-semibold">
                        {savedAddress.firstName} {savedAddress.lastName}
                      </p>
                      <p>{savedAddress.address}</p>
                      <p>
                        {savedAddress.city}, {savedAddress.state} -{" "}
                        {savedAddress.pincode}
                      </p>
                      <p className="pt-2 text-xs text-[#75675D]">
                        Phone: {savedAddress.phone}
                      </p>
                      <p className="text-xs text-[#75675D]">
                        Email: {savedAddress.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Demo Auth Note */}
        <p className="mt-6 text-center text-[11px] leading-5 text-[#75675D]">
          FLOVR account is currently frontend-only. Authentication data is
          stored in your browser's localStorage for demo purposes.
        </p>
      </div>
    </section>
  );
}

export default Account;
