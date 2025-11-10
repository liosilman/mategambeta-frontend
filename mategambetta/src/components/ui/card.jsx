/* Reescrito sin cn(), usando inline styles */
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-card rounded shadow ${className}`} style={{ backgroundColor: "var(--mate-tan)" }}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "" }) {
  return <div className={`flex flex-col gap-4 p-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`font-bold text-lg ${className}`} style={{ color: "var(--mate-green)" }}>
      {children}
    </h2>
  )
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm ${className}`} style={{ color: "var(--mate-green-light)" }}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = "" }) {
  return <div className={`flex items-center p-4 gap-2 ${className}`}>{children}</div>
}
