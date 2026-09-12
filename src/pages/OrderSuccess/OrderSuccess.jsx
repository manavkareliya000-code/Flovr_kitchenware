import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Check,
  Home,
  Package,
  ShoppingBag,
} from "lucide-react";

function OrderSuccess() {
  const location = useLocation();

  const orderId =
    location.state?.orderId ||
    `FLV${Date.now().toString().slice(-8)}`;

  return (
    <section className="min-h-[80vh] bg-[#F7F1E8] px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-2xl">

        {/* Success Card */}
        <div className="rounded-3xl border border-[#D9CBBE] bg-[#FFFDFC] px-5 py-10 text-center shadow-sm md:px-10 md:py-14">

          {/* Check */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-400 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={28} strokeWidth={4.5} />
            </div>
          </div>

          {/* Heading */}
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#A86643]">
            Order Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#4A3428] md:text-4xl">
            Thank You for Your Order!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#75675D]">
            Your order has been successfully placed.
            We'll make sure your FLOVR products reach you safely.
          </p>

          {/* Order ID */}
          <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-[#D9CBBE] bg-[#F7F1E8] px-5 py-4">
            <p className="text-xs text-[#75675D]">
              Order ID
            </p>

            <p className="mt-1 text-lg font-bold tracking-wider text-[#4A3428]">
              #{orderId}
            </p>
          </div>

          {/* Info */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <div className="flex items-center gap-3 rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                <Package size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#4A3428]">
                  Order Processing
                </p>

                <p className="mt-0.5 text-xs text-[#75675D]">
                  We'll prepare your order soon.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFE3D4] text-[#4A3428]">
                <ShoppingBag size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#4A3428]">
                  Delivery
                </p>

                <p className="mt-0.5 text-xs text-[#75675D]">
                  Delivered to your address.
                </p>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A3428] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A86643]"
            >
              Continue Shopping
              <ShoppingBag size={17} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9CBBE] bg-[#FFFDFC] px-6 py-3.5 text-sm font-medium text-[#4A3428] transition hover:border-[#A86643] hover:text-[#A86643]"
            >
              <Home size={17} />
              Back to Home
            </Link>

          </div>
        </div>

        {/* Bottom Message */}
        <p className="mt-6 text-center text-xs text-[#75675D]">
          Thank you for choosing FLOVR — everything for your home.
        </p>

      </div>
    </section>
  );
}

export default OrderSuccess;