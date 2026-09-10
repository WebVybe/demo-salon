import { NavLink, useLocation } from 'react-router-dom'
import { salon } from '../content/salon'

export default function StickyBook() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-black/10 bg-cream/95 p-3 backdrop-blur-md shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.3)] sm:hidden">
      <a
        href={salon.phoneHref}
        aria-label={`Call ${salon.name}`}
        className="btn-secondary !border-black/10 !px-4"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4.5 5.5c0-.55.45-1 1-1h2.19c.5 0 .93.36 1 .85l.5 3.3c.06.4-.1.8-.42 1.05l-1.4 1.1a11.9 11.9 0 0 0 5.63 5.63l1.1-1.4c.25-.32.65-.48 1.05-.42l3.3.5c.49.07.85.5.85 1v2.19c0 .55-.45 1-1 1C10.5 20.3 3.7 13.5 3.7 5.5c0-.55.45-1 1-1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <NavLink to="/contact" className="btn-primary flex-1">
        Request an Appointment
      </NavLink>
    </div>
  )
}
