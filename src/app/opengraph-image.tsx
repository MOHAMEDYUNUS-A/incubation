import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MASTeR Incubation Foundation (MIF) · MAMCET Trichy";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#091b34",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #0f2c59 0%, #091b34 60%, #050e1a 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative grid/glow accents */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "10px 22px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            StartupTN Recognised Pre-Incubation Centre
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(234, 88, 12, 0.15)",
              border: "1px solid rgba(234, 88, 12, 0.4)",
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#fb923c",
            }}
          >
            MAMCET Campus · Trichy
          </div>
        </div>

        {/* Center Main Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            MAST<span style={{ color: "#ea580c" }}>e</span>R Incubation Foundation
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#94a3b8",
              maxWidth: "960px",
              lineHeight: 1.4,
            }}
          >
            Launchpad for Technology Ventures, IoT Prototyping, TANSEED Grants & Verified Digital Startup Passports.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#38bdf8" }}>₹15L+</span>
              <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 600 }}>TANSEED Pathways</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#4ade80" }}>100%</span>
              <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 600 }}>Verified Passports</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: "#fb923c" }}>10,000+</span>
              <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 600 }}>Sq.Ft. Makerspace</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#ea580c",
              padding: "14px 28px",
              borderRadius: "16px",
            }}
          >
            incubation.mamcet.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
