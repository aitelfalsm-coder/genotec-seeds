import { useState, useMemo } from 'react'
import {
  TrendingUp, Calendar, Layers, FileText, Phone,
  ChevronDown, SlidersHorizontal, X, Award,
} from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface CatalogueProps { lang: Lang }

const PHOTOS = [
  'https://images.unsplash.com/photo-1741517287380-cf3a9ef75be1?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605800854006-85faa6220714?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563288525-8f1ee0f874a8?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633380110125-f6e685676160?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1741517480900-8bee5b4f48df?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1691009154594-c126d55eaaf2?w=600&h=400&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1757332914764-ca5a484c5fe1?w=600&h=400&q=85&auto=format&fit=crop',
]

const ACCENTS = [
  { main: '#C9503A', light: 'rgba(201,80,58,0.1)',   border: 'rgba(201,80,58,0.25)'  },
  { main: '#C97E2A', light: 'rgba(201,126,42,0.1)',  border: 'rgba(201,126,42,0.25)' },
  { main: '#B8935A', light: 'rgba(184,147,90,0.1)',  border: 'rgba(184,147,90,0.25)' },
  { main: '#1B6B45', light: 'rgba(27,107,69,0.1)',   border: 'rgba(27,107,69,0.25)'  },
  { main: '#D4792A', light: 'rgba(212,121,42,0.1)',  border: 'rgba(212,121,42,0.25)' },
  { main: '#5B7BC4', light: 'rgba(91,123,196,0.1)',  border: 'rgba(91,123,196,0.25)' },
  { main: '#8A6B35', light: 'rgba(138,107,53,0.1)',  border: 'rgba(138,107,53,0.25)' },
  { main: '#2A9060', light: 'rgba(42,144,96,0.1)',   border: 'rgba(42,144,96,0.25)'  },
]

interface ProductMeta {
  type: 'fruit-veg' | 'root' | 'cereal'
  cycle: 'short' | 'medium' | 'long'
  season: 'spring-summer' | 'summer-autumn' | 'autumn-winter' | 'all'
  resistances: ('virus' | 'mildew' | 'drought')[]
  rendement: string
  cycleLabel: Record<Lang, string>
  sol: Record<Lang, string>
  perfScore: number
  badges: Record<Lang, [string, string, string]>
}

