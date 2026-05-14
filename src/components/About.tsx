import { useState, useEffect, useRef } from 'react'
import {
  Award, FlaskConical, Globe, Leaf,
  CalendarDays, Map as MapIcon, Sprout, Users,
  ShieldCheck, Star, Truck, Check,
} from 'lucide-react'
import { type Lang, translations } from '../i18n'

const VALUE_ICONS   = [Award, FlaskConical, Globe, Leaf]
const STAT_ICONS    = [CalendarDays, Sprout, MapIcon, Users]
const CERT_ICONS    = [ShieldCheck, Star, Check, Truck]
const VALUE_ACCENTS = ['#C9503A', '#6BBF4A', '#1B6B5C', '#1A4E7A']

const REGIONS = ['Souss-Massa', 'Marrakech', 'Casablanca', 'Rabat', 'Fès', 'Tanger', 'Meknès', 'Oriental', '+4']

const MAIN_PHOTO = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=700&h=560&q=87&auto=format&fit=crop'
const SEC_PHOTO  = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=360&h=260&q=87&auto=format&fit=crop'

interface AboutProps { lang: Lang }

const TL_TITLES: Record<Lang, [string, string, string]> = {
  fr: ['Notre Histoire', 'Notre Mission', 'Notre Réseau'],
  ar: ['تاريخنا',        'مهمتنا',        'شبكتنا'],
  en: ['Our Story',      'Our Mission',    'Our Network'],
}

const P3: Record<Lang, string> = {
  fr: 'Nous couvrons les 12 régions du Maroc avec un réseau de distribution solide, garantissant une présence locale forte et un accompagnement de proximité pour chaque agriculteur partenaire.',
  ar: 'نغطي 12 جهة في المغرب بشبكة توزيع متينة، نضمن من خلالها حضوراً محلياً قوياً ومرافقة عن قرب لكل فلاح شريك.',
  en: 'We cover all 12 regions of Morocco through a solid distribution network, ensuring strong local presence and close support for every partner farmer.',
}

const VALS_TITLE: Record<Lang, string> = {
  fr: 'Nos valeurs fondamentales',
  ar: 'قيمنا الأساسية',
  en: 'Our core values',
}

const WHY_TITLE: Record<Lang, string> = {
  fr: 'Pourquoi nous choisir',
  ar: 'لماذا تختارنا',
  en: 'Why choose us',
}

const YEARS_LBL: Record<Lang, string> = {
  fr: "Ans d'expertise",
  ar: 'سنة خبرة',
  en: 'Years of expertise',
}

const PHOTO_CAP1: Record<Lang, string> = {
  fr: 'Semences de qualité supérieure',
  ar: 'بذور عالية الجودة',
  en: 'Superior quality seeds',
}

const PHOTO_CAP2: Record<Lang, string> = {
  fr: 'Semis professionnels',
  ar: 'شتلات مهنية',
  en: 'Professional seedlings',
}

const MINI_STATS: Record<Lang, [string, string, string]> = {
  fr: ['Variétés', 'Régions', 'Agriculteurs'],
  ar: ['صنف',      'منطقة',   'فلاح شريك'],
  en: ['Varieties', 'Regions', 'Farmers'],
}

const CERTS_DATA: Record<Lang, { label: string; sub: string }[]> = {
  fr: [
    { label: 'Semences certifiées',      sub: 'Conformes aux normes nationales' },
    { label: 'Qualité premium',          sub: 'Sélection rigoureuse à chaque récolte' },
    { label: 'Société 100 % marocaine',  sub: 'Fièrement marocaine' },
    { label: 'Distribution nationale',   sub: 'Couvrant tout le Royaume' },
  ],
  ar: [
    { label: 'بذور معتمدة',       sub: 'مطابقة للمعايير الوطنية' },
    { label: 'جودة متميزة',       sub: 'انتقاء دقيق في كل موسم' },
    { label: 'شركة مغربية 100%', sub: 'بفخر مغربية' },
    { label: 'توزيع وطني',       sub: 'تغطي كامل المملكة' },
  ],
  en: [
    { label: 'Certified seeds',          sub: 'Compliant with national standards' },
    { label: 'Premium quality',          sub: 'Rigorous selection every harvest' },
    { label: '100% Moroccan company',    sub: 'Proudly Moroccan' },
    { label: 'Nationwide distribution',  sub: 'Covering the entire Kingdom' },
  ],
}

