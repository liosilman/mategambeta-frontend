const MERCADO_PAGO_PUBLIC_KEY = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY

export const initMercadoPago = () => {
  if (MERCADO_PAGO_PUBLIC_KEY) {
    const script = document.createElement("script")
    script.src = "https://sdk.mercadopago.com/js/v2"
    document.body.appendChild(script)
  }
}

export const createMercadoPagoCheckout = async (preference) => {
  // TODO: Llamar a tu backend para crear la preferencia
  // Tu backend debe retornar el preference_id
  try {
    const response = await fetch("http://localhost:5000/api/mercado-pago/preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preference),
    })

    if (!response.ok) throw new Error("Error al crear preferencia")

    const { preference_id } = await response.json()

    // Cargar Mercado Pago Checkout
    if (window.MercadoPago) {
      const mp = new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY)
      mp.checkout({
        preference: { id: preference_id },
        autoOpen: true,
      })
    }
  } catch (error) {
    console.error("[v0] Error Mercado Pago:", error)
    throw error
  }
}
