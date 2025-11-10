"use client"

import { ShoppingCart, Settings } from "lucide-react"

export default function Navigation({ currentView, onNavigate, cartCount, onAdminClick }) {
  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "catalog", label: "Productos" },
  ]

  return (
    <nav style={{ backgroundColor: "#3D5A3C", color: "#E8D5B7", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4rem",
          padding: "1rem",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        <div
          className="logo"
          onClick={() => onNavigate("home")}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
        >
          <img src="/logo.png" alt="Mate y Gambeta" style={{ height: "3rem", width: "3rem", borderRadius: "50%" }} />
          <span style={{ fontWeight: "bold", fontSize: "1.25rem", display: "none" }}>Mate y Gambeta</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: "none",
                color: "var(--mate-cream)",
                padding: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: currentView === item.id ? "bold" : "normal",
                borderBottom: currentView === item.id ? "2px solid var(--mate-cream)" : "none",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={onAdminClick}
            style={{
              background: "none",
              color: "var(--mate-cream)",
              padding: "0.5rem",
              fontSize: "0.875rem",
            }}
            title="Requiere contraseña"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={() => onNavigate("checkout")}
            style={{
              background: "var(--mate-cream)",
              color: "var(--mate-green)",
              padding: "0.5rem 1rem",
              border: "1px solid var(--mate-brown)",
              borderRadius: "0.5rem",
              position: "relative",
            }}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "var(--mate-green)",
                  color: "var(--mate-cream)",
                  fontSize: "0.75rem",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
