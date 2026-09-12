import { MessageCircle, ArrowRight } from "lucide-react";

function InquiryProductCard({ product }) {
  const whatsappNumber = "+919558359356";

  const message = `Hello FLOVR, I am interested in ${product.name}. Please share more details.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE3D7]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Inquiry Badge */}
        <div className="absolute left-0 top-3">
          <span className="bg-white px-5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9A542C] shadow-sm">
            Inquiry Only
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">

        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9A542C]">
          FLOVR Collection
        </p>

        <h3 className="mt-1 font-serif text-xl leading-tight text-[#171717]">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#6d6259]">
          {product.description}
        </p>

        {/* WhatsApp Inquiry */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn mt-5 flex h-11 w-full items-center justify-center gap-2 border border-[#171717] text-[10px] font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-[#171717] hover:text-white"
        >
          <MessageCircle
            size={16}
            strokeWidth={2}
          />

          More Inquiry

          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </a>

      </div>
    </div>
  );
}

export default InquiryProductCard;