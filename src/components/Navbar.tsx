import { useState, useEffect } from 'react'
import { Menu, X, Home, Leaf, Info, Mail, ChevronRight } from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
]

const SECTION_IDS = ['accueil', 'produits', 'apropos', 'contact']

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return p
}

function useActiveSection() {
  const [active, setActive] = useState('accueil')
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.35, rootMargin: '-64px 0px -55% 0px' }
    )
    SECTION_IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return active
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progress      = useScrollProgress()
  const activeSection = useActiveSection()
  const t    = translations[lang].nav
  const isRtl = lang === 'ar'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 860) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const light = scrolled || open

  const links = [
    { href: '#accueil',  id: 'accueil',  label: t.home,     Icon: Home },
    { href: '#produits', id: 'produits', label: t.products,  Icon: Leaf },
    { href: '#apropos',  id: 'apropos',  label: t.about,     Icon: Info },
    { href: '#contact',  id: 'contact',  label: t.contact,   Icon: Mail },
  ]

  return (
    <>
      <style>{`
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Desktop nav link */
        .nav-pill {
          position: relative;
          text-decoration: none;
          font-weight: 600; font-size: 13.5px;
          padding: 8px 15px 10px; border-radius: 999px;
          transition: color .28s, background .28s;
          white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;
          overflow: hidden;
        }
        /* Animated underline indicator */
        .nav-pill::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 24px); height: 2px; border-radius: 99px;
          background: linear-gradient(90deg, #C9A96E, #1B4332);
          transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-pill.active::after {
          transform: translateX(-50%) scaleX(1);
        }
        .nav-pill .nav-icon {
          transition: transform .25s, color .25s;
        }
        .nav-pill:hover .nav-icon { transform: scale(1.2); }

        /* Lang */
        .lang-btn {
          padding: 5px 10px; border-radius: 999px; border: none;
          cursor: pointer; font-size: 11px; font-weight: 700;
          letter-spacing: 0.04em; transition: all .2s;
          display: flex; align-items: center; gap: 4px;
        }

        /* Mobile link */
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; text-decoration: none;
          font-weight: 600; font-size: 15px; border-radius: 12px;
          margin-bottom: 3px; transition: all .15s; min-height: 50px;
          color: #374151;
          border-inline-start: 3px solid transparent;
        }
        .mob-link:hover { background: #F0F5F0; color: #0F2D1E; }
        .mob-link.active {
          background: rgba(27,67,50,0.07);
          color: #0F2D1E; font-weight: 700;
          border-inline-start-color: #1B4332;
        }

        @media (max-width: 860px) {
          .desk-nav, .desk-cta { display: none !important; }
          .mob-toggle { display: flex !important; }
        }
        @media (min-width: 861px) {
          .mob-toggle { display: none !important; }
          .mob-panel  { display: none !important; }
        }
        @media (max-width: 480px) {
          .lang-btn { padding: 5px 7px !important; font-size: 10px !important; }
          .logo-text { display: none !important; }
        }
      `}</style>

      {/* Backdrop overlay when mobile menu open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(7,22,16,0.35)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            animation: 'fadeIn .2s ease both',
          }}
        />
      )}

      {/* ── Gold progress bar ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, height: 3 }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, #1B4332, #C9A96E)',
          borderRadius: '0 2px 2px 0',
          boxShadow: '0 0 12px rgba(201,169,110,0.6)',
          transition: 'width .1s linear',
        }} />
      </div>

      {/* ── Header ── */}
      <header style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50,
        background: light
          ? 'rgba(250,250,247,0.97)'
          : 'rgba(7,22,16,0.52)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: light
          ? '1px solid rgba(27,67,50,0.1)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.08)' : 'none',
        transition: 'background .38s ease, border-color .38s ease, box-shadow .38s ease',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', height: 68, gap: 8,
          }}>

            {/* ── Logo + brand text ── */}
            <a href="#accueil" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', flexShrink: 0,
            }}>
              <div style={{
                background: light ? 'transparent' : 'rgba(255,255,255,0.93)',
                borderRadius: 10,
                padding: light ? '0' : '5px 8px',
                transition: 'all .38s ease',
                display: 'flex', alignItems: 'center',
              }}>
                <img
                  src="/logo.png"
                  alt="Genotec Seeds"
                  style={{ height: 42, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>

            </a>

            {/* ── Desktop nav ── */}
            <nav className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {links.map(({ href, id, label, Icon }) => {
                const active = activeSection === id
                return (
                  <a
                    key={href}
                    href={href}
                    className={`nav-pill${active ? ' active' : ''}`}
                    style={{
                      color: active
                        ? (light ? '#0F2D1E' : '#fff')
                        : (light ? '#4B5563' : 'rgba(255,255,255,0.65)'),
                      background: active
                        ? (light ? 'rgba(27,67,50,0.09)' : 'rgba(255,255,255,0.12)')
                        : 'transparent',
                      fontWeight: active ? 700 : 600,
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = light
                          ? 'rgba(27,67,50,0.06)' : 'rgba(255,255,255,0.1)'
                        e.currentTarget.style.color = light ? '#1B4332' : '#fff'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = light
                          ? '#4B5563' : 'rgba(255,255,255,0.65)'
                      }
                    }}
                  >
                    <Icon
                      size={13}
                      strokeWidth={active ? 2.5 : 2}
                      className="nav-icon"
                    />
                    {label}
                  </a>
                )
              })}
            </nav>

            {/* ── Right controls ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

              {/* Language switcher */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 2,
                background: light ? '#F3F4F6' : 'rgba(255,255,255,0.1)',
                border: `1px solid ${light ? '#E5E7EB' : 'rgba(255,255,255,0.14)'}`,
                borderRadius: 999, padding: '3px',
                transition: 'all .38s', flexShrink: 0,
              }}>
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    title={l.label}
                    className="lang-btn"
                    style={{
                      background: lang === l.code
                        ? 'linear-gradient(135deg, #0F2D1E, #1B4332)'
                        : 'transparent',
                      color: lang === l.code
                        ? '#fff'
                        : (light ? '#6B7280' : 'rgba(255,255,255,0.52)'),
                      boxShadow: lang === l.code ? '0 2px 8px rgba(27,67,50,0.4)' : 'none',
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="desk-cta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                  color: '#0F2D1E', fontWeight: 800, fontSize: 13,
                  padding: '9px 20px', borderRadius: 999,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(201,169,110,0.42)',
                  transition: 'transform .22s, box-shadow .22s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(201,169,110,0.55)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,169,110,0.42)'
                }}
              >
                {t.cta} ✦
              </a>

              {/* Hamburger */}
              <button
                className="mob-toggle"
                onClick={() => setOpen(o => !o)}
                aria-label="Menu"
                style={{
                  display: 'none',
                  alignItems: 'center', justifyContent: 'center',
                  width: 42, height: 42, borderRadius: 10,
                  background: open
                    ? '#F0F5F0'
                    : (light ? 'transparent' : 'rgba(255,255,255,0.1)'),
                  border: `1.5px solid ${
                    open ? '#1B4332' : (light ? '#E5E7EB' : 'rgba(255,255,255,0.18)')
                  }`,
                  cursor: 'pointer',
                  color: light ? '#374151' : '#fff',
                  transition: 'all .2s', flexShrink: 0,
                }}
              >
                {open ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile panel ── */}
        {open && (
          <div
            className="mob-panel"
            style={{
              borderTop: '1px solid #E6EFE8',
              background: 'rgba(250,250,247,0.99)',
              backdropFilter: 'blur(20px)',
              padding: '0.75rem 1rem 1.25rem',
              animation: 'menuSlide .22s ease both',
            }}
          >
            <div style={{
              fontSize: 9.5, fontWeight: 700, color: '#B0A898',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '2px 16px 10px',
            }}>
              Navigation
            </div>

            {links.map(({ href, id, label, Icon }) => {
              const active = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`mob-link${active ? ' active' : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: active ? 'rgba(27,67,50,0.12)' : 'rgba(0,0,0,0.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: active ? '#1B4332' : '#9CA3AF',
                      transition: 'all .15s',
                    }}>
                      <Icon size={15} strokeWidth={2.5} />
                    </span>
                    {label}
                  </span>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    style={{
                      color: active ? '#1B4332' : 'rgba(0,0,0,0.2)',
                      transform: isRtl ? 'scaleX(-1)' : 'none',
                      flexShrink: 0,
                    }}
                  />
                </a>
              )
            })}

            <div style={{ height: 1, background: '#F0EDE8', margin: '10px 4px 12px' }} />

            {/* Language row in mobile */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  style={{
                    flex: 1, padding: '9px 4px',
                    background: lang === l.code
                      ? 'linear-gradient(135deg, #0F2D1E, #1B4332)'
                      : '#F3F4F6',
                    color: lang === l.code ? '#fff' : '#6B7280',
                    border: lang === l.code ? 'none' : '1px solid #E5E7EB',
                    borderRadius: 9, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    boxShadow: lang === l.code ? '0 2px 8px rgba(27,67,50,0.3)' : 'none',
                    transition: 'all .2s',
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                color: '#0F2D1E', fontWeight: 800, fontSize: 15,
                padding: '15px', borderRadius: 12, textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(201,169,110,0.4)',
                minHeight: 52,
              }}
            >
              {t.cta} ✦
            </a>
          </div>
        )}
      </header>
    </>
  )
}
