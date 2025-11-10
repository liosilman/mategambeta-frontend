import { cn } from "../../lib/utils"

export const Label = ({ children, htmlFor, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={cn("text-sm font-medium text-foreground block mb-1", className)}>
      {children}
    </label>
  )
}
