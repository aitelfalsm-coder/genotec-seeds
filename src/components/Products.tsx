import { useState } from 'react'
import { Leaf, Sprout, Truck, ShieldCheck, ArrowRight, Star } from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface ProductsProps { lang: Lang }

const PRODUCT_PHOTOS = [
  'https://images.unsplash.com/photo-1741517287380-cf3a9ef75be1?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605800854006-85faa6220714?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563288525-8f1ee0f874a8?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633380110125-f6e685676160?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1741517480900-8bee5b4f48df?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1691009154594-c126d55eaaf2?w=480&h=320&q=82&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1757332914764-ca5a484c5fe1?w=480&h=320&q=82&auto=format&fit=crop',
]

const PRODUCT_FEATURES: Record<Lang, string[][]> = {
  fr: [
    ['F1 Hybride', 'Haut rendement', 'Anti-virus'],
    ['F1 Hybride', 'Multicolore', 'Résistant'],
    ['F1 Hybride', 'Juteux', 'Précoce'],
    ['Précoce & tardif', 'Chair ferme', 'F1 Hybride'],
    ['Uniforme', 'Belle couleur', 'Sans fissure'],
    ['Longue conservation', 'Ferme', 'Certifié'],
    ['Adaptée Maroc', 'Rustique', 'Bonne conservation'],
    ['Semi-aride', 'Haut rendement', 'Robuste'],
  ],
  ar: [
    ['هجينة F1', 'إنتاجية عالية', 'مضاد للفيروسات'],
    ['هجينة F1', 'متعدد الألوان', 'مقاوم'],
    ['هجينة F1', 'عصيري', 'مبكر'],
    ['مبكر ومتأخر', 'لب صلب', 'هجينة F1'],
    ['منتظم', 'لون جميل', 'بدون تشقق'],
    ['طويل الحفظ', 'صلب', 'معتمد'],
    ['متكيف مغربي', 'متحمل', 'حفظ جيد'],
    ['شبه جاف', 'إنتاجية عالية', 'قوي'],
  ],
  en: [
    ['F1 Hybrid', 'High yield', 'Virus-resistant'],
    ['F1 Hybrid', 'Multicolor', 'Disease-resistant'],
    ['F1 Hybrid', 'Juicy', 'Early season'],
    ['Early & late', 'Firm flesh', 'F1 Hybrid'],
    ['Uniform', 'Vibrant color', 'No cracking'],
    ['Long shelf life', 'Firm', 'Certified'],
    ['Morocco-adapted', 'Robust', 'Good storage'],
    ['Semi-arid', 'High yield', 'Hardy'],
  ],
}

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

const PRODUCT_CATS = ['fruit-veg', 'fruit-veg', 'fruit-veg', 'fruit-veg', 'root', 'root', 'root', 'cereal']

const SEASONS: Record<Lang, string[]> = {
  fr: ['Été–Automne', 'Été–Automne', 'Printemps–Été', 'Printemps–Été', 'Toute saison', 'Toute saison', 'Automne–Hiver', 'Été'],
  ar: ['صيف–خريف', 'صيف–خريف', 'ربيع–صيف', 'ربيع–صيف', 'طوال العام', 'طوال العام', 'خريف–شتاء', 'صيف'],
  en: ['Summer–Autumn', 'Summer–Autumn', 'Spring–Summer', 'Spring–Summer', 'All season', 'All season', 'Autumn–Winter', 'Summer'],
}

const POPULAR = new Set([0, 2])

const TRUST_ITEMS = [
  { Icon: ShieldCheck, fr: 'Semences certifiées', ar: 'بذور معتمدة',   en: 'Certified seeds'     },
  { Icon: Sprout,      fr: 'Hybrides F1',         ar: 'هجينة F1',       en: 'F1 Hybrids'          },
  { Icon: Truck,       fr: 'Livraison nationale', ar: 'توصيل وطني',     en: 'Nationwide delivery' },
  { Icon: Leaf,        fr: 'Sélection rigoureuse',ar: 'انتقاء صارم',    en: 'Rigorous selection'  },
]

