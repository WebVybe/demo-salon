import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import { faqs, membership, salon, serviceCategories } from '../content/salon'

const highlights = serviceCategories.map((c) => ({
  id: c.id,
  title: c.title,
  blurb: c.intro,
  from: c.items[0].price,
}))

const pillars = [
  {
    title: 'No pressure, ever',
    body: 'Every session opens with a short check-in. We mention add-ons once, at the end — never mid-treatment.',
  },
  {
    title: 'Month-to-month membership',
    body: `${membership.name} is ${membership.price}, no contract. Pause or cancel anytime from your client portal.`,
  },
  {
    title: 'One therapist, start to finish',
    body: 'You keep the same provider visit to visit unless you ask to switch — consistency, not a rotating roster.',
  },
]

export default function Home() {
  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{salon.neighborhood}</p>
            <h1 className="font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
              {salon.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base text-stone">
              Massage, facials, and body work by appointment only — a small studio built around one idea: slow down,
              and be genuinely looked after for an hour.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink to="/contact" className="btn-primary">
                Book Now
              </NavLink>
              <NavLink to="/services" className="btn-secondary">
                See Services & Pricing
              </NavLink>
            </div>
          </div>

          <DecorPanel variant={1} className="h-72 w-full sm:h-96 lg:h-[26rem]" label="Studio glimpse — placeholder art, real photography pending" />
        </div>
      </section>

      {/* Objection-handling strip */}
      <section className="border-y border-black/5 bg-sand">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title}>
              <p className="font-serif text-lg text-pine">{p.title}</p>
              <p className="mt-2 text-sm text-stone">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">What we offer</p>
            <h2 className="font-serif text-3xl text-ink">Three ways to slow down</h2>
          </div>
          <NavLink to="/services" className="text-sm font-semibold text-clay-deep hover:underline">
            View full menu & pricing →
          </NavLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={h.id} className="rounded-2xl border border-black/5 bg-white p-6">
              <DecorPanel variant={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="mb-5 h-36 w-full" />
              <h3 className="font-serif text-xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm text-stone">{h.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-clay-deep">From {h.from}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section className="border-y border-black/5 bg-pine">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3 text-sand">Membership</p>
            <h2 className="font-serif text-3xl text-cream">
              {membership.name} — {membership.price}
            </h2>
            <p className="mt-4 max-w-md text-sm text-sand/90">
              Built for people who want this to be a habit, not a splurge. No initiation fee, no long-term
              commitment.
            </p>
            <NavLink to="/contact" className="btn-primary mt-6 !bg-clay hover:!bg-clay-deep">
              Ask About Membership
            </NavLink>
          </div>
          <ul className="space-y-3">
            {membership.bullets.map((b) => (
              <li key={b} className="flex gap-3 rounded-xl bg-white/5 p-4 text-sm text-sand/95">
                <span className="mt-0.5 text-clay">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-3">Good to know</p>
        <h2 className="mb-8 font-serif text-3xl text-ink">A few things first-timers ask</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q} className="rounded-2xl border border-black/5 bg-white p-6">
              <p className="font-medium text-ink">{f.q}</p>
              <p className="mt-2 text-sm text-stone">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-sand px-8 py-14 text-center">
          <h2 className="font-serif text-3xl text-ink">Ready to actually slow down for an hour?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone">
            Appointments open daily except Monday. Tell us what you need and we'll confirm a time within one
            business day.
          </p>
          <NavLink to="/contact" className="btn-primary mt-7 inline-flex">
            Request an Appointment
          </NavLink>
        </div>
      </section>
    </div>
  )
}
