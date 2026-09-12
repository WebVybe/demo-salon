import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
// Photo credits (Pexels license: free for commercial use, no attribution required):
import treatmentRoomImg from '../assets/images/gallery-treatment-room.jpg' // jessejames
import receptionImg from '../assets/images/gallery-reception.jpg' // Artbovich
import productShelfImg from '../assets/images/gallery-product-shelf.jpg' // Zandatsu
import facialSuiteImg from '../assets/images/gallery-facial-suite.jpg' // Davegarcia
import courtyardImg from '../assets/images/gallery-courtyard.jpg' // Alex Quezada
import massageTableImg from '../assets/images/gallery-massage-table.jpg' // tri-t-long-club-hair-removal-by-tl

const panels: { label: string; span?: string; src: string }[] = [
  { label: 'Treatment room', span: 'sm:col-span-2 sm:row-span-2', src: treatmentRoomImg },
  { label: 'Reception nook', src: receptionImg },
  { label: 'Product shelf', src: productShelfImg },
  { label: 'Facial suite', src: facialSuiteImg },
  { label: 'Courtyard entrance', src: courtyardImg },
  { label: 'Massage table detail', src: massageTableImg },
]

export default function Gallery() {
  return (
    <div className="page-transition mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow mb-3">Gallery</p>
      <h1 className="font-serif text-4xl text-ink">A feel for the space</h1>
      <p className="mt-4 max-w-2xl text-stone">
        This is a portfolio demo, so there's no real studio to photograph yet: the images below are licensed stock
        photography standing in for real photography of this specific location, not real photos of a real Salt &amp;
        Stone Wellness studio. Real photography would replace these before any actual launch.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-template-rows:repeat(3,10rem)]">
        {panels.map((p, i) => (
          <DecorPanel
            key={`${p.label}-${i}`}
            label={p.label}
            src={p.src}
            alt={p.label}
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
          One session at a time, with no music competing with the next room's.
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
