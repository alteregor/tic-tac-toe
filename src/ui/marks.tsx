type MarkProps = { className?: string }

export function XMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <rect x="37" y="4" width="26" height="92" rx="9" transform="rotate(45 50 50)" />
      <rect x="37" y="4" width="26" height="92" rx="9" transform="rotate(-45 50 50)" />
    </svg>
  )
}

export function OMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="30" />
    </svg>
  )
}

export function Mark({ side, className = "" }: MarkProps & { side: "x" | "o" }) {
  return side === "x" ? <XMark className={className} /> : <OMark className={className} />
}
