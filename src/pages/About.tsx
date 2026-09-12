import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import TrustStrip from '../components/TrustStrip'
import { hours, salon } from '../content/salon'
import aboutStudio from '../assets/images/about-studio.jpg' // Pexels: jessejames, free commercial license

export default function About() {
  return (
    <div className="page-transition">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Our Story</p>
            <h1 className="font-serif text-4xl text-ink">Why {salon.name} exists</h1>
            <p className="mt-5 text-stone">
              {salon.founderName.split(',')[0]} opened {salon.name} in {salon.founded} after a decade working front
              desk-to-table shifts at bigger day spas around San Diego, booked back to back, fifteen minutes
              between clients, upsells baked into the script. She wanted a studio where a session actually starts on
              time, ends when it's supposed to, and nobody has to ask twice for a lighter touch.
            </p>
            <p className="mt-4 text-stone">
              That's still the whole model: one room at a time, appointments spaced with real breathing room, and a
              short menu done well instead of a long one done fast. North Park was the easy part: {salon.founderName.split(',')[0]} has lived two blocks
              from the studio since before it existed.
            </p>
          </div>
          <DecorPanel
            className="h-72 w-full sm:h-96"
            src={aboutStudio}
            alt="Elegant spa treatment room with soft ambient lighting"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <TrustStrip />
      </section>

      <section className="border-y border-black/5 bg-sand">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Visit</p>
            <p className="text-stone">{salon.address}</p>
            <p className="mt-2 text-stone">
              <a href={salon.phoneHref} className="hover:text-ink">
                {salon.phone}
              </a>
            </p>
            <p className="mt-1 text-stone">
              <a href={`mailto:${salon.email}`} className="hover:text-ink">
                {salon.email}
              </a>
            </p>
            <p className="mt-4 text-sm text-stone">
              Free street parking along Herman Ave, five minutes' walk from the University Ave shops.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Hours</p>
            <ul className="space-y-1 text-stone">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 border-b border-black/5 py-1.5 text-sm last:border-0">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-ink">Come see the room for yourself</h2>
        <NavLink to="/contact" className="btn-primary mt-6 inline-flex">
          Book Now
        </NavLink>
      </section>
    </div>
  )
}
