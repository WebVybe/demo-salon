import { type FormEvent, useState } from 'react'
import { hours, salon } from '../content/salon'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Demo only: this form has no real backend. A live client build would
    // wire this to the same request-an-appointment pipeline as other
    // WebVybe client sites (see CLAUDE.md / new-client-site skill).
    setSubmitted(true)
  }

  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Contact</p>
      <h1 className="font-serif text-4xl text-ink">Request an appointment</h1>
      <p className="mt-4 max-w-xl text-stone">
        Tell us what you're after and a few times that work — we'll confirm by email or text within one business
        day. For anything urgent, call the studio directly.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine text-cream">✓</span>
              <h2 className="font-serif text-2xl text-ink">Request received</h2>
              <p className="max-w-sm text-stone">
                Thanks{service ? ` — we'll follow up about ${service.toLowerCase()}` : ''}. We'll reach out within
                one business day to confirm a time.
              </p>
              <p className="max-w-sm text-xs text-stone/70">
                This is a portfolio demo: nothing was actually sent anywhere. A live client build would connect this
                form to a real inbox/booking pipeline.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-2"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">First name</span>
                  <input
                    required
                    type="text"
                    name="firstName"
                    className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Last name</span>
                  <input
                    required
                    type="text"
                    name="lastName"
                    className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">What are you booking?</span>
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                >
                  <option value="">Select a service</option>
                  <option>Signature Swedish Massage</option>
                  <option>Deep Tissue Massage</option>
                  <option>Prenatal Massage</option>
                  <option>Signature Facial</option>
                  <option>Gua Sha Lift Facial</option>
                  <option>Express Glow Facial</option>
                  <option>Back Facial</option>
                  <option>The Steady Membership</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">Preferred days/times</span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="e.g. Weekday evenings, or Saturday morning"
                  className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                />
              </label>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Request
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-2">Call or Email</p>
            <p className="text-stone">
              <a href={salon.phoneHref} className="hover:text-ink">
                {salon.phone}
              </a>
            </p>
            <p className="mt-1 text-stone">
              <a href={`mailto:${salon.email}`} className="hover:text-ink">
                {salon.email}
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Address</p>
            <p className="text-stone">{salon.address}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Hours</p>
            <ul className="space-y-1 text-sm text-stone">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
