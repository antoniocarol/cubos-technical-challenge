import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className={cn(
            "text-sm font-medium transition-colors duration-200",
            isFocused ? "text-purple-11" : "text-mauve-11"
          )}>
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type={type}
            className={cn(
              // Base styles
              "flex h-12 w-full rounded-xs border bg-background px-3 py-2 text-base transition-all duration-200",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-mauve-9 placeholder:transition-colors placeholder:duration-200",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-0 focus-visible:inset-ring-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              
              // State-based styles
              isFocused ? [
                "border-[var(--color-primary-default)] ring-[var(--color-primary-default)] shadow-sm",
                "placeholder:text-white/70"
              ] : hasValue ? [
                "border-[var(--color-primary-default)]/50",
                "text-white"
              ] : [
                "border-white/20",
                "text-white"
              ],
              
              // Background color
              "bg-black/20 backdrop-blur-sm",
              
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {/* Focus ring effect */}
          {isFocused && (
            <div className="absolute inset-0 rounded-xs ring-2 ring-purple-7 ring-offset-2 pointer-events-none" />
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }