const Input = ({ type = "text", className = "", ...props }) => {
  const inputStyles =
    "w-full px-3 py-2 border border-mate-brown rounded bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"

  return <input type={type} className={`${inputStyles} ${className}`} {...props} />
}
Input.displayName = "Input"

export { Input }
