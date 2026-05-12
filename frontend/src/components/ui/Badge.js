import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-orquidea-green text-white",
    secondary: "bg-orquidea-cream text-orquidea-green",
    outline: "border border-orquidea-green text-orquidea-green",
    destructive: "bg-orquidea-red text-white",
    gold: "bg-orquidea-gold text-white",
    tech: "bg-orquidea-tech text-white",
    seller: "bg-orquidea-seller text-white",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
