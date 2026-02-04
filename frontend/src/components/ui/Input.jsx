import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, startIcon, error, ...props }, ref) => {
    return (
        <div className="w-full relative group">
            {startIcon && (
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-[var(--primary-color)] transition-colors duration-200 h-5 w-5 flex items-center justify-center">
                    {startIcon}
                </div>
            )}
            <input
                type={type}
                className={cn(
                    "flex w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                    startIcon && "pl-11",
                    error && "border-red-500 focus-visible:ring-red-500",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <span className="text-red-500 text-xs mt-1.5 ml-1 font-medium absolute -bottom-6 left-0">{error}</span>
            )}
        </div>
    )
})
Input.displayName = "Input"

export { Input }
