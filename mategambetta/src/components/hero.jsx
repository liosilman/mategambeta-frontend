/* Removido "use client", simplificado CSS */
import { Button } from "./ui/button"

export default function Hero({ onViewProducts }) {
  return (
    <section style={{ backgroundColor: "var(--mate-cream)", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <img src="/logo.png" alt="Mate y Gambeta" style={{ height: "10rem", width: "10rem" }} />
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "var(--mate-green)", lineHeight: "1.2" }}>
              Pasión, yerba y potrero
            </h1>
            <p style={{ fontSize: "1.125rem", color: "var(--mate-green-light)" }}>
              Mates artesanales para los verdaderos amantes de la tradición
            </p>
            <Button
              onClick={onViewProducts}
              style={{
                backgroundColor: "var(--mate-green)",
                color: "var(--mate-cream)",
                fontWeight: "bold",
                fontSize: "1.125rem",
                padding: "1.5rem 2rem",
              }}
            >
              VER PRODUCTOS
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/mate-gourd-with-straw-illustration-vintage-style.jpg"
              alt="Mate y pelota de fútbol"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "0.5rem" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
