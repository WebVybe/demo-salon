type DecorPanelProps = {
  variant?: 1 | 2 | 3 | 4 | 5
  className?: string
  label?: string
  /** Real photo to render instead of the gradient placeholder. When omitted,
   * this stays a CSS-only mood-board panel (used only for slots that still
   * lack a real or licensed photo -- see CLAUDE.md). */
  src?: string
  alt?: string
}

// Tasteful CSS-only mood-board panels, used as a fallback for any slot that
// doesn't yet have a real photo. Most slots now render a real <img> (src
// prop) sourced from Pexels/Unsplash -- see individual page files for
// photographer credit comments.
const variants: Record<number, string> = {
  1: 'bg-[radial-gradient(circle_at_30%_20%,var(--color-sand),var(--color-clay)_140%)]',
  2: 'bg-[linear-gradient(160deg,var(--color-pine)_0%,var(--color-pine-soft)_60%,var(--color-sand)_140%)]',
  3: 'bg-[linear-gradient(135deg,var(--color-clay)_0%,var(--color-clay-deep)_100%)]',
  4: 'bg-[radial-gradient(circle_at_70%_30%,var(--color-cream),var(--color-pine-soft)_150%)]',
  5: 'bg-[linear-gradient(200deg,var(--color-sand)_0%,var(--color-stone)_100%)]',
}

export default function DecorPanel({ variant = 1, className = '', label, src, alt }: DecorPanelProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <img src={src} alt={alt ?? ''} loading="lazy" className="h-full w-full object-cover" />
        {label && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_10px)]" />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  )
}
