function Rays({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute size-10 ${className}`} aria-hidden>
      <g stroke="currentColor" strokeWidth="5.5" strokeLinecap="round">
        <line x1="22" y1="4" x2="29" y2="15" />
        <line x1="4" y1="22" x2="15" y2="26" />
      </g>
    </svg>
  )
}

export function Title({ children }: { children: string }) {
  return (
    <div className="relative mx-auto px-6 text-sunny">
      <Rays className="-top-3 -left-2" />
      <Rays className="-top-3 -right-2 -scale-x-100" />
      <h1 className="text-[3.25rem] leading-none font-extrabold tracking-tight drop-shadow-[0_3px_0_rgba(0,0,0,0.08)]">
        {children}
      </h1>
    </div>
  )
}
