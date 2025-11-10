"use client"

/* Reescrito sin CVA, Radix UI, usando CSS vanilla */
export function Button({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-mate-green-dark",
    outline: "border border-mate-brown bg-background text-foreground hover:bg-mate-tan",
    ghost: "hover:bg-mate-tan text-foreground",
    destructive: "bg-error text-white hover:bg-red-700",
  }

  const sizes = {
    default: "h-10",
    sm: "h-8 text-sm px-3",
    lg: "h-12 px-6",
    icon: "h-10 w-10 p-0",
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button type={type} className={buttonClass} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
