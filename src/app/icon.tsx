import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAF7F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1024" cy="1024" r="900" fill="#206DB4" />
          <circle cx="1024" cy="1024" r="800" fill="#F78D4B" />
          <path
            fill="#206DB4"
            d="M460 669h352c33 50 74 105 109 155l197 280c32 46 67 93 99 139-9 14-23 33-32 46l-57 81-193 274h-323c39-53 77-108 115-162l158-224c-4-4-12-16-15-21l-26-37-99-140-194-274c-29-40-63-86-90-127z"
          />
          <path
            fill="#206DB4"
            d="M1158 669h462c-44 64-91 129-135 193l-46 65-47 67c-6 9-19 30-26 37-6-10-17-25-25-35l-43-60-105-148c-20-28-41-58-61-86z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
