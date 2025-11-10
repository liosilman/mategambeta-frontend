"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { productsAPI } from "../services/api"
import { formatPrice } from "../lib/utils"
import { X, Edit2, Trash2, Plus } from "lucide-react"

export default function AdminPanel({ onClose, onProductsUpdated }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "mate",
    image: "",
    customizable: false,
    customizationPrice: 800,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productsAPI.getAll()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Error cargando productos:", error)
      alert("Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const productData = {
        ...formData,
        price: Number.parseInt(formData.price),
        customizationPrice: Number.parseInt(formData.customizationPrice),
      }

      if (editingId) {
        await productsAPI.update(editingId, productData)
      } else {
        await productsAPI.create(productData)
      }

      await loadProducts()
      resetForm()
      onProductsUpdated?.()
    } catch (error) {
      console.error("[v0] Error al guardar producto:", error)
      alert("Error al guardar producto")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product._id)
    setFormData(product)
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return

    try {
      setLoading(true)
      await productsAPI.delete(id)
      await loadProducts()
      onProductsUpdated?.()
    } catch (error) {
      console.error("[v0] Error al eliminar producto:", error)
      alert("Error al eliminar producto")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "mate",
      image: "",
      customizable: false,
      customizationPrice: 800,
    })
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "32rem",
          maxHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "var(--mate-tan)",
        }}
      >
        <CardHeader
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--mate-brown)",
            position: "sticky",
            top: 0,
            backgroundColor: "var(--mate-tan)",
          }}
        >
          <CardTitle>Panel de Administración</CardTitle>
          <button
            onClick={onClose}
            style={{ padding: "0.25rem", cursor: "pointer", backgroundColor: "transparent", border: "none" }}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" style={{ color: "var(--mate-green)" }} />
          </button>
        </CardHeader>

        <CardContent style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: "var(--mate-cream)",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <h3 style={{ fontWeight: "bold", color: "var(--mate-green)" }}>
              {editingId ? "Editar Producto" : "Crear Nuevo Producto"}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>Nombre</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ backgroundColor: "white", borderColor: "var(--mate-brown)", color: "var(--mate-green)" }}
                />
              </div>
              <div>
                <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>Categoría</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "white",
                    border: "1px solid var(--mate-brown)",
                    borderRadius: "0.5rem",
                    color: "var(--mate-green)",
                  }}
                >
                  <option value="mate">Mate</option>
                  <option value="yerba">Yerba</option>
                  <option value="bombilla">Bombilla</option>
                  <option value="combo">Combo</option>
                </select>
              </div>
            </div>

            <div>
              <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>Descripción</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                style={{ backgroundColor: "white", borderColor: "var(--mate-brown)", color: "var(--mate-green)" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>Precio ($)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  style={{ backgroundColor: "white", borderColor: "var(--mate-brown)", color: "var(--mate-green)" }}
                />
              </div>
              <div>
                <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>URL Imagen</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ backgroundColor: "white", borderColor: "var(--mate-brown)", color: "var(--mate-green)" }}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                id="customizable"
                checked={formData.customizable}
                onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
                style={{ width: "1rem", height: "1rem" }}
              />
              <Label
                htmlFor="customizable"
                style={{ color: "var(--mate-green)", fontSize: "0.875rem", cursor: "pointer", margin: 0 }}
              >
                ¿Personalizable con grabado?
              </Label>
            </div>

            {formData.customizable && (
              <div>
                <Label style={{ color: "var(--mate-green)", fontSize: "0.875rem" }}>Costo del Grabado ($)</Label>
                <Input
                  type="number"
                  value={formData.customizationPrice}
                  onChange={(e) => setFormData({ ...formData, customizationPrice: e.target.value })}
                  style={{ backgroundColor: "white", borderColor: "var(--mate-brown)", color: "var(--mate-green)" }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
              <Button
                type="submit"
                disabled={loading}
                style={{ flex: 1, backgroundColor: "var(--mate-green)", color: "var(--mate-cream)" }}
              >
                {loading ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  onClick={resetForm}
                  style={{
                    border: "1px solid var(--mate-brown)",
                    backgroundColor: "transparent",
                    color: "var(--mate-green)",
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {/* Lista de productos */}
          <div>
            <h3
              style={{
                fontWeight: "bold",
                color: "var(--mate-green)",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Plus className="h-4 w-4" style={{ color: "var(--mate-green)" }} />
              Productos Existentes ({products.length})
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "24rem", overflowY: "auto" }}
            >
              {products.length === 0 ? (
                <p style={{ color: "var(--mate-brown)", fontSize: "0.875rem" }}>No hay productos aún</p>
              ) : (
                products.map((product) => (
                  <Card
                    key={product._id}
                    style={{
                      backgroundColor: "var(--mate-cream)",
                      borderColor: "var(--mate-brown)",
                      padding: "0.75rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: "bold", color: "var(--mate-green)" }}>{product.name}</p>
                      <p style={{ fontSize: "0.875rem", color: "var(--mate-brown)" }}>{formatPrice(product.price)}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(product)}
                        style={{ height: "2rem", width: "2rem", color: "var(--mate-green)" }}
                        disabled={loading}
                      >
                        <Edit2 className="h-4 w-4" style={{ color: "var(--mate-green)" }} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(product._id)}
                        style={{ height: "2rem", width: "2rem", color: "var(--mate-green)" }}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" style={{ color: "var(--mate-green)" }} />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
