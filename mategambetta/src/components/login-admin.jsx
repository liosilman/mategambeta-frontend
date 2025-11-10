"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { X } from "lucide-react"
import { ADMIN_PASSWORD } from "../lib/constants"

export default function LoginAdmin({ onClose, onSuccess }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem(
          "adminSession",
          JSON.stringify({
            authenticated: true,
            timestamp: Date.now(),
          }),
        )
        onSuccess()
      } else {
        setError("Contraseña incorrecta")
        setPassword("")
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-[#D4C4A8] border-[#C4B49A]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#3D5A3C]">Acceso Administrativo</CardTitle>
          <button onClick={onClose} className="p-1 hover:bg-[#C4B49A] rounded" aria-label="Cerrar">
            <X className="h-5 w-5 text-[#3D5A3C]" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-[#3D5A3C] text-sm">Contraseña de Administrador</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                disabled={loading}
                className="bg-white border-[#C4B49A] text-[#3D5A3C]"
                autoFocus
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full bg-[#3D5A3C] hover:bg-[#2D4A2C] text-[#E8D5B7]"
            >
              {loading ? "Verificando..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
