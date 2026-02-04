import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Accordion = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-b border-[var(--border-color)]", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, isOpen, onClick, ...props }, ref) => (
    <button
        ref={ref}
        onClick={onClick}
        className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-[var(--text-primary)] w-full text-left",
            className
        )}
        {...props}
    >
        {children}
        <ChevronDown
            className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-200 text-[var(--text-secondary)]",
                isOpen ? "rotate-180" : ""
            )}
        />
    </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, isOpen, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
        )}
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
))
AccordionContent.displayName = "AccordionContent"

/* 
  Helper wrapper to manage state for single open item.
  Usage: <AccordionPrimitive type="single" collapsible>...</AccordionPrimitive>
  Since we are building custom, we can just export a managing component or let the parent manage state.
  For 'standard' feel, let's export a SimpleAccordion that manages state if needed, 
  but the Radix way is composable.
  
  I will provide a simple stateful wrapper for ease of use in Builder.
*/
const AccordionRoot = ({ type = "single", defaultValue, children, className }) => {
    const [value, setValue] = React.useState(defaultValue || (type === "single" ? "" : []));

    // Clone children to inject props
    return (
        <div className={className}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return null;

                // This is a naive implementation assuming direct children are AccordionItems
                // For the Builder, we will manually control state usually, but let's try to be clever
                // Actually, for the Builder, manual control is better.
                // So I will stick to exporting the dumb components above and the user (me) implements state.
                return child;
            })}
        </div>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
