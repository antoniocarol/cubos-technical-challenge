import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    
    return (
      <Comp
        className={cn(
          // Base styles
          "cursor-pointer inline-flex items-center justify-center rounded-xs font-medium transition-all border-none duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          
          // Size variants
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md", 
            "h-12 px-6 text-base": size === "lg",
          },
          
          // Primary variant (from design specs)
          variant === "primary" && [
            "bg-[var(--color-primary-default)] text-white shadow-sm",
            "hover:bg-[var(--color-primary-hover)] hover:shadow-md hover:scale-[1.02]",
            "active:bg-[var(--color-primary-active)] active:scale-[0.98]",
            "disabled:bg-[var(--color-primary-disabled)] disabled:text-white/70 disabled:shadow-none disabled:scale-100"
          ],
          
          // Secondary variant (from design specs)
          variant === "secondary" && [
            "bg-filter text-white border border-transparent",
            "hover:bg-[var(--purple-3)] hover:shadow-sm hover:scale-[1.02]",
            "active:bg-[var(--color-secondary-active)] active:scale-[0.98]",
            "disabled:bg-[var(--color-secondary-disabled)] disabled:text-white/50 disabled:shadow-none disabled:scale-100"
          ],
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }