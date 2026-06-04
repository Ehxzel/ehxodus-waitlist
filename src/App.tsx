import { useState, useCallback } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import DossierCards from './components/DossierCards'
import WaitlistForm from './components/WaitlistForm'
import DirectContactPanel from './components/DirectContactPanel'
import ScrollReveal from './components/ScrollReveal'
import FAQ from './components/FAQ'
import { isFirebaseConfigured } from './lib/firebase'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const handleUnlock = useCallback(() => setUnlocked(true), [])

  return (
    <div className="min-h-screen" style={{ background: 'hsl(0 0% 98%)' }}>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-4 py-4"
        style={{
          borderBottom: '1px solid hsl(0 0% 88%)',
          background: 'hsl(0 0% 100% / 0.95)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Ehxodus"
              className="w-8 h-8 rounded-md object-cover"
            />
            <span
              className="text-xs tracking-[0.22em] uppercase"
              style={{ color: 'hsl(0 0% 20%)', fontFamily: 'Merriweather, serif' }}
            >
              EHXODUS
            </span>
          </div>
          <a
            href="https://calendly.com/contact-ehxodus/60min?month=2026-06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded transition-colors"
            style={{
              fontFamily: 'Merriweather, serif',
              border: '1px solid hsl(188 80% 30% / 0.5)',
              color: 'hsl(188 80% 30%)',
            }}
          >
            Book a call
          </a>
        </div>
      </nav>

      {/* Firebase config warning — only visible when .env is missing */}
      {!isFirebaseConfigured && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex items-center gap-3"
          style={{
            background: 'hsl(40 90% 48%)',
            borderTop: '1px solid hsl(40 90% 38%)',
          }}
        >
          <span style={{ fontSize: 16 }}>⚠</span>
          <p className="text-sm font-bold flex-1" style={{ color: 'hsl(0 0% 8%)', fontFamily: 'Merriweather, serif' }}>
            Firebase is not configured — form submissions will fail.
          </p>
          <span className="text-xs" style={{ color: 'hsl(0 0% 14%)', fontFamily: 'Merriweather, serif' }}>
            Copy <code className="px-1 rounded" style={{ background: 'hsl(40 90% 38%)', fontFamily: 'monospace' }}>.env.example</code> → <code className="px-1 rounded" style={{ background: 'hsl(40 90% 38%)', fontFamily: 'monospace' }}>.env</code> and add your Firebase credentials.
          </span>
        </div>
      )}

      {/* Hero */}
      <Hero />

      {/* Credibility bridge */}
      <div
        className="py-12 px-4"
        style={{ background: 'hsl(0 0% 100%)', borderBottom: '1px solid hsl(0 0% 90%)' }}
      >
        <ScrollReveal>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

            {/* Statement */}
            <div className="flex-1">
              
              <p
                className="text-base md:text-lg leading-[1.85]"
                style={{ color: 'hsl(0 0% 28%)', fontFamily: 'Merriweather, serif' }}
              >
                We work directly with non-technical founders who are shipping with AI. Not as a newsletter, but an actual technical oversight. The 4 documents in this package are a distilled version of the same audit we run at the start of every engagement.
              </p>
            </div>

            {/* Proof points */}
            <div className="flex flex-row md:flex-col gap-6 md:gap-5 shrink-0">
              {[
                { label: 'Built from real audit work', sub: 'Every item is a failure we\'ve seen' },
                { label: 'One email. Nothing more.', sub: 'No sequences, no upsells' },
                { label: 'Free. No strings.', sub: 'No credit card, no trial' },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'hsl(188 80% 30%)' }}
                  />
                  <div>
                    <p
                      className="text-sm font-bold leading-snug"
                      style={{ color: 'hsl(0 0% 10%)', fontFamily: 'Merriweather, serif' }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: 'hsl(0 0% 48%)', fontFamily: 'Merriweather, serif' }}
                    >
                      {p.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </div>

      {/* Main section */}
      <div
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ background: 'hsl(0 0% 96%)' }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, hsl(0 0% 0% / 0.02) 0px, hsl(0 0% 0% / 0.02) 1px, transparent 1px, transparent 28px)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section header */}
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[9px] tracking-[0.28em] uppercase px-2 py-1 rounded"
                style={{
                  fontFamily: 'Merriweather, serif',
                  color: 'hsl(188 80% 28%)',
                  background: 'hsl(188 80% 28% / 0.08)',
                  border: '1px solid hsl(188 80% 28% / 0.2)',
                }}
              >
                ◈ Clearance Required
              </span>
              <div className="h-px w-10" style={{ background: 'hsl(188 80% 28% / 0.2)' }} />
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ fontFamily: 'Merriweather, serif', color: 'hsl(0 0% 8%)' }}
            >
              What's inside the{' '}
              <span style={{ color: 'hsl(188 80% 28%)' }}>intel package</span>
            </h2>
            <p
              className="text-base md:text-lg leading-[1.82] max-w-xl mb-12"
              style={{ color: 'hsl(0 0% 36%)', fontFamily: 'Merriweather, serif', lineHeight: 1.7 }}
            >
              Four resources built for founders who want to ship with AI and not blow up their
              reputation doing it. Sign up below to unlock them.
            </p>
          </ScrollReveal>

          {/* Dossier cards */}
          <ScrollReveal delay={0.1} className="mb-14">
            <DossierCards unlocked={unlocked} />
          </ScrollReveal>

          {/* Divider */}
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'hsl(0 0% 82%)' }} />
            <span
              className="text-[8px] tracking-[0.24em] uppercase py-3"
              style={{ color: 'hsl(0 0% 44%)', fontFamily: 'Merriweather, serif' }}
            >
              Choose your path
            </span>
            <div className="h-px flex-1" style={{ background: 'hsl(0 0% 82%)' }} />
          </div>

          {/* Two CTA panels — dark on light page for maximum visibility */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Left — Waitlist */}
            <ScrollReveal delay={0.05}>
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: 'hsl(188 80% 30%)' }} />
                  <span
                    className="text-[9px] tracking-widest uppercase"
                    style={{ color: 'hsl(188 80% 30%)', fontFamily: 'Merriweather, serif' }}
                  >
                    Option 1 — Join the list
                  </span>
                </div>
                <h3
                  className="text-xl font-bold leading-tight mb-1"
                  style={{ fontFamily: 'Merriweather, serif', color: 'hsl(0 0% 8%)' }}
                >
                  Secure your spot
                </h3>
                <p
                  className="text-base md:text-lg leading-[1.82] max-w-xl mb-12"
                  style={{ color: 'hsl(0 0% 36%)', fontFamily: 'Merriweather, serif', lineHeight: 1.65 }}
                >
                  Get the full intel package delivered to your inbox. 5-day access window. Sign up now.
                </p>
              </div>
              <WaitlistForm onUnlock={handleUnlock} />
            </ScrollReveal>

            {/* Right — Direct contact */}
            <ScrollReveal delay={0.15}>
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: 'hsl(40 90% 40%)' }} />
                  <span
                    className="text-[9px] tracking-widest uppercase"
                    style={{ color: 'hsl(40 90% 40%)', fontFamily: 'Merriweather, serif' }}
                  >
                    Option 2 — Talk directly
                  </span>
                </div>
                <h3
                  className="text-xl font-bold leading-tight mb-1"
                  style={{ fontFamily: 'Merriweather, serif', color: 'hsl(0 0% 8%)' }}
                >
                  Book a call
                </h3>
                <p
                  className="text-base md:text-lg leading-[1.82] max-w-xl mb-12"
                  style={{ color: 'hsl(0 0% 36%)', fontFamily: 'Merriweather, serif', lineHeight: 1.65 }}
                >
                  Shipping now and need expert eyes on your codebase? <br></br>Skip the list and let's talk.
                </p>
              </div>
              <DirectContactPanel />
            </ScrollReveal>
          </div>

          {/* FAQ */}
          <div className="mt-20 pt-16" style={{ borderTop: '1px solid hsl(0 0% 84%)' }}>
            <FAQ />
          </div>

          {/* Footer bar */}
          <ScrollReveal delay={0.2}>
            <div
              className="mt-16 pt-5 flex items-center gap-4"
              style={{ borderTop: '1px solid hsl(0 0% 84%)' }}
            >
              <div className="h-px flex-1" style={{ background: 'hsl(0 0% 84%)' }} />
              <span
                className="text-[8px] tracking-[0.26em] uppercase text-center"
                style={{ color: 'hsl(0 0% 48%)', fontFamily: 'Merriweather, serif' }}
              >
                EHXODUS INTEL PACKAGE © 2026
              </span>
              <div className="h-px flex-1" style={{ background: 'hsl(0 0% 84%)' }} />
            </div>
            <p className="text-[8px] text-center mt-3" style={{ color: 'hsl(0 0% 54%)', fontFamily: 'Merriweather, serif' }}>
              © 2026 Ehxodus · All rights reserved
            </p>
          </ScrollReveal>
        </div>
      </div>
      <Analytics />
    </div>
  )
}