const CAT_LABELS: Record<Lang, { all: string; 'fruit-veg': string; root: string; cereal: string }> = {
  fr: { all: 'Tous',  'fruit-veg': 'Légumes-Fruits',   root: 'Racines & Bulbes', cereal: 'Céréales'  },
  ar: { all: 'الكل', 'fruit-veg': 'خضروات',             root: 'جذور وبصل',        cereal: 'حبوب'      },
  en: { all: 'All',  'fruit-veg': 'Fruit Vegetables',  root: 'Roots & Bulbs',    cereal: 'Cereals'   },
}

const UI: Record<Lang, {
  devis: string; popular: string; available: string
  certified: string; askDevis: string; ctaSub: string
  contactBtn: string
}> = {
  fr: {
    devis: 'Devis', popular: 'Top', available: 'Disponible', certified: 'Certifié',
    askDevis: 'Demander un devis',
    ctaSub: 'Disponible partout au Maroc',
    contactBtn: 'Nous contacter',
  },
  ar: {
    devis: 'طلب', popular: 'شائع', available: 'متاح', certified: 'معتمد',
    askDevis: 'طلب عرض سعر',
    ctaSub: 'متوفر في جميع أنحاء المغرب',
    contactBtn: 'تواصل معنا',
  },
  en: {
    devis: 'Quote', popular: 'Top', available: 'Available', certified: 'Certified',
    askDevis: 'Request a quote',
    ctaSub: 'Available across Morocco',
    contactBtn: 'Contact us',
  },
}

