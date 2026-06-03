import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { track } from '../lib/posthog'

const MRW = 'Merriweather, serif'

const ITEMS = [
  {
    q: 'Is this actually free?',
    a: 'Yes. No credit card, no trial period, no upsell sequence. Sign up and the 4 documents land in your inbox. That\'s the entire transaction.',
  },
  {
    q: 'What exactly is in the intel package?',
    a: 'Four documents: an AI Stack Checklist (12 checks your codebase should pass before you go live), a Supabase Security Guide ( article on RLS, auth, and storage), a Production Readiness Audit (7 questions that separate "it runs" from "it\'s safe"), and the Vibe-Coding Survival Guide (10+ pages on shipping fast with AI without destroying your reputation). All built from real audit work.',
  },
  {
    q: 'Who is this for?',
    a: 'Non-technical founders who are building with AI tools - Cursor, Claude, Bolt, Lovable, v0, or any coding agent. If you\'re shipping product you didn\'t personally write line-by-line, this is for you.',
  },
  {
    q: 'Will I get more emails after this?',
    a: 'No. You receive one email containing the intel package. That\'s it. Ehxodus is not a newsletter, not a drip sequence, not a course funnel. One delivery.',
  },
  {
    q: 'Why does the offer close after 5 days?',
    a: 'This offer is tied to a specific LinkedIn post. The window opened on a specific date and closes on a specific date. If you miss it, reach out directly via the Book a Call panel and we\'ll figure something out.',
  },
  {
    q: 'Who / What is Ehxodus?',
    a: 'Ehxodus finds where service businesses are bleeding revenue as they scale, then closes the gap with AI, automation, and custom software so revenue grows and deals close without the founder becoming the bottleneck. The intel package is a free starting point: the exact resources we use to make sure the technical side of your business isn\'t quietly costing you.',
  },
]

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof ITEMS)[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderBottom: '1px solid hsl(0 0% 88%)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span
          className="text-base font-bold leading-snug"
          style={{ color: 'hsl(0 0% 10%)', fontFamily: MRW }}
        >
          {item.q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5 transition-colors"
          style={{
            background: isOpen ? 'hsl(188 80% 28% / 0.1)' : 'hsl(0 0% 92%)',
            color: isOpen ? 'hsl(188 80% 28%)' : 'hsl(0 0% 44%)',
            border: `1px solid ${isOpen ? 'hsl(188 80% 28% / 0.3)' : 'hsl(0 0% 84%)'}`,
            fontFamily: MRW,
          }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-5 text-sm md:text-base leading-[1.8]"
              style={{ color: 'hsl(0 0% 36%)', fontFamily: MRW }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => {
    const opening = open !== i
    setOpen((prev) => (prev === i ? null : i))
    if (opening) track('faq_opened', { question: ITEMS[i].q })
  }

  return (
    <ScrollReveal>
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[9px] tracking-[0.28em] uppercase px-2 py-1 rounded"
              style={{
                fontFamily: MRW,
                color: 'hsl(188 80% 28%)',
                background: 'hsl(188 80% 28% / 0.08)',
                border: '1px solid hsl(188 80% 28% / 0.2)',
              }}
            >
              ◈ Common Questions
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: MRW, color: 'hsl(0 0% 8%)' }}
          >
            Still on the fence?
          </h2>
        </div>

        <div style={{ borderTop: '1px solid hsl(0 0% 88%)' }}>
          {ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* LinkedIn */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.linkedin.com/in/ehuike-njoetele-ehxzel/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-200"
            style={{
              border: '1px solid hsl(0 0% 86%)',
              color: 'hsl(0 0% 40%)',
              fontFamily: MRW,
              textDecoration: 'none',
              background: 'hsl(0 0% 100%)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'hsl(211 75% 46% / 0.5)'
              el.style.color = 'hsl(211 75% 40%)'
              el.style.background = 'hsl(211 75% 46% / 0.05)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'hsl(0 0% 86%)'
              el.style.color = 'hsl(0 0% 40%)'
              el.style.background = 'hsl(0 0% 100%)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-bold">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}
