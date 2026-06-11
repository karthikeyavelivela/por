import { ImageResponse } from "next/og";

export const alt = "Karthikeya Velivela — Application Security Engineer & Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse 70% 55% at 88% 8%, rgba(255,107,43,0.22), transparent 60%), radial-gradient(ellipse 55% 45% at 8% 95%, rgba(23,184,166,0.18), transparent 60%), #0B0A08",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 54, fontWeight: 700 }}>
          <span style={{ color: "#F2EFE9" }}>kv</span>
          <span style={{ color: "#FF6B2B" }}>/</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#F2EFE9",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Karthikeya Velivela
          </div>
          <div style={{ marginTop: 26, fontSize: 36, color: "#FF6B2B", fontWeight: 600 }}>
            Application Security Engineer & Founder
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "#9A938A", fontSize: 23 }}>
            FYRO · GuidePay · LLM Red Team · SentinelX · PETZU
          </div>
          <div style={{ color: "#9A938A", fontSize: 23 }}>Open to opportunities</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
