/**
 * Crescent Moon Logo Component for Awaken
 *
 * Purpose: Renders a crescent moon SVG logo with purple gradient
 * Features:
 * - Clean SVG-based moon icon
 * - Matches the purple theme color scheme
 * - Lightweight and performant
 */

export default function CrescentMoonLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>
      </defs>

      {/* Crescent moon shape created with circles */}
      <circle cx="24" cy="24" r="18" fill="url(#moonGradient)" />
      <circle cx="30" cy="18" r="18" fill="black" />
    </svg>
  )
}
