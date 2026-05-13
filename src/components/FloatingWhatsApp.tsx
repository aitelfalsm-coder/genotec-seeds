import { useState } from 'react'
import { type Lang } from '../i18n'

interface FloatingWhatsAppProps { lang: Lang }

const TOOLTIP: Record<Lang, string> = {
  fr: 'Discutez avec nous sur WhatsApp',
  ar: 'تحدث معنا عبر واتساب',
  en: 'Chat with us on WhatsApp',
}

const LABEL: Record<Lang, string> = {
  fr: 'Nous contacter',
  ar: 'تواصل معنا',
  en: 'Contact us',
}

export default function FloatingWhatsApp({ lang }: FloatingWhatsAppProps) {
  const isRTL  = lang === 'ar'
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <style>{`
        @keyframes waPing {
          0%   { transform: scale(1);   opacity: .7; }
          70%  { transform: scale(1.9); opacity: 0;  }
          100% { transform: scale(1);   opacity: 0;  }
        }
        @keyframes waSlideIn {
          from { opacity: 0; transform: translateY(6px) scale(.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }
        .wa-btn {
          position: relative;
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, #25D366 0%, #1DB954 55%, #128C7E 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 6px 24px rgba(37,211,102,0.48),
            0 2px 8px  rgba(0,0,0,0.22);
          cursor: pointer;
          border: none; outline: none;
          transition: transform .22s, box-shadow .22s;
          text-decoration: none; color: #fff;
          flex-shrink: 0;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow:
            0 10px 36px rgba(37,211,102,0.62),
            0 4px 12px  rgba(0,0,0,0.22);
        }

        /* Pulse ring */
        .wa-ping {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(37,211,102,0.38);
          animation: waPing 2.4s ease-out infinite;
          pointer-events: none;
        }

        /* Tooltip bubble */
        .wa-tooltip {
          background: #111;
          color: #fff;
          font-size: 12.5px;
          font-weight: 600;
          padding: 9px 15px;
          border-radius: 12px;
          white-space: nowrap;
          box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          animation: waSlideIn .18s ease both;
          line-height: 1;
          position: relative;
          border: 1px solid rgba(255,255,255,0.07);
        }
        /* Arrow pointing toward button (bottom) */
        .wa-tooltip::after {
          content: '';
          position: absolute;
          bottom: -5px;
          width: 10px; height: 10px;
          background: #111;
          border-right: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transform: rotate(45deg);
        }

        /* Pill label that expands on hover */
        .wa-pill {
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #25D366 0%, #1DB954 55%, #128C7E 100%);
          border-radius: 999px;
          box-shadow:
            0 6px 24px rgba(37,211,102,0.48),
            0 2px 8px  rgba(0,0,0,0.22);
          overflow: hidden;
          cursor: pointer;
          text-decoration: none; color: #fff;
          height: 58px;
          padding: 0 18px 0 12px;
          transition: box-shadow .22s, transform .22s;
          position: relative;
        }
        .wa-pill:hover {
          transform: scale(1.04);
          box-shadow:
            0 10px 36px rgba(37,211,102,0.62),
            0 4px 12px  rgba(0,0,0,0.22);
        }
        .wa-pill-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .wa-pill-text {
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.01em; white-space: nowrap;
          opacity: 0; max-width: 0; overflow: hidden;
          transition: opacity .28s, max-width .32s ease;
        }
        .wa-pill:hover .wa-pill-text {
          opacity: 1; max-width: 140px;
        }
        .wa-pill-ping {
          position: absolute; inset: 0; border-radius: 999px;
          background: rgba(37,211,102,0.35);
          animation: waPing 2.4s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Fixed wrapper */}
      <div style={{
        position: 'fixed',
        bottom: 28,
        ...(isRTL ? { left: 24 } : { right: 24 }),
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRTL ? 'flex-start' : 'flex-end',
        gap: 10,
        pointerEvents: 'none',
      }}>

        {/* Tooltip */}
        {hovered && (
          <div
            className="wa-tooltip"
            style={{
              pointerEvents: 'none',
              ...(isRTL ? { marginLeft: 0 } : { marginRight: 0 }),
            }}
          >
            {TOOLTIP[lang]}
            <span className="wa-tooltip-arrow" style={{
              position: 'absolute',
              bottom: -5,
              ...(isRTL ? { left: 18 } : { right: 18 }),
              width: 10, height: 10,
              background: '#111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderTop: 'none', borderLeft: 'none',
              transform: 'rotate(45deg)',
            }} />
          </div>
        )}

        {/* Pill button */}
        <a
          href="https://wa.me/212661596586"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-pill"
          style={{
            pointerEvents: 'auto',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="WhatsApp"
        >
          <div className="wa-pill-ping" />

          {/* WhatsApp SVG icon */}
          <div className="wa-pill-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>

          {/* Expanding label */}
          <span className="wa-pill-text">{LABEL[lang]}</span>
        </a>
      </div>
    </>
  )
}
