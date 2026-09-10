import { NavLink } from 'react-router-dom'
import { membership, serviceCategories } from '../content/salon'

export default function Services() {
  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Services & Pricing</p>
      <h1 className="font-serif text-4xl text-ink">The full menu</h1>
      <p className="mt-4 max-w-xl text-stone">
        Prices reflect a single session; add-ons stack onto any massage. If you're not sure what to book, tell us
        what's going on in the contact form and we'll suggest something.
      </p>

      <nav
        aria-label="Jump to a service category"
        className="sticky top-16 z-30 -mx-6 mt-8 flex gap-2 overflow-x-auto border-y border-black/5 bg-cream/95 px-6 py-3 backdrop-blur-md"
      >
        {serviceCategories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="shrink-0 rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-stone transition-colors hover:border-clay-deep hover:text-ink"
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
                <div key={`${item.name}-${item.duration}`} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="font-medium text-ink">
                      {item.name} <span className="text-stone">· {item.duration}</span>
                    </p>
                    <p className="mt-1 text-sm text-stone">{item.description}</p>
                  </div>
                  <p className="shrink-0 font-serif text-lg text-clay-deep">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-pine px-8 py-10 text-center">
        <p className="eyebrow mb-2 text-sand">Membership</p>
        <h2 className="font-serif text-2xl text-cream">
          {membership.name} — {membership.price}/month, no contract
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

      <div className="mt-12 text-center">
        <NavLink to="/contact" className="btn-primary inline-flex">
          Book Now
        </NavLink>
      </div>
    </div>
  )
}
