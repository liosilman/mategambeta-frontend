const API_BASE_URL = "mategambeta-backend.vercel.app"

const fetchWithTimeout = (url, options = {}, timeout = 3000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)),
  ])
}

export const productsAPI = {
  getAll: async () => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products`)
    if (!response.ok) throw new Error("Error al obtener productos")
    return response.json()
  },

  create: async (productData) => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
    if (!response.ok) throw new Error("Error al crear producto")
    return response.json()
  },

  update: async (id, productData) => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
    if (!response.ok) throw new Error("Error al actualizar producto")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetchWithTimeout(`${API_BASE_URL}/products/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Error al eliminar producto")
    return response.json()
  },
}
