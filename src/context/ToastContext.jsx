import { createContext, useContext, useState } from "react";
import { Check, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed right-4 top-20 z-[9999] w-[calc(100%-2rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-2xl border border-[#D9CBBE] bg-[#FFFDFC] p-4 shadow-2xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4A3428] text-white">
              <Check size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#4A3428]">
                Added to cart
              </p>

              <p className="mt-1 text-sm text-[#75675D]">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-[#75675D] transition hover:text-[#4A3428]"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}