import { type Lang, translations } from '../i18n'

interface MarocMapProps { lang: Lang }

/*
 * City coordinates for the 2400×2400 viewBox of morocco-regions.svg.
 * Projection: x = 224 + (lon + 17) * 125.8
 *             y = 126 + (35.9 - lat) * 142.6
 */
const CITIES: {
  id: string; x: number; y: number; hq?: true
  label: Record<Lang, string>; right: boolean
}[] = [
  { id: 'tanger',      x: 1633, y: 152,  right: false,
    label: { fr: 'Tanger',      ar: 'طنجة',          en: 'Tangier'     } },
  { id: 'fes',         x: 1734, y: 394,  right: false,
    label: { fr: 'Fès',         ar: 'فاس',            en: 'Fes'         } },
  { id: 'oujda',       x: 2124, y: 297,  right: false,
    label: { fr: 'Oujda',       ar: 'وجدة',           en: 'Oujda'       } },
  { id: 'rabat',       x: 1503, y: 396,  right: false,
    label: { fr: 'Rabat',       ar: 'الرباط',         en: 'Rabat'       } },
  { id: 'casa',        x: 1408, y: 456,  right: true,
    label: { fr: 'Casablanca',  ar: 'الدار البيضاء',  en: 'Casablanca'  } },
  { id: 'jadida',      x: 1293, y: 505,  right: true,
    label: { fr: 'El Jadida',   ar: 'الجديدة',        en: 'El Jadida'   } },
  { id: 'beni_mellal', x: 1564, y: 635,  right: false,
    label: { fr: 'Béni Mellal', ar: 'بني ملال',       en: 'Beni Mellal' } },
  { id: 'marrakech',   x: 1356, y: 735,  right: false,
    label: { fr: 'Marrakech',   ar: 'مراكش',          en: 'Marrakech'   } },
  { id: 'agadir',      x: 1159, y: 907,  right: true, hq: true,
    label: { fr: 'Agadir',      ar: 'أكادير',         en: 'Agadir'      } },
  { id: 'ouarzazate',  x: 1495, y: 836,  right: false,
    label: { fr: 'Ouarzazate',  ar: 'ورزازات',        en: 'Ouarzazate'  } },
  { id: 'errachidia',  x: 1809, y: 692,  right: false,
    label: { fr: 'Errachidia',  ar: 'الراشيدية',      en: 'Errachidia'  } },
  { id: 'laayoune',    x: 702,  y: 1371, right: true,
    label: { fr: 'Laâyoune',    ar: 'العيون',         en: 'Laayoune'    } },
]

