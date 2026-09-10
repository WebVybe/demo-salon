import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'

const panels: { variant: 1 | 2 | 3 | 4 | 5; label: string; span?: string }[] = [
  { variant: 2, label: 'Treatment room', span: 'sm:col-span-2 sm:row-span-2' },
  { variant: 1, label: 'Reception nook' },
  { variant: 3, label: 'Product shelf' },
  { variant: 4, label: 'Facial suite' },
  { variant: 5, label: 'Courtyard entrance' },
  { variant: 3, label: 'Massage table detail' },
]

export default function Gallery() {
  return (
    <div className="page-transition mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow mb-3">Gallery</p>
      <h1 className="font-serif text-4xl text-ink">A feel for the space</h1>
      <p className="mt-4 max-w-2xl text-stone">
        This is a portfolio demo, so there's no real studio to photograph yet — the panels below are intentional
        gradient/texture art standing in for photography, not real photos of a real location. Real photography or
        licensed stock would replace these before any actual launch.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-template-rows:repeat(3,10rem)]">
        {panels.map((p, i) => (
          <DecorPanel
            key={`${p.label}-${i}`}
            variant={p.variant}
            label={p.label}
            className={`h-40 w-full sm:h-full ${p.span ?? ''}`}
          />
        ))}
      </div>

      {/* Typography carries what a photo would, until there is one --
          generous whitespace and a large serif line instead of more
          gradient panels. */}
      <div className="mx-auto mt-20 max-w-2xl py-4">
        <p className="font-serif text-2xl leading-relaxed text-pine sm:text-3xl">
          Low light in the treatment rooms. A quiet hallway between the reception nook and the courtyard entrance.
          One session at a time — no music competing with the next room's.
        </p>
      </div>

      <div className="mt-14 text-center">
        <p className="text-stone">Prefer to just come see it in person?</p>
        <NavLink to="/contact" className="btn-primary mt-4 inline-flex">
          Book Now
        </NavLink>
      </div>
    </div>
  )
}
