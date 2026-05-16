import { ShieldCheck, TrendingUp, Timer, Thermometer, Award, Sprout, ArrowRight, FlaskConical } from 'lucide-react'
import { type Lang } from '../i18n'

interface SeedFeaturesProps { lang: Lang }

const SECTION_LABEL: Record<Lang, string> = {
  fr: 'Critères de sélection variétale',
  ar: 'معايير الانتقاء الصنفي',
  en: 'Varietal selection criteria',
}
const SECTION_TITLE: Record<Lang, string> = {
  fr: 'Ce qui distingue nos semences',
  ar: 'ما يميّز بذورنا',
  en: 'What sets our seeds apart',
}
const SECTION_SUB: Record<Lang, string> = {
  fr: 'Chaque variété passe par un protocole de sélection rigoureux — tests terrain, analyse génétique, validation agronomique — avant d\'intégrer notre catalogue.',
  ar: 'يخضع كل صنف لبروتوكول انتقاء صارم — اختبارات ميدانية وتحليل جيني ومصادقة زراعية — قبل إدراجه في كتالوجنا.',
  en: 'Every variety undergoes a rigorous selection protocol — field tests, genetic analysis, agronomic validation — before joining our catalogue.',
}
const CTA_LABEL: Record<Lang, string> = {
  fr: 'Demander le catalogue complet',
  ar: 'طلب الكتالوج الكامل',
  en: 'Request the full catalogue',
}
const CTA_SUB: Record<Lang, string> = {
  fr: 'Fiches techniques détaillées disponibles sur demande',
  ar: 'البيانات التقنية التفصيلية متاحة عند الطلب',
  en: 'Detailed technical sheets available on request',
}

const FEATURES: Record<Lang, { title: string; desc: string; badge: string; metric: string }[]> = {
  fr: [
    { title: 'Résistance aux maladies',   desc: 'Protection renforcée contre les agents pathogènes courants du terroir marocain.',                       badge: 'Certifié',     metric: '9/10' },
    { title: 'Rendement optimisé',        desc: 'Potentiel de production supérieur à la moyenne sectorielle sur les principales cultures.',              badge: '+30 – 40 %',  metric: '+38%' },
    { title: 'Précocité variétale',       desc: 'Cycles de croissance calibrés pour s\'adapter aux fenêtres climatiques de chaque région.',              badge: 'Rapide',       metric: '–18 j' },
    { title: 'Tolérance climatique',      desc: 'Robustesse face aux stress thermiques et hydriques des zones semi-arides marocaines.',                  badge: 'Multi-zones',  metric: '12 rég.' },
    { title: 'Qualité marchande',         desc: 'Calibre, couleur et goût conformes aux exigences des marchés locaux et à l\'export.',                   badge: 'Premium',      metric: 'Grade A' },
    { title: 'Germination garantie',      desc: 'Taux minimum contrôlé à chaque lot de production, conforme aux normes nationales en vigueur.',          badge: '≥ 95 %',      metric: '≥ 95%' },
  ],
  ar: [
    { title: 'مقاومة الأمراض',      desc: 'حماية معززة ضد الممرضات الشائعة في التربة المغربية.',                        badge: 'معتمد',          metric: '9/10' },
    { title: 'إنتاجية محسّنة',      desc: 'إمكانية إنتاج تفوق المتوسط القطاعي في المحاصيل الرئيسية.',                  badge: '+30 – 40%',     metric: '+38%' },
    { title: 'نضج مبكر',            desc: 'دورات نمو مُعايَرة تتكيف مع النوافذ المناخية لكل منطقة.',                   badge: 'سريع',           metric: '–18 ي' },
    { title: 'تحمل مناخي',          desc: 'صلابة أمام الإجهاد الحراري والمائي في المناطق المغربية شبه الجافة.',        badge: 'متعدد المناطق', metric: '12 منطقة' },
    { title: 'جودة تسويقية',        desc: 'حجم ولون وطعم مطابق لمتطلبات الأسواق المحلية والتصديرية.',                  badge: 'فاخر',           metric: 'درجة A' },
    { title: 'إنبات مضمون',         desc: 'معدل أدنى مُراقَب في كل دفعة، وفق المعايير الوطنية المعمول بها.',           badge: '≥ 95%',          metric: '≥ 95%' },
  ],
  en: [
    { title: 'Disease resistance',     desc: 'Enhanced protection against common pathogens found in Moroccan soils.',                            badge: 'Certified',    metric: '9/10' },
    { title: 'Optimized yield',        desc: 'Production potential above the sector average across main crops.',                                 badge: '+30 – 40%',   metric: '+38%' },
    { title: 'Varietal earliness',     desc: 'Growth cycles calibrated to fit the climatic windows of each region.',                            badge: 'Fast',         metric: '–18 d' },
    { title: 'Climatic tolerance',     desc: 'Robustness against thermal and water stress in Moroccan semi-arid zones.',                        badge: 'Multi-zone',   metric: '12 reg.' },
    { title: 'Market quality',         desc: 'Size, color and taste meeting the requirements of local and export markets.',                      badge: 'Premium',      metric: 'Grade A' },
    { title: 'Germination guaranteed', desc: 'Minimum rate controlled per production batch, compliant with current national standards.',        badge: '≥ 95%',        metric: '≥ 95%' },
  ],
}

