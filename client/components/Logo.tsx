export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pp-gradient" x1="12" y1="12" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C63FF" />
          <stop offset="1" stopColor="#00C9A7" />
        </linearGradient>
      </defs>

      <rect x="6" y="6" width="88" height="88" rx="24" fill="#0F0F1A" />
      <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#pp-gradient)" opacity="0.18" />

      <path
        d="M24 72V28H46C54.5 28 60 33.2 60 40.8C60 48.5 54.5 53.7 46 53.7H36V72H24ZM36 44.2H44.5C47.8 44.2 50.1 42.8 50.1 40.3C50.1 37.8 47.8 36.4 44.5 36.4H36V44.2Z"
        fill="#FFFFFF"
      />
      <path
        d="M63 72V28H75V45.2H77.4C87.4 45.2 94 50.9 94 58.8C94 66.6 87.4 72 77.4 72H63ZM75 63.4H77.6C81.6 63.4 84 61.8 84 58.8C84 55.7 81.6 53.8 77.6 53.8H75V63.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
