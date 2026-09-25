import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "#F2600A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={40} height={24} viewBox="0 0 120 72">
          <path d={CLOUD_PATH} fill="#fff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
