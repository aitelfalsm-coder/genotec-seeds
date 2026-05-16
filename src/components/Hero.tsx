import { useState, useEffect } from 'react'
import { CalendarDays, Map as MapIcon, Sprout, Users, ArrowRight, ChevronDown, Check } from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface HeroProps { lang: Lang }

type Slide = {
  url: string
  name: string
  variety: string
  category: string
  emoji: string
  branded?: true
}

const SLIDES: Slide[] = [
  { url: '/jabri-pic.jpg', name: 'Pastèque en production', variety: 'Variété hybride', category: 'Pastèque', emoji: '🍉' },
  { url: 'https://images.unsplash.com/photo-1681570312135-f7626c851df8?w=1200&q=90&auto=format&fit=crop', name: 'Poivrons en croissance', variety: 'Variétés hybrides', category: 'Poivron', emoji: '🌶️' },
  { url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=90&auto=format&fit=crop', name: 'Plants maraîchers', variety: 'Plateaux de semis', category: 'Pépinière', emoji: '🌱' },
  { url: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=1200&q=90&auto=format&fit=crop', name: 'Transplantation', variety: 'Plants certifiés', category: 'Transplantation', emoji: '🪴' },
  { url: 'https://images.unsplash.com/photo-1712342109846-a8fcb1c883ba?w=1200&q=90&auto=format&fit=crop', name: 'Germination garantie', variety: 'Levée contrôlée', category: 'Germination', emoji: '🌱' },
  { url: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=1200&q=90&auto=format&fit=crop', name: 'Légumes du Maroc', variety: 'Variétés adaptées', category: 'Maraîchage', emoji: '🥬' },
  { url: 'https://images.unsplash.com/photo-1683008952458-dc02ac67f382?w=1200&q=90&auto=format&fit=crop', name: 'Tomates en production', variety: 'Variétés hybrides', category: 'Tomate', emoji: '🍅' },
  { url: 'https://images.unsplash.com/photo-1627647563441-c4bdf17486d2?w=1200&q=90&auto=format&fit=crop', name: 'Semis en pot', variety: 'Qualité premium', category: 'Semis', emoji: '🌿' },
  { url: '/melon-pic.jpg', name: 'Melons en production', variety: 'Variété hybride', category: 'Melon', emoji: '🍈' },
]

const MARQUEE = [
  { n: 'Tomate',         e: '🍅' },
  { n: 'Poivron',        e: '🌶️' },
  { n: 'Melon',          e: '🍈' },
  { n: 'Pastèque',       e: '🍉' },
  { n: 'Carotte',        e: '🥕' },
  { n: 'Oignon',         e: '🌿' },
  { n: 'Pomme de terre', e: '🥔' },
  { n: 'Maïs',           e: '🌽' },
  { n: 'Courgette',      e: '🥒' },
  { n: 'Concombre',      e: '🥒' },
  { n: 'Aubergine',      e: '🍆' },
  { n: 'Piment Fort',    e: '🌶️' },
  { n: 'Persil',         e: '🌿' },
  { n: 'Coriandre',      e: '🌿' },
  { n: 'Laitue',         e: '🥬' },
  { n: 'Radis',          e: '🌱' },
]

const TRUST: Record<Lang, string[]> = {
  fr: ['Semences certifiées', 'Société marocaine', 'Distribution nationale'],
  ar: ['بذور معتمدة', 'شركة مغربية', 'توزيع وطني'],
  en: ['Certified seeds', 'Moroccan company', 'Nationwide distribution'],
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero
  const isRTL = lang === 'ar'
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [paused])

  const goTo   = (i: number) => setSlide(i)
  const goNext = () => setSlide(s => (s + 1) % SLIDES.length)
  const goPrev = () => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)

  const stats = [
    { value: t.stat1Value, label: t.stat1Label, Icon: CalendarDays },
    { value: t.stat2Value, label: t.stat2Label, Icon: MapIcon },
    { value: t.stat3Value, label: t.stat3Label, Icon: Sprout },
    { value: t.stat4Value, label: t.stat4Label, Icon: Users },
  ]

  return (
    <>
      <style>{`
        @keyframes glowOrb {
          0%,100% { opacity: .18; }
          50%      { opacity: .34; }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(107,191,74,0.45); }
          50%     { box-shadow: 0 0 0 8px rgba(107,191,74,0); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: .55; }
          50%      { transform: translateY(7px); opacity: .2; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .hero-arrow {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(7,22,16,0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.16);
          color: #fff; font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .22s; z-index: 10; line-height: 1;
        }
        .hero-arrow:hover {
          background: rgba(107,191,74,0.22);
          border-color: rgba(107,191,74,0.55);
          box-shadow: 0 8px 26px rgba(0,0,0,0.35);
          transform: translateY(-50%) scale(1.07);
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hero-stat-item {
          transition: background .22s; cursor: default;
        }
        .hero-stat-item:hover { background: rgba(107,191,74,0.04); }
        .hero-deco-circle { display: block; }
        .slide-dot-btn {
          border: none; cursor: pointer; padding: 4px 2px;
          transition: all .3s ease; border-radius: 99px; flex-shrink: 0;
          touch-action: manipulation;
        }
        .slide-dot-btn:hover { opacity: 1 !important; }
        .scroll-indicator {
          animation: scrollBounce 2s ease-in-out infinite;
        }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #6BBF4A, #4DA832);
          color: #0A1F14; font-weight: 800; font-size: 14px;
          padding: 14px 30px; border-radius: 999px;
          text-decoration: none; letter-spacing: 0.02em;
          box-shadow: 0 8px 32px rgba(107,191,74,0.45);
          transition: all .25s; min-height: 50px;
          position: relative; overflow: hidden;
        }
        .hero-cta-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform .4s ease;
        }
        .hero-cta-primary:hover::after { transform: translateX(100%); }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 44px rgba(107,191,74,0.55);
        }
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.17);
          color: #fff; font-weight: 600; font-size: 14px;
          padding: 14px 28px; border-radius: 999px;
          text-decoration: none; transition: all .25s; min-height: 50px;
        }
        .hero-cta-secondary:hover {
          background: rgba(107,191,74,0.1);
          border-color: rgba(107,191,74,0.35);
        }

        .hero-float-card { display: flex; }
        @media (max-width: 780px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-stats-grid .hero-stat-item:nth-child(2) { border-right: none !important; }
          .hero-stats-grid .hero-stat-item:nth-child(1),
          .hero-stats-grid .hero-stat-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .hero-deco-circle { display: none !important; }
          .hero-slideshow { height: 340px !important; }
          .hero-arrow { width: 38px !important; height: 38px !important; font-size: 18px !important; }
          .scroll-indicator { display: none; }
          .hero-main-grid { gap: 1.5rem !important; padding-top: 1.25rem !important; }
          .hero-float-card { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-badge { letter-spacing: 0.09em !important; padding: 7px 13px !important; font-size: 10px !important; margin-bottom: 18px !important; }
          .hero-cta-primary, .hero-cta-secondary { width: 100% !important; justify-content: center !important; }
          .hero-cta-row { flex-direction: column !important; gap: 10px !important; margin-bottom: 1.25rem !important; }
          .hero-slideshow { height: clamp(220px, 72vw, 300px) !important; }
          .hero-slide-counter { display: none !important; }
          .hero-subtitle { margin-bottom: 1.5rem !important; }
          .hero-trust-wrap { gap: 8px 10px !important; }
          .hero-trust-item { padding-right: 0 !important; margin-right: 0 !important; border-right: none !important; }
          .hero-stat-item { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        }
      `}</style>

      <section
        id="accueil"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(155deg, #071610 0%, #0D2518 38%, #163825 68%, #0D2518 100%)',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 68,
        }}
      >
        {/* ── Background layers ── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(107,191,74,0.055) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '55%', height: '70%',
            background: 'radial-gradient(ellipse at 85% 5%, rgba(107,191,74,0.1) 0%, transparent 65%)',
            animation: 'glowOrb 5s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '45%', height: '55%',
            background: 'radial-gradient(ellipse at 15% 95%, rgba(27,107,92,0.14) 0%, transparent 65%)',
            animation: 'glowOrb 4s ease-in-out 1.5s infinite',
          }} />
          <div className="grain" />
          <div className="hero-deco-circle" style={{
            position: 'absolute', top: '-22%', right: '-9%',
            width: 700, height: 700, borderRadius: '50%',
            border: '1px solid rgba(107,191,74,0.04)',
          }} />
          <div className="hero-deco-circle" style={{
            position: 'absolute', top: '-10%', right: '-3%',
            width: 420, height: 420, borderRadius: '50%',
            border: '1px solid rgba(107,191,74,0.08)',
          }} />
        </div>

        {/* ── Main content ── */}
        <div className="hero-main-grid" style={{
          position: 'relative', flex: 1,
          maxWidth: 1140, margin: '0 auto',
          padding: 'clamp(2rem,5vw,4rem) 1.5rem 2rem',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}>

          {/* ── Left: Text ── */}
          <div style={{ order: isRTL ? 2 : 1, animation: 'heroSlideUp .75s ease both' }}>

            {/* Badge */}
            <div className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: 'rgba(107,191,74,0.1)',
              border: '1px solid rgba(107,191,74,0.32)',
              color: '#6BBF4A', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              borderRadius: 999, padding: '8px 18px', marginBottom: 28,
              animation: 'badgePulse 3s ease-in-out infinite',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#6BBF4A',
                boxShadow: '0 0 10px rgba(107,191,74,0.9)',
                display: 'inline-block', flexShrink: 0,
              }} />
              {t.badge}
            </div>

            {/* Headline principal */}
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                fontWeight: 900,
                lineHeight: 1.05, letterSpacing: '-0.03em',
                margin: '0 0 0.5rem',
              }}>
                <span style={{ color: '#fff', textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}>GENOTEC </span>
                <span style={{
                  color: '#6BBF4A',
                  filter: 'drop-shadow(0 0 22px rgba(107,191,74,0.55))',
                }}>SEEDS</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                <div style={{ height: 2, width: 32, background: 'linear-gradient(270deg, #6BBF4A, transparent)', borderRadius: 99 }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#6BBF4A', opacity: 0.7, flexShrink: 0 }} />
                <div style={{ height: 2, width: 32, background: 'linear-gradient(90deg, #6BBF4A, transparent)', borderRadius: 99 }} />
              </div>
              <p style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 3.1rem)',
                fontWeight: 700, fontStyle: 'italic',
                fontFamily: "'Fraunces', Georgia, serif",
                color: '#8EDB60',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                margin: 0,
                textShadow: '0 0 40px rgba(107,191,74,0.5)',
              }}>
                L'art de la sélection
              </p>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle" style={{
              fontSize: 'clamp(0.88rem,1.7vw,1.05rem)',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.85, margin: '0 0 2.2rem', maxWidth: 460,
            }}>
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '2rem' }}>
              <a href="#produits" className="hero-cta-primary">
                {t.cta} <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a href="#contact" className="hero-cta-secondary">
                {t.ctaSecondary}
              </a>
            </div>

            {/* Trust items */}
            <div className="hero-trust-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0, marginBottom: '1.75rem' }}>
              {TRUST[lang].map((item, i) => (
                <span key={i} className="hero-trust-item" style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: 'rgba(255,255,255,0.42)', fontSize: 11.5, fontWeight: 600,
                  paddingRight: i < 2 ? '1.1rem' : 0,
                  borderRight: i < 2 ? '1px solid rgba(107,191,74,0.18)' : 'none',
                  marginRight: i < 2 ? '1.1rem' : 0,
                }}>
                  <Check size={12} strokeWidth={2.5} style={{ color: '#6BBF4A', flexShrink: 0 }} />
                  {item}
                </span>
              ))}
            </div>

            {/* Scroll indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRTL ? 'flex-end' : 'flex-start', gap: 5 }}>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 8.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700 }}>
                Scroll
              </span>
              <div className="scroll-indicator">
                <ChevronDown size={17} strokeWidth={1.5} style={{ color: 'rgba(107,191,74,0.35)', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* ── Right: Slideshow ── */}
          <div style={{ order: isRTL ? 1 : 2, animation: 'heroFadeIn 1s ease .35s both', position: 'relative' }}>
            <div
              className="hero-slideshow"
              style={{
                position: 'relative',
                borderRadius: 26,
                overflow: 'hidden',
                height: 520,
                boxShadow: '0 40px 100px rgba(0,0,0,0.58), 0 0 0 1px rgba(107,191,74,0.22)',
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={e => {
                if (touchStartX === null) return
                const delta = touchStartX - e.changedTouches[0].clientX
                if (Math.abs(delta) > 48) { delta > 0 ? goNext() : goPrev() }
                setTouchStartX(null)
              }}
            >
              {/* ── Slides ── */}
              {SLIDES.map((s, i) => s.branded ? (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  opacity: i === slide ? 1 : 0,
                  transition: 'opacity .95s ease',
                  background: 'linear-gradient(155deg, #071610 0%, #0F2D1E 50%, #1A3D28 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(107,191,74,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                  <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(107,191,74,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', zIndex: 0, width: 195, height: 278, background: 'rgba(27,107,92,0.35)', border: '1px solid rgba(107,191,74,0.2)', borderRadius: 18, transform: 'rotate(7deg) translate(28px, 10px)' }} />
                  <div style={{ position: 'relative', zIndex: 1, width: 195, background: '#0A1F14', border: '1.5px solid rgba(107,191,74,0.55)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 28px 70px rgba(0,0,0,0.7)', transform: 'rotate(-4deg)' }}>
                    <div style={{ height: 7, background: 'linear-gradient(90deg, #4DA832, #6BBF4A, #8EDB60, #6BBF4A, #4DA832)' }} />
                    <div style={{ padding: '16px 14px 12px', textAlign: 'center', borderBottom: '1px solid rgba(107,191,74,0.2)', background: 'linear-gradient(170deg, #1B4332 0%, #0F2D1E 100%)' }}>
                      <div style={{ display: 'inline-block', background: '#fff', borderRadius: 7, padding: '4px 8px', marginBottom: 9, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                        <img src="/logo.png" alt="Genotec Seeds" style={{ height: 20, display: 'block', objectFit: 'contain', minWidth: 60 }} />
                      </div>
                      <div style={{ color: '#6BBF4A', fontWeight: 900, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase' }}>GENOTEC SEEDS</div>
                      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8, letterSpacing: '0.15em', marginTop: 3, textTransform: 'uppercase' }}>Maroc</div>
                    </div>
                    <div style={{ padding: '16px 14px', textAlign: 'center', background: '#071610' }}>
                      <div style={{ fontSize: 40, lineHeight: 1 }}>🌾</div>
                      <div style={{ width: 30, height: 2, background: 'rgba(107,191,74,0.4)', margin: '8px auto 10px', borderRadius: 99 }} />
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em' }}>Semences Certifiées</div>
                      <div style={{ color: 'rgba(107,191,74,0.7)', fontSize: 9, letterSpacing: '0.12em', marginTop: 4, textTransform: 'uppercase' }}>Légumes & Aromates</div>
                    </div>
                    <div style={{ padding: '7px 12px', background: 'linear-gradient(90deg, #4DA832, #6BBF4A)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#0A1F14', fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Qualité Premium</span>
                      <span style={{ color: 'rgba(10,31,20,0.5)' }}>·</span>
                      <span style={{ color: '#0A1F14', fontSize: 8, fontWeight: 800 }}>2025–2026</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Photo slide with Ken Burns */
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  opacity: i === slide ? 1 : 0,
                  transition: 'opacity .95s ease',
                  overflow: 'hidden',
                }}>
                  <img
                    src={s.url}
                    alt={s.name}
                    className="slide-img"
                    style={{
                      transform: i === slide
                        ? `scale(1.08) translateX(${i % 2 === 0 ? '-1.5%' : '1.5%'})`
                        : 'scale(1.01) translateX(0)',
                      transition: i === slide
                        ? 'transform 6s ease-in-out'
                        : 'transform 0.4s ease',
                    }}
                  />
                </div>
              ))}

              {/* Dark gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 35%, rgba(7,22,16,0.88) 100%)',
                pointerEvents: 'none', zIndex: 2,
              }} />
              {/* Side gradients for arrows */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.28) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.28) 100%)',
                pointerEvents: 'none', zIndex: 2,
              }} />

              {/* Top-left: dynamic category badge */}
              <div style={{
                position: 'absolute', top: 16, left: 16, zIndex: 5,
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(7,22,16,0.72)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(107,191,74,0.32)',
                borderRadius: 999, padding: '6px 14px',
                animation: 'badgePulse 3s ease-in-out infinite',
                transition: 'all .4s ease',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BBF4A', boxShadow: '0 0 6px rgba(107,191,74,0.8)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ color: '#6BBF4A', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {SLIDES[slide].category}
                </span>
              </div>

              {/* Top-right: logo circle */}
              <div style={{
                position: 'absolute', top: 14, right: 14, zIndex: 5,
                width: 52, height: 52, borderRadius: '50%',
                background: '#fff',
                border: '2px solid rgba(107,191,74,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 6,
                boxShadow: '0 4px 18px rgba(0,0,0,0.38)',
              }}>
                <img src="/logo.png" alt="Genotec Seeds" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* Nav arrows */}
              <button onClick={goPrev} className="hero-arrow" style={{ left: 12, zIndex: 5 }} aria-label="Précédent">‹</button>
              <button onClick={goNext} className="hero-arrow" style={{ right: 12, zIndex: 5 }} aria-label="Suivant">›</button>

              {/* ── Bottom info overlay ── */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
                padding: '24px 18px 16px',
              }}>
                {/* Info row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>

                  {/* Slide name + variety */}
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: 'rgba(107,191,74,0.18)',
                      border: '1px solid rgba(107,191,74,0.28)',
                      borderRadius: 999, padding: '2px 9px', marginBottom: 6,
                    }}>
                      <span style={{ color: '#8EDB60', fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                        {SLIDES[slide].variety}
                      </span>
                    </div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.2, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                      {SLIDES[slide].name}
                    </div>
                  </div>

                  {/* Counter + dots */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7, flexShrink: 0 }}>
                    <span className="hero-slide-counter" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em' }}>
                      {String(slide + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(SLIDES.length).padStart(2, '0')}
                    </span>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      {SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className="slide-dot-btn"
                          style={{
                            width: i === slide ? 20 : 5,
                            height: 5,
                            background: i === slide ? '#6BBF4A' : 'rgba(255,255,255,0.28)',
                            opacity: i === slide ? 1 : 0.7,
                          }}
                          aria-label={SLIDES[i].name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full-width progress bar */}
                <div style={{ height: 2.5, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div key={slide} style={{
                    height: '100%', borderRadius: 99,
                    background: 'linear-gradient(90deg, #6BBF4A, #8EDB60)',
                    animation: 'progressFill 5s linear both',
                  }} />
                </div>
              </div>
            </div>

            {/* ── Floating card 1 — agriculteurs ── */}
            <div
              className="hero-float-card"
              style={{
                position: 'absolute', top: 82, right: -18, zIndex: 20,
                background: '#fff',
                borderRadius: 18, padding: '12px 16px',
                boxShadow: '0 16px 44px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.1)',
                alignItems: 'center', gap: 12,
                animation: 'heroFadeIn 1s ease .9s both, floatCard 4s ease-in-out 1.9s infinite',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #0F2D1E, #1B4332)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Users size={18} strokeWidth={2} style={{ color: '#6BBF4A' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: '#111827', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  1000+
                </div>
                <div style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>
                  Agriculteurs partenaires
                </div>
              </div>
            </div>

            {/* ── Floating card 2 — variétés ── */}
            <div
              className="hero-float-card"
              style={{
                position: 'absolute', bottom: 108, left: -18, zIndex: 20,
                background: 'linear-gradient(140deg, #0A1F14, #0F2D1E)',
                border: '1px solid rgba(107,191,74,0.3)',
                borderRadius: 18, padding: '12px 16px',
                boxShadow: '0 16px 44px rgba(0,0,0,0.48)',
                alignItems: 'center', gap: 12,
                animation: 'heroFadeIn 1s ease 1.1s both, floatCard 4s ease-in-out 2.4s infinite',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(107,191,74,0.12)',
                border: '1px solid rgba(107,191,74,0.32)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sprout size={18} strokeWidth={2} style={{ color: '#6BBF4A' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  50+
                </div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.42)', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>
                  Variétés certifiées
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Marquee ticker ── */}
        <div style={{
          position: 'relative',
          background: 'rgba(107,191,74,0.06)',
          borderTop: '1px solid rgba(107,191,74,0.14)',
          borderBottom: '1px solid rgba(107,191,74,0.14)',
          overflow: 'hidden', padding: '11px 0',
        }}>
          <div style={{
            display: 'flex',
            animation: 'marqueeScroll 18s linear infinite',
            willChange: 'transform',
          }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{
                flexShrink: 0,
                color: 'rgba(107,191,74,0.75)', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '0 1.6rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                whiteSpace: 'nowrap',
              }}>
                {item.n}
                <span style={{ color: 'rgba(107,191,74,0.25)', fontSize: 7, marginLeft: 8 }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{
          position: 'relative',
          background: 'rgba(0,0,0,0.32)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop: '1px solid rgba(107,191,74,0.08)',
        }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="hero-stats-grid">
              {stats.map((s, i) => {
                const StatIcon = s.Icon
                return (
                  <div key={i} className="hero-stat-item" style={{
                    padding: 'clamp(1rem,2.2vw,1.5rem) 1rem',
                    textAlign: 'center',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(107,191,74,0.1)',
                      border: '1px solid rgba(107,191,74,0.22)',
                      color: '#6BBF4A', marginBottom: 8,
                    }}>
                      <StatIcon size={15} strokeWidth={1.7} />
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.3rem,2.6vw,2.1rem)',
                      fontWeight: 900, color: '#6BBF4A', lineHeight: 1,
                      letterSpacing: '-0.035em',
                    }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 5, fontWeight: 500, letterSpacing: '0.04em' }}>
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
