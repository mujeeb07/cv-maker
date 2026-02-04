import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

/* Note: Radix UI Slot is optional but good for flexibility (e.g. asChild). 
   Since we didn't install @radix-ui/react-slot, I will remove it for now to avoid dependency hell 
   unless the user explicitly asked for it, or I'll just use a standard 'as' prop pattern if needed.
   Actually, for a robust button, normal composition is fine. I'll stick to a simple impl first.
*/

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

    // Variants
    const variants = {
        default: "bg-[var(--primary-color)] text-[var(--primary-foreground)] shadow-lg shadow-indigo-500/20 hover:bg-[var(--primary-hover)] hover:shadow-indigo-500/30",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm", // Standardizing Destructive
        outline: "border border-[var(--border-color)] bg-transparent hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]",
        secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]",
        ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]",
        link: "text-[var(--primary-color)] underline-offset-4 hover:underline",
        glass: "glass-card text-[var(--text-primary)] hover:bg-white/20 dark:hover:bg-black/20"
    }

    // Sizes
    const sizes = {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3 rounded-lg",
        lg: "h-12 px-8 rounded-xl",
        icon: "h-11 w-11",
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
