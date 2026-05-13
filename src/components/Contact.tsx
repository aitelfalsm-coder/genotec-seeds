import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Lock, ChevronDown, ArrowRight } from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface ContactProps { lang: Lang }

const INFO_ICONS = [MapPin, Phone, Mail, Clock]

const INFO_HREFS = [
  'https://www.google.com/maps/search/Zone+Industrielle+Ait+Melloul+Maroc',
  'tel:+212661596586',
  'mailto:contact@genotecseeds.ma',
  null,
]

/* ── Multilingual constants ── */

const PANEL_TITLE: Record<Lang, string> = {
  fr: 'Coordonnées directes',
  ar: 'معلومات الاتصال',
  en: 'Direct contact',
}
const PANEL_SUB: Record<Lang, string> = {
  fr: 'Disponibles du lundi au vendredi, de 8h à 18h. Réponse rapide garantie.',
  ar: 'متاحون من الاثنين إلى الجمعة، من 8 صباحاً حتى 6 مساءً. رد سريع مضمون.',
  en: 'Available Monday to Friday, 8am – 6pm. Fast reply guaranteed.',
}
const DISTRIB_LABEL: Record<Lang, string> = {
  fr: '🇲🇦 Distribution — tout le Maroc',
  ar: '🇲🇦 توزيع — عموم المغرب',
  en: '🇲🇦 Distribution — all of Morocco',
}
const WA_LABEL: Record<Lang, string> = {
  fr: 'Écrire sur WhatsApp',
  ar: 'المراسلة عبر واتساب',
  en: 'Message on WhatsApp',
}
const RESP_ITEMS: Record<Lang, { label: string; time: string; note: string }[]> = {
  fr: [
    { label: 'WhatsApp', time: '< 2h',  note: 'Message direct' },
    { label: 'Email',    time: '< 24h', note: 'Jours ouvrables' },
    { label: 'Visite',   time: 'RDV',   note: 'Sur rendez-vous' },
  ],
  ar: [
    { label: 'واتساب',           time: '< 2h',  note: 'رسالة مباشرة' },
    { label: 'البريد الإلكتروني', time: '< 24h', note: 'أيام العمل' },
    { label: 'الزيارة',          time: 'موعد',   note: 'بحجز مسبق' },
  ],
  en: [
    { label: 'WhatsApp', time: '< 2h',  note: 'Direct message' },
    { label: 'Email',    time: '< 24h', note: 'Business days' },
    { label: 'Visit',    time: 'Appt.', note: 'By appointment' },
  ],
}
const RESP_COLORS = ['#25D366', '#C9A96E', '#60BFD8']

const REQUEST_TYPES: Record<Lang, string[]> = {
  fr: ['Demande de catalogue', 'Demande de devis', 'Partenariat commercial', 'Information produit', 'Autre demande'],
  ar: ['طلب كتالوج', 'طلب عرض سعر', 'شراكة تجارية', 'معلومات منتج', 'طلب آخر'],
  en: ['Catalogue request', 'Quote request', 'Commercial partnership', 'Product information', 'Other inquiry'],
}
const SELECT_PH: Record<Lang, string> = {
  fr: 'Sélectionner un type de demande…',
  ar: 'اختر نوع الطلب…',
  en: 'Select a request type…',
}
const MSG_PH: Record<Lang, string> = {
  fr: 'Décrivez votre projet ou besoin en semences…',
  ar: 'صف مشروعك أو حاجتك من البذور…',
  en: 'Describe your project or seed requirements…',
}
const EMAIL_PH: Record<Lang, string> = {
  fr: 'vous@exemple.ma',
  ar: 'أنت@مثال.ma',
  en: 'you@example.com',
}
const RESP_BADGE: Record<Lang, string> = {
  fr: 'Réponse garantie sous 24h ouvrables',
  ar: 'رد مضمون خلال 24 ساعة عمل',
  en: 'Response guaranteed within 24 business hours',
}
const ONLINE_LBL: Record<Lang, string> = {
  fr: 'En ligne',
  ar: 'متاح',
  en: 'Online',
}
const TRUST_CHIPS: Record<Lang, [string, string, string]> = {
  fr: ['Données confidentielles', 'Réponse sous 24h', 'Équipe au Maroc'],
  ar: ['بيانات سرية', 'رد خلال 24h', 'فريق بالمغرب'],
  en: ['Confidential data', 'Reply within 24h', 'Team in Morocco'],
}
const SENT_BADGE: Record<Lang, string> = {
  fr: 'MESSAGE ENVOYÉ',
  ar: 'تم الإرسال',
  en: 'MESSAGE SENT',
}
const SUCCESS_CHIPS: Record<Lang, [string, string, string]> = {
  fr: ['⚡ Réponse sous 24h', '🔒 Données sécurisées', '🇲🇦 Équipe Maroc'],
  ar: ['⚡ رد خلال 24h', '🔒 بيانات آمنة', '🇲🇦 فريق المغرب'],
  en: ['⚡ Reply within 24h', '🔒 Secure data', '🇲🇦 Morocco team'],
}

