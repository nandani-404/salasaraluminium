import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1F3A',
          borderRadius: '50%',
          border: '1.5px solid #D4AF37',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Extrusions Frame */}
          <path
            d="M22 4L38 12V32L22 40L6 32V12L22 4Z"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M6 12L22 20L38 12"
            stroke="#D4AF37"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Pure vector monogram replacement for 'S A H' */}
          <path
            d="M15 21C15 19.5 16.5 18 18 18H20V21H17V23H19C20.5 23 21 24 21 25.5V27C21 28.5 19.5 30 18 30H15V27H19V25H16C15 25 15 23.5 15 21Z"
            fill="#D4AF37"
          />
          <path
            d="M23 30L26 18H28L31 30H28.5L28 27H26L25.5 30H23ZM26.5 25H27.5L27 21L26.5 25Z"
            fill="#D4AF37"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