const META: ProductMeta[] = [
  {
    type: 'fruit-veg', cycle: 'medium', season: 'summer-autumn',
    resistances: ['virus', 'mildew'], rendement: '80–100 T/ha', perfScore: 95,
    cycleLabel: { fr: '90–110 j', ar: '90–110 ي', en: '90–110 d' },
    sol: { fr: 'Limon-sableux', ar: 'طمي رملي', en: 'Sandy loam' },
    badges: {
      fr: ['Haut Rendement', 'Anti ToMV', 'Chair Ferme'],
      ar: ['إنتاجية عالية', 'مقاوم ToMV', 'لب صلب'],
      en: ['High Yield', 'ToMV Resistant', 'Firm Flesh'],
    },
  },
  {
    type: 'fruit-veg', cycle: 'medium', season: 'summer-autumn',
    resistances: ['virus', 'mildew'], rendement: '40–60 T/ha', perfScore: 88,
    cycleLabel: { fr: '90–100 j', ar: '90–100 ي', en: '90–100 d' },
    sol: { fr: 'Argilo-limoneux', ar: 'طمي طيني', en: 'Clay loam' },
    badges: {
      fr: ['Multicolore', 'Résistant PVY', 'Longue Conservation'],
      ar: ['متعدد الألوان', 'مقاوم PVY', 'طويل الحفظ'],
      en: ['Multicolor', 'PVY Resistant', 'Long Shelf Life'],
    },
  },
  {
    type: 'fruit-veg', cycle: 'short', season: 'spring-summer',
    resistances: ['mildew'], rendement: '30–50 T/ha', perfScore: 90,
    cycleLabel: { fr: '75–90 j', ar: '75–90 ي', en: '75–90 d' },
    sol: { fr: 'Sableux-limoneux', ar: 'رملي طمي', en: 'Sandy loam' },
    badges: {
      fr: ['Sucré Garanti', 'Anti-Mildiou', 'Précocité'],
      ar: ['حلاوة مضمونة', 'مقاوم للبياض', 'نضج مبكر'],
      en: ['Sweet Guaranteed', 'Anti-Mildew', 'Early Season'],
    },
  },
  {
    type: 'fruit-veg', cycle: 'medium', season: 'spring-summer',
    resistances: ['virus', 'drought'], rendement: '40–70 T/ha', perfScore: 92,
    cycleLabel: { fr: '80–100 j', ar: '80–100 ي', en: '80–100 d' },
    sol: { fr: 'Sableux léger', ar: 'رملي خفيف', en: 'Light sandy' },
    badges: {
      fr: ['Chair Croquante', 'Résistant Fusarium', 'Précoce & Tardif'],
      ar: ['لب مقرمش', 'مقاوم فيوزاريوم', 'مبكر ومتأخر'],
      en: ['Crunchy Flesh', 'Fusarium Resistant', 'Early & Late'],
    },
  },
  {
    type: 'root', cycle: 'medium', season: 'all',
    resistances: ['mildew'], rendement: '25–45 T/ha', perfScore: 87,
    cycleLabel: { fr: '75–110 j', ar: '75–110 ي', en: '75–110 d' },
    sol: { fr: 'Sableux-meuble', ar: 'رملي هش', en: 'Loose sandy' },
    badges: {
      fr: ['Calibre Uniforme', 'Haute Brix', 'Anti-Alternaria'],
      ar: ['حجم منتظم', 'بريكس عالية', 'مقاوم ألترناريا'],
      en: ['Uniform Caliber', 'High Brix', 'Alternaria Resistant'],
    },
  },
  {
    type: 'root', cycle: 'long', season: 'all',
    resistances: ['mildew', 'drought'], rendement: '35–55 T/ha', perfScore: 85,
    cycleLabel: { fr: '120–150 j', ar: '120–150 ي', en: '120–150 d' },
    sol: { fr: 'Riche en org.', ar: 'غني بالعضوية', en: 'Organic-rich' },
    badges: {
      fr: ['Longue Conservation', 'Anti-Mildiou', 'Belle Couleur'],
      ar: ['طويل الحفظ', 'مقاوم البياض', 'لون جميل'],
      en: ['Long Storage', 'Mildew Resistant', 'Fine Color'],
    },
  },
  {
    type: 'root', cycle: 'medium', season: 'autumn-winter',
    resistances: ['virus', 'mildew'], rendement: '25–40 T/ha', perfScore: 82,
    cycleLabel: { fr: '90–120 j', ar: '90–120 ي', en: '90–120 d' },
    sol: { fr: 'Limoneux-argileux', ar: 'طمي طيني', en: 'Silty clay' },
    badges: {
      fr: ['Résistant Mildiou', 'Haute Productivité', 'Polyvalent'],
      ar: ['مقاوم البياض', 'إنتاجية عالية', 'متعدد الاستخدام'],
      en: ['Mildew Resistant', 'High Productivity', 'Versatile'],
    },
  },
  {
    type: 'cereal', cycle: 'long', season: 'summer-autumn',
    resistances: ['drought'], rendement: '8–14 T/ha', perfScore: 80,
    cycleLabel: { fr: '120–150 j', ar: '120–150 ي', en: '120–150 d' },
    sol: { fr: 'Tous types', ar: 'جميع الأنواع', en: 'All soil types' },
    badges: {
      fr: ['Tolérant Sécheresse', 'Haut Rendement', 'Semi-Aride'],
      ar: ['متحمل للجفاف', 'إنتاجية عالية', 'شبه جاف'],
      en: ['Drought Tolerant', 'High Yield', 'Semi-Arid'],
    },
  },
]

type FilterDim = 'type' | 'cycle' | 'season' | 'resistance'

interface FilterState {
  type: string[]
  cycle: string[]
  season: string[]
  resistance: string[]
}

const EMPTY: FilterState = { type: [], cycle: [], season: [], resistance: [] }

