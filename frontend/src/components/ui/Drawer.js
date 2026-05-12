import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Drawer({ open, onOpenChange, children, title }) {
  const scrollRef = React.useRef(null);

  // Lock scroll when drawer is open and reset internal scroll
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <h2
                id="drawer-title"
                className="text-xl font-black uppercase tracking-tight text-slate-900"
              >
                {title}
              </h2>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Fechar menu"
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-orquidea-green focus:outline-none focus:ring-2 focus:ring-orquidea-green/20"
              >
                <X size={24} />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
