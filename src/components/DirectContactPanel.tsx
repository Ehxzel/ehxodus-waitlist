import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Toast from './Toast'
import { track, identify } from '../lib/posthog'

const CALENDLY_URL = 'https://calendly.com/contact-ehxodus/60min?month=2026-06'
const MRW: React.CSSProperties = { fontFamily: 'Merriweather, serif' }

interface DirectForm {
  name: string
  email: string
  linkedIn: string
  situation: string
}

export default function DirectContactPanel() {
  const [form, setForm] = useState<DirectForm>({ name: '', email: '', linkedIn: '', situation: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setIsLoading(true)

    try {
      await addDoc(collection(db, 'direct_inquiries'), {
        name: form.name,
        email: form.email,
        linkedIn: form.linkedIn,
        situation: form.situation,
        submittedAt: serverTimestamp(),
        source: 'linkedin-post',
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      setSubmitted(true)
      identify(form.email, {
        name: form.name,
        linkedIn: form.linkedIn,
        source: 'linkedin-direct',
      })
      track('direct_inquiry_submitted', {
        name: form.name,
        email: form.email,
        has_linkedin: !!form.linkedIn,
        has_situation: !!form.situation,
      })
      setToast({ visible: true, message: "Got it. Opening Calendly now — talk soon.", type: 'success' })
      setTimeout(() => window.open(CALENDLY_URL, '_blank'), 700)
    }
  }

  const fieldStyle: React.CSSProperties = {
    background: 'hsl(0 0% 8%)',
    border: '1px solid hsl(0 0% 18%)',
    color: 'hsl(0 0% 86%)',
    borderRadius: '10px',
    opacity: isLoading ? 0.55 : 1,
    fontFamily: 'Merriweather, serif',
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div
        className="rounded-2xl overflow-hidden h-full"
        style={{
          background: 'hsl(0 0% 7%)',
          border: '1px solid hsl(40 90% 50% / 0.35)',
          boxShadow: '0 8px 40px hsl(0 0% 0% / 0.28), 0 0 0 1px hsl(40 90% 50% / 0.12)',
        }}
      >
        <div
          className="px-5 py-3 flex items-center gap-2"
          style={{ borderBottom: '1px solid hsl(0 0% 11%)', background: 'hsl(0 0% 5%)' }}
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: i === 0 ? 'hsl(0 60% 40%)' : i === 1 ? 'hsl(40 60% 40%)' : 'hsl(120 40% 34%)' }}
              />
            ))}
          </div>
          <span className="text-[9px] tracking-widest uppercase ml-1" style={{ ...MRW, color: 'hsl(0 0% 30%)' }}>
            ehxodus — direct-line
          </span>
          <div
            className="ml-auto px-2 py-0.5 rounded text-[8px] uppercase tracking-widest"
            style={{
              ...MRW,
              background: 'hsl(40 90% 50% / 0.12)',
              border: '1px solid hsl(40 90% 50% / 0.3)',
              color: 'hsl(40 90% 60%)',
            }}
          >
            Priority
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="p-6"
            >
              <div className="mb-6">
                <h3
                  className="text-xl font-bold mb-3 leading-tight"
                  style={{ ...MRW, color: 'hsl(0 0% 90%)' }}
                >
                  Skip the list.
                </h3>
                <p className="text-base leading-[1.75]" style={{ ...MRW, color: 'hsl(0 0% 46%)' }}>
                  If you're shipping now and need expert eyes on your codebase, let's get on a call. Tell me what's going on and we'll figure it out together.
                </p>
              </div>

              <div className="mb-6 space-y-3">
                {[
                  'Auth logic that actually works',
                  'RLS configured correctly',
                  'No silent data leaks between users',
                  'Production-ready, not just "running"',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'hsl(40 90% 55%)' }} />
                    <span className="text-sm" style={{ ...MRW, color: 'hsl(0 0% 50%)' }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  disabled={isLoading}
                  className="w-full h-11 px-4 text-sm"
                  style={fieldStyle}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                  className="w-full h-11 px-4 text-sm"
                  style={fieldStyle}
                />
                <input
                  type="text"
                  value={form.linkedIn}
                  onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                  placeholder="linkedin.com/in/yourname"
                  disabled={isLoading}
                  className="w-full h-11 px-4 text-sm"
                  style={fieldStyle}
                />
                <textarea
                  value={form.situation}
                  onChange={(e) => setForm({ ...form, situation: e.target.value })}
                  placeholder="Describe your situation and what you need help with..."
                  rows={4}
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-sm resize-none"
                  style={fieldStyle}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-sm uppercase tracking-widest font-bold transition-all"
                  style={{
                    ...MRW,
                    background: 'hsl(40 90% 48% / 0.14)',
                    border: '1px solid hsl(40 90% 55% / 0.45)',
                    color: isLoading ? 'hsl(40 90% 45%)' : 'hsl(40 90% 70%)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.1em',
                  }}
                >
                  {isLoading ? 'Sending...' : 'Book a Call'}
                </button>
              </form>

              <p className="text-[13px] mt-4" style={{ ...MRW, color: 'hsl(0 0% 26%)' }}>
                Your details are saved first. Then Calendly opens in a new tab.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="p-6"
            >
              <div
                className="rounded-xl p-5 mb-4 text-center"
                style={{
                  background: 'hsl(40 90% 55% / 0.07)',
                  border: '1px solid hsl(40 90% 55% / 0.22)',
                }}
              >
                <p className="text-sm font-semibold mb-2" style={{ ...MRW, color: 'hsl(40 90% 65%)' }}>
                  ✓ Message received.
                </p>
                <p className="text-[10px] leading-relaxed" style={{ ...MRW, color: 'hsl(0 0% 40%)' }}>
                  Calendly should be open in a new tab. If not,{' '}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'hsl(40 90% 60%)', textDecoration: 'underline' }}
                  >
                    click here to book
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-2 pt-3" style={{ borderTop: '1px solid hsl(0 0% 12%)' }}>
                {[
                  { label: 'Name', value: form.name },
                  { label: 'Email', value: form.email },
                ].filter(({ value }) => value).map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-[8px] uppercase tracking-widest w-12 shrink-0" style={{ ...MRW, color: 'hsl(0 0% 32%)' }}>
                      {label}
                    </span>
                    <span className="text-[10px]" style={{ ...MRW, color: 'hsl(0 0% 50%)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
