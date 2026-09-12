import { NavLink } from 'react-router-dom'
import { bookingPolicy, giftCards, membership, serviceCategories } from '../content/salon'

// Matches the slug built in Contact.tsx from name + duration, so a deep link
// here always lands on the same specific bookable item there (several
// services share a name across durations, e.g. "Signature Swedish").
function slugify(name: string, duration: string) {
  return `${name}-${duration}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Services() {
  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Services & Pricing</p>
      <h1 className="font-serif text-4xl text-ink">The full menu</h1>
      <p className="mt-4 max-w-xl text-stone">
        Prices reflect a single session; add-ons stack onto any massage. If you're not sure what to book, tell us
        what's going on in the contact form and we'll suggest something.
      </p>
      <p className="mt-3 max-w-xl text-sm text-stone/80">
        {bookingPolicy} {giftCards.blurb}
      </p>

      <nav
        aria-label="Jump to a service category"
        className="sticky top-16 z-30 -mx-6 mt-8 flex gap-8 overflow-x-auto border-y border-black/5 bg-cream/95 px-6 py-4 backdrop-blur-md"
      >
        {serviceCategories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="nav-link shrink-0 text-sm font-medium text-stone transition-colors hover:text-ink"
          >
            {cat.title}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {serviceCategories.map((cat) => (
          <div key={cat.id} id={cat.id} className="scroll-mt-32">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-serif text-2xl text-pine">{cat.title}</h2>
              <span className="eyebrow text-clay-deep/80">{cat.benefit}</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-stone">{cat.intro}</p>

            <div className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
              {cat.items.map((item) => (
                <div key={`${item.name}-${item.duration}`} className="flex flex-col gap-3 p-6">
                  <p className="text-base text-ink">{item.description}</p>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="text-sm text-stone">
                      <span className="font-medium text-ink">{item.name}</span> · {item.duration}
                    </p>
                    <div className="flex shrink-0 items-center gap-4">
                      <p className="font-serif text-base text-clay-deep">{item.price}</p>
                      <NavLink
                        to={`/contact?service=${encodeURIComponent(slugify(item.name, item.duration))}`}
                        className="text-xs font-semibold text-pine underline-offset-2 hover:underline"
                      >
                        Book this →
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-3xl bg-pine px-8 py-14 text-center">
        <p className="eyebrow mb-2 text-sand">Membership</p>
        <h2 className="font-serif text-2xl text-cream">
          {membership.name}: {membership.price}, no contract
        </h2>
        <ul className="mx-auto mt-4 max-w-lg space-y-1 text-sm text-sand/90">
          {membership.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-md text-xs text-sand/70">{membership.mathNote}</p>
        <NavLink to="/contact" className="btn-primary mt-6 inline-flex !bg-clay hover:!bg-clay-deep">
          Ask About Membership
        </NavLink>
      </div>
    </div>
  )
}
