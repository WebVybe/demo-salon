import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import FirstVisitSteps from '../components/FirstVisitSteps'
import { faqs, membership, salon, serviceCategories, trustPoints } from '../content/salon'
// Photo credits (Pexels license: free for commercial use, no attribution required):
import heroStudio from '../assets/images/hero-studio.jpg' // anntarazevich
import serviceMassage from '../assets/images/service-massage.jpg' // koolshooters
import serviceFacial from '../assets/images/service-facial.jpg' // Gustavo Fring
import serviceBodywork from '../assets/images/service-bodywork.jpg' // babydov

const highlightImages: Record<string, string> = {
  massage: serviceMassage,
  skincare: serviceFacial,
  bodywork: serviceBodywork,
}

const highlights = serviceCategories.map((c) => ({
  id: c.id,
  title: c.title,
  benefit: c.benefit,
  blurb: c.intro,
  from: c.items[0].price,
  image: highlightImages[c.id],
}))

export default function Home() {
  return (
    <div className="page-transition">
      {/* Hero -- full-bleed atmospheric panel, tagline overlaid, one clear action */}
      <section className="relative flex min-h-[78vh] w-full items-end overflow-hidden sm:min-h-[86vh]">
        <DecorPanel
          className="absolute inset-0 h-full w-full rounded-none"
          src={heroStudio}
          alt="Tranquil massage room with natural light and neatly arranged furnishings"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-24">
          <p className="eyebrow mb-4 text-sand">{salon.neighborhood}</p>
          <h1 className="max-w-2xl font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.6rem]">
            {salon.tagline}
          </h1>
          <p className="mt-5 max-w-md text-base text-white/85">
            Massage, facials, and body work by appointment only, a small studio built around one idea: slow down,
            and be genuinely looked after for an hour.
          </p>
          <div className="mt-8">
            <NavLink to="/contact" className="btn-primary">
              Reserve
            </NavLink>
          </div>
        </div>
      </section>

      {/* Why locals trust the studio -- objection-handling and credibility merged into one cluster */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-3">Why locals choose us</p>
        <h2 className="mb-12 font-serif text-3xl text-ink">A studio built to feel unhurried</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t) => (
            <div key={t.label}>
              <p className="font-serif text-lg text-pine">{t.label}</p>
              <p className="mt-2 text-sm text-stone">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service highlights -- alternating full-width image/text bands, one category per row */}
      <section className="border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col gap-2 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">What we offer</p>
              <h2 className="font-serif text-3xl text-ink">Three ways to slow down</h2>
            </div>
            <NavLink to="/services" className="text-sm font-semibold text-clay-deep hover:underline">
              View full menu & pricing →
            </NavLink>
          </div>
        </div>

        {highlights.map((h, i) => (
          <div key={h.id} className="border-t border-black/5 first:border-t-0">
            <div
              className={`mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <DecorPanel className="h-64 w-full sm:h-80 lg:h-[22rem]" src={h.image} alt={h.title} />
              <div>
                <p className="eyebrow mb-3">{h.benefit}</p>
                <h3 className="font-serif text-2xl text-ink sm:text-3xl">{h.title}</h3>
                <p className="mt-4 max-w-md text-stone">{h.blurb}</p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <p className="text-sm font-semibold text-clay-deep">From {h.from}</p>
                  <NavLink to="/services" className="text-sm font-semibold text-pine hover:underline">
                    See this menu →
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* First-visit walkthrough */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <FirstVisitSteps />
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow mb-3">Good to know</p>
        <h2 className="mb-10 font-serif text-3xl text-ink">A few things first-timers ask</h2>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q}>
              <p className="font-medium text-ink">{f.q}</p>
              <p className="mt-2 text-sm text-stone">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Single page-ending conversion moment -- membership + booking, not two competing banners */}
      <section className="border-t border-black/5 bg-pine">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow mb-3 text-sand">{membership.name}: {membership.price}</p>
          <h2 className="font-serif text-3xl text-cream sm:text-4xl">Ready to make this a habit?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-sand/90">
            No contract, no initiation fee, and you can pause or cancel anytime. Or book a single session; appointments open
            daily except Monday, and we'll confirm a time within one business day.
          </p>
          <p className="mx-auto mt-3 max-w-md text-xs text-sand/70">{membership.mathNote}</p>
          <NavLink to="/contact" className="btn-primary mt-8 inline-flex !bg-clay hover:!bg-clay-deep">
            Reserve a Session
          </NavLink>
        </div>
      </section>
    </div>
  )
}
