import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Check, ArrowRight, Leaf, ChevronUp, Send } from 'lucide-react'
import { type Lang, translations } from '../i18n'

interface FooterProps { lang: Lang }

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function IconLinkedin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function IconWA() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const SOCIALS = [
  { Icon: IconFacebook,  label: 'Facebook',  color: '#1877F2', href: '#' },
  { Icon: IconLinkedin,  label: 'LinkedIn',  color: '#0A66C2', href: 'https://ma.linkedin.com/in/mohamed-jabri-20209647' },
  { Icon: IconInstagram, label: 'Instagram', color: '#E1306C', href: '#' },
]

const CONTACT_ICONS = [MapPin, Phone, Mail, Clock]
const CONTACT_HREFS = [
  'https://www.google.com/maps/search/Zone+Industrielle+Ait+Melloul+Maroc',
  'tel:+212661596586',
  'mailto:contact@genotecseeds.ma',
  null,
]

const LOC: Record<Lang, string> = {
  fr: '1er étage, lot 699B, rue 6, ZI Aït Melloul',
  ar: 'الطابق 1، قطعة 699B، شارع 6، آيت ملول',
  en: '1st floor, lot 699B, street 6, ZI Ait Melloul',
}

const ENG_TITLE: Record<Lang, string> = {
  fr: 'Nos Engagements',
  ar: 'التزاماتنا',
  en: 'Our Commitments',
}

const ENGAGEMENTS: Record<Lang, string[]> = {
  fr: ['Semences certifiées & sélectionnées', 'Qualité premium garantie', 'Distribution nationale', 'Société 100 % marocaine', 'Accompagnement agronomique'],
  ar: ['بذور معتمدة ومنتقاة بعناية', 'جودة عالية مضمونة', 'توزيع وطني شامل', 'شركة مغربية 100٪', 'مرافقة زراعية متخصصة'],
  en: ['Certified & carefully selected seeds', 'Guaranteed premium quality', 'Nationwide distribution', '100% Moroccan company', 'Agronomic support'],
}

const WA_ROW: Record<Lang, string> = {
  fr: 'WhatsApp direct',
  ar: 'واتساب مباشر',
  en: 'Direct WhatsApp',
}

const PF_STATS: Record<Lang, { num: string; lbl: string }[]> = {
  fr: [
    { num: '15+',    lbl: "Ans d'exp." },
    { num: '50+',    lbl: 'Variétés' },
    { num: '12',     lbl: 'Régions' },
    { num: '1 000+', lbl: 'Agriculteurs' },
  ],
  ar: [
    { num: '+15',   lbl: 'سنة خبرة' },
    { num: '+50',   lbl: 'صنف' },
    { num: '12',    lbl: 'منطقة' },
    { num: '+1000', lbl: 'فلاح' },
  ],
  en: [
    { num: '15+',    lbl: 'Years exp.' },
    { num: '50+',    lbl: 'Varieties' },
    { num: '12',     lbl: 'Regions' },
    { num: '1 000+', lbl: 'Farmers' },
  ],
}

const PF: Record<Lang, { sup: string; title: string; sub: string; btn1: string; btn2: string }> = {
  fr: {
    sup: 'GENOTEC SEEDS · Maroc',
    title: 'Prêt à démarrer ? Parlons de votre projet.',
    sub: 'Notre équipe vous répond sous 24 h ouvrables.',
    btn1: 'Voir nos produits',
    btn2: 'Nous contacter',
  },
  ar: {
    sup: 'جينوتيك سيدز · المغرب',
    title: 'هل أنتم مستعدون؟ تحدثوا معنا.',
    sub: 'فريقنا يرد عليكم خلال 24 ساعة عمل.',
    btn1: 'منتجاتنا',
    btn2: 'تواصل معنا',
  },
  en: {
    sup: 'GENOTEC SEEDS · Morocco',
    title: "Ready to start? Let's talk about your project.",
    sub: 'Our team gets back to you within 24 working hours.',
    btn1: 'View our products',
    btn2: 'Contact us',
  },
}

