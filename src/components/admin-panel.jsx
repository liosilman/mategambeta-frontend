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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-screen overflow-y-auto bg-[#D4C4A8] border-[#C4B49A]">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-[#D4C4A8] border-b border-[#C4B49A]">
          <CardTitle className="text-[#3D5A3C]">Panel de Administración</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-[#C4B49A] rounded" aria-label="Cerrar">
            <X className="h-5 w-5 text-[#3D5A3C]" />
          </button>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#E8D5B7] p-4 rounded-lg">
            <h3 className="font-bold text-[#3D5A3C]">{editingId ? "Editar Producto" : "Crear Nuevo Producto"}</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#3D5A3C] text-sm">Nombre</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white border-[#C4B49A] text-[#3D5A3C]"
                />
              </div>
              <div>
                <Label className="text-[#3D5A3C] text-sm">Categoría</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C4B49A] rounded text-[#3D5A3C]"
                >
                  <option value="mate">Mate</option>
                  <option value="yerba">Yerba</option>
                  <option value="bombilla">Bombilla</option>
                  <option value="combo">Combo</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-[#3D5A3C] text-sm">Descripción</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="bg-white border-[#C4B49A] text-[#3D5A3C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#3D5A3C] text-sm">Precio ($)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="bg-white border-[#C4B49A] text-[#3D5A3C]"
                />
              </div>
              <div>
                <Label className="text-[#3D5A3C] text-sm">URL Imagen</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-white border-[#C4B49A] text-[#3D5A3C]"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="customizable"
                checked={formData.customizable}
                onChange={(e) => setFormData({ ...formData, customizable: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="customizable" className="text-[#3D5A3C] text-sm cursor-pointer">
                ¿Personalizable con grabado?
              </Label>
            </div>

            {formData.customizable && (
              <div>
                <Label className="text-[#3D5A3C] text-sm">Costo del Grabado ($)</Label>
                <Input
                  type="number"
                  value={formData.customizationPrice}
                  onChange={(e) => setFormData({ ...formData, customizationPrice: e.target.value })}
                  className="bg-white border-[#C4B49A] text-[#3D5A3C]"
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7]"
              >
                {loading ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="border-[#C4B49A] text-[#3D5A3C] bg-transparent"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {/* Lista de productos */}
          <div>
            <h3 className="font-bold text-[#3D5A3C] mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Productos Existentes ({products.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-[#5A7A58] text-sm">No hay productos aún</p>
              ) : (
                products.map((product) => (
                  <Card
                    key={product._id}
                    className="bg-[#E8D5B7] border-[#C4B49A] p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-[#3D5A3C]">{product.name}</p>
                      <p className="text-sm text-[#5A7A58]">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(product)}
                        className="h-8 w-8 text-[#3D5A3C]"
                        disabled={loading}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(product._id)}
                        className="h-8 w-8 text-[#3D5A3C]"
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
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
