import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { salon } from '../content/salon'

const links = [
  { to: '/services', label: 'Services & Pricing' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="shrink-0 font-serif text-xl font-medium text-pine" onClick={() => setOpen(false)}>
          {salon.name}
        </NavLink>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link transition-colors hover:text-ink ${isActive ? 'is-active text-ink' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={salon.phoneHref}
            className="hidden text-sm font-medium text-stone transition-colors hover:text-ink lg:inline-flex"
          >
            {salon.phone}
          </a>
          <NavLink to="/contact" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Book Now
          </NavLink>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-cream px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-stone">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? 'text-ink' : 'hover:text-ink')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="btn-primary !px-5 !py-2.5 text-sm">
                Book Now
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
