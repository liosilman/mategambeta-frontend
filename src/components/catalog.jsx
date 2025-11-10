"use client"

import { useState, useMemo } from "react"
import ProductCard from "./product-card"
import { Button } from "./ui/button"

const CATEGORIES = [
  { id: "mate", name: "Mate" },
  { id: "yerba", name: "Yerba" },
  { id: "bombilla", name: "Bombilla" },
  { id: "combo", name: "Combo" },
]

export default function Catalog({ products, onAddToCart, loading }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  if (loading) {
    return (
      <section className="py-16 bg-[#E8D5B7] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-8 text-center">Catálogo</h1>
          <p className="text-center text-[#5A7A58]">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-[#E8D5B7] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-8 text-center">Catálogo</h1>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            onClick={() => setSelectedCategory("all")}
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-[#3D5A3C] text-[#E8D5B7] hover:bg-[#2D4A2C]"
                : "bg-[#D4C4A8] text-[#3D5A3C] hover:bg-[#C4B49A] border-[#C4B49A]"
            }
          >
            Todos ({products.length})
          </Button>
          {CATEGORIES.map((category) => {
            const count = products.filter((p) => p.category === category.id).length
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-[#3D5A3C] text-[#E8D5B7] hover:bg-[#2D4A2C]"
                    : "bg-[#D4C4A8] text-[#3D5A3C] hover:bg-[#C4B49A] border-[#C4B49A]"
                }
              >
                {category.name} ({count})
              </Button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-[#5A7A58]">No hay productos en esta categoría</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
