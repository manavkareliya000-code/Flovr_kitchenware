import { MessageCircle } from "lucide-react";
import InquiryProductCard from "./InquiryProductCard";

const inquiryProducts = [
  {
    id: 1,
    name: "Premium Storage Cabinet",
    description:
      "Elegant storage solution designed to keep your home organized and clutter-free.",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 2,
    name: "Modern Kitchen Organizer",
    description:
      "Smart and stylish kitchen storage designed for everyday convenience.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 3,
    name: "Multipurpose Home Rack",
    description:
      "Versatile home organization rack suitable for different everyday spaces.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: 4,
    name: "Decorative Storage Basket",
    description:
      "Beautiful and practical storage basket for a clean and organized home.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85",
  },
];

function InquiryProducts() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 lg:py-24 ">
      <div className="mx-auto max-w-[1500px]">

        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-[650px] text-center">

          <p className="mb-3 md:text-[16px] text-sm font-medium uppercase tracking-[0.28em] text-[#9A542C]">
            Available On Inquiry
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#171717] md:text-5xl">
            Selected Collection
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#6d6259] sm:text-base">
            Explore some of our selected products. Contact us on
            WhatsApp for pricing, availability and more details.
          </p>

        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">

          {inquiryProducts.map((product) => (
            <InquiryProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* ================= BOTTOM MESSAGE ================= */}
        <div className="mt-14 text-center">

          <p className="text-sm text-[#6d6259]">
            Looking for something specific?
          </p>

          <a
            href="https://wa.me/919XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 border-b border-[#171717] pb-1 text-xs font-medium uppercase tracking-[0.16em] text-[#171717] transition-colors hover:text-[#9A542C]"
          >
            Contact FLOVR

            <MessageCircle
              size={15}
              strokeWidth={1.5}
            />
          </a>

        </div>

      </div>
    </section>
  );
}

export default InquiryProducts;