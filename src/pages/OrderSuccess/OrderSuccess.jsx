import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  Package,
  ShoppingBag,
  ArrowRight,
  Home,
  Clock3,
  CreditCard,
  Truck,
  MapPin,
} from "lucide-react";

const ORDERS_KEY = "flovr-orders";

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const orderId = location.state?.orderId;

  useEffect(() => {
    const savedOrders = localStorage.getItem(ORDERS_KEY);

    if (!savedOrders) {
      return;
    }

    try {
      const orders = JSON.parse(savedOrders);

      const foundOrder = orders.find(
        (item) => item.orderId === orderId,
      );

      if (foundOrder) {
        setOrder(foundOrder);
      }
    } catch (error) {
      console.error("Failed to load order:", error);
    }
  }, [orderId]);

  // --------------------------------------------------
  // FALLBACK ORDER ID
  // --------------------------------------------------

  const displayOrderId =
    order?.orderId ||
    orderId ||
    `FLV${Date.now().toString().slice(-8)}`;

  // --------------------------------------------------
  // ORDER VALUES
  // --------------------------------------------------

  const currentStatus = order?.status || "Pending";

  const currentStatusIndex =
    STATUS_STEPS.indexOf(currentStatus);

  const paymentMethod =
    order?.paymentMethod === "online"
      ? "Online Payment"
      : "Cash on Delivery";

  const paymentStatus =
    order?.paymentStatus || "Pending";

  const orderTotal = Number(order?.total || 0);

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const formattedDate = order?.orderDate
    ? new Date(order.orderDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <div className="min-h-screen bg-[#F7F1E8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* ================================================ */}
        {/* SUCCESS HEADER */}
        {/* ================================================ */}

        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E7F1E3] text-[#477044] shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#477044] text-white">
              <Check size={27} strokeWidth={2.5} />
            </div>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#A86643]">
            Order confirmed
          </p>

          <h1 className="mt-2 font-serif text-3xl text-[#4A3428] sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#75675D]">
            Your order has been successfully placed. We will
            keep you updated as it moves through each stage.
          </p>
        </div>

        {/* ================================================ */}
        {/* ORDER ID */}
        {/* ================================================ */}

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 text-center shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75675D]">
            Order ID
          </p>

          <p className="mt-2 font-mono text-xl font-bold tracking-wider text-[#4A3428]">
            {displayOrderId}
          </p>

          <p className="mt-2 text-xs text-[#75675D]">
            Placed on {formattedDate}
          </p>
        </div>

        {/* ================================================ */}
        {/* ORDER INFO */}
        {/* ================================================ */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Package size={18} />}
            label="Order status"
            value={currentStatus}
            iconClass="bg-[#F0E1D3] text-[#A86643]"
          />

          <InfoCard
            icon={<CreditCard size={18} />}
            label="Payment"
            value={paymentMethod}
            subValue={paymentStatus}
            iconClass="bg-[#EEE7F4] text-[#765A91]"
          />

          <InfoCard
            icon={<ShoppingBag size={18} />}
            label="Order total"
            value={`₹${orderTotal.toLocaleString("en-IN")}`}
            iconClass="bg-[#E7F1E3] text-[#477044]"
          />
        </div>

        {/* ================================================ */}
        {/* ORDER STATUS TIMELINE */}
        {/* ================================================ */}

        <section className="mt-6 rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
              <Truck size={19} />
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#4A3428]">
                Order tracking
              </h2>

              <p className="text-xs text-[#75675D]">
                Current status: {currentStatus}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {STATUS_STEPS.map((status, index) => {
              const completed =
                currentStatusIndex >= index;

              const isCurrent =
                currentStatus === status;

              const historyItem =
                order?.statusHistory?.find(
                  (item) => item.status === status,
                );

              return (
                <div
                  key={status}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {/* Vertical line */}
                  {index < STATUS_STEPS.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 h-[calc(100%-16px)] w-px ${
                        currentStatusIndex > index
                          ? "bg-[#477044]"
                          : "bg-[#D9CBBE]"
                      }`}
                    />
                  )}

                  {/* Circle */}
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-[#477044] bg-[#477044] text-white"
                        : "border-[#D9CBBE] bg-[#FFFDFC] text-[#9A8D83]"
                    }`}
                  >
                    {completed ? (
                      <Check size={15} strokeWidth={2.5} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={`text-sm font-semibold ${
                          completed
                            ? "text-[#4A3428]"
                            : "text-[#9A8D83]"
                        }`}
                      >
                        {status}
                      </p>

                      {isCurrent && (
                        <span className="rounded-full bg-[#F0E1D3] px-2.5 py-1 text-[10px] font-bold text-[#A86643]">
                          Current
                        </span>
                      )}
                    </div>

                    {historyItem?.date && (
                      <p className="mt-1 text-xs text-[#75675D]">
                        {new Date(
                          historyItem.date,
                        ).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    )}

                    {!historyItem && index === 0 && (
                      <p className="mt-1 text-xs text-[#75675D]">
                        Your order has been received.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================ */}
        {/* DELIVERY ADDRESS */}
        {/* ================================================ */}

        {order?.customer && (
          <section className="mt-6 rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E1D3] text-[#A86643]">
                <MapPin size={19} />
              </div>

              <div>
                <h2 className="font-serif text-xl text-[#4A3428]">
                  Delivery address
                </h2>

                <p className="text-xs text-[#75675D]">
                  Your order will be delivered here
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#D9CBBE] bg-[#F7F1E8]/60 p-4">
              <p className="text-sm font-semibold text-[#4A3428]">
                {order.customer.firstName}{" "}
                {order.customer.lastName}
              </p>

              <p className="mt-1 text-sm leading-6 text-[#75675D]">
                {order.customer.address}
                <br />
                {order.customer.city},{" "}
                {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>

              <p className="mt-2 text-xs text-[#75675D]">
                Phone: {order.customer.phone}
              </p>
            </div>
          </section>
        )}

        {/* ================================================ */}
        {/* ACTIONS */}
        {/* ================================================ */}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/account"
            state={{ menu: "orders" }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5A4032]"
          >
            View My Orders
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-3 text-sm font-semibold text-[#4A3428] transition hover:border-[#A86643] hover:text-[#A86643]"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9CBBE] bg-transparent px-6 py-3 text-sm font-semibold text-[#75675D] transition hover:text-[#A86643]"
          >
            <Home size={17} />
            Home
          </Link>
        </div>

        {/* ================================================ */}
        {/* SUPPORT MESSAGE */}
        {/* ================================================ */}

        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-[#75675D]">
          <Clock3 size={14} className="text-[#A86643]" />
          <span>
            You can track your order anytime from My Orders.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===================================================== */
/* INFO CARD */
/* ===================================================== */

function InfoCard({
  icon,
  label,
  value,
  subValue,
  iconClass,
}) {
  return (
    <div className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#75675D]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-[#4A3428]">
            {value}
          </p>

          {subValue && (
            <p className="mt-0.5 text-[11px] text-[#75675D]">
              Payment: {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}