const CVG_LABEL: Record<Lang, string> = {
  fr: '🇲🇦 Couverture :',
  ar: '🇲🇦 التغطية :',
  en: '🇲🇦 Coverage :',
}

function parseStat(s: string) {
  const num = parseInt(s.replace(/\D/g, ''))
  return { num: isNaN(num) ? 0 : num, suffix: s.includes('+') ? '+' : '' }
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

function StatCell({ s, i, active }: { s: { value: string; label: string }; i: number; active: boolean }) {
  const { num, suffix } = parseStat(s.value)
  const count = useCountUp(num, active)
  const Icon  = STAT_ICONS[i]
  return (
    <div className="stt-cell" style={{
      textAlign: 'center',
      padding: 'clamp(2rem,4vw,3rem) 1rem clamp(1.5rem,3vw,2.25rem)',
      borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(107,191,74,0.1)',
        border: '1px solid rgba(107,191,74,0.22)',
        color: '#6BBF4A', marginBottom: 12,
      }}>
        <Icon size={16} strokeWidth={1.7} />
      </div>
      <div style={{
        fontSize: 'clamp(2.4rem,5vw,3.8rem)',
        fontWeight: 900, color: '#6BBF4A',
        lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 10,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: 11, color: 'rgba(255,255,255,0.4)',
        lineHeight: 1.4, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {s.label}
      </div>
    </div>
  )
}

const TL_COLORS = [
  { color: '#6BBF4A', shadow: 'rgba(107,191,74,0.42)' },
  { color: '#1B6B5C', shadow: 'rgba(27,107,92,0.38)' },
  { color: '#1A4E7A', shadow: 'rgba(26,78,122,0.3)' },
]

export default function About({ lang }: AboutProps) {
  const t      = translations[lang].about
  const isRTL  = lang === 'ar'
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsInView(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const tlTexts = [t.p1, t.p2, P3[lang]]

  return (
    <>
      <style>{`
        .about-story-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
          margin-bottom: clamp(4.5rem, 7vw, 6.5rem);
        }
        .photo-main-img { transition: transform .7s cubic-bezier(.25,.46,.45,.94); }
        .photo-wrap:hover .photo-main-img { transform: scale(1.035); }

        .val-card {
          background: #fff;
          border: 1.5px solid #EDEAE4;
          border-radius: 22px;
          padding: clamp(1.8rem,3vw,2.6rem) clamp(1.6rem,3vw,2.4rem) clamp(1.6rem,3vw,2.2rem);
          transition: transform .3s ease, box-shadow .3s ease;
          position: relative; overflow: hidden;
          cursor: default;
        }
        .val-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 64px rgba(0,0,0,0.11);
        }
        .val-top-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px; border-radius: 22px 22px 0 0;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .cert-card {
          padding: 22px 20px; border-radius: 18px;
          background: #fff; border: 1.5px solid #E8E5DF;
          transition: border-color .2s, box-shadow .2s, transform .22s;
          cursor: default;
        }
        .cert-card:hover {
          border-color: rgba(27,67,50,0.22);
          box-shadow: 0 10px 28px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .about-vals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: clamp(3.5rem, 5vw, 5rem);
        }
        .about-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .stt-cell { transition: background .2s; cursor: default; }
        .stt-cell:hover { background: rgba(255,255,255,0.04); }

        @media (max-width: 900px) {
          .about-story-cols { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .about-photo-frame { display: none !important; }
          .about-photo-secondary { display: none !important; }
          .about-photo-col { padding-bottom: 1rem !important; }
          .about-photo-badge { top: 14px !important; right: 14px !important; }
          .about-tl-inner { padding-left: 28px !important; padding-right: 0 !important; }
          .about-tl-line { left: 5px !important; }
          .about-tl-dot { left: -28px !important; }
          .about-tl-dot-rtl { right: -28px !important; }
          .about-mini-stats { padding-left: 28px !important; padding-right: 0 !important; gap: 1.5rem !important; }
        }
        @media (max-width: 860px) {
          .cert-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .about-vals-grid { grid-template-columns: 1fr !important; }
          .val-card { padding: 1.6rem 1.3rem 1.4rem !important; }
          .about-section-header { margin-bottom: 2.5rem !important; }
        }
        @media (max-width: 580px) {
          .about-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-stat-grid .stt-cell:nth-child(2) { border-right: none !important; }
          .about-stat-grid .stt-cell:nth-child(1),
          .about-stat-grid .stt-cell:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .stt-cell { padding-top: 1.5rem !important; padding-bottom: 1.25rem !important; }
        }
        @media (max-width: 480px) {
          .cert-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cert-card { padding: 16px 14px !important; }
        }
        @media (max-width: 360px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="apropos" style={{
        padding: 'clamp(5rem,9vw,8rem) 0 0',
        background: '#fff', position: 'relative',
      }}>

        {/* ── Backgrounds ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(107,191,74,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '45%', height: '45%',
          background: 'radial-gradient(ellipse at 0% 0%, rgba(27,67,50,0.045) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '30%', right: 0,
          width: '35%', height: '35%',
          background: 'radial-gradient(ellipse at 100% 100%, rgba(107,191,74,0.045) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem' }}>

          {/* ── Header ── */}
          <div className="about-section-header" style={{ textAlign: 'center', marginBottom: 'clamp(3rem,7vw,6.5rem)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              color: '#1B4332', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              <span style={{ width: 28, height: 1, background: 'rgba(27,67,50,0.3)', display: 'inline-block' }} />
              {t.badge}
              <span style={{ width: 28, height: 1, background: 'rgba(27,67,50,0.3)', display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem,5vw,4rem)',
              fontWeight: 900, color: '#0A1510',
              margin: '0 0 1rem', letterSpacing: '-0.04em', lineHeight: 1.05,
            }}>
              {t.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0 auto 22px' }}>
              <div style={{ width: 40, height: 1, background: 'rgba(107,191,74,0.3)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BBF4A' }} />
              <div style={{ width: 48, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#6BBF4A,#1B6B5C)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1B6B5C', opacity: 0.55 }} />
              <div style={{ width: 40, height: 1, background: 'rgba(27,107,92,0.22)' }} />
            </div>
            <p style={{
              color: '#6B7280', fontSize: 'clamp(14px,1.6vw,17px)',
              maxWidth: 600, margin: '0 auto', lineHeight: 1.85,
            }}>
              {t.subtitle}
            </p>
          </div>

          {/* ── Story ── */}
          <div className="about-story-cols">

            {/* Photos */}
            <div className="about-photo-col" style={{ position: 'relative', paddingBottom: '3rem', order: isRTL ? 1 : 0 }}>
              <div className="about-photo-frame" style={{
                position: 'absolute',
                top: 18, left: -18, right: '22%', bottom: '-4px',
                borderRadius: 28,
                border: '1.5px solid rgba(107,191,74,0.28)',
                background: 'rgba(107,191,74,0.02)',
                pointerEvents: 'none',
              }} />

              <div className="photo-wrap" style={{
                position: 'relative', borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 32px 72px rgba(0,0,0,0.17)', aspectRatio: '4/3',
              }}>
                <img
                  src={MAIN_PHOTO} alt="GENOTEC SEEDS"
                  className="photo-main-img"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(5,18,11,0.72) 100%)',
                  pointerEvents: 'none',
                }} />
                <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22 }}>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.42)',
                    letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 5,
                  }}>
                    GENOTEC SEEDS · Maroc
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: '#fff', letterSpacing: '-0.015em' }}>
                    {PHOTO_CAP1[lang]}
                  </div>
                </div>
              </div>

              {/* Secondary photo */}
              <div className="about-photo-secondary" style={{
                position: 'absolute', bottom: 0, right: '-14px',
                width: '52%', borderRadius: 18, overflow: 'hidden',
                boxShadow: '0 18px 48px rgba(0,0,0,0.28)',
                border: '4px solid #fff', zIndex: 2,
              }}>
                <img src={SEC_PHOTO} alt="Semis GENOTEC"
                  loading="lazy" decoding="async"
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(5,18,11,0.65) 100%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 10, left: 12, right: 12,
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {PHOTO_CAP2[lang]}
                </div>
              </div>

              {/* Floating badge */}
              <div className="about-photo-badge" style={{
                position: 'absolute', top: -18, right: '18%',
                background: 'linear-gradient(135deg, #6BBF4A, #4DA832)',
                borderRadius: 18, padding: '14px 20px',
                boxShadow: '0 10px 30px rgba(107,191,74,0.52)',
                border: '3px solid #fff', zIndex: 3,
              }}>
                <div style={{
                  fontSize: 'clamp(1.6rem,3vw,2.2rem)',
                  fontWeight: 900, color: '#0A1F14',
                  lineHeight: 1, letterSpacing: '-0.04em',
                }}>15+</div>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: 'rgba(10,31,20,0.65)',
                  marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {YEARS_LBL[lang]}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ paddingTop: '0.5rem', paddingBottom: '1rem', order: isRTL ? 0 : 1 }}>
              <div className="about-tl-inner" style={{ position: 'relative', paddingLeft: isRTL ? 0 : 36, paddingRight: isRTL ? 36 : 0 }}>

                <div className="about-tl-line" style={{
                  position: 'absolute',
                  ...(isRTL ? { right: 7 } : { left: 7 }),
                  top: 8, bottom: '4rem',
                  width: 2,
                  background: 'linear-gradient(to bottom, #6BBF4A 0%, #1B6B5C 55%, #1A4E7A 85%, rgba(26,78,122,0.08) 100%)',
                  borderRadius: 99,
                }} />

                {TL_COLORS.map((block, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: i < 2 ? '2.5rem' : '1.5rem' }}>
                    <div className={isRTL ? 'about-tl-dot-rtl' : 'about-tl-dot'} style={{
                      position: 'absolute',
                      ...(isRTL ? { right: -36 } : { left: -36 }),
                      top: 2,
                      width: 18, height: 18, borderRadius: '50%',
                      background: block.color,
                      border: '3px solid #fff',
                      boxShadow: `0 0 0 2.5px ${block.shadow}`,
                    }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 800, color: block.color,
                        letterSpacing: '0.24em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>
                        {String(i + 1).padStart(2, '0')} — {TL_TITLES[lang][i]}
                      </span>
                      <div style={{
                        flex: 1, height: 1,
                        background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, ${block.color}55, transparent)`,
                        minWidth: 0,
                      }} />
                    </div>
                    <p style={{
                      color: '#4B5563',
                      fontSize: 'clamp(14px,1.45vw,15.5px)',
                      lineHeight: 1.95, margin: 0, fontWeight: 500,
                    }}>
                      {tlTexts[i]}
                    </p>
                  </div>
                ))}

                <div style={{
                  position: 'absolute',
                  ...(isRTL ? { right: -32 } : { left: -32 }),
                  bottom: '0.5rem',
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'rgba(27,67,50,0.15)', border: '2px solid #fff',
                }} />
              </div>

              {/* Mini stats */}
              <div className="about-mini-stats" style={{
                display: 'flex', gap: '2.2rem', flexWrap: 'wrap',
                paddingLeft: isRTL ? 0 : 36, paddingRight: isRTL ? 36 : 0,
                borderTop: '1px solid #F0EDE8', paddingTop: '1.75rem',
                marginTop: '1rem',
              }}>
                {[
                  { num: '50+',   lbl: MINI_STATS[lang][0] },
                  { num: '12',    lbl: MINI_STATS[lang][1] },
                  { num: '1000+', lbl: MINI_STATS[lang][2] },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: 'clamp(1.6rem,2.8vw,2.2rem)',
                      fontWeight: 900, color: '#0A1510',
                      letterSpacing: '-0.04em', lineHeight: 1,
                    }}>
                      {s.num}
                    </div>
                    <div style={{
                      fontSize: 10, color: '#9CA3AF', marginTop: 5,
                      fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Values ── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 10, fontWeight: 700, color: '#1B4332',
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 28, height: 1, background: 'rgba(27,67,50,0.25)', display: 'inline-block' }} />
              {VALS_TITLE[lang]}
              <span style={{ width: 28, height: 1, background: 'rgba(27,67,50,0.25)', display: 'inline-block' }} />
            </div>
          </div>

          <div className="about-vals-grid">
            {t.values.map((v, i) => {
              const ValIcon = VALUE_ICONS[i]
              return (
                <div key={i} className="val-card">
                  <div className="val-top-bar" style={{ background: VALUE_ACCENTS[i] }} />
                  <div style={{
                    position: 'absolute', top: 14, right: 18,
                    fontSize: 11, fontWeight: 800, lineHeight: 1,
                    color: VALUE_ACCENTS[i], opacity: 0.28,
                    letterSpacing: '0.08em',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 64, height: 64, borderRadius: 18,
                    background: `linear-gradient(135deg, ${VALUE_ACCENTS[i]}1c, ${VALUE_ACCENTS[i]}0a)`,
                    border: `1.5px solid ${VALUE_ACCENTS[i]}3a`,
                    color: VALUE_ACCENTS[i],
                    marginBottom: 22, position: 'relative',
                  }}>
                    <ValIcon size={28} strokeWidth={1.5} />
                  </div>
                  <div style={{
                    fontWeight: 800, color: '#111827', fontSize: 17,
                    marginBottom: 10, letterSpacing: '-0.02em',
                  }}>
                    {v.title}
                  </div>
                  <div style={{ color: '#5B6471', fontSize: 14, lineHeight: 1.82 }}>
                    {v.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── "Pourquoi nous choisir" strip ── */}
        <div style={{
          background: '#F8F7F4',
          borderTop: '1px solid #EDEAE4', borderBottom: '1px solid #EDEAE4',
          padding: 'clamp(2rem,4vw,3rem) 1.5rem',
        }}>
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontSize: 10, fontWeight: 700, color: '#1B4332',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              marginBottom: 'clamp(1rem,2vw,1.75rem)',
            }}>
              <span style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
              {WHY_TITLE[lang]}
              <span style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
            </div>
            <div className="cert-grid">
              {CERTS_DATA[lang].map((c, i) => {
                const CertIcon = CERT_ICONS[i]
                return (
                  <div key={i} className="cert-card">
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: 'linear-gradient(135deg, #0F2D1E, #1B4332)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#6BBF4A',
                      boxShadow: '0 4px 14px rgba(15,45,30,0.22)',
                      marginBottom: 14,
                    }}>
                      <CertIcon size={20} strokeWidth={1.7} />
                    </div>
                    <div style={{
                      fontWeight: 700, color: '#111827', fontSize: 13.5,
                      letterSpacing: '-0.01em', marginBottom: 5,
                    }}>
                      {c.label}
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: 11.5, lineHeight: 1.65 }}>
                      {c.sub}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Stats band ── */}
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem clamp(5rem,9vw,8rem)' }}>
          <div
            ref={statsRef}
            style={{
              background: 'linear-gradient(140deg, #071610 0%, #0F2D1E 55%, #1B4332 100%)',
              borderRadius: 24, overflow: 'hidden', position: 'relative',
              marginTop: 'clamp(3.5rem,5vw,5rem)',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            <div style={{
              position: 'absolute', top: '-60%', right: '-5%',
              width: 440, height: 440, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(107,191,74,0.1), transparent 65%)',
              pointerEvents: 'none',
            }} />

            <div className="about-stat-grid" style={{ position: 'relative' }}>
              {t.stats.map((s, i) => (
                <StatCell key={i} s={s} i={i} active={statsInView} />
              ))}
            </div>

            {/* Region tags */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: 'clamp(1rem,2vw,1.5rem) clamp(1.5rem,3vw,2.75rem)',
              position: 'relative',
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              gap: '0.6rem 1.25rem',
            }}>
              <span style={{
                fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>
                {CVG_LABEL[lang]}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {REGIONS.map(r => (
                  <span key={r} style={{
                    padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(107,191,74,0.1)',
                    border: '1px solid rgba(107,191,74,0.22)',
                    color: '#8EDB60', fontSize: 10, fontWeight: 700,
                  }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
