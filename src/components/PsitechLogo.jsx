function PsitechLogo({ size = 32 }) {
  return (
    <svg
      className="psitech-logo-svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="92" height="92" rx="22" fill="#F5A623" />
      <path
        d="M38 28h16c10 0 18 8 18 18s-8 18-18 18H50v12h-12V28z M50 52h4c3.3 0 6-2.7 6-6s-2.7-6-6-6h-4v12z"
        fill="#ffffff"
      />
      <circle cx="62" cy="56" r="6" fill="#ffffff" />
    </svg>
  )
}

export default PsitechLogo