const NEWS: Record<Lang, { title: string; sub: string; placeholder: string; btn: string; sent: string }> = {
  fr: {
    title: 'Recevoir notre catalogue',
    sub: 'Fiches techniques complètes par email',
    placeholder: 'Votre adresse email…',
    btn: 'Recevoir',
    sent: 'Envoyé !',
  },
  ar: {
    title: 'استلام كتالوجنا',
    sub: 'بيانات تقنية كاملة عبر البريد الإلكتروني',
    placeholder: 'بريدك الإلكتروني…',
    btn: 'إرسال',
    sent: 'تم !',
  },
  en: {
    title: 'Receive our catalogue',
    sub: 'Complete technical sheets by email',
    placeholder: 'Your email address…',
    btn: 'Receive',
    sent: 'Sent!',
  },
}

export default function Footer({ lang }: FooterProps) {
  const t   = translations[lang].footer
  const tn  = translations[lang].nav
  const tc  = translations[lang].contact
  const pf  = PF[lang]
  const nws = NEWS[lang]
  const isRTL = lang === 'ar'

  const [newsSent,  setNewsSent]  = useState(false)
  const [newsEmail, setNewsEmail] = useState('')

  const links = [
    { href: '#accueil',  label: tn.home },
    { href: '#produits', label: tn.products },
    { href: '#apropos',  label: tn.about },
    { href: '#contact',  label: tn.contact },
  ]

  function handleNews(e: React.FormEvent) {
    e.preventDefault()
    if (newsEmail.trim()) setNewsSent(true)
  }

  return (
    <>
      <style>{`
        /* Pre-footer */
        .pf-wrap {
          background: linear-gradient(135deg, #0D3526 0%, #1B5C48 45%, #145A4C 100%);
          padding: clamp(2rem,5vw,3.5rem) clamp(1.25rem,4vw,3rem);
          position: relative; overflow: hidden;
        }
        .pf-inner {
          position: relative; max-width: 1140px; margin: 0 auto;
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 2rem;
        }
        .pf-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 10px 16px; min-width: 68px;
          transition: background .2s, transform .2s;
          cursor: default;
        }
        .pf-stat-pill:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
        .pf-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .pf-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 2px solid rgba(255,255,255,0.22);
          color: #fff; font-weight: 700; font-size: 13px;
          padding: 12px 22px; border-radius: 999px;
          text-decoration: none; white-space: nowrap;
          transition: all .22s; min-height: 48px;
        }
        .pf-btn-outline:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.35); transform: translateY(-2px); }
        .pf-btn-solid {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #6BBF4A, #4DA832);
          color: #0A1F14;
          font-weight: 800; font-size: 14px;
          padding: 12px 26px; border-radius: 999px;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 6px 24px rgba(107,191,74,0.4);
          transition: all .22s; min-height: 48px; position: relative; overflow: hidden;
        }
        .pf-btn-solid::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%); transition: transform .4s ease;
        }
        .pf-btn-solid:hover::after { transform: translateX(100%); }
        .pf-btn-solid:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(107,191,74,0.55); }

        /* Footer grid */
        .footer-cols {
          display: grid;
          grid-template-columns: 1.65fr 1fr 1.1fr 1fr;
          gap: clamp(1.5rem,3vw,3rem);
          margin-bottom: 0;
        }

        /* Social buttons */
        .social-btn {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.32);
          cursor: pointer; transition: all .22s;
          text-decoration: none;
        }

        /* Nav links */
        .f-link {
          display: flex; align-items: center; gap: 9px;
          color: rgba(255,255,255,0.36); text-decoration: none;
          font-size: 13px; font-weight: 500; transition: color .2s, gap .2s;
          min-height: 30px;
        }
        .f-link .f-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.14); flex-shrink: 0;
          transition: background .2s, transform .2s;
        }
        .f-link .f-arrow {
          margin-left: auto; opacity: 0; color: #6BBF4A;
          transition: opacity .2s, transform .2s;
        }
        .f-link:hover { color: #fff; }
        .f-link:hover .f-dot { background: #6BBF4A; transform: scale(1.4); }
        .f-link:hover .f-arrow { opacity: 1; transform: translateX(3px); }

        /* Contact rows */
        .c-row {
          display: flex; align-items: flex-start; gap: 10px;
          text-decoration: none; border-radius: 10px;
          padding: 6px 8px 6px 2px;
          transition: background .18s;
          cursor: default;
        }
        .c-row.c-link { cursor: pointer; }
        .c-row.c-link:hover { background: rgba(255,255,255,0.04); }
        .c-row.c-link:hover .c-arrow { opacity: 1; transform: translateX(2px); }
        .c-icon-box {
          width: 30px; height: 30px; flex-shrink: 0;
          background: rgba(107,191,74,0.09);
          border: 1px solid rgba(107,191,74,0.18);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; transition: background .2s, border-color .2s;
        }
        .c-row.c-link:hover .c-icon-box {
          background: rgba(107,191,74,0.18);
          border-color: rgba(107,191,74,0.32);
        }
        .c-arrow {
          margin-left: auto; flex-shrink: 0;
          color: rgba(107,191,74,0.4); opacity: 0;
          transition: opacity .18s, transform .18s;
          align-self: center;
        }

        /* Engagement items */
        .eng-item {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .eng-check {
          width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
          background: rgba(107,191,74,0.1);
          border: 1px solid rgba(107,191,74,0.25);
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px; transition: background .2s, border-color .2s;
        }
        .eng-item:hover .eng-check {
          background: rgba(107,191,74,0.2);
          border-color: rgba(107,191,74,0.4);
        }

        /* Newsletter strip */
        .news-strip {
          border-top: 1px solid rgba(107,191,74,0.1);
          border-bottom: 1px solid rgba(107,191,74,0.1);
          margin: 2.5rem 0 0;
          padding: 1.5rem 0;
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 1.25rem;
        }
        .news-form {
          display: flex; gap: 8px; flex: 1; min-width: 260px; max-width: 420px;
        }
        .news-input {
          flex: 1; padding: 11px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff;
          font-size: 13.5px; font-family: inherit;
          outline: none; transition: border-color .2s, background .2s;
        }
        .news-input::placeholder { color: rgba(255,255,255,0.22); }
        .news-input:focus {
          border-color: rgba(107,191,74,0.5);
          background: rgba(107,191,74,0.05);
        }
        .news-btn {
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #6BBF4A, #4DA832);
          color: #0A1F14; font-weight: 800; font-size: 12.5px;
          padding: 11px 18px; border-radius: 10px;
          border: none; cursor: pointer; font-family: inherit;
          white-space: nowrap;
          transition: transform .2s, box-shadow .2s;
          box-shadow: 0 4px 14px rgba(107,191,74,0.38);
        }
        .news-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(107,191,74,0.52); }

        /* Back-to-top */
        .btt {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.28); text-decoration: none;
          transition: all .22s; flex-shrink: 0;
        }
        .btt:hover {
          background: rgba(107,191,74,0.16);
          border-color: rgba(107,191,74,0.35);
          color: #6BBF4A; transform: translateY(-3px);
        }

        /* WA contact row */
        .wa-c-row {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; border-radius: 10px;
          padding: 7px 8px 7px 2px;
          transition: background .18s;
          margin-top: 4px;
        }
        .wa-c-row:hover { background: rgba(37,211,102,0.07); }
        .wa-c-row:hover .c-arrow { opacity: 1; transform: translateX(2px); }

        @media (max-width: 920px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; gap: 2.5rem 2rem !important; }
        }
        @media (max-width: 560px) {
          .pf-inner { flex-direction: column; align-items: flex-start; }
          .pf-btns { width: 100%; }
          .pf-btn-outline, .pf-btn-solid { flex: 1; justify-content: center; }
          .news-strip { flex-direction: column; align-items: flex-start; }
          .news-form { max-width: 100%; width: 100%; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; gap: 2rem 0 !important; }
          .pf-btns { flex-direction: column; }
          .pf-btn-outline, .pf-btn-solid { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── Pre-footer CTA ── */}
      <div className="pf-wrap">
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        {/* Top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 180,
          background: 'radial-gradient(ellipse, rgba(107,191,74,0.18), transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          ...(isRTL ? { left: -10 } : { right: -10 }),
          top: '50%', transform: 'translateY(-50%)',
          opacity: 0.06, pointerEvents: 'none', color: '#6BBF4A',
        }}>
          <Leaf size={220} strokeWidth={0.5} />
        </div>

        <div className="pf-inner" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>

          {/* Text + stats */}
          <div style={{ position: 'relative', textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: 'rgba(107,191,74,0.65)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 6,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <span style={{ width: 14, height: 1.5, background: 'rgba(107,191,74,0.5)', display: 'inline-block', borderRadius: 99 }} />
              {pf.sup}
            </div>
            <div style={{
              fontSize: 'clamp(1.2rem,3vw,1.9rem)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-0.03em', lineHeight: 1.15, maxWidth: 500, marginBottom: 10,
            }}>
              {pf.title}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginBottom: 18, fontWeight: 500 }}>
              {pf.sub}
            </div>
            {/* Mini-stats pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {PF_STATS[lang].map((s, i) => (
                <div key={i} className="pf-stat-pill">
                  <span style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 900, color: '#6BBF4A', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {s.num}
                  </span>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 3 }}>
                    {s.lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="pf-btns" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <a href="#produits" className="pf-btn-outline">
              {pf.btn1}
            </a>
            <a href="#contact" className="pf-btn-solid" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {pf.btn2} <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <footer style={{
        background: '#060E08',
        color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(107,191,74,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Top centre glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 200,
          background: 'radial-gradient(ellipse, rgba(107,191,74,0.07), transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Green top line */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(107,191,74,0.45) 30%, rgba(107,191,74,0.45) 70%, transparent 100%)',
        }} />

        <div style={{
          position: 'relative', maxWidth: 1140, margin: '0 auto',
          padding: 'clamp(2.75rem,5vw,4.5rem) 1.25rem 2rem',
        }}>

          <div className="footer-cols">

            {/* ── Col 1: Brand ── */}
            <div>
              <div style={{
                background: '#fff', borderRadius: 12,
                padding: '8px 14px', display: 'inline-block',
                boxShadow: '0 4px 18px rgba(0,0,0,0.32)',
                marginBottom: 20,
              }}>
                <img src="/logo.png" alt="Genotec Seeds"
                  style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>

              <p style={{
                color: 'rgba(255,255,255,0.34)', fontSize: 13,
                lineHeight: 1.82, margin: '0 0 10px', maxWidth: 230,
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.tagline}
              </p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'rgba(255,255,255,0.2)', fontSize: 11,
                fontWeight: 600, marginBottom: 26,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}>
                <MapPin size={11} strokeWidth={1.8} style={{ color: 'rgba(107,191,74,0.5)', flexShrink: 0 }} />
                <span style={{ textAlign: isRTL ? 'right' : 'left' }}>{LOC[lang]}</span>
              </div>

              {/* Social row */}
              <div style={{ display: 'flex', gap: 8, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {SOCIALS.map(s => {
                  const SocialIcon = s.Icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      onMouseEnter={e => {
                        e.currentTarget.style.background = s.color
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.borderColor = s.color
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}44`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.32)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <SocialIcon />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* ── Col 2: Navigation ── */}
            <div>
              <h4 style={{
                color: '#6BBF4A', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                margin: '0 0 22px', textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.quickLinks}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="f-link" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="f-dot" />
                      <span>{link.label}</span>
                      <span className="f-arrow">
                        <ArrowRight size={11} strokeWidth={2.5} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Contact ── */}
            <div>
              <h4 style={{
                color: '#6BBF4A', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                margin: '0 0 18px', textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.contactTitle}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {tc.info.slice(0, 4).map((item, i) => {
                  const CIcon = CONTACT_ICONS[i]
                  const href  = CONTACT_HREFS[i]
                  const Tag   = href ? 'a' : 'div'
                  const extra = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}
                  return (
                    <Tag
                      key={i}
                      className={`c-row${href ? ' c-link' : ''}`}
                      style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                      {...extra}
                    >
                      <div className="c-icon-box">
                        <CIcon size={13} strokeWidth={1.8} style={{ color: '#6BBF4A' }} />
                      </div>
                      <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                        <div style={{
                          fontSize: 8.5, fontWeight: 700,
                          color: 'rgba(255,255,255,0.2)',
                          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2,
                        }}>
                          {item.label}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.45 }}>
                          {item.value}
                        </div>
                      </div>
                      {href && (
                        <span className="c-arrow">
                          <ArrowRight size={11} strokeWidth={2} />
                        </span>
                      )}
                    </Tag>
                  )
                })}

                {/* WhatsApp row */}
                <a
                  href="https://wa.me/212661596586"
                  target="_blank" rel="noopener noreferrer"
                  className="wa-c-row"
                  style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(37,211,102,0.12)',
                    border: '1px solid rgba(37,211,102,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4ADE80',
                  }}>
                    <IconWA />
                  </div>
                  <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{
                      fontSize: 8.5, fontWeight: 700,
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2,
                    }}>
                      {WA_ROW[lang]}
                    </div>
                    <div style={{ color: 'rgba(74,222,128,0.65)', fontSize: 12, lineHeight: 1.45 }}>
                      +212 661 596 586
                    </div>
                  </div>
                  <span className="c-arrow" style={{ color: 'rgba(74,222,128,0.4)' }}>
                    <ArrowRight size={11} strokeWidth={2} />
                  </span>
                </a>
              </div>
            </div>

            {/* ── Col 4: Engagements ── */}
            <div>
              <h4 style={{
                color: '#6BBF4A', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                margin: '0 0 22px', textAlign: isRTL ? 'right' : 'left',
              }}>
                {ENG_TITLE[lang]}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {ENGAGEMENTS[lang].map((text, i) => (
                  <div key={i} className="eng-item" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div className="eng-check">
                      <Check size={9} strokeWidth={3} style={{ color: '#6BBF4A' }} />
                    </div>
                    <span style={{
                      color: 'rgba(255,255,255,0.38)', fontSize: 12.5,
                      lineHeight: 1.55, fontWeight: 500,
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Newsletter strip ── */}
          <div className="news-strip" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{
                fontWeight: 800, color: 'rgba(255,255,255,0.72)', fontSize: 14,
                letterSpacing: '-0.015em', marginBottom: 3,
              }}>
                {nws.title}
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.24)', fontWeight: 500 }}>
                {nws.sub}
              </div>
            </div>

            {newsSent ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(107,191,74,0.1)',
                border: '1px solid rgba(107,191,74,0.25)',
                borderRadius: 10, padding: '10px 20px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6BBF4A' }} />
                <span style={{ color: '#8EDB60', fontSize: 13, fontWeight: 700 }}>{nws.sent}</span>
              </div>
            ) : (
              <form onSubmit={handleNews} className="news-form" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <input
                  type="email" required
                  className="news-input"
                  placeholder={nws.placeholder}
                  value={newsEmail}
                  onChange={e => setNewsEmail(e.target.value)}
                  style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                />
                <button type="submit" className="news-btn" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  {nws.btn}
                  <Send size={12} strokeWidth={2.3} />
                </button>
              </form>
            )}
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '1.5rem',
            marginTop: '1.5rem',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: '10px 20px',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.16)', fontSize: 11.5, margin: 0, textAlign: isRTL ? 'right' : 'left' }}>
              {t.rights}
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'rgba(255,255,255,0.16)', fontSize: 11.5,
              }}>
                <span style={{ fontSize: 13 }}>🇲🇦</span>
                {t.madeIn}
              </div>
              <a href="#accueil" className="btt" title="Top">
                <ChevronUp size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}
