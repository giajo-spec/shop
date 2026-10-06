import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0d" }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M10 22.5V9.5l12 13V9.5" fill="none" stroke="#f5f5f6" strokeWidth="2.4" strokeLinecap="square" />
          <circle cx="22" cy="6.4" r="1.4" fill="#4f7cff" />
        </svg>
      </div>
    ),
    size,
  );
}
