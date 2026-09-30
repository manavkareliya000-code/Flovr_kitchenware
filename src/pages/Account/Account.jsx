import React, { useEffect, useMemo, useState } from "react";
import {
  UserRound,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  ChevronDown,
  Pencil,
  Check,
  X,
  Truck,
  CreditCard,
  CalendarDays,
  ShoppingBag,
  Clock3,
  CircleCheck,
  Circle,
  ShieldCheck,
  Mail,
  Phone,
  Home,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";


const USER_KEY = "flovr-user";
const LOGIN_KEY = "flovr-logged-in";
const ORDERS_KEY = "flovr-orders";
const LAST_ORDER_KEY = "flovr-last-order";
const ADDRESS_KEY = "flovr-shipping-address";

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const formatCurrency = (amount = 0) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getOrderStatusIndex = (status) => {
  const index = STATUS_STEPS.indexOf(status);
  return index === -1 ? 0 : index;
};

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-[#FFF4DD] text-[#A66A18]",
    Confirmed: "bg-[#EAF3FF] text-[#4777A8]",
    Processing: "bg-[#F1EBFF] text-[#7554A6]",
    Packed: "bg-[#F3EAE3] text-[#795A48]",
    Shipped: "bg-[#E7F5F0] text-[#387D67]",
    "Out for Delivery": "bg-[#E8F3F8] text-[#39738A]",
    Delivered: "bg-[#E7F5E8] text-[#397247]",
    Cancelled: "bg-[#FCEAEA] text-[#A84D4D]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] || "bg-[#F1ECE7] text-[#75675D]"
      }`}
    >
      {status || "Confirmed"}
    </span>
  );
}

function OrderTimeline({ status }) {
  const currentIndex = getOrderStatusIndex(status);

  return (
    <div className="mt-6 rounded-2xl border border-[#E6DCD1] bg-[#FCF9F5] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#4A3428]">Order Progress</h4>
          <p className="mt-1 text-xs text-[#8B7B70]">
            Your order is currently {status || "Pending"}.
          </p>
        </div>

        <Truck size={19} className="text-[#A86643]" />
      </div>

      <div className="hidden md:block">
        <div className="relative flex justify-between">
          <div className="absolute left-0 right-0 top-[15px] h-[2px] bg-[#DDD1C6]" />

          <div
            className="absolute left-0 top-[15px] h-[2px] bg-[#A86643] transition-all"
            style={{
              width:
                currentIndex === 0
                  ? "0%"
                  : `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%`,
            }}
          />

          {STATUS_STEPS.map((step, index) => {
            const completed = index <= currentIndex;

            return (
              <div
                key={step}
                className="relative z-10 flex w-[90px] flex-col items-center text-center"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    completed
                      ? "border-[#A86643] bg-[#A86643] text-white"
                      : "border-[#D9CBBE] bg-[#FCF9F5] text-[#B6A79B]"
                  }`}
                >
                  {completed ? (
                    <Check size={15} strokeWidth={3} />
                  ) : (
                    <Circle size={9} />
                  )}
                </div>

                <span
                  className={`mt-2 text-[10px] leading-tight ${
                    completed
                      ? "font-semibold text-[#4A3428]"
                      : "text-[#9A8D83]"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {STATUS_STEPS.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                  completed
                    ? "border-[#A86643] bg-[#A86643] text-white"
                    : "border-[#D9CBBE] text-[#B6A79B]"
                }`}
              >
                {completed ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <Circle size={8} />
                )}
              </div>

              <span
                className={`text-sm ${
                  completed ? "font-semibold text-[#4A3428]" : "text-[#9A8D83]"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {status === "Shipped" ||
      status === "Out for Delivery" ||
      status === "Delivered" ? (
        <div className="mt-6 grid gap-3 border-t border-[#E5D9CE] pt-5 sm:grid-cols-2">
          {orderTrackingCard(
            "Tracking Number",
            "trackingNumber",
            "Tracking information",
          )}
        </div>
      ) : null}
    </div>
  );

  function orderTrackingCard() {
    return null;
  }
}

function Account() {
  const navigate = useNavigate();

  const { wishlistItems = [] } = useWishlist();

  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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

  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem(LOGIN_KEY);

    if (loggedIn !== "true") {
      navigate("/login");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || "null");

    setUser(savedUser);

    if (savedUser) {
      setProfileForm({
        firstName: savedUser.firstName || "",
        lastName: savedUser.lastName || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
      });
    }

    const savedAddress = JSON.parse(
      localStorage.getItem(ADDRESS_KEY) || "null",
    );

    if (savedAddress) {
      setAddress(savedAddress);
      setAddressForm(savedAddress);
    }

    let savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

    const lastOrder = JSON.parse(
      localStorage.getItem(LAST_ORDER_KEY) || "null",
    );

    if (
      lastOrder &&
      !savedOrders.some((order) => order.orderId === lastOrder.orderId)
    ) {
      savedOrders = [lastOrder, ...savedOrders];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(savedOrders));
    }

    setOrders(savedOrders);
  }, [navigate]);

  const latestOrder = orders[0];

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const pendingOrders = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.status || "Pending"),
  ).length;

  const totalSpent = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) =>
        sum + Number(order.total ?? order.totalAmount ?? order.grandTotal ?? 0),
      0,
    );

  const displayName =
    `${user?.firstName || profileForm.firstName || ""} ${
      user?.lastName || profileForm.lastName || ""
    }`.trim() || "FLOVR Customer";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = () => {
    const updatedUser = {
      ...(user || {}),
      ...profileForm,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditingProfile(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveAddress = () => {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(addressForm));

    setAddress(addressForm);
    setEditingAddress(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_KEY);
    navigate("/login");
  };

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: UserRound,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
      count: totalOrders,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      count: wishlistItems.length,
    },
    {
      id: "profile",
      label: "My Profile",
      icon: UserRound,
    },
    {
      id: "address",
      label: "Saved Address",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#4A3428]">
      {/* PAGE HEADER */}
      <section className="border-b border-[#E3D7CC] bg-[#F7F1E8]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-[#A86643]">
                My Account
              </p>

              <h1 className="font-serif text-3xl font-medium tracking-tight text-[#4A3428] sm:text-4xl">
                Welcome back, {displayName.split(" ")[0]}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#75675D]">
                Manage your orders, profile, saved address and wishlist from one
                place.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#4A3428] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#5D4234]"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[245px_1fr]">
          {/* SIDEBAR */}
          <aside className="h-fit rounded-3xl border border-[#E2D6CA] bg-[#FFFDFC] p-3 lg:sticky lg:top-24">
            {/* USER MINI CARD */}
            <div className="rounded-2xl bg-[#F4EBE2] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A86643] text-sm font-bold text-white">
                  {initials || "F"}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#4A3428]">
                    {displayName}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-[#83756B]">
                    {user?.email || profileForm.email || "FLOVR Account"}
                  </p>
                </div>
              </div>
            </div>

            {/* MENU */}
            <nav className="mt-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-[#4A3428] text-white"
                        : "text-[#75675D] hover:bg-[#F7F1E8] hover:text-[#4A3428]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />

                      <span className="text-sm font-medium">{item.label}</span>
                    </span>

                    {item.count !== undefined ? (
                      <span
                        className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-[11px] ${
                          active
                            ? "bg-white/15 text-white"
                            : "bg-[#F1E9E1] text-[#75675D]"
                        }`}
                      >
                        {item.count}
                      </span>
                    ) : (
                      <ChevronRight
                        size={15}
                        className={active ? "text-white/70" : "text-[#B1A298]"}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="my-4 border-t border-[#E8DDD3]" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#A85D52] transition hover:bg-[#FCEDEC]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>

          {/* CONTENT */}
          <section className="min-w-0">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <Overview
                latestOrder={latestOrder}
                totalOrders={totalOrders}
                deliveredOrders={deliveredOrders}
                pendingOrders={pendingOrders}
                totalSpent={totalSpent}
                navigate={navigate}
                setActiveTab={setActiveTab}
                expandedOrder={expandedOrder}
                setExpandedOrder={setExpandedOrder}
              />
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <OrdersSection
                orders={orders}
                expandedOrder={expandedOrder}
                setExpandedOrder={setExpandedOrder}
                navigate={navigate}
              />
            )}

            {/* WISHLIST */}
            {activeTab === "wishlist" && (
              <WishlistSection
                wishlistItems={wishlistItems}
                setActiveTab={setActiveTab}
              />
            )}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <ProfileSection
                user={user}
                profileForm={profileForm}
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                handleProfileChange={handleProfileChange}
                saveProfile={saveProfile}
              />
            )}

            {/* ADDRESS */}
            {activeTab === "address" && (
              <AddressSection
                address={address}
                addressForm={addressForm}
                editingAddress={editingAddress}
                setEditingAddress={setEditingAddress}
                handleAddressChange={handleAddressChange}
                saveAddress={saveAddress}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  latestOrder,
  totalOrders,
  deliveredOrders,
  pendingOrders,
  totalSpent,
  navigate,
  setActiveTab,
  expandedOrder,
  setExpandedOrder,
}) {
  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon={ShoppingBag} label="Total Orders" value={totalOrders} />

        <StatCard
          icon={CircleCheck}
          label="Delivered"
          value={deliveredOrders}
        />

        <StatCard icon={Clock3} label="In Progress" value={pendingOrders} />

        <StatCard
          icon={CreditCard}
          label="Total Spent"
          value={formatCurrency(totalSpent)}
        />
      </div>

      {/* LATEST ORDER */}
      <div className="rounded-3xl border border-[#E2D6CA] bg-[#FFFDFC] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#A86643]">
              Recent Activity
            </p>

            <h2 className="mt-1 text-xl font-semibold text-[#4A3428]">
              Latest Order
            </h2>
          </div>

          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-1 text-sm font-semibold text-[#A86643] hover:text-[#4A3428]"
          >
            View all orders
            <ChevronRight size={16} />
          </button>
        </div>

        {!latestOrder ? (
          <EmptyOrders onClick={() => navigate("/shop")} />
        ) : (
          <OrderCard
            order={latestOrder}
            expanded={expandedOrder === latestOrder.orderId}
            onToggle={() =>
              setExpandedOrder(
                expandedOrder === latestOrder.orderId
                  ? null
                  : latestOrder.orderId,
              )
            }
          />
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickAction
          icon={Package}
          title="Track an Order"
          text="Check your latest order status"
          onClick={() => setActiveTab("orders")}
        />

        <QuickAction
          icon={MapPin}
          title="Saved Address"
          text="Manage your delivery address"
          onClick={() => setActiveTab("address")}
        />

        <QuickAction
          icon={Heart}
          title="Wishlist"
          text="View your saved products"
          onClick={() => setActiveTab("wishlist")}
        />
      </div>
    </div>
  );
}

/* =========================================================
   ORDER SECTION
========================================================= */

function OrdersSection({ orders, expandedOrder, setExpandedOrder, navigate }) {
  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Purchase History"
        title="My Orders"
        description="Track your FLOVR purchases and view order details."
      />

      {orders.length === 0 ? (
        <EmptyOrders onClick={() => navigate("/shop")} />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              expanded={expandedOrder === order.orderId}
              onToggle={() =>
                setExpandedOrder(
                  expandedOrder === order.orderId ? null : order.orderId,
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, expanded, onToggle }) {
  const status = order.status || "Pending";

  const items = order.items || [];

  const itemCount = items.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );

  const total = order.total ?? order.totalAmount ?? order.grandTotal ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E3D8CE] bg-white">
      {/* ORDER HEADER */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4EAE1] text-[#A86643]">
              <Package size={20} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-[#4A3428]">
                  #{order.orderId}
                </h3>

                <StatusBadge status={status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A7B71]">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} />
                  {formatDate(order.orderDate || order.createdAt || order.date)}
                </span>

                <span className="flex items-center gap-1.5">
                  <ShoppingBag size={13} />
                  {itemCount} item
                  {itemCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[#EEE5DE] pt-3 xl:border-0 xl:pt-0">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#9A8B81]">
                Order Total
              </p>

              <p className="mt-0.5 text-lg font-bold text-[#4A3428]">
                {formatCurrency(total)}
              </p>
            </div>

            <button
              onClick={onToggle}
              className="flex items-center gap-1.5 rounded-full border border-[#DCCFC4] px-4 py-2 text-xs font-semibold text-[#4A3428] transition hover:bg-[#F7F1E8]"
            >
              {expanded ? "Hide Details" : "View Details"}

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div className="border-t border-[#E5DAD1] bg-[#FCF9F5] p-4 sm:p-5">
          {/* PRODUCTS */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#4A3428]">
                Items in this order
              </h4>

              <span className="text-xs text-[#8B7D73]">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={`${item.id || item.productId}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-[#E5DAD0] bg-white p-3"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#EFE5DA]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#A86643]">
                        <ShoppingBag size={20} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h5 className="truncate text-sm font-semibold text-[#4A3428]">
                      {item.name || "FLOVR Product"}
                    </h5>

                    <p className="mt-1 text-xs text-[#8C7D73]">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-[#4A3428]">
                    {formatCurrency(
                      Number(item.price || 0) * Number(item.quantity || 1),
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER INFO */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoBox
              icon={CreditCard}
              title="Payment"
              value={
                order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod || "—"
              }
            />

            <InfoBox
              icon={ShieldCheck}
              title="Payment Status"
              value={order.paymentStatus || "Pending"}
            />

            <InfoBox
              icon={Truck}
              title="Courier"
              value={order.courier || "Not assigned"}
            />

            <InfoBox
              icon={MapPin}
              title="Delivery"
              value={
                order.expectedDelivery
                  ? formatDate(order.expectedDelivery)
                  : "To be updated"
              }
            />
          </div>

          {/* TRACKING */}
          <div className="mt-4">
            <OrderTracking order={order} />
          </div>

          {/* ADDRESS */}
          {order.customer && (
            <div className="mt-4 rounded-2xl border border-[#E3D8CE] bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={17} className="text-[#A86643]" />

                <h4 className="text-sm font-semibold text-[#4A3428]">
                  Delivery Address
                </h4>
              </div>

              <p className="text-sm font-medium text-[#4A3428]">
                {order.customer.firstName} {order.customer.lastName}
              </p>

              <p className="mt-1 text-sm leading-6 text-[#75675D]">
                {order.customer.address}
                <br />
                {order.customer.city}, {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OrderTracking({ order }) {
  const status = order.status || "Pending";
  const currentIndex = getOrderStatusIndex(status);

  return (
    <div className="rounded-2xl border border-[#E3D8CE] bg-white p-4 sm:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h4 className="text-sm font-semibold text-[#4A3428]">
            Order Tracking
          </h4>

          <p className="mt-1 text-xs text-[#8B7D73]">
            Current status:{" "}
            <span className="font-semibold text-[#A86643]">{status}</span>
          </p>
        </div>

        {order.trackingNumber && (
          <div className="rounded-xl bg-[#F6EFE8] px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-[#9B8B80]">
              Tracking Number
            </p>

            <p className="mt-0.5 text-xs font-bold text-[#4A3428]">
              {order.trackingNumber}
            </p>
          </div>
        )}
      </div>

      {status === "Cancelled" ? (
        <div className="mt-4 rounded-xl bg-[#FCEDEC] p-4 text-sm text-[#A34F4F]">
          This order has been cancelled.
        </div>
      ) : (
        <div className="mt-6">
          <div className="hidden md:flex md:items-start">
            {STATUS_STEPS.map((step, index) => {
              const completed = index <= currentIndex;
              const isLast = index === STATUS_STEPS.length - 1;

              return (
                <React.Fragment key={step}>
                  <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        completed
                          ? "border-[#A86643] bg-[#A86643] text-white"
                          : "border-[#D8CBC0] bg-white text-[#B7A89D]"
                      }`}
                    >
                      {completed ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <Circle size={8} />
                      )}
                    </div>

                    <p
                      className={`mt-2 text-[10px] leading-4 ${
                        completed
                          ? "font-semibold text-[#4A3428]"
                          : "text-[#9A8B80]"
                      }`}
                    >
                      {step}
                    </p>
                  </div>

                  {!isLast && (
                    <div
                      className={`mt-4 h-[2px] flex-1 ${
                        index < currentIndex ? "bg-[#A86643]" : "bg-[#DED2C8]"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="space-y-3 md:hidden">
            {STATUS_STEPS.map((step, index) => {
              const completed = index <= currentIndex;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-[#A86643] bg-[#A86643] text-white"
                        : "border-[#D8CBC0] bg-white text-[#B7A89D]"
                    }`}
                  >
                    {completed ? (
                      <Check size={13} strokeWidth={3} />
                    ) : (
                      <Circle size={7} />
                    )}
                  </div>

                  <span
                    className={`text-xs ${
                      completed
                        ? "font-semibold text-[#4A3428]"
                        : "text-[#9A8B80]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {order.courier && (
        <div className="mt-5 flex items-center gap-2 border-t border-[#EEE5DE] pt-4 text-xs text-[#75675D]">
          <Truck size={14} className="text-[#A86643]" />
          Courier:{" "}
          <span className="font-semibold text-[#4A3428]">{order.courier}</span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   WISHLIST
========================================================= */

function WishlistSection({ wishlistItems, setActiveTab }) {
  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Saved For Later"
        title="My Wishlist"
        description="Products you have saved for your next FLOVR purchase."
      />

      {wishlistItems.length === 0 ? (
        <div className="rounded-3xl border border-[#E2D6CA] bg-[#FFFDFC] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EAE1] text-[#A86643]">
            <Heart size={26} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#4A3428]">
            Your wishlist is empty
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#81736A]">
            Save products you love and they will appear here.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4A3428] px-5 py-3 text-sm font-semibold text-white"
          >
            Explore Products
            <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {wishlistItems.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group overflow-hidden rounded-2xl border border-[#E2D6CA] bg-[#FFFDFC] transition hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(74,52,40,0.08)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#EFE5DA]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#A86643]">
                    <Heart size={28} />
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#A86643]">
                  {product.category || "FLOVR"}
                </p>

                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#4A3428]">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm font-bold text-[#4A3428]">
                  {formatCurrency(product.price)}
                </p>

                {product.rating && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-[#8A7A70]">
                    <Star size={13} className="fill-[#C68B55] text-[#C68B55]" />
                    {product.rating}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function ProfileSection({
  user,
  profileForm,
  editingProfile,
  setEditingProfile,
  handleProfileChange,
  saveProfile,
}) {
  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Personal Information"
        title="My Profile"
        description="Manage the personal details connected to your FLOVR account."
      />

      <div className="rounded-3xl border border-[#E2D6CA] bg-[#FFFDFC] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-5 border-b border-[#E6DBD2] pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A86643] text-lg font-bold text-white">
              {`${profileForm.firstName} ${profileForm.lastName}`
                .trim()
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((x) => x[0])
                .join("")
                .toUpperCase() || "F"}
            </div>

            <div>
              <h3 className="font-semibold text-[#4A3428]">
                {profileForm.firstName || "FLOVR"}{" "}
                {profileForm.lastName || "Customer"}
              </h3>

              <p className="mt-1 text-sm text-[#83756C]">
                {profileForm.email || user?.email}
              </p>
            </div>
          </div>

          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8CBC0] px-4 py-2.5 text-sm font-semibold text-[#4A3428] hover:bg-[#F7F1E8]"
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setEditingProfile(false)}
                className="inline-flex items-center gap-2 rounded-full border border-[#D8CBC0] px-4 py-2.5 text-sm font-semibold text-[#75675D]"
              >
                <X size={15} />
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="inline-flex items-center gap-2 rounded-full bg-[#4A3428] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Check size={15} />
                Save
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            value={profileForm.firstName}
            onChange={handleProfileChange}
            disabled={!editingProfile}
          />

          <FormField
            label="Last Name"
            name="lastName"
            value={profileForm.lastName}
            onChange={handleProfileChange}
            disabled={!editingProfile}
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={profileForm.email}
            onChange={handleProfileChange}
            disabled={!editingProfile}
          />

          <FormField
            label="Phone Number"
            name="phone"
            value={profileForm.phone}
            onChange={handleProfileChange}
            disabled={!editingProfile}
          />
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F7F1E8] p-4">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#A86643]" />

          <div>
            <p className="text-sm font-semibold text-[#4A3428]">
              Your information is private
            </p>

            <p className="mt-1 text-xs leading-5 text-[#81736A]">
              Your profile information is stored locally for this frontend demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADDRESS
========================================================= */

function AddressSection({
  address,
  addressForm,
  editingAddress,
  setEditingAddress,
  handleAddressChange,
  saveAddress,
}) {
  return (
    <div className="space-y-5">
      <PageHeading
        eyebrow="Delivery Information"
        title="Saved Address"
        description="Your default shipping address used during checkout."
      />

      <div className="rounded-3xl border border-[#E2D6CA] bg-[#FFFDFC] p-5 sm:p-7">
        {!editingAddress && address ? (
          <>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4EAE1] text-[#A86643]">
                  <Home size={20} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#4A3428]">
                      {address.firstName} {address.lastName}
                    </h3>

                    <span className="rounded-full bg-[#EAF3E9] px-2.5 py-1 text-[10px] font-semibold text-[#48744D]">
                      DEFAULT
                    </span>
                  </div>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#75675D]">
                    {address.address}
                    <br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#83756C]">
                    {address.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} />
                        {address.phone}
                      </span>
                    )}

                    {address.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={13} />
                        {address.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setEditingAddress(true)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D8CBC0] px-4 py-2.5 text-sm font-semibold text-[#4A3428] hover:bg-[#F7F1E8]"
              >
                <Pencil size={15} />
                Edit Address
              </button>
            </div>
          </>
        ) : (
          <div>
            {!address && !editingAddress && (
              <div className="mb-6 rounded-2xl bg-[#F7F1E8] p-5 text-center">
                <MapPin size={25} className="mx-auto text-[#A86643]" />

                <h3 className="mt-3 font-semibold text-[#4A3428]">
                  No saved address
                </h3>

                <p className="mt-1 text-sm text-[#81736A]">
                  Add your delivery address for a faster checkout.
                </p>

                <button
                  onClick={() => setEditingAddress(true)}
                  className="mt-4 rounded-full bg-[#4A3428] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Add Address
                </button>
              </div>
            )}

            {editingAddress && (
              <>
                <div className="mb-6 flex items-center justify-between border-b border-[#E6DBD2] pb-5">
                  <div>
                    <h3 className="font-semibold text-[#4A3428]">
                      {address ? "Edit Address" : "Add Address"}
                    </h3>

                    <p className="mt-1 text-xs text-[#83756C]">
                      Enter your delivery details below.
                    </p>
                  </div>

                  <button
                    onClick={() => setEditingAddress(false)}
                    className="rounded-full p-2 text-[#83756C] hover:bg-[#F7F1E8]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={addressForm.firstName}
                    onChange={handleAddressChange}
                  />

                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={addressForm.lastName}
                    onChange={handleAddressChange}
                  />

                  <FormField
                    label="Phone"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressChange}
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={addressForm.email}
                    onChange={handleAddressChange}
                  />

                  <div className="sm:col-span-2">
                    <FormField
                      label="Address"
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <FormField
                    label="City"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                  />

                  <FormField
                    label="State"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                  />

                  <FormField
                    label="Pincode"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingAddress(false)}
                    className="rounded-full border border-[#D8CBC0] px-5 py-2.5 text-sm font-semibold text-[#75675D]"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveAddress}
                    className="inline-flex items-center gap-2 rounded-full bg-[#4A3428] px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <Check size={15} />
                    Save Address
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#E2D6CA] bg-[#FFFDFC] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EAE1] text-[#A86643]">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-[#8B7D73]">{label}</p>

      <p className="mt-1 text-xl font-bold text-[#4A3428]">{value}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, title, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-[#E2D6CA] bg-[#FFFDFC] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#CDBBAA] hover:shadow-[0_10px_30px_rgba(74,52,40,0.06)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EAE1] text-[#A86643]">
          <Icon size={18} />
        </div>

        <ArrowRight
          size={16}
          className="text-[#B0A096] transition group-hover:translate-x-1 group-hover:text-[#A86643]"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#4A3428]">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-[#83756C]">{text}</p>
    </button>
  );
}

function InfoBox({ icon: Icon, title, value }) {
  return (
    <div className="rounded-xl border border-[#E5DAD0] bg-[#FCF9F5] p-3">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#A86643]" />

        <span className="text-[10px] uppercase tracking-wider text-[#97877D]">
          {title}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-[#4A3428]">
        {value}
      </p>
    </div>
  );
}

function PageHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A86643]">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-2xl font-semibold text-[#4A3428]">{title}</h2>

      <p className="mt-1 text-sm text-[#81736A]">{description}</p>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#5F5148]">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm text-[#4A3428] outline-none transition placeholder:text-[#B1A39A] ${
          disabled
            ? "cursor-default border-[#E8DED6] bg-[#F8F3EE]"
            : "border-[#DCCFC4] bg-white focus:border-[#A86643] focus:ring-2 focus:ring-[#A86643]/10"
        }`}
      />
    </label>
  );
}

function EmptyOrders({ onClick }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#DCCFC4] bg-[#FCF9F5] p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E6DC] text-[#A86643]">
        <Package size={23} />
      </div>

      <h3 className="mt-4 font-semibold text-[#4A3428]">No orders yet</h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-[#83756C]">
        Your orders will appear here once you place your first FLOVR order.
      </p>

      <button
        onClick={onClick}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#4A3428] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Start Shopping
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default Account;
