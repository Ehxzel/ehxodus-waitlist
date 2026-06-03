import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { track, identify } from '../lib/posthog'
import Terminal from './Terminal'
import CountdownTimer from './CountdownTimer'

const LS_KEY = 'ehx_waitlist_submitted_at'
const TERMINAL_TOTAL = 15
const MSG_COUNT = 7

const MRW: React.CSSProperties = { fontFamily: 'Merriweather, serif' }

interface FormState {
  name: string
  email: string
  linkedIn: string
  building: string
  challenge: string
}

interface WaitlistFormProps {
  onUnlock: () => void
}

export default function WaitlistForm({ onUnlock }: WaitlistFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', linkedIn: '', building: '', challenge: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)

  const [termTime, setTermTime] = useState(TERMINAL_TOTAL)
  const [msgIndex, setMsgIndex] = useState(0)
  const termComplete = termTime === 0

  const stableOnUnlock = useCallback(onUnlock, [])

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      const ts = parseInt(stored, 10)
      if (ts > 0) {
        setSubmitted(true)
        setShowCountdown(true)
        setTermTime(0)
        stableOnUnlock()
      }
    }
  }, [stableOnUnlock])

  useEffect(() => {
    if (!submitted || showCountdown) return
    const id = setInterval(() => {
      setTermTime((t) => {
        if (t <= 1) {
          clearInterval(id)
          setTimeout(() => setShowCountdown(true), 500)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [submitted, showCountdown])

  useEffect(() => {
    if (!submitted || showCountdown) return
    const intervalMs = Math.floor((TERMINAL_TOTAL * 1000) / MSG_COUNT)
    const id = setInterval(() => {
      setMsgIndex((m) => Math.min(m + 1, MSG_COUNT - 1))
    }, intervalMs)
    return () => clearInterval(id)
  }, [submitted, showCountdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setIsLoading(true)
    setError(null)

    try {
      const now = Date.now()
      await addDoc(collection(db, 'waitlist'), {
        name: form.name,
        email: form.email,
        linkedIn: form.linkedIn,
        building: form.building,
        challenge: form.challenge,
        submittedAt: serverTimestamp(),
        source: 'linkedin-post',
      })
      localStorage.setItem(LS_KEY, String(now))
      identify(form.email, {
        name: form.name,
        linkedIn: form.linkedIn,
        building: form.building,
        source: 'linkedin-waitlist',
      })
      track('waitlist_signed_up', {
        name: form.name,
        email: form.email,
        has_linkedin: !!form.linkedIn,
        has_building: !!form.building,
        has_challenge: !!form.challenge,
      })
      setSubmitted(true)
      onUnlock()
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? `Submission failed: ${err.message}`
          : 'Something went wrong. Check your Firebase config in .env'
      )
    } finally {
      setIsLoading(false)
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
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'hsl(0 0% 7%)',
            border: '1px solid hsl(188 80% 40% / 0.35)',
            boxShadow: '0 8px 40px hsl(0 0% 0% / 0.28), 0 0 0 1px hsl(188 80% 40% / 0.12)',
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
              ehxodus — clearance-portal
            </span>
          </div>

          <div className="p-6">
            <p className="text-[9px] tracking-[0.2em] uppercase mb-1" style={{ ...MRW, color: 'hsl(0 0% 30%)' }}>
              ▸ Requesting access to 4 restricted assets
            </p>
            <p className="text-xs mb-5 flex items-center gap-0.5" style={{ ...MRW, color: 'hsl(188 80% 55%)' }}>
              Secure your spot on the waitlist.
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>▌</motion.span>
            </p>

            {/* What happens next */}
            <div
              className="mb-6 rounded-xl px-5 py-5 space-y-4"
              style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}
            >
              <p className="text-[9px] uppercase tracking-[0.22em]" style={{ ...MRW, color: 'hsl(0 0% 34%)' }}>
                What happens after you sign up
              </p>
              {[
                'Fill in the form below',
                'Receive an email with all 4 documents',
                'The resources are yours to keep. No further emails.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: 'hsl(188 80% 28% / 0.2)', color: 'hsl(188 80% 55%)', fontFamily: 'Merriweather, serif' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ ...MRW, color: 'hsl(0 0% 58%)' }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
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
                value={form.building}
                onChange={(e) => setForm({ ...form, building: e.target.value })}
                placeholder="What are you building?"
                rows={2}
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm resize-none"
                style={fieldStyle}
              />
              <textarea
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                placeholder="What's your biggest challenge right now?"
                rows={2}
                disabled={isLoading}
                className="w-full px-4 py-3 text-sm resize-none"
                style={fieldStyle}
              />

              {error && (
                <div
                  className="p-3 rounded-lg text-[11px] leading-relaxed"
                  style={{
                    ...MRW,
                    background: 'hsl(0 60% 40% / 0.1)',
                    border: '1px solid hsl(0 60% 40% / 0.3)',
                    color: 'hsl(0 60% 55%)',
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-sm uppercase tracking-widest font-bold transition-opacity"
                style={{
                  ...MRW,
                  background: isLoading ? 'hsl(188 80% 36% / 0.45)' : 'hsl(188 80% 36%)',
                  color: 'hsl(0 0% 100%)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.12em',
                }}
              >
                {isLoading ? 'Requesting clearance...' : 'Secure My Spot'}
              </button>
            </form>

            <p className="text-[8px] mt-4 leading-relaxed" style={{ ...MRW, color: 'hsl(0 0% 26%)' }}>
              No spam. No sequences. Just the stack, delivered once.
            </p>
          </div>
        </motion.div>

      ) : !showCountdown ? (
        <motion.div
          key="terminal"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal
            timeLeft={termTime}
            msgIndex={msgIndex}
            isComplete={termComplete}
            total={TERMINAL_TOTAL}
          />
        </motion.div>

      ) : (
        <motion.div
          key="countdown"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: 'hsl(120 55% 44% / 0.07)', border: '1px solid hsl(120 55% 44% / 0.2)' }}
          >
            <span style={{ color: 'hsl(120 55% 40%)', fontSize: 16 }}>✓</span>
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ ...MRW, color: 'hsl(120 55% 36%)' }}>
                You're on the list{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
              </p>
              <p className="text-[9px]" style={{ ...MRW, color: 'hsl(0 0% 36%)' }}>
                Intel package incoming. Check your inbox.
              </p>
            </div>
          </motion.div>

          <CountdownTimer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