/* ── WhatsApp SVG ── */
function IconWA() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Contact({ lang }: ContactProps) {
  const t      = translations[lang].contact
  const isRTL  = lang === 'ar'
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [focused, setFocused]     = useState<string | null>(null)
  const [charCount, setCharCount] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1600)
  }

  const field = (name: string): React.CSSProperties => ({
    width: '100%', boxSizing: 'border-box',
    padding: '13px 16px',
    border: `1.5px solid ${focused === name ? '#1B4332' : '#E8E5DF'}`,
    borderRadius: 12, fontSize: 14.5,
    color: '#111827',
    background: focused === name ? 'rgba(27,67,50,0.03)' : '#FAFAF7',
    outline: 'none', transition: 'all .2s',
    fontFamily: 'inherit',
    textAlign: isRTL ? 'right' : 'left',
    direction: isRTL ? 'rtl' : 'ltr',
  })

  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 10.5, fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: '#9CA3AF', marginBottom: 7,
  }

  return (
    <>
      <style>{`
        @keyframes successIn {
          from { opacity: 0; transform: scale(.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spinnerRing { to { transform: rotate(360deg); } }
        @keyframes checkDraw {
          from { stroke-dashoffset: 56; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes successPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(27,67,50,0.14); }
          50%     { box-shadow: 0 0 0 16px rgba(27,67,50,0); }
        }
        @keyframes dotPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: .5; transform: scale(.85); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 20px;
          align-items: stretch;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }
        .resp-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: clamp(2rem,4vw,3rem);
        }
        .resp-card {
          background: #fff;
          border: 1.5px solid #EDEAE4;
          border-radius: 16px;
          padding: 16px 18px;
          text-align: center;
          transition: border-color .2s, box-shadow .2s, transform .2s;
          cursor: default;
        }
        .resp-card:hover {
          border-color: rgba(27,67,50,0.18);
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transform: translateY(-3px);
        }

        /* Info rows */
        .info-row {
          display: flex; align-items: center; gap: 14px;
          padding: 12px 10px; border-radius: 13px;
          transition: background .18s, transform .18s;
          cursor: pointer; text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .info-row:last-of-type { border-bottom: none; }
        .info-row:hover { background: rgba(255,255,255,0.07); transform: translateX(2px); }
        .info-row-arrow {
          margin-left: auto; color: rgba(255,255,255,0.2);
          transition: color .18s, transform .18s; flex-shrink: 0;
        }
        .info-row:hover .info-row-arrow {
          color: #C9A96E; transform: translateX(3px);
        }

        .wa-panel-btn {
          display: flex; align-items: center; gap: 12px;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.25);
          border-radius: 14px; padding: 13px 16px;
          text-decoration: none; cursor: pointer;
          transition: background .2s, border-color .2s, transform .2s;
          margin-top: 1.5rem;
        }
        .wa-panel-btn:hover {
          background: rgba(37,211,102,0.18);
          border-color: rgba(37,211,102,0.42);
          transform: translateY(-2px);
        }

        .form-select {
          width: 100%; box-sizing: border-box;
          padding: 13px 42px 13px 16px;
          border: 1.5px solid #E8E5DF;
          border-radius: 12px; font-size: 14.5px;
          color: #111827; background: #FAFAF7;
          outline: none; transition: all .2s;
          font-family: inherit;
          -webkit-appearance: none; appearance: none;
          cursor: pointer;
        }
        .form-select:focus { border-color: #1B4332; background: rgba(27,67,50,0.03); }
        .form-select-rtl {
          padding: 13px 16px 13px 42px !important;
          direction: rtl;
        }

        .trust-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; color: #B0A898; font-weight: 500;
        }
        .submit-btn { transition: transform .25s ease, box-shadow .25s ease; }
        .submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 44px rgba(201,169,110,0.55) !important;
        }

        @media (max-width: 840px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .resp-strip { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .resp-strip { grid-template-columns: 1fr !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
          .resp-card { padding: 12px 14px !important; }
        }
      `}</style>

      <section id="contact" style={{
        padding: 'clamp(4rem,8vw,7rem) 0',
        background: '#F8F7F4',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Backgrounds */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(27,67,50,0.035) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }} />
        <div style={{
          position: 'absolute', top: -120, right: -100, width: 520, height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80, width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,67,50,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 1140, margin: '0 auto', padding: '0 1.25rem' }}>

          {/* ── Header ── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              color: '#1B4332', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18,
            }}>
              <span style={{ width: 30, height: 1, background: 'rgba(27,67,50,0.3)', display: 'inline-block' }} />
              {t.badge}
              <span style={{ width: 30, height: 1, background: 'rgba(27,67,50,0.3)', display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem,4.5vw,3.5rem)',
              fontWeight: 900, color: '#0A1510',
              margin: '0 0 0.8rem', letterSpacing: '-0.035em', lineHeight: 1.08,
            }}>
              {t.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0 auto 18px' }}>
              <div style={{ width: 32, height: 1, background: 'rgba(201,169,110,0.3)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A96E' }} />
              <div style={{ width: 40, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#C9A96E,#1B4332)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1B4332', opacity: 0.45 }} />
              <div style={{ width: 32, height: 1, background: 'rgba(27,67,50,0.2)' }} />
            </div>
            <p style={{
              color: '#6B7280', fontSize: 'clamp(14px,1.5vw,16px)',
              maxWidth: 520, margin: '0 auto', lineHeight: 1.8,
            }}>
              {t.subtitle}
            </p>
          </div>

          {/* ── Response time strip ── */}
          <div className="resp-strip">
            {RESP_ITEMS[lang].map((r, i) => (
              <div key={i} className="resp-card">
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: RESP_COLORS[i],
                  boxShadow: `0 0 8px ${RESP_COLORS[i]}80`,
                  margin: '0 auto 10px',
                }} />
                <div style={{
                  fontSize: 'clamp(1.1rem,2vw,1.5rem)',
                  fontWeight: 900, color: '#0A1510',
                  letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 5,
                }}>
                  {r.time}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: '#374151',
                  marginBottom: 3,
                }}>
                  {r.label}
                </div>
                <div style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 500 }}>
                  {r.note}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-grid">

            {/* ──── Left: info panel ──── */}
            <div style={{
              background: 'linear-gradient(150deg, #071610 0%, #0F2D1E 55%, #1B4332 100%)',
              borderRadius: 24,
              padding: 'clamp(1.75rem,3vw,2.5rem)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Textures */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }} />
              <div style={{
                position: 'absolute', top: '-25%', right: '-20%',
                width: 340, height: 340, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,169,110,0.13), transparent 65%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: '-15%', left: '-10%',
                width: 240, height: 240, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(27,107,69,0.18), transparent 65%)',
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Logo */}
                <div style={{
                  display: 'inline-block', background: '#fff',
                  borderRadius: 12, padding: '6px 12px', marginBottom: '1.6rem',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                  alignSelf: isRTL ? 'flex-end' : 'flex-start',
                }}>
                  <img src="/logo.png" alt="Genotec Seeds"
                    style={{ height: 28, display: 'block', objectFit: 'contain', minWidth: 60 }} />
                </div>

                {/* Panel title */}
                <h3 style={{
                  fontSize: 'clamp(1.25rem,2.4vw,1.65rem)',
                  fontWeight: 900, color: '#fff',
                  margin: '0 0 8px', letterSpacing: '-0.025em', lineHeight: 1.2,
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  {PANEL_TITLE[lang]}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.4)', fontSize: 13,
                  lineHeight: 1.75, marginBottom: '1.5rem',
                  textAlign: isRTL ? 'right' : 'left',
                }}>
                  {PANEL_SUB[lang]}
                </p>

                {/* Gold divider */}
                <div style={{
                  height: 1,
                  background: isRTL
                    ? 'linear-gradient(270deg, rgba(201,169,110,0.55), rgba(201,169,110,0.04))'
                    : 'linear-gradient(90deg, rgba(201,169,110,0.55), rgba(201,169,110,0.04))',
                  marginBottom: '1.2rem',
                }} />

                {/* Info rows */}
                <div style={{ flex: 1 }}>
                  {t.info.map((item, i) => {
                    const Icon = INFO_ICONS[i]
                    const href = INFO_HREFS[i]
                    const Tag  = href ? 'a' : 'div'
                    const linkProps = href
                      ? { href, target: '_blank', rel: 'noopener noreferrer' }
                      : {}

                    return (
                      <Tag
                        key={i}
                        className="info-row"
                        style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                        {...linkProps}
                      >
                        <div style={{
                          width: 42, height: 42, flexShrink: 0,
                          background: 'rgba(201,169,110,0.1)',
                          border: '1px solid rgba(201,169,110,0.2)',
                          borderRadius: 12,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#C9A96E',
                        }}>
                          <Icon size={18} strokeWidth={1.6} />
                        </div>
                        <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                          <div style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                            marginBottom: 3,
                          }}>
                            {item.label}
                          </div>
                          <div style={{ fontWeight: 700, color: '#fff', fontSize: 13, lineHeight: 1.45 }}>
                            {item.value}
                          </div>
                        </div>
                        {href && (
                          <div className="info-row-arrow">
                            <ArrowRight size={15} strokeWidth={2} />
                          </div>
                        )}
                      </Tag>
                    )
                  })}
                </div>

                {/* WhatsApp button */}
                <a
                  href="https://wa.me/212661596586"
                  target="_blank" rel="noopener noreferrer"
                  className="wa-panel-btn"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 11, flexShrink: 0,
                    background: 'linear-gradient(135deg, #25D366, #1aad55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 14px rgba(37,211,102,0.45)',
                  }}>
                    <IconWA />
                  </div>
                  <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 800, letterSpacing: '0.03em' }}>
                      {WA_LABEL[lang]}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11.5, marginTop: 1 }}>
                      +212 661 596 586
                    </div>
                  </div>
                  <ArrowRight size={14} strokeWidth={2.2} style={{ color: 'rgba(74,222,128,0.55)', flexShrink: 0 }} />
                </a>

                {/* Distribution pill */}
                <div style={{
                  marginTop: '1.1rem',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(201,169,110,0.09)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  borderRadius: 999, padding: '8px 16px',
                  alignSelf: isRTL ? 'flex-end' : 'flex-start',
                }}>
                  <span style={{ color: '#C9A96E', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em' }}>
                    {DISTRIB_LABEL[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* ──── Right: form panel ──── */}
            <div style={{
              background: '#fff',
              borderRadius: 24,
              border: '1.5px solid #E8E5DF',
              boxShadow: '0 8px 48px rgba(0,0,0,0.055)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>

              {/* Form header */}
              <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid #F0EDE8',
                background: 'linear-gradient(to right, #FAFAF7, #fff)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'linear-gradient(135deg, #0F2D1E, #1B4332)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9A96E', flexShrink: 0,
                  }}>
                    <Send size={17} strokeWidth={1.8} />
                  </div>
                  <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{ fontWeight: 800, color: '#111827', fontSize: 14, letterSpacing: '-0.01em' }}>
                      {t.form.send}
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: 11, marginTop: 1 }}>
                      {RESP_BADGE[lang]}
                    </div>
                  </div>
                </div>

                {/* Online badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
                  background: 'rgba(27,67,50,0.06)',
                  border: '1px solid rgba(27,67,50,0.1)',
                  borderRadius: 999, padding: '5px 13px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 7px rgba(34,197,94,0.75)',
                    animation: 'dotPulse 2s ease-in-out infinite',
                  }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1B4332', letterSpacing: '0.06em' }}>
                    {ONLINE_LBL[lang]}
                  </span>
                </div>
              </div>

              <div style={{ padding: 'clamp(1.5rem,3vw,2.25rem)', flex: 1 }}>

                {submitted ? (

                  /* ── Success state ── */
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    minHeight: 380, padding: '2rem 1rem', textAlign: 'center',
                    animation: 'successIn .5s ease both',
                  }}>
                    <div style={{
                      width: 88, height: 88, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(27,67,50,0.06), rgba(27,67,50,0.13))',
                      border: '2px solid rgba(27,67,50,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 22,
                      animation: 'successPulse 2.2s ease-in-out infinite',
                    }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <path d="M11 22 L19 30 L33 14"
                          stroke="#1B4332" strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round"
                          strokeDasharray="56"
                          style={{ animation: 'checkDraw .6s ease .15s both' }}
                        />
                      </svg>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      borderRadius: 999, padding: '4px 14px', marginBottom: 18,
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#15803D', letterSpacing: '0.12em' }}>
                        {SENT_BADGE[lang]}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.2rem,2.5vw,1.5rem)',
                      fontWeight: 900, color: '#111827',
                      marginBottom: 10, letterSpacing: '-0.025em',
                    }}>
                      {t.form.success}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.75, maxWidth: 300 }}>
                      {t.form.successSub}
                    </div>
                    <div style={{
                      marginTop: 26, display: 'flex', flexWrap: 'wrap',
                      gap: 8, justifyContent: 'center',
                    }}>
                      {SUCCESS_CHIPS[lang].map((it, i) => (
                        <span key={i} style={{
                          fontSize: 11, color: '#9CA3AF', fontWeight: 500,
                          background: '#F8F7F4', borderRadius: 999,
                          padding: '5px 13px', border: '1px solid #EDEAE4',
                        }}>
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>

                ) : (

                  /* ── Form ── */
                  <form onSubmit={handleSubmit}>

                    {/* Name + Phone */}
                    <div className="form-row-2">
                      <div>
                        <label style={lbl}>{t.form.name}</label>
                        <input type="text" required placeholder="Mohamed Alami"
                          style={field('name')}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                      </div>
                      <div>
                        <label style={lbl}>{t.form.phone}</label>
                        <input type="tel" placeholder="+212 6XX XXX XXX"
                          style={field('phone')}
                          onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>{t.form.email}</label>
                      <input type="email" required placeholder={EMAIL_PH[lang]}
                        style={field('email')}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                    </div>

                    {/* Type de demande */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>{t.form.subject}</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          className={`form-select${isRTL ? ' form-select-rtl' : ''}`}
                          defaultValue=""
                        >
                          <option value="" disabled>{SELECT_PH[lang]}</option>
                          {REQUEST_TYPES[lang].map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div style={{
                          position: 'absolute',
                          ...(isRTL ? { left: 14 } : { right: 14 }),
                          top: '50%', transform: 'translateY(-50%)',
                          color: '#9CA3AF', pointerEvents: 'none',
                        }}>
                          <ChevronDown size={16} strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: 22 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 7,
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                      }}>
                        <label style={{ ...lbl, marginBottom: 0 }}>{t.form.message}</label>
                        <span style={{ fontSize: 10, color: charCount > 400 ? '#EF4444' : '#C9C5BE', fontWeight: 600 }}>
                          {charCount}/500
                        </span>
                      </div>
                      <textarea required rows={4}
                        maxLength={500}
                        placeholder={MSG_PH[lang]}
                        style={{ ...field('message'), resize: 'vertical', minHeight: 110 }}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        onChange={e => setCharCount(e.target.value.length)}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="submit-btn"
                      style={{
                        width: '100%', padding: '15px',
                        background: loading
                          ? 'rgba(201,169,110,0.3)'
                          : 'linear-gradient(135deg, #C9A96E, #B8935A)',
                        color: loading ? 'rgba(15,45,30,0.45)' : '#0F2D1E',
                        fontWeight: 800, fontSize: 15,
                        border: 'none', borderRadius: 12,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        boxShadow: loading ? 'none' : '0 8px 28px rgba(201,169,110,0.42)',
                        minHeight: 52, letterSpacing: '0.01em',
                        flexDirection: isRTL ? 'row-reverse' : 'row',
                        position: 'relative', overflow: 'hidden',
                      }}
                    >
                      {!loading && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          pointerEvents: 'none',
                        }} />
                      )}
                      {loading ? (
                        <>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%',
                            border: '2.5px solid rgba(15,45,30,0.15)',
                            borderTopColor: '#0F2D1E',
                            animation: 'spinnerRing .8s linear infinite',
                          }} />
                          {t.form.sending}
                        </>
                      ) : (
                        <>
                          {t.form.send}
                          <Send size={16} strokeWidth={2.2} />
                        </>
                      )}
                    </button>

                    {/* Trust chips */}
                    <div style={{
                      display: 'flex', justifyContent: 'center',
                      flexWrap: 'wrap', gap: '6px 20px', marginTop: 16,
                    }}>
                      <span className="trust-chip"><Lock size={10} strokeWidth={2.2} /> {TRUST_CHIPS[lang][0]}</span>
                      <span className="trust-chip"><Clock size={10} strokeWidth={2.2} /> {TRUST_CHIPS[lang][1]}</span>
                      <span className="trust-chip"><MapPin size={10} strokeWidth={2.2} /> {TRUST_CHIPS[lang][2]}</span>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
