/* Removido "use client", simplificado CSS */
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { formatPrice } from "../lib/utils"

export default function ProductCard({ product, onAddToCart }) {
  const [showCustomization, setShowCustomization] = useState(false)
  const [customText, setCustomText] = useState("")

  const handleAddToCart = () => {
    if (product.customizable && showCustomization && customText.trim()) {
      onAddToCart(product, customText.trim())
      setCustomText("")
      setShowCustomization(false)
    } else {
      onAddToCart(product, null)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div style={{ aspectRatio: "1", overflow: "hidden", backgroundColor: "var(--mate-brown)" }}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent>
        <h3 style={{ color: "var(--mate-green)", fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          {product.name}
        </h3>
        <p style={{ color: "var(--mate-green-light)", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
          {product.description}
        </p>
        <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--mate-green)" }}>
          {formatPrice(product.price)}
        </p>

        {product.customizable && (
          <div style={{ marginTop: "0.75rem" }}>
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              style={{
                color: "var(--mate-green)",
                textDecoration: "underline",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--mate-green-dark)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--mate-green)")}
            >
              {showCustomization
                ? "Cancelar personalización"
                : `Personalizar con grabado (+${formatPrice(product.customizationPrice)})`}
            </button>

            {showCustomization && (
              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor={`custom-${product._id}`} style={{ color: "var(--mate-green)", fontSize: "0.75rem" }}>
                  Texto para grabar (máx. 20 caracteres)
                </Label>
                <Input
                  id={`custom-${product._id}`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
                  placeholder="Ej: Juan 2024"
                  maxLength={20}
                  style={{
                    backgroundColor: "var(--mate-cream)",
                    borderColor: "var(--mate-brown)",
                    color: "var(--mate-green)",
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: "var(--mate-green-light)" }}>
                  {customText.length}/20 caracteres
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          style={{ width: "100%", backgroundColor: "var(--mate-green)", color: "var(--mate-cream)" }}
          disabled={showCustomization && !customText.trim()}
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
