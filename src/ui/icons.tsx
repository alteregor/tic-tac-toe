type IconProps = { className?: string }

export function PeopleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 100 80" className={className} fill="currentColor" aria-hidden>
      <circle cx="68" cy="28" r="13" />
      <path d="M44 78c0-17 10-30 24-30s24 13 24 26a4 4 0 0 1-4 4z" />
      <circle cx="35" cy="19" r="17" />
      <path d="M2 74c0-22 14-36 33-36s33 14 33 36a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
      <path
        d="M40 78c0-20 11-34 28-34"
        fill="none"
        stroke="var(--color-sunny)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function RobotIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 100 92" className={className} fill="currentColor" aria-hidden>
      <circle cx="50" cy="9" r="8" />
      <rect x="47" y="12" width="6" height="16" rx="2" />
      <rect x="15" y="26" width="70" height="62" rx="20" />
      <rect x="2" y="44" width="9" height="28" rx="4.5" />
      <rect x="89" y="44" width="9" height="28" rx="4.5" />
      <circle cx="37" cy="56" r="7.5" fill="var(--color-sunny)" />
      <circle cx="63" cy="56" r="7.5" fill="var(--color-sunny)" />
    </svg>
  )
}
