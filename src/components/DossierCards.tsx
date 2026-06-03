import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ASSETS = [
  {
    id: 'EHX-001',
    title: 'AI Stack Checklist',
    classification: 'CONFIDENTIAL',
    pages: '12 checks',
    desc: 'The exact checks we run before any AI-generated code goes live. Every item a real failure we\'ve seen.',
    tag: 'Security',
    preview: [
      'Are your API keys exposed in the frontend bundle?',
      'Can any authenticated user read another user\'s data?',
      'Does your database have RLS enabled on every table?',
      'Is your AI-generated code logging sensitive user data?',
      'Are your environment variables committed to git?',
    ],
  },
  {
    id: 'EHX-002',
    title: 'Supabase Security Guide',
    classification: 'RESTRICTED',
    pages: '18 pages',
    desc: 'RLS, auth, and authorization patterns every non-technical founder needs to know before shipping.',
    tag: 'Auth & Data',
    preview: [
      'How to write RLS policies that actually block cross-user reads',
      'The 3 auth mistakes every non-technical founder makes at launch',
      'Storage buckets: when "public" silently exposes your whole database',
      'Why "I tested it and it worked" is not a security audit',
      'The one query that tells you if your app is leaking data right now',
    ],
  },
  {
    id: 'EHX-003',
    title: 'Production Readiness Audit',
    classification: 'CONFIDENTIAL',
    pages: '7-point audit',
    desc: 'Know exactly what to ask your developer. The 7 questions that separate "it runs" from "it\'s safe."',
    tag: 'Audit',
    preview: [
      '1. Error handling — what happens when AI code fails silently?',
      '2. Rate limiting — can anyone hammer your API at zero cost?',
      '3. Input validation — does your app trust user input it shouldn\'t?',
      '4. Session management — can sessions be hijacked or replayed?',
      '5. Dependency audit — are your packages broadcasting vulnerabilities?',
    ],
  },
  {
    id: 'EHX-004',
    title: 'Vibe-Coding Survival Guide',
    classification: 'TOP RESTRICTED',
    pages: '24 pages',
    desc: 'How to ship fast with AI without destroying the trust you spent years building. The playbook.',
    tag: 'Strategy',
    preview: [
      'The "it works on my machine" trap — why localhost lies to founders',
      'How to brief an AI agent so it doesn\'t silently skip security steps',
      'The review checklist your developer should be signing off on',
      'When to vibe-code and when to stop, call an expert, and ship later',
      'The exact moment AI confidence becomes a liability, not an asset',
    ],
  },
]

const CLS = {
  color: 'hsl(188 80% 28%)',
  bg: 'hsl(188 80% 28% / 0.08)',
  border: 'hsl(188 80% 28% / 0.3)',
}

function DossierCard({ asset, index, unlocked }: { asset: typeof ASSETS[0]; index: number; unlocked: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!unlocked) { setOpen(false); return }
    const t = setTimeout(() => setOpen(true), 600 + index * 900)
    return () => clearTimeout(t)
  }, [unlocked, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: 'hsl(0 0% 100%)',
        border: `1px solid ${open ? CLS.border : 'hsl(0 0% 86%)'}`,
        boxShadow: open
          ? '0 4px 24px hsl(188 80% 28% / 0.08)'
          : '0 2px 8px hsl(0 0% 0% / 0.06)',
        transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-4 w-14 h-1.5 rounded-b-sm"
        style={{ background: open ? CLS.color : 'hsl(0 0% 78%)', transition: 'background 0.5s ease' }}
      />

      {/* Header row */}
      <div
        className="px-4 pt-5 pb-3 flex items-start justify-between gap-2"
        style={{ borderBottom: '1px solid hsl(0 0% 92%)' }}
      >
        <div
          style={{
            filter: open ? 'blur(0px)' : 'blur(5px)',
            transition: 'filter 0.7s ease',
            userSelect: open ? 'auto' : 'none',
          }}
        >
          <p className="text-[8px] tracking-[0.22em] uppercase mb-1" style={{ color: 'hsl(0 0% 52%)', fontFamily: 'Merriweather, serif' }}>
            {asset.id}
          </p>
          <h3
            className="text-sm font-bold leading-snug"
            style={{ color: 'hsl(0 0% 8%)', fontFamily: 'Merriweather, serif' }}
          >
            {asset.title}
          </h3>
        </div>
        <div
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
          style={{
            background: open ? CLS.bg : 'hsl(0 0% 94%)',
            border: `1px solid ${open ? CLS.border : 'hsl(0 0% 84%)'}`,
            transition: 'all 0.5s',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {open ? (
              <path d="M2 5h6M5 2l3 3-3 3" stroke={CLS.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <rect x="2" y="4.5" width="6" height="4.5" rx="1" fill="hsl(0 0% 64%)" />
                <path d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5" stroke="hsl(0 0% 64%)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {/* Classification + pages */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[8px] tracking-[0.16em] uppercase px-2 py-0.5 rounded"
            style={{
              fontFamily: 'Merriweather, serif',
              color: open ? CLS.color : 'hsl(0 0% 44%)',
              background: open ? CLS.bg : 'hsl(0 0% 94%)',
              border: `1px solid ${open ? CLS.border : 'hsl(0 0% 86%)'}`,
              transition: 'all 0.5s',
            }}
          >
            {asset.classification}
          </span>
          <span className="text-[8px]" style={{ color: 'hsl(0 0% 48%)', fontFamily: 'Merriweather, serif' }}>
            {asset.pages}
          </span>
        </div>

        {/* Blurred content — always rendered, blur lifts on unlock */}
        <div
          style={{
            filter: open ? 'blur(0px)' : 'blur(4px)',
            transition: 'filter 0.7s ease',
            userSelect: open ? 'auto' : 'none',
          }}
        >
          {/* Bullet preview */}
          <ul className="space-y-1.5 mb-3">
            {asset.preview.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-[3px] shrink-0 w-1 h-1 rounded-full"
                  style={{ background: open ? CLS.color : 'hsl(0 0% 64%)' }}
                />
                <span
                  className="text-[10px] leading-snug"
                  style={{ color: 'hsl(0 0% 36%)', fontFamily: 'Merriweather, serif' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Tagline */}
          <p
            className="text-[9px] leading-relaxed italic border-t pt-2.5"
            style={{
              color: 'hsl(0 0% 50%)',
              fontFamily: 'Merriweather, serif',
              borderColor: 'hsl(0 0% 92%)',
            }}
          >
            {asset.desc}
          </p>
        </div>

        {/* Tag — stays legible as a teaser */}
        <div className="mt-3">
          <span
            className="text-[8px] tracking-widest uppercase"
            style={{ color: open ? CLS.color : 'hsl(0 0% 60%)', transition: 'color 0.5s', fontFamily: 'Merriweather, serif' }}
          >
            {open ? `▸ ${asset.tag}` : `▸ ${asset.tag}`}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function DossierCards({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {ASSETS.map((asset, i) => (
        <DossierCard key={asset.id} asset={asset} index={i} unlocked={unlocked} />
      ))}
    </div>
  )
}
