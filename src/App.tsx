import { useState, useEffect, lazy, Suspense } from 'react'
import { type Lang, langDir } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const Catalogue      = lazy(() => import('./components/Catalogue'))
const MarocMap       = lazy(() => import('./components/MarocMap'))
const SeedFeatures   = lazy(() => import('./components/SeedFeatures'))
const About          = lazy(() => import('./components/About'))
const Contact        = lazy(() => import('./components/Contact'))
const Footer         = lazy(() => import('./components/Footer'))

export default function App() {
  const [lang, setLang] = useState<Lang>('fr')

  useEffect(() => {
    document.documentElement.setAttribute('dir', langDir[lang])
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Suspense fallback={null}>
          <Catalogue lang={lang} />
          <MarocMap lang={lang} />
          <SeedFeatures lang={lang} />
          <About lang={lang} />
          <Contact lang={lang} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer lang={lang} />
      </Suspense>
    </>
  )
}
