import { type FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { faqs, giftCards, hours, serviceCategories, salon } from '../content/salon'

// Flat, bookable list derived from the same source of truth as the Services
// page, so a "Book this ->" link there always matches an option here -- no
// separately hand-typed list to fall out of sync. Each entry gets a stable
// slug (name + duration) since several services share a name across
// durations (e.g. "Signature Swedish" at 50 min vs 80 min).
type BookableService = {
  slug: string
  categoryTitle: string
  name: string
  duration: string
  price: string
  description: string
}

function slugify(name: string, duration: string) {
  return `${name}-${duration}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const bookableServices: BookableService[] = serviceCategories.flatMap((cat) =>
  cat.items.map((item) => ({
    slug: slugify(item.name, item.duration),
    categoryTitle: cat.title,
    ...item,
  })),
)

// Parse "50 min" / "80 min" / "30 min" into minutes. Add-on durations like
// "+15 min" aren't real standalone bookings, so they fall back to a
// reasonable default slot length rather than trying to parse the "+".
function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)\s*min/)
  return match ? parseInt(match[1], 10) : 50
}

// "10:00am – 7:00pm" -> [{h:10,m:0}, {h:19,m:0}]. Returns null for "Closed".
function parseHoursRange(time: string): { start: number; end: number } | null {
  if (/closed/i.test(time)) return null
  const [openStr, closeStr] = time.split('–').map((s) => s.trim())
  const toMinutes = (s: string) => {
    const m = s.match(/(\d+):(\d+)(am|pm)/i)
    if (!m) return null
    let h = parseInt(m[1], 10)
    const min = parseInt(m[2], 10)
    const isPm = m[3].toLowerCase() === 'pm'
    if (isPm && h !== 12) h += 12
    if (!isPm && h === 12) h = 0
    return h * 60 + min
  }
  const start = toMinutes(openStr)
  const end = toMinutes(closeStr)
  if (start == null || end == null) return null
  return { start, end }
}

const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Next 10 calendar days (today + 9 ahead), each tagged with whether the
// studio is open that day per `hours` in salon.ts, so closed days (Monday)
// simply don't appear as selectable -- mirroring how Vagaro/Acuity only
// surface days with availability.
function buildUpcomingDays(count = 10) {
  const days: { date: Date; label: string; dateLabel: string; isToday: boolean; range: { start: number; end: number } | null }[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dayName = dayLabels[date.getDay()]
    const hoursEntry = hours.find((h) => h.day === dayName)
    const range = hoursEntry ? parseHoursRange(hoursEntry.time) : null
    days.push({
      date,
      label: i === 0 ? 'Today' : dayName.slice(0, 3),
      dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday: i === 0,
      range,
    })
  }
  return days.filter((d) => d.range !== null)
}

// Time-slot chips within a day's open hours, stepped by an interval scaled
// to the service duration (short services get denser slots, long services
// get sparser ones) -- and it leaves room at the end of the day for the
// service to actually finish before closing.
function buildTimeSlots(range: { start: number; end: number }, durationMinutes: number, isToday: boolean, now: Date) {
  const step = durationMinutes <= 30 ? 30 : durationMinutes <= 60 ? 45 : 60
  const slots: string[] = []
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  for (let t = range.start; t + durationMinutes <= range.end; t += step) {
    if (isToday && t <= nowMinutes + 60) continue // require ~1hr lead time today
    const h24 = Math.floor(t / 60)
    const m = t % 60
    const period = h24 >= 12 ? 'PM' : 'AM'
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12
    slots.push(`${h12}:${m.toString().padStart(2, '0')} ${period}`)
  }
  return slots
}

type Step = 'service' | 'datetime' | 'info' | 'confirm'

export default function Contact() {
  const [params] = useSearchParams()
  const preselectSlug = params.get('service') ?? ''
  const preselected = bookableServices.find((s) => s.slug === preselectSlug) ?? null

  const [step, setStep] = useState<Step>(preselected ? 'datetime' : 'service')
  const [service, setService] = useState<BookableService | null>(preselected)
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const upcomingDays = useMemo(() => buildUpcomingDays(), [])

  const timeSlots = useMemo(() => {
    if (!service || selectedDayIdx == null) return []
    const day = upcomingDays[selectedDayIdx]
    if (!day?.range) return []
    return buildTimeSlots(day.range, parseDurationMinutes(service.duration), day.isToday, new Date())
  }, [service, selectedDayIdx, upcomingDays])

  const selectedDay = selectedDayIdx != null ? upcomingDays[selectedDayIdx] : null

  function chooseService(s: BookableService) {
    setService(s)
    setSelectedDayIdx(null)
    setSelectedTime(null)
    setStep('datetime')
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Demo only: no real backend. A live client build would wire this to the
    // same request-an-appointment / calendar pipeline as other WebVybe
    // client sites (see CLAUDE.md / new-client-site skill).
    setSubmitted(true)
    setStep('confirm')
  }

  function startOver() {
    setSubmitted(false)
    setService(null)
    setSelectedDayIdx(null)
    setSelectedTime(null)
    setStep('service')
  }

  const stepOrder: Step[] = ['service', 'datetime', 'info', 'confirm']
  const stepLabels: Record<Step, string> = {
    service: 'Service',
    datetime: 'Date & Time',
    info: 'Your Info',
    confirm: 'Confirm',
  }
  const currentIdx = stepOrder.indexOf(step)

  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Book Now</p>
      <h1 className="font-serif text-4xl text-ink">Reserve your visit</h1>
      <p className="mt-4 max-w-xl text-stone">
        Pick a service, an open day, and a time. A real front desk would confirm it on the spot. For anything
        urgent, call the studio directly.
      </p>

      <div className="mt-10 grid min-w-0 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {/* Step indicator */}
          {!submitted && (
            <ol className="mb-8 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 text-xs font-medium text-stone">
              {stepOrder.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${
                      i <= currentIdx ? 'bg-clay-deep text-white' : 'bg-sand text-stone'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={i === currentIdx ? 'text-ink' : ''}>{stepLabels[s]}</span>
                  {i < stepOrder.length - 1 && <span className="mx-1 text-stone/40">—</span>}
                </li>
              ))}
            </ol>
          )}

          {step === 'service' && (
            <div>
              <h2 className="font-serif text-2xl text-ink">What are you booking?</h2>
              <p className="mt-2 text-sm text-stone">Choose a specific service: pricing and duration included.</p>
              <div className="mt-6 space-y-6">
                {serviceCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="eyebrow mb-2">{cat.title}</p>
                    <div className="divide-y divide-black/5 rounded-xl border border-black/5">
                      {cat.items.map((item) => {
                        const bookable = bookableServices.find(
                          (b) => b.slug === slugify(item.name, item.duration),
                        )!
                        return (
                          <button
                            key={bookable.slug}
                            type="button"
                            onClick={() => chooseService(bookable)}
                            className="flex w-full flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-cream"
                          >
                            <span className="text-sm text-ink">
                              <span className="font-medium">{item.name}</span>{' '}
                              <span className="text-stone">· {item.duration}</span>
                            </span>
                            <span className="font-serif text-sm text-clay-deep">{item.price}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'datetime' && service && (
            <div>
              <button
                type="button"
                onClick={() => setStep('service')}
                className="mb-4 text-xs font-semibold text-pine underline-offset-2 hover:underline"
              >
                ← Change service
              </button>
              <div className="flex flex-wrap items-baseline justify-between gap-3 rounded-xl bg-sand/60 px-4 py-3">
                <p className="text-sm text-ink">
                  <span className="font-medium">{service.name}</span>{' '}
                  <span className="text-stone">· {service.duration}</span>
                </p>
                <p className="font-serif text-sm text-clay-deep">{service.price}</p>
              </div>

              <h2 className="mt-6 font-serif text-xl text-ink">Choose a day</h2>
              <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-2">
                {upcomingDays.map((day, i) => (
                  <button
                    key={day.date.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDayIdx(i)
                      setSelectedTime(null)
                    }}
                    className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                      selectedDayIdx === i
                        ? 'border-clay-deep bg-clay-deep text-white'
                        : 'border-black/10 bg-cream text-ink hover:border-clay-deep/50'
                    }`}
                  >
                    <span className="font-medium">{day.label}</span>
                    <span className={selectedDayIdx === i ? 'text-white/80' : 'text-stone'}>{day.dateLabel}</span>
                  </button>
                ))}
              </div>

              {selectedDay && (
                <>
                  <h2 className="mt-6 font-serif text-xl text-ink">Choose a time</h2>
                  {timeSlots.length > 0 ? (
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                            selectedTime === slot
                              ? 'border-clay-deep bg-clay-deep text-white'
                              : 'border-black/10 bg-cream text-ink hover:border-clay-deep/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-stone">
                      No slots left {selectedDay.isToday ? 'today' : 'that day'}. Try another day.
                    </p>
                  )}
                </>
              )}

              <button
                type="button"
                disabled={!selectedDay || !selectedTime}
                onClick={() => setStep('info')}
                className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'info' && service && selectedDay && selectedTime && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="text-xs font-semibold text-pine underline-offset-2 hover:underline"
              >
                ← Change date/time
              </button>

              <div className="flex flex-wrap items-baseline justify-between gap-3 rounded-xl bg-sand/60 px-4 py-3">
                <p className="text-sm text-ink">
                  <span className="font-medium">{service.name}</span>{' '}
                  <span className="text-stone">· {service.duration}</span>
                </p>
                <p className="text-sm text-stone">
                  {selectedDay.label !== 'Today'
                    ? selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                    : `Today, ${selectedDay.dateLabel}`}{' '}
                  at <span className="font-medium text-ink">{selectedTime}</span>
                </p>
              </div>

              <h2 className="font-serif text-xl text-ink">Your info</h2>
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
                <span className="mb-1.5 block font-medium text-ink">Anything we should know?</span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="e.g. pressure preference, areas to avoid, first visit"
                  className="w-full rounded-lg border border-black/10 bg-cream px-3.5 py-2.5 text-ink outline-none focus:border-clay-deep"
                />
              </label>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                Confirm Booking
              </button>
            </form>
          )}

          {step === 'confirm' && submitted && service && selectedDay && selectedTime && (
            <div className="flex flex-col items-start gap-3 py-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine text-cream">✓</span>
              <h2 className="font-serif text-2xl text-ink">Booking confirmed</h2>

              <div className="mt-1 w-full rounded-xl border border-black/5 bg-cream/70 p-5">
                <p className="font-medium text-ink">{service.name}</p>
                <p className="mt-1 text-sm text-stone">
                  {service.duration} · <span className="text-clay-deep">{service.price}</span>
                </p>
                <p className="mt-3 text-sm text-ink">
                  {selectedDay.label !== 'Today'
                    ? selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                    : `Today, ${selectedDay.dateLabel}`}{' '}
                  at <span className="font-medium">{selectedTime}</span>
                </p>
              </div>

              <p className="max-w-sm text-stone">
                We've saved your spot. A confirmation would normally land in your inbox and text messages within a
                few minutes.
              </p>
              <p className="max-w-sm text-xs text-stone/70">
                This is a portfolio demo: nothing was actually booked or sent anywhere. A live client build would
                connect this flow to a real calendar and payment/booking pipeline.
              </p>
              <button type="button" onClick={startOver} className="btn-secondary mt-2">
                Book another appointment
              </button>
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-8">
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
          <div>
            <p className="eyebrow mb-2">Gift Cards</p>
            <p className="text-sm text-stone">{giftCards.blurb}</p>
          </div>
        </div>
      </div>

      {/* Full FAQ + policies, bundled on the page where people are about to
          book -- the way exhale spa combines its FAQ and booking policies
          on one page next to the decision, rather than scattering them. */}
      <div className="mt-20">
        <p className="eyebrow mb-3">Before you book</p>
        <h2 className="font-serif text-3xl text-ink">Questions & policies</h2>
        <div className="mt-8 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-ink">{f.q}</span>
                  <span className={`shrink-0 text-clay-deep transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm text-stone">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