const FEAT_ICONS  = [ShieldCheck, TrendingUp, Timer, Thermometer, Award, Sprout]
const FEAT_COLORS = [
  { base: '#52C97A', glow: 'rgba(82,201,122,0.22)',  ring: 'rgba(82,201,122,0.18)' },
  { base: '#C9A96E', glow: 'rgba(201,169,110,0.22)', ring: 'rgba(201,169,110,0.18)' },
  { base: '#60BFD8', glow: 'rgba(96,191,216,0.22)',  ring: 'rgba(96,191,216,0.18)' },
  { base: '#E88C6A', glow: 'rgba(232,140,106,0.22)', ring: 'rgba(232,140,106,0.18)' },
  { base: '#C9A96E', glow: 'rgba(201,169,110,0.22)', ring: 'rgba(201,169,110,0.18)' },
  { base: '#52C97A', glow: 'rgba(82,201,122,0.22)',  ring: 'rgba(82,201,122,0.18)' },
]

export default function SeedFeatures({ lang }: SeedFeaturesProps) {
  const isRTL = lang === 'ar'

  return (
    <>
      <style>{`
        @keyframes gridPulse {
          0%,100% { opacity: 0.018; }
          50%      { opacity: 0.038; }
        }

        .sf-section {
          background: linear-gradient(155deg, #050E0A 0%, #091A10 35%, #0E2419 65%, #142C1E 100%);
          padding: clamp(5rem,9vw,8rem) 1.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Animated dot grid */
        .sf-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
          animation: gridPulse 6s ease-in-out infinite;
        }

        /* Corner glow blobs */
        .sf-blob-tl {
          position: absolute; top: -15%; left: -8%;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(107,191,74,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .sf-blob-br {
          position: absolute; bottom: -18%; right: -6%;
          width: 440px; height: 440px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,201,122,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .sf-blob-mid {
          position: absolute; top: 40%; left: 50%; transform: translateX(-50%);
          width: 600px; height: 200px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(27,67,50,0.35) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Feature grid */
        .sf-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: clamp(3rem,5vw,4.5rem);
        }

        /* Card */
        .sf-card {
          position: relative;
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          padding: clamp(1.4rem,2.4vw,2rem);
          overflow: hidden;
          cursor: default;
          transition: background .3s, transform .38s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
          will-change: transform;
        }
        .sf-card:hover {
          background: rgba(255,255,255,0.075);
          transform: translateY(-9px) scale(1.012);
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 30px 68px rgba(0,0,0,0.4);
        }

        /* Top shimmer line */
        .sf-card-shine {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          opacity: 0; transition: opacity .3s;
        }
        .sf-card:hover .sf-card-shine { opacity: 1; }

        /* Inner noise texture */
        .sf-card::after {
          content: '';
          position: absolute; inset: 0; border-radius: 22px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
          opacity: 0.5;
        }

        /* Metric display */
        .sf-metric {
          position: absolute; top: 14px;
          font-size: 11px; font-weight: 900;
          letter-spacing: 0.03em;
          padding: 5px 12px; border-radius: 999px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          white-space: nowrap;
        }

        /* Badge chip */
        .sf-badge {
          display: inline-flex; align-items: center;
          font-size: 9.5px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 999px;
          margin-bottom: 16px;
        }

        /* CTA row */
        .sf-cta-wrap {
          display: flex; flex-direction: column;
          align-items: center; gap: 14px;
          text-align: center;
        }
        .sf-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #6BBF4A, #4DA832);
          color: #071610; font-weight: 900; font-size: 14px;
          padding: 15px 32px; border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(107,191,74,0.42), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform .22s, box-shadow .22s;
          letter-spacing: 0.01em;
          position: relative; overflow: hidden;
        }
        .sf-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .sf-cta-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%); pointer-events: none;
        }
        .sf-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 44px rgba(107,191,74,0.58), 0 4px 12px rgba(0,0,0,0.3); }
        .sf-cta-btn:hover::after { transform: translateX(100%); transition: transform .45s ease; }
        .sf-cta-sub {
          font-size: 11px; color: rgba(255,255,255,0.28);
          font-weight: 500; letter-spacing: 0.04em;
          display: flex; align-items: center; gap: 8px;
        }
        .sf-cta-sub::before,
        .sf-cta-sub::after {
          content: '';
          display: inline-block; width: 24px; height: 1px;
          background: rgba(255,255,255,0.12);
        }

        /* Lab icon row */
        .sf-lab-row {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 20px;
        }

        @media (max-width: 860px) {
          .sf-feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .sf-feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section className="sf-section">
        <div className="sf-grid-bg" />
        <div className="sf-blob-tl" />
        <div className="sf-blob-br" />
        <div className="sf-blob-mid" />

        <div style={{ position: 'relative', maxWidth: 1140, margin: '0 auto' }}>

          {/* ── Header ── */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}>

            {/* Lab icon */}
            <div className="sf-lab-row">
              <div style={{
                width: 1, height: 20,
                background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.4))',
              }} />
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(201,169,110,0.1)',
                border: '1px solid rgba(201,169,110,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#C9A96E',
              }}>
                <FlaskConical size={16} strokeWidth={1.7} />
              </div>
              <div style={{
                width: 1, height: 20,
                background: 'linear-gradient(to bottom, rgba(201,169,110,0.4), transparent)',
              }} />
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: '#C9A96E', marginBottom: 22,
            }}>
              <span style={{ width: 32, height: 1, background: 'rgba(201,169,110,0.3)', display: 'inline-block' }} />
              {SECTION_LABEL[lang]}
              <span style={{ width: 32, height: 1, background: 'rgba(201,169,110,0.3)', display: 'inline-block' }} />
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem,4.5vw,3.5rem)',
              fontWeight: 900, color: '#fff',
              margin: '0 0 1.1rem', letterSpacing: '-0.04em', lineHeight: 1.08,
            }}>
              {SECTION_TITLE[lang]}
            </h2>

            {/* Decorative divider */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, margin: '0 auto 22px',
            }}>
              <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(201,169,110,0.4)' }} />
              <div style={{ width: 44, height: 2, borderRadius: 99, background: 'linear-gradient(90deg,#C9A96E,#52C97A)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(82,201,122,0.4)' }} />
              <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'clamp(13.5px,1.5vw,16px)',
              maxWidth: 600, margin: '0 auto', lineHeight: 1.9,
            }}>
              {SECTION_SUB[lang]}
            </p>
          </div>

          {/* ── Feature grid ── */}
          <div className="sf-feat-grid">
            {FEATURES[lang].map((f, i) => {
              const Icon  = FEAT_ICONS[i]
              const col   = FEAT_COLORS[i]
              const isRtlCard = isRTL

              return (
                <div key={i} className={`sf-card reveal reveal-d${(i % 3) + 1}`}>
                  {/* Shine line on hover */}
                  <div
                    className="sf-card-shine"
                    style={{ background: `linear-gradient(${isRtlCard ? '270deg' : '90deg'}, transparent, ${col.base}80, transparent)` }}
                  />

                  {/* Top row: icon + metric */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: 18,
                    flexDirection: isRtlCard ? 'row-reverse' : 'row',
                  }}>
                    {/* Icon box with glow */}
                    <div style={{
                      width: 52, height: 52, borderRadius: 16,
                      background: `linear-gradient(135deg, ${col.base}1A, ${col.base}0D)`,
                      border: `1px solid ${col.ring}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: col.base,
                      boxShadow: `0 0 20px ${col.glow}`,
                      flexShrink: 0,
                      position: 'relative',
                    }}>
                      {/* Icon inner glow dot */}
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: 16,
                        background: `radial-gradient(circle at 35% 35%, ${col.base}22, transparent 65%)`,
                        pointerEvents: 'none',
                      }} />
                      <Icon size={23} strokeWidth={1.55} />
                    </div>

                    {/* Metric */}
                    <div style={{
                      fontSize: 'clamp(1rem,1.8vw,1.3rem)',
                      fontWeight: 900, color: col.base,
                      letterSpacing: '-0.04em', lineHeight: 1,
                      textAlign: isRtlCard ? 'left' : 'right',
                    }}>
                      {f.metric}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="sf-badge" style={{
                    color: col.base,
                    background: `${col.base}16`,
                    border: `1px solid ${col.base}28`,
                    flexDirection: isRtlCard ? 'row-reverse' : 'row',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: col.base,
                      display: 'inline-block',
                      marginRight: isRtlCard ? 0 : 5,
                      marginLeft: isRtlCard ? 5 : 0,
                      boxShadow: `0 0 6px ${col.base}`,
                    }} />
                    {f.badge}
                  </div>

                  {/* Title */}
                  <div style={{
                    fontWeight: 800, color: 'rgba(255,255,255,0.92)',
                    fontSize: 'clamp(13.5px,1.35vw,15.5px)',
                    marginBottom: 10, letterSpacing: '-0.015em', lineHeight: 1.35,
                    textAlign: isRtlCard ? 'right' : 'left',
                  }}>
                    {f.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: 12.5, lineHeight: 1.8,
                    textAlign: isRtlCard ? 'right' : 'left',
                  }}>
                    {f.desc}
                  </div>

                  {/* Bottom accent line */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1,
                    background: `linear-gradient(90deg, transparent, ${col.base}35, transparent)`,
                    borderRadius: 99,
                  }} />
                </div>
              )
            })}
          </div>

          {/* ── CTA ── */}
          <div className="sf-cta-wrap">
            <a href="#contact" className="sf-cta-btn">
              {CTA_LABEL[lang]}
              <ArrowRight size={17} strokeWidth={2.5} />
            </a>
            <p className="sf-cta-sub">{CTA_SUB[lang]}</p>
          </div>

        </div>
      </section>
    </>
  )
}
