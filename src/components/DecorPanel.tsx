type DecorPanelProps = {
  variant?: 1 | 2 | 3 | 4 | 5
  className?: string
  label?: string
}

// Tasteful CSS-only mood-board panels standing in for real photography.
// This is a portfolio demo with no real studio to photograph -- these are
// explicitly gradient/texture art, never presented as photos. See Gallery
// page for the disclosure note.
const variants: Record<number, string> = {
  1: 'bg-[radial-gradient(circle_at_30%_20%,var(--color-sand),var(--color-clay)_140%)]',
  2: 'bg-[linear-gradient(160deg,var(--color-pine)_0%,var(--color-pine-soft)_60%,var(--color-sand)_140%)]',
  3: 'bg-[linear-gradient(135deg,var(--color-clay)_0%,var(--color-clay-deep)_100%)]',
  4: 'bg-[radial-gradient(circle_at_70%_30%,var(--color-cream),var(--color-pine-soft)_150%)]',
  5: 'bg-[linear-gradient(200deg,var(--color-sand)_0%,var(--color-stone)_100%)]',
}

export default function DecorPanel({ variant = 1, className = '', label }: DecorPanelProps) {
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
