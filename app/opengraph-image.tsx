import { ImageResponse } from "next/og";
import { content } from "@/lib/content";
import { turningAge } from "@/lib/birthday";

// Rendered once at build time, so the static export ships a real
// birthday link-preview image (no browser or design tool needed).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tug'ilgan kuning muborak";

export default function Image() {
  const c = content.birthday.card;
  const age = turningAge();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1026 0%, #080b1c 55%, #050510 100%)",
          color: "#fdf6ee",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "2px solid rgba(243,217,164,0.55)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 12,
            color: "rgba(243,217,164,0.85)",
            display: "flex",
          }}
        >
          {c.dateLine.toUpperCase()}
        </div>
        {age !== null && (
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              letterSpacing: 14,
              color: "rgba(253,246,238,0.5)",
              display: "flex",
            }}
          >
            {c.ageLine.replace("{n}", String(age)).toUpperCase()}
          </div>
        )}
        <div
          style={{
            marginTop: 34,
            fontSize: 52,
            fontStyle: "italic",
            color: "rgba(253,246,238,0.92)",
            display: "flex",
          }}
        >
          {c.greeting}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 132,
            fontWeight: 700,
            color: "#f3d9a4",
            display: "flex",
          }}
        >
          {content.herName}
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "rgba(253,246,238,0.6)",
            display: "flex",
          }}
        >
          {content.birthday.share.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
