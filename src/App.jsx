"use client"

import { useState, useEffect } from "react"
import Hero from "./components/hero"
import ProductGrid from "./components/product-grid"
import Catalog from "./components/catalog"
import Checkout from "./components/checkout"
import Navigation from "./components/navigation"
import WhatsAppButton from "./components/whatsapp-button"
import AdminPanel from "./components/admin-panel"
import LoginAdmin from "./components/login-admin"
import { productsAPI } from "./services/api"
import { ALL_PRODUCTS } from "./lib/products"

export default function App() {
  const [currentView, setCurrentView] = useState("home")
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)
  const [showLoginAdmin, setShowLoginAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll()
      setProducts(data)
    } catch (error) {
      console.log("[v0] Backend no disponible, usando productos locales")
      setProducts(ALL_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product, customization = null) => {
    setCart((prev) => {
      const itemKey = customization ? `${product._id}-custom` : product._id
      const existing = prev.find((item) => item._id === product._id && item.customization === customization)

      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.customization === customization
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...prev,
        {
          ...product,
          id: product._id,
          quantity: 1,
          customization,
          itemKey,
        },
      ]
    })
  }

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.itemKey !== itemKey))
  }

  const updateQuantity = (itemKey, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemKey)
      return
    }
    setCart((prev) => prev.map((item) => (item.itemKey === itemKey ? { ...item, quantity } : item)))
  }

  const isAdminAuthenticated = () => {
    const session = localStorage.getItem("adminSession")
    return session ? JSON.parse(session).authenticated : false
  }

  const handleAdminClick = () => {
    if (isAdminAuthenticated()) {
      setShowAdmin(true)
    } else {
      setShowLoginAdmin(true)
    }
  }

  const handleAdminLoginSuccess = () => {
    setShowLoginAdmin(false)
    setShowAdmin(true)
  }

  const handleAdminLogout = () => {
    localStorage.removeItem("adminSession")
    setShowAdmin(false)
  }

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <>
            <Hero onViewProducts={() => setCurrentView("catalog")} />
            <ProductGrid products={products} onAddToCart={addToCart} loading={loading} />
          </>
        )
      case "catalog":
        return <Catalog products={products} onAddToCart={addToCart} loading={loading} />
      case "checkout":
        return <Checkout cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#E8D5B7]">
      <Navigation
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onAdminClick={handleAdminClick}
      />
      {renderView()}
      <WhatsAppButton cart={cart} />
      {showLoginAdmin && <LoginAdmin onClose={() => setShowLoginAdmin(false)} onSuccess={handleAdminLoginSuccess} />}
      {showAdmin && (
        <AdminPanel
          onClose={() => {
            setShowAdmin(false)
            handleAdminLogout()
          }}
          onProductsUpdated={loadProducts}
        />
      )}
    </div>
  )
}