export default function MarocMap({ lang }: MarocMapProps) {
  const t = translations[lang].map

  const stats = [
    { value: t.stat1Value, label: t.stat1Label },
    { value: t.stat2Value, label: t.stat2Label },
    { value: t.stat3Value, label: t.stat3Label },
  ]

  return (
    <section style={{
      padding: 'clamp(4rem,8vw,7rem) 0',
      background: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(27,67,50,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div style={{ position: 'relative', maxWidth: 1140, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(27,67,50,0.07)', border: '1.5px solid rgba(27,67,50,0.2)',
            color: '#1B4332', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            borderRadius: 999, padding: '7px 18px', marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4332', display: 'inline-block' }} />
            {t.badge}
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, color: '#111827',
            margin: '0 0 .5rem', letterSpacing: '-0.03em',
          }}>{t.title}</h2>
          <div style={{
            width: 56, height: 4, borderRadius: 99,
            background: 'linear-gradient(90deg, #C9A96E, #1B4332)',
            margin: '14px auto 20px',
          }} />
          <p style={{
            color: '#6B7280', fontSize: 'clamp(14px,1.5vw,16px)',
            maxWidth: 560, margin: '0 auto', lineHeight: 1.75,
          }}>{t.subtitle}</p>
        </div>

        {/* ── Map + Stats ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 'clamp(2rem,5vw,5rem)',
          alignItems: 'center',
        }}>

          {/* ── Map: img base + overlay SVG for dots ── */}
          <div style={{ flex: '1 1 300px', maxWidth: 440, margin: '0 auto', position: 'relative' }}>
            <img
              src="/morocco-regions.svg"
              alt=""
              draggable={false}
              style={{ width: '100%', display: 'block', userSelect: 'none' }}
            />
            <svg
              viewBox="0 0 2400 2400"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
              aria-label="Carte du Maroc — Réseau GENOTEC SEEDS"
            >
              {CITIES.map((city, idx) => {
                const offset = 44
                const lx     = city.right ? city.x + offset : city.x - offset
                const anchor = city.right ? 'start' : 'end'
                const rInner = city.hq ? 34 : 22
                const rOuter = city.hq ? 100 : 70
                const dur    = city.hq ? '1.8s' : '2.6s'
                const begin  = `${idx * 0.18}s`

                return (
                  <g key={city.id}>
                    {/* Primary pulse ring */}
                    <circle cx={city.x} cy={city.y} r={rInner}
                      fill={city.hq ? 'rgba(201,169,110,0.4)' : 'rgba(27,67,50,0.25)'}>
                      <animate attributeName="r"
                        from={String(rInner)} to={String(rOuter)}
                        dur={dur} begin={begin} repeatCount="indefinite" />
                      <animate attributeName="opacity"
                        from="0.7" to="0"
                        dur={dur} begin={begin} repeatCount="indefinite" />
                    </circle>

                    {/* HQ second pulse ring */}
                    {city.hq && (
                      <circle cx={city.x} cy={city.y} r={34}
                        fill="rgba(201,169,110,0.22)">
                        <animate attributeName="r" from="34" to="140"
                          dur="2.8s" begin="0.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.55" to="0"
                          dur="2.8s" begin="0.6s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Solid dot */}
                    <circle
                      cx={city.x} cy={city.y} r={rInner}
                      fill={city.hq ? '#C9A96E' : '#1B4332'}
                      stroke="#fff"
                      strokeWidth={city.hq ? 7 : 4}
                    />

                    {/* HQ inner white dot */}
                    {city.hq && <circle cx={city.x} cy={city.y} r={10} fill="#fff" />}

                    {/* City label */}
                    <text
                      x={lx} y={city.y + 4}
                      fontSize={city.hq ? 75 : 60}
                      fontWeight={city.hq ? '800' : '600'}
                      fill={city.hq ? '#B8935A' : '#1B4332'}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                    >
                      {city.label[lang]}
                    </text>

                    {/* HQ sub-label */}
                    {city.hq && (
                      <text
                        x={lx} y={city.y + 90}
                        fontSize={50}
                        fontWeight="700"
                        fill="rgba(184,147,90,0.75)"
                        textAnchor={anchor}
                        dominantBaseline="middle"
                      >
                        {t.hqLabel}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* ── Stats + Legend + CTA ── */}
          <div style={{ flex: '1 1 280px' }}>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '18px 24px', borderRadius: 16,
                  background: '#F8F7F4',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900,
                    color: '#1B4332', letterSpacing: '-0.04em', lineHeight: 1,
                    flexShrink: 0, minWidth: 72,
                  }}>{stat.value}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: '#6B7280', lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              padding: '16px 20px', borderRadius: 14,
              background: 'rgba(27,67,50,0.04)',
              border: '1px solid rgba(27,67,50,0.1)',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: '#1B4332', border: '2px solid #fff',
                    boxShadow: '0 0 0 2px rgba(27,67,50,0.25)',
                  }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: '#374151' }}>
                    {t.legendCity}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: '#C9A96E', border: '2px solid #fff',
                    boxShadow: '0 0 0 2px rgba(201,169,110,0.35)',
                  }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1B4332' }}>
                    {t.legendHq}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#produits"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                color: '#0F2D1E', fontWeight: 800, fontSize: 14,
                padding: '14px 30px', borderRadius: 999,
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(201,169,110,0.4)',
                transition: 'all .25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(201,169,110,0.55)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,169,110,0.4)'
              }}
            >
              {t.cta}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
