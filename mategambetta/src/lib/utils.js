export function formatPrice(price) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export function calculateItemPrice(item) {
  const basePrice = item.price * item.quantity
  const customizationPrice = item.customization ? item.customizationPrice * item.quantity : 0
  return basePrice + customizationPrice
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