export default function Products({ lang }: ProductsProps) {
  const t = translations[lang].products
  const ui = UI[lang]
  const [activeFilter, setActiveFilter] = useState('all')

  const catLabels = CAT_LABELS[lang]
  const cats = [
    { id: 'all',       label: catLabels.all,          count: t.items.length },
    { id: 'fruit-veg', label: catLabels['fruit-veg'], count: PRODUCT_CATS.filter(c => c === 'fruit-veg').length },
    { id: 'root',      label: catLabels.root,         count: PRODUCT_CATS.filter(c => c === 'root').length },
    { id: 'cereal',    label: catLabels.cereal,       count: PRODUCT_CATS.filter(c => c === 'cereal').length },
  ]

  const filteredItems = t.items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => activeFilter === 'all' || PRODUCT_CATS[i] === activeFilter)

  return (
    <>
      <style>{`
        @keyframes bannerZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .prod-card {
          transition: transform .3s ease, box-shadow .3s ease;
          cursor: default;
          animation: cardIn .35s ease both;
        }
        .prod-card:hover { transform: translateY(-8px); box-shadow: 0 28px 60px rgba(0,0,0,0.14) !important; }
        .prod-card:hover .prod-banner-img { animation: bannerZoom .4s ease forwards; }

        .prod-hover-cta {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 10px 14px 12px;
          background: linear-gradient(to top, rgba(10,30,20,0.96) 0%, rgba(10,30,20,0.6) 65%, transparent 100%);
          transform: translateY(100%); opacity: 0;
          transition: all .32s ease;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .prod-card:hover .prod-hover-cta { transform: translateY(0); opacity: 1; }
        @media (hover: none) {
          .prod-hover-cta { transform: translateY(0) !important; opacity: 1 !important; }
        }

        .prod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 22px;
          margin-bottom: 4rem;
        }

        .filter-tab {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all .22s ease; white-space: nowrap; font-family: inherit;
        }
        .filter-tab:hover { transform: translateY(-1px); }

        .trust-strip {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
          margin-bottom: clamp(1.5rem,3.5vw,2.25rem);
        }
        .trust-item {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1px solid rgba(27,67,50,0.12);
          border-radius: 999px; padding: 7px 14px;
          font-size: 12px; font-weight: 600; color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: box-shadow .2s, transform .2s;
        }
        .trust-item:hover { box-shadow: 0 4px 16px rgba(27,67,50,0.12); transform: translateY(-1px); }

        .products-cta-band {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between; gap: 1.5rem;
        }
        .cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        @media (max-width: 640px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .prod-card .prod-banner { height: 140px !important; }
          .prod-card .prod-body { padding: 0.85rem !important; }
          .products-cta-band { flex-direction: column; align-items: flex-start; }
          .cta-btns { width: 100%; }
          .cta-btns a { flex: 1; justify-content: center; }
          .trust-item { font-size: 11px; padding: 6px 11px; }
          .filter-tab { padding: 8px 13px; font-size: 12px; }
        }
        @media (max-width: 380px) {
          .prod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="produits" style={{
        padding: 'clamp(4rem,8vw,7rem) 0 clamp(3rem,6vw,5rem)',
        background: '#F8F7F4',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Background dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(27,67,50,0.045) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div style={{
          position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -100, width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(27,67,50,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1140, margin: '0 auto', padding: '0 1.25rem' }}>

          {/* ── Section header ── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.75rem,3.5vw,2.75rem)' }}>
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
            }}>
              {t.title}
            </h2>
            <div style={{
              width: 56, height: 4, borderRadius: 99,
              background: 'linear-gradient(90deg, #C9A96E, #1B4332)',
              margin: '14px auto 20px',
            }} />
            <p style={{
              color: '#6B7280', fontSize: 'clamp(14px,1.5vw,16px)',
              maxWidth: 540, margin: '0 auto', lineHeight: 1.75,
            }}>
              {t.subtitle}
            </p>
          </div>

          {/* ── Trust strip ── */}
          <div className="trust-strip">
            {TRUST_ITEMS.map((item, idx) => {
              const TrustIcon = item.Icon
              return (
                <div key={idx} className="trust-item">
                  <TrustIcon size={13} strokeWidth={2} style={{ color: '#1B4332', flexShrink: 0 }} />
                  {item[lang]}
                </div>
              )
            })}
          </div>

          {/* ── Category filter tabs ── */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: 'clamp(1.75rem,3.5vw,2.75rem)',
          }}>
            {cats.map(cat => {
              const active = activeFilter === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className="filter-tab"
                  style={{
                    background: active ? 'linear-gradient(135deg, #0F2D1E, #1B4332)' : '#fff',
                    color: active ? '#fff' : '#6B7280',
                    border: `1.5px solid ${active ? 'transparent' : 'rgba(0,0,0,0.1)'}`,
                    boxShadow: active ? '0 4px 20px rgba(27,67,50,0.28)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {cat.label}
                  <span style={{
                    fontSize: 10, fontWeight: 800, lineHeight: 1,
                    background: active ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.07)',
                    color: active ? '#fff' : '#9CA3AF',
                    padding: '2px 7px', borderRadius: 999,
                  }}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Cards grid ── */}
          <div className="prod-grid">
            {filteredItems.map(({ item, i }, filteredIdx) => {
              const accent = ACCENTS[i]
              const features = PRODUCT_FEATURES[lang][i]
              const season = SEASONS[lang][i]
              const isPopular = POPULAR.has(i)
              return (
                <div
                  key={`${activeFilter}-${i}`}
                  className="prod-card"
                  style={{
                    background: '#fff', borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: `1px solid ${isPopular ? accent.border : 'rgba(0,0,0,0.06)'}`,
                    position: 'relative',
                    animationDelay: `${filteredIdx * 55}ms`,
                  }}
                >
                  {/* ── Photo banner ── */}
                  <div
                    className="prod-banner"
                    style={{ position: 'relative', height: 192, overflow: 'hidden', background: '#E5E7EB' }}
                  >
                    <img
                      src={PRODUCT_PHOTOS[i]}
                      alt={item.name}
                      className="prod-banner-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.56) 100%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Top-left: index + popular badge */}
                    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5, alignItems: 'center' }}>
                      <div style={{
                        background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)',
                        borderRadius: 8, padding: '3px 8px',
                        fontSize: 10, fontWeight: 800,
                        color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em',
                      }}>
                        #{String(i + 1).padStart(2, '0')}
                      </div>
                      {isPopular && (
                        <div style={{
                          background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                          borderRadius: 8, padding: '3px 9px',
                          fontSize: 9, fontWeight: 800, color: '#0F2D1E',
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          display: 'flex', alignItems: 'center', gap: 3,
                        }}>
                          <Star size={8} strokeWidth={2.5} style={{ fill: '#0F2D1E' }} />
                          {ui.popular}
                        </div>
                      )}
                    </div>

                    {/* Top-right: season badge */}
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)',
                      borderRadius: 999, padding: '3px 9px',
                      fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.88)',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent.main, display: 'inline-block', flexShrink: 0 }} />
                      {season}
                    </div>

                    {/* Product name at bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
                      <h3 style={{
                        fontWeight: 800, fontSize: 'clamp(15px,1.8vw,18px)',
                        color: '#fff', margin: 0, letterSpacing: '-0.01em',
                        textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                      }}>
                        {item.name}
                      </h3>
                    </div>

                    {/* Hover-reveal CTA */}
                    <div className="prod-hover-cta">
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                        {ui.askDevis}
                      </span>
                      <a
                        href="#contact"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: 'linear-gradient(135deg, #C9A96E, #B8935A)',
                          color: '#0F2D1E', fontWeight: 800, fontSize: 11,
                          padding: '6px 12px', borderRadius: 999,
                          textDecoration: 'none', whiteSpace: 'nowrap',
                          boxShadow: '0 3px 12px rgba(201,169,110,0.5)', flexShrink: 0,
                        }}
                      >
                        {ui.devis} <ArrowRight size={11} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="prod-body" style={{ padding: '1rem 1.2rem 1.1rem' }}>
                    <p style={{ color: '#6B7280', fontSize: 12.5, margin: '0 0 12px', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>

                    {/* Feature tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                      {features.map((feat, fi) => (
                        <span
                          key={fi}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            fontSize: 9, fontWeight: 700,
                            letterSpacing: '0.07em', textTransform: 'uppercase',
                            padding: '3px 8px', borderRadius: 999,
                            background: fi === 0 ? accent.light : 'rgba(0,0,0,0.04)',
                            color: fi === 0 ? accent.main : '#9CA3AF',
                            border: `1px solid ${fi === 0 ? accent.border : 'rgba(0,0,0,0.08)'}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {fi === 0 && (
                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent.main, display: 'inline-block', flexShrink: 0 }} />
                          )}
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Status row */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.06)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{
                          width: 7, height: 7, borderRadius: '50%', background: '#22C55E',
                          display: 'inline-block', flexShrink: 0,
                          boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
                        }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>
                          {ui.available}
                        </span>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: accent.main,
                        background: accent.light, border: `1px solid ${accent.border}`,
                        padding: '2px 8px', borderRadius: 999,
                      }}>
                        {ui.certified}
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${accent.main}, ${accent.main}44)` }} />
                </div>
              )
            })}
          </div>

          {/* ── CTA band ── */}
          <div style={{
            background: 'linear-gradient(140deg, #071610 0%, #0F2D1E 55%, #1B4332 100%)',
            borderRadius: 24,
            padding: 'clamp(1.75rem,4vw,3rem) clamp(1.5rem,4vw,3.5rem)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }} />
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            <div className="products-cta-band">
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
                }}>
                  {t.cta}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', marginTop: 9, fontWeight: 500 }}>
                  {ui.ctaSub}
                </div>
              </div>

              <div className="cta-btns">
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.18)',
                    color: '#fff', fontWeight: 700, fontSize: 13,
                    padding: '14px 26px', borderRadius: 999,
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'all .25s', minHeight: 50,
                    backdropFilter: 'blur(8px)',
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
                  {ui.contactBtn}
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
                    letterSpacing: '0.01em',
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
                  {t.cta} <ArrowRight size={16} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
