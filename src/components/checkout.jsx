"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, Package, Home, CreditCard } from "lucide-react"
import { formatPrice, calculateItemPrice } from "../lib/utils"

const SHIPPING_COST = 1500

export default function Checkout({ cart, onUpdateQuantity, onRemove }) {
  const [shippingMethod, setShippingMethod] = useState("pickup")
  const [paymentMethod, setPaymentMethod] = useState("mercadopago")
  const [shippingAddress, setShippingAddress] = useState("")

  const subtotal = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0)
  const shippingCost = shippingMethod === "delivery" ? SHIPPING_COST : 0
  const total = subtotal + shippingCost

  const handleMercadoPagoCheckout = () => {
    if (shippingMethod === "delivery" && !shippingAddress.trim()) {
      alert("Por favor ingresa tu dirección de envío")
      return
    }

    const items = cart.map((item) => ({
      title: item.name,
      description: item.customization || "Sin personalización",
      quantity: item.quantity,
      unit_price: calculateItemPrice(item) / item.quantity,
    }))

    const preference = {
      items,
      payer: {
        address: {
          zip_code: "0000",
          street_name: shippingAddress || "Retiro en local",
        },
      },
      back_urls: {
        success: window.location.origin,
        failure: window.location.origin,
        pending: window.location.origin,
      },
      auto_return: "approved",
      external_reference: `mate-gambeta-${Date.now()}`,
      metadata: {
        shipping_method: shippingMethod,
        shipping_address: shippingAddress,
      },
    }

    if (shippingMethod === "delivery") {
      preference.items.push({
        title: "Envío a domicilio",
        quantity: 1,
        unit_price: shippingCost,
      })
    }

    // TODO: Integrar con API backend para procesar preferencia
    console.log("[v0] Mercado Pago preference:", preference)
    alert("Integración de Mercado Pago Checkout en desarrollo")
  }

  const handleWhatsAppCheckout = () => {
    if (shippingMethod === "delivery" && !shippingAddress.trim()) {
      alert("Por favor ingresa tu dirección de envío")
      return
    }

    const phoneNumber = "5491157685990"
    let message = "¡Hola! Quiero confirmar mi pedido:\n\n"

    message += "📦 PRODUCTOS:\n"
    cart.forEach((item) => {
      const itemTotal = calculateItemPrice(item)
      message += `• ${item.name} x${item.quantity}`
      if (item.customization) {
        message += ` (Grabado: "${item.customization}")`
      }
      message += ` - ${formatPrice(itemTotal)}\n`
    })

    message += `\n💰 Subtotal: ${formatPrice(subtotal)}\n`
    message += `\n🚚 ENVÍO: ${shippingMethod === "delivery" ? "Envío a domicilio" : "Retiro en local"}\n`
    if (shippingMethod === "delivery") {
      message += `📍 Dirección: ${shippingAddress}\n`
      message += `Costo de envío: ${formatPrice(shippingCost)}\n`
    } else {
      message += `Sin costo adicional\n`
    }

    message += `\n💳 MÉTODO DE PAGO: ${paymentMethod === "mercadopago" ? "Mercado Pago" : "Efectivo"}\n`
    message += `\n✅ TOTAL: ${formatPrice(total)}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCheckout = () => {
    if (paymentMethod === "mercadopago") {
      handleMercadoPagoCheckout()
    } else {
      handleWhatsAppCheckout()
    }
  }

  if (cart.length === 0) {
    return (
      <section className="py-16 bg-[#E8D5B7] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto p-8 rounded-lg bg-[#D4C4A8] border border-[#C4B49A]">
            <h2 className="text-2xl font-bold text-[#3D5A3C] mb-4 text-center">Tu carrito está vacío</h2>
            <p className="text-[#5A7A58] text-center">Agrega productos para comenzar tu pedido</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-[#E8D5B7] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3D5A3C] mb-8 text-center">Checkout</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Productos en el carrito */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.itemKey} className="p-4 rounded-lg bg-[#D4C4A8] border border-[#C4B49A]">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded bg-[#C4B49A]"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#3D5A3C]">{item.name}</h3>
                    <p className="text-sm text-[#5A7A58]">{formatPrice(item.price)}</p>
                    {item.customization && (
                      <p className="text-xs text-[#3D5A3C] mt-1 font-medium">
                        Grabado: "{item.customization}" (+{formatPrice(item.customizationPrice)})
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.itemKey, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center rounded bg-[#E8D5B7] border border-[#C4B49A] text-[#3D5A3C] hover:bg-[#C4B49A]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-[#3D5A3C]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.itemKey, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center rounded bg-[#E8D5B7] border border-[#C4B49A] text-[#3D5A3C] hover:bg-[#C4B49A]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold text-[#3D5A3C] w-24 text-right">{formatPrice(calculateItemPrice(item))}</p>
                  <button
                    onClick={() => onRemove(item.itemKey)}
                    className="p-2 text-[#3D5A3C] hover:bg-[#C4B49A] rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Método de entrega */}
          <div className="p-6 rounded-lg bg-[#D4C4A8] border border-[#C4B49A]">
            <h2 className="text-lg font-bold text-[#3D5A3C] flex items-center gap-2 mb-4">
              <Package className="h-5 w-5" />
              Método de entrega
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer hover:bg-[#C4B49A]">
                <input
                  type="radio"
                  value="pickup"
                  checked={shippingMethod === "pickup"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-[#3D5A3C]" />
                    <span className="font-medium text-[#3D5A3C]">Retiro en local</span>
                  </div>
                  <span className="text-[#3D5A3C] font-bold">Gratis</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer hover:bg-[#C4B49A]">
                <input
                  type="radio"
                  value="delivery"
                  checked={shippingMethod === "delivery"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#3D5A3C]" />
                    <span className="font-medium text-[#3D5A3C]">Envío a domicilio</span>
                  </div>
                  <span className="text-[#3D5A3C] font-bold">{formatPrice(SHIPPING_COST)}</span>
                </div>
              </label>
            </div>

            {shippingMethod === "delivery" && (
              <div className="space-y-2 pt-4">
                <label htmlFor="address" className="text-[#3D5A3C] font-medium">
                  Dirección de envío
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Calle, número, piso, depto, localidad"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#E8D5B7] border border-[#C4B49A] text-[#3D5A3C]"
                />
              </div>
            )}
          </div>

          {/* Método de pago */}
          <div className="p-6 rounded-lg bg-[#D4C4A8] border border-[#C4B49A]">
            <h2 className="text-lg font-bold text-[#3D5A3C] flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5" />
              Método de pago
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer hover:bg-[#C4B49A]">
                <input
                  type="radio"
                  value="mercadopago"
                  checked={paymentMethod === "mercadopago"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#3D5A3C]">💳 Mercado Pago</span>
                    <span className="text-xs text-[#5A7A58]">(Tarjeta, débito, crédito)</span>
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#E8D5B7] cursor-pointer hover:bg-[#C4B49A]">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="font-medium text-[#3D5A3C]">💵 Efectivo</span>
              </label>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="p-6 rounded-lg bg-[#D4C4A8] border border-[#C4B49A]">
            <h2 className="text-lg font-bold text-[#3D5A3C] mb-4">Resumen del pedido</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[#3D5A3C]">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#3D5A3C]">
                <span>Envío</span>
                <span className="font-semibold">
                  {shippingMethod === "delivery" ? formatPrice(shippingCost) : "Gratis"}
                </span>
              </div>
              <div className="border-t border-[#C4B49A] pt-3 flex justify-between text-[#3D5A3C]">
                <span className="text-lg font-bold">Total</span>
                <span className="font-bold text-2xl">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full py-6 px-4 rounded-lg bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7] font-bold text-lg transition-colors"
              >
                {paymentMethod === "mercadopago" ? "Ir a Mercado Pago" : "Confirmar por WhatsApp"}
              </button>
              <p className="text-xs text-center text-[#5A7A58]">
                {paymentMethod === "mercadopago"
                  ? "Serás redirigido a Mercado Pago para completar el pago"
                  : "Serás redirigido a WhatsApp para confirmar tu pedido"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