export default function Catalogue({ lang }: CatalogueProps) {
  const t = translations[lang].catalogue
  const items = translations[lang].products.items

  const [filters, setFilters] = useState<FilterState>(EMPTY)
  const [openGroups, setOpenGroups] = useState({ type: true, cycle: true, season: true, resistance: true })
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const activeCount = Object.values(filters).flat().length

  const toggle = (dim: FilterDim, val: string) => {
    setFilters(prev => {
      const arr = [...prev[dim]]
      const idx = arr.indexOf(val)
      if (idx === -1) arr.push(val)
      else arr.splice(idx, 1)
      return { ...prev, [dim]: arr }
    })
  }

  const clearAll = () => setFilters(EMPTY)

  const filtered = useMemo(() =>
    META.map((m, i) => ({ m, i })).filter(({ m }) => {
      if (filters.type.length && !filters.type.includes(m.type)) return false
      if (filters.cycle.length && !filters.cycle.includes(m.cycle)) return false
      if (filters.season.length) {
        const ok = m.season === 'all' || filters.season.includes(m.season)
        if (!ok) return false
      }
      if (filters.resistance.length && !filters.resistance.some(r => m.resistances.includes(r as 'virus' | 'mildew' | 'drought'))) return false
      return true
    }),
    [filters]
  )

  const filterGroups: { key: FilterDim; label: string; options: { value: string; label: string }[] }[] = [
    {
      key: 'type',
      label: t.filterType,
      options: [
        { value: 'fruit-veg', label: t.typeFruitVeg },
        { value: 'root',      label: t.typeRoot      },
        { value: 'cereal',    label: t.typeCereal    },
      ],
    },
    {
      key: 'cycle',
      label: t.filterCycle,
      options: [
        { value: 'short',  label: t.cycleShort  },
        { value: 'medium', label: t.cycleMedium },
        { value: 'long',   label: t.cycleLong   },
      ],
    },
    {
      key: 'season',
      label: t.filterSeason,
      options: [
        { value: 'spring-summer',  label: t.seasonSpringSummer  },
        { value: 'summer-autumn',  label: t.seasonSummerAutumn  },
        { value: 'autumn-winter',  label: t.seasonAutumnWinter  },
        { value: 'all',            label: t.seasonAll           },
      ],
    },
    {
      key: 'resistance',
      label: t.filterResistance,
      options: [
        { value: 'virus',   label: t.resistVirus   },
        { value: 'mildew',  label: t.resistMildew  },
        { value: 'drought', label: t.resistDrought },
      ],
    },
  ]

  const typeLabel = (type: string) =>
    type === 'fruit-veg' ? t.typeFruitVeg : type === 'root' ? t.typeRoot : t.typeCereal

  const varLabel = filtered.length === 1
    ? (lang === 'fr' ? 'variété' : lang === 'ar' ? 'صنف' : 'variety')
    : (lang === 'fr' ? 'variétés' : lang === 'ar' ? 'أصناف' : 'varieties')

  const sidebar = (
    <aside style={{
      width: 256, flexShrink: 0,
      background: '#fff', borderRadius: 20,
      border: '1px solid rgba(0,0,0,0.07)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
      padding: '1.2rem',
      position: 'sticky', top: 96, height: 'fit-content',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <SlidersHorizontal size={15} strokeWidth={2} style={{ color: '#1B4332' }} />
          <span style={{ fontWeight: 800, fontSize: 13.5, color: '#111827' }}>{t.filtersTitle}</span>
          {activeCount > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 800,
              background: '#1B4332', color: '#fff',
              borderRadius: 999, padding: '1px 7px',
            }}>{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} style={{
            display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 11, fontWeight: 700, color: '#C9503A',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '2px 6px', borderRadius: 6,
          }}>
            <X size={10} strokeWidth={2.5} />{t.clearAll}
          </button>
        )}
      </div>

      {/* Active chips */}
      {activeCount > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {filterGroups.flatMap(g =>
            filters[g.key].map(val => {
              const opt = g.options.find(o => o.value === val)
              return opt ? (
                <button
                  key={`${g.key}-${val}`}
                  onClick={() => toggle(g.key, val)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 10, fontWeight: 700, color: '#1B4332',
                    background: 'rgba(27,67,50,0.08)', border: '1px solid rgba(27,67,50,0.2)',
                    borderRadius: 999, padding: '3px 8px', cursor: 'pointer',
                  }}
                >
                  {opt.label} <X size={8} strokeWidth={2.5} />
                </button>
              ) : null
            })
          )}
        </div>
      )}

      <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', marginBottom: 12 }} />

      {/* Groups */}
      {filterGroups.map(group => (
        <div key={group.key} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpenGroups(p => ({ ...p, [group.key]: !p[group.key] }))}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 0',
            }}
          >
            <span style={{
              fontSize: 10.5, fontWeight: 800, color: '#374151',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{group.label}</span>
            <ChevronDown
              size={13} strokeWidth={2} style={{
                color: '#9CA3AF',
                transform: openGroups[group.key] ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform .2s',
              }}
            />
          </button>

          {openGroups[group.key] && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 6 }}>
              {group.options.map(opt => {
                const checked = filters[group.key].includes(opt.value)
                return (
                  <label key={opt.value} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    cursor: 'pointer', padding: '5px 7px', borderRadius: 8,
                    background: checked ? 'rgba(27,67,50,0.06)' : 'transparent',
                    transition: 'background .15s',
                  }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(group.key, opt.value)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      border: `2px solid ${checked ? '#1B4332' : 'rgba(0,0,0,0.2)'}`,
                      background: checked ? '#1B4332' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .15s',
                    }}>
                      {checked && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span style={{
                      fontSize: 12.5, fontWeight: checked ? 700 : 500,
                      color: checked ? '#1B4332' : '#6B7280',
                    }}>{opt.label}</span>
                  </label>
                )
              })}
            </div>
          )}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />
        </div>
      ))}
    </aside>
  )

  return (
    <>
      <style>{`
        @keyframes catIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-card {
          transition: transform .3s ease, box-shadow .3s ease;
          animation: catIn .4s ease both;
        }
        .cat-card:hover { transform: translateY(-7px); box-shadow: 0 28px 60px rgba(0,0,0,0.15) !important; }
        .cat-photo { transition: transform .45s ease; display: block; }
        .cat-card:hover .cat-photo { transform: scale(1.07); }

        /* Spec overlay slides DOWN from image top on hover */
        .cat-spec-overlay {
          position: absolute; top: 0; left: 0; right: 0;
          background: linear-gradient(to bottom, rgba(8,20,14,0.95) 0%, rgba(8,20,14,0.72) 70%, transparent 100%);
          padding: 12px 10px 22px;
          display: flex; gap: 6px;
          transform: translateY(-100%); opacity: 0;
          transition: transform .34s cubic-bezier(0.4,0,0.2,1), opacity .28s ease;
        }
        .cat-card:hover .cat-spec-overlay { transform: translateY(0); opacity: 1; }

        .cat-spec-cell {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 7px 4px;
        }

        /* CTA buttons in card footer */
        .cat-cta-pdf { transition: background .2s, color .2s; }
        .cat-cta-expert { transition: box-shadow .2s, transform .2s; }

        /* Layout */
        .cat-layout { display: flex; gap: 24px; align-items: flex-start; }
        .cat-sidebar-el { display: block; }
        .cat-mobile-bar { display: none; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(238px, 1fr));
          gap: 20px;
        }

        @media (max-width: 900px) {
          .cat-layout { flex-direction: column; }
          .cat-sidebar-el { display: none; }
          .cat-sidebar-el.open { display: block; width: 100%; position: static; }
          .cat-mobile-bar { display: flex; }
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 500px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="produits" style={{
        padding: 'clamp(4rem,8vw,7rem) 0 clamp(3rem,6vw,5rem)',
        background: '#F8F7F4',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(27,67,50,0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div style={{
          position: 'absolute', top: -140, right: -140, width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -120, width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(27,67,50,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>

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

          {/* ── Mobile filter bar ── */}
          <div className="cat-mobile-bar">
            <button
              onClick={() => setMobileSidebarOpen(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: mobileSidebarOpen ? '#1B4332' : '#fff',
                color: mobileSidebarOpen ? '#fff' : '#374151',
                border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 999, padding: '10px 20px',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              }}
            >
              <SlidersHorizontal size={14} strokeWidth={2} />
              {t.filtersTitle}
              {activeCount > 0 && (
                <span style={{
                  fontSize: 10, fontWeight: 800,
                  background: mobileSidebarOpen ? 'rgba(255,255,255,0.28)' : '#1B4332',
                  color: '#fff', borderRadius: 999, padding: '1px 7px',
                }}>{activeCount}</span>
              )}
            </button>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>
              {filtered.length} / {META.length}
            </span>
          </div>

          {/* ── Main layout ── */}
          <div className="cat-layout">

            {/* Sidebar */}
            <div className={`cat-sidebar-el${mobileSidebarOpen ? ' open' : ''}`}>
              {sidebar}
            </div>

            {/* Cards area */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Results bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 16,
              }}>
                <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 600 }}>
                  <span style={{ fontWeight: 800, color: '#111827' }}>{filtered.length}</span> {varLabel}
                </span>
                {activeCount > 0 && (
                  <button onClick={clearAll} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11.5, fontWeight: 700, color: '#C9503A',
                    background: 'rgba(201,80,58,0.08)', border: '1px solid rgba(201,80,58,0.2)',
                    borderRadius: 999, padding: '5px 13px', cursor: 'pointer',
                  }}>
                    <X size={11} strokeWidth={2.5} />{t.clearAll}
                  </button>
                )}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  background: '#fff', borderRadius: 20,
                  border: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>🌱</div>
                  <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 18px' }}>{t.noResults}</p>
                  <button onClick={clearAll} style={{
                    fontSize: 13, fontWeight: 700, color: '#1B4332',
                    background: 'rgba(27,67,50,0.08)', border: 'none',
                    borderRadius: 999, padding: '10px 24px', cursor: 'pointer',
                  }}>{t.clearAll}</button>
                </div>
              )}

              {/* ── Cards grid ── */}
              <div className="cat-grid">
                {filtered.map(({ m, i }, idx) => {
                  const accent = ACCENTS[i]
                  const item = items[i]
                  const badges = m.badges[lang]
                  const filterKey = Object.values(filters).flat().sort().join('|')
                  return (
                    <div
                      key={`${filterKey}-${i}`}
                      className="cat-card"
                      style={{
                        background: '#fff', borderRadius: 20, overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.07)',
                        display: 'flex', flexDirection: 'column',
                        animationDelay: `${idx * 55}ms`,
                      }}
                    >
                      {/* ── Photo banner ── */}
                      <div style={{
                        position: 'relative', height: 210,
                        overflow: 'hidden', background: '#E5E7EB', flexShrink: 0,
                      }}>
                        <img
                          src={PHOTOS[i]}
                          alt={item.name}
                          className="cat-photo"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />

                        {/* Permanent bottom gradient */}
                        <div style={{
                          position: 'absolute', inset: 0, pointerEvents: 'none',
                          background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.68) 100%)',
                        }} />

                        {/* Category badge — top left */}
                        <div style={{
                          position: 'absolute', top: 10, left: 10,
                          background: accent.main, color: '#fff',
                          fontSize: 9, fontWeight: 800, letterSpacing: '0.07em',
                          textTransform: 'uppercase', borderRadius: 8, padding: '3px 9px',
                        }}>
                          {typeLabel(m.type)}
                        </div>

                        {/* Performance score — top right */}
                        <div style={{
                          position: 'absolute', top: 10, right: 10,
                          background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)',
                          borderRadius: 999, padding: '3px 9px',
                          fontSize: 9, fontWeight: 800, color: '#C9A96E',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}>
                          <Award size={9} strokeWidth={2.5} style={{ color: '#C9A96E' }} />
                          {m.perfScore}%
                        </div>

                        {/* Hover spec overlay — slides from top */}
                        <div className="cat-spec-overlay">
                          {([
                            { Icon: TrendingUp, label: t.rendement,  value: m.rendement       },
                            { Icon: Calendar,   label: t.cycleLabel, value: m.cycleLabel[lang] },
                            { Icon: Layers,     label: t.solLabel,   value: m.sol[lang]        },
                          ] as const).map(({ Icon, label, value }, ci) => (
                            <div key={ci} className="cat-spec-cell">
                              <Icon size={13} strokeWidth={1.8} style={{ color: '#C9A96E', flexShrink: 0 }} />
                              <span style={{
                                fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                                textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center',
                              }}>{label}</span>
                              <span style={{
                                fontSize: 10, fontWeight: 800, color: '#fff',
                                textAlign: 'center', lineHeight: 1.2,
                              }}>{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Product name — always visible at bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
                          <h3 style={{
                            fontWeight: 800, fontSize: 'clamp(15px,1.6vw,18px)',
                            color: '#fff', margin: 0, letterSpacing: '-0.01em',
                            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                          }}>{item.name}</h3>
                        </div>
                      </div>

                      {/* ── Card body ── */}
                      <div style={{ padding: '1rem 1.1rem .9rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <p style={{ color: '#6B7280', fontSize: 12.5, margin: '0 0 12px', lineHeight: 1.65 }}>
                          {item.desc}
                        </p>

                        {/* Performance bar */}
                        <div style={{ marginBottom: 12 }}>
                          <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginBottom: 5,
                          }}>
                            <span style={{
                              fontSize: 9.5, fontWeight: 700, color: '#9CA3AF',
                              letterSpacing: '0.07em', textTransform: 'uppercase',
                            }}>{t.perfLabel}</span>
                            <span style={{ fontSize: 11, fontWeight: 800, color: accent.main }}>
                              {m.perfScore}%
                            </span>
                          </div>
                          <div style={{
                            height: 5, borderRadius: 999,
                            background: 'rgba(0,0,0,0.07)', overflow: 'hidden',
                          }}>
                            <div style={{
                              height: '100%', borderRadius: 999,
                              background: `linear-gradient(90deg, ${accent.main}88, ${accent.main})`,
                              width: `${m.perfScore}%`,
                            }} />
                          </div>
                        </div>

                        {/* Performance badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                          {badges.map((badge, bi) => (
                            <span key={bi} style={{
                              display: 'inline-flex', alignItems: 'center', gap: 3,
                              fontSize: 9, fontWeight: 700,
                              letterSpacing: '0.06em', textTransform: 'uppercase',
                              whiteSpace: 'nowrap', padding: '3px 8px', borderRadius: 999,
                              background: bi === 0 ? accent.light : 'rgba(0,0,0,0.04)',
                              color: bi === 0 ? accent.main : '#9CA3AF',
                              border: `1px solid ${bi === 0 ? accent.border : 'rgba(0,0,0,0.08)'}`,
                            }}>
                              {bi === 0 && (
                                <span style={{
                                  width: 4, height: 4, borderRadius: '50%',
                                  background: accent.main, flexShrink: 0,
                                }} />
                              )}
                              {badge}
                            </span>
                          ))}
                        </div>

                        <div style={{ flex: 1 }} />

                        {/* ── CTA row ── */}
                        <div style={{
                          display: 'flex', gap: 7,
                          paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.07)',
                        }}>
                          <a
                            href="#contact"
                            className="cat-cta-pdf"
                            style={{
                              flex: 1, display: 'inline-flex', alignItems: 'center',
                              justifyContent: 'center', gap: 5,
                              fontSize: 10.5, fontWeight: 700, padding: '8px 10px',
                              borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap',
                              background: accent.light, color: accent.main,
                              border: `1.5px solid ${accent.border}`,
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = accent.main
                              e.currentTarget.style.color = '#fff'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = accent.light
                              e.currentTarget.style.color = accent.main
                            }}
                          >
                            <FileText size={11} strokeWidth={2} />
                            {t.ctaPdf}
                          </a>
                          <a
                            href="#contact"
                            className="cat-cta-expert"
                            style={{
                              display: 'inline-flex', alignItems: 'center',
                              justifyContent: 'center', gap: 5,
                              fontSize: 10.5, fontWeight: 700, padding: '8px 13px',
                              borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap',
                              background: 'linear-gradient(135deg, #1B4332, #0F2D1E)',
                              color: '#fff',
                              boxShadow: '0 4px 12px rgba(27,67,50,0.25)',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.boxShadow = '0 8px 22px rgba(27,67,50,0.4)'
                              e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(27,67,50,0.25)'
                              e.currentTarget.style.transform = 'translateY(0)'
                            }}
                          >
                            <Phone size={11} strokeWidth={2} />
                            {t.ctaExpert}
                          </a>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div style={{
                        height: 3,
                        background: `linear-gradient(90deg, ${accent.main}, ${accent.main}44)`,
                      }} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── CTA band ── */}
          <div style={{
            marginTop: 'clamp(2.5rem,5vw,4rem)',
            background: 'linear-gradient(140deg, #071610 0%, #0F2D1E 55%, #1B4332 100%)',
            borderRadius: 24,
            padding: 'clamp(1.75rem,4vw,3rem) clamp(1.5rem,4vw,3.5rem)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }} />
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 320, height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(201,169,110,0.14)', border: '1px solid rgba(201,169,110,0.28)',
                borderRadius: 999, padding: '5px 14px',
                fontSize: 10, fontWeight: 700, color: '#C9A96E',
                letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A96E', display: 'inline-block' }} />
                GENOTEC SEEDS
              </div>
              <div style={{
                fontSize: 'clamp(1.2rem,2.8vw,1.85rem)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>{t.ctaBandTitle}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', marginTop: 9 }}>
                {t.ctaBandSub}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.18)',
                  color: '#fff', fontWeight: 700, fontSize: 13,
                  padding: '14px 26px', borderRadius: 999,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)', transition: 'all .25s', minHeight: 50,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {t.ctaBandBtn1}
              </a>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                  color: '#0F2D1E', fontWeight: 800, fontSize: 14,
                  padding: '14px 32px', borderRadius: 999,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 8px 32px rgba(201,169,110,0.45)',
                  transition: 'all .25s', minHeight: 50,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 18px 44px rgba(201,169,110,0.55)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,169,110,0.45)'
                }}
              >
                <Phone size={16} strokeWidth={2.5} />
                {t.ctaBandBtn2}
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
