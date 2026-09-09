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

      <div className="mt-12 space-y-16">
        {serviceCategories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <h2 className="font-serif text-2xl text-pine">{cat.title}</h2>
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
