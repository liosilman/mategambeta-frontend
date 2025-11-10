"use client"

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
    <Card className="overflow-hidden bg-[#D4C4A8] border-[#C4B49A] hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-[#C4B49A] flex-shrink-0">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3 flex-grow flex flex-col gap-2">
        <h3 className="font-bold text-base text-[#3D5A3C]">{product.name}</h3>
        <p className="text-xs text-[#5A7A58] line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-[#3D5A3C]">{formatPrice(product.price)}</p>

        {product.customizable && (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="text-xs text-[#3D5A3C] underline hover:text-[#2D4A2C]"
            >
              {showCustomization ? "Cancelar" : `Personalizar (+${formatPrice(product.customizationPrice)})`}
            </button>

            {showCustomization && (
              <div className="space-y-1">
                <Label htmlFor={`custom-${product._id}`} className="text-[#3D5A3C] text-xs">
                  Texto (máx. 20 caracteres)
                </Label>
                <Input
                  id={`custom-${product._id}`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.slice(0, 20))}
                  placeholder="Ej: Juan 2024"
                  maxLength={20}
                  className="bg-[#E8D5B7] border-[#C4B49A] text-[#3D5A3C] text-xs h-8"
                />
                <p className="text-xs text-[#5A7A58]">{customText.length}/20</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex-shrink-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7] text-sm h-8"
          disabled={showCustomization && !customText.trim()}
        >
          Agregar
        </Button>
      </CardFooter>
    </Card>
  )
}
