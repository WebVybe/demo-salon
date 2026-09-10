import { trustPoints } from '../content/salon'

// Credibility signals clustered together in one visible strip rather than
// scattered across the page/footer -- the license, the continuity-of-care
// promise, the no-upsell policy, and the membership terms, all at once.
export default function TrustStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {trustPoints.map((t) => (
        <div key={t.label} className="rounded-2xl border border-black/5 bg-white p-5">
          <p className="font-serif text-base text-pine">{t.label}</p>
          <p className="mt-1.5 text-sm text-stone">{t.detail}</p>
        </div>
      ))}
    </div>
  )
}
