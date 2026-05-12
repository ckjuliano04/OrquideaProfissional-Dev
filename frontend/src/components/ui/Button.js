import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = "button"
  
  const variants = {
    primary: "bg-orquidea-green text-white hover:bg-orquidea-night shadow-lg shadow-orquidea-green/20",
    secondary: "bg-orquidea-cream text-orquidea-green hover:bg-orquidea-light",
    destructive: "bg-orquidea-red text-white hover:bg-red-700 shadow-lg shadow-orquidea-red/20",
    outline: "border-2 border-orquidea-green text-orquidea-green hover:bg-orquidea-green hover:text-white",
    ghost: "text-orquidea-green hover:bg-orquidea-green/10",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  }

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-3 text-sm font-bold rounded-xl",
    lg: "px-8 py-4 text-base font-black rounded-2xl tracking-wide",
    xl: "px-10 py-5 text-lg font-black rounded-3xl tracking-wider uppercase",
  }

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
