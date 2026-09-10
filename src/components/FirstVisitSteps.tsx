import { firstVisitSteps } from '../content/salon'

// Addresses first-timer booking anxiety directly, the way a spa-etiquette /
// what-to-expect guide does on stronger salon sites -- three concrete steps
// instead of leaving the process implicit.
export default function FirstVisitSteps({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-3">First time here?</p>
      <h2 className="font-serif text-3xl text-ink">What actually happens, step by step</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {firstVisitSteps.map((s) => (
          <div key={s.step}>
            <p className="font-serif text-3xl text-clay-deep/70">{s.step}</p>
            <p className="mt-2 font-medium text-ink">{s.title}</p>
            <p className="mt-1.5 text-sm text-stone">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
