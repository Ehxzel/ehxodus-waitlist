import { useState, useEffect, Fragment } from 'react'
import { motion } from 'framer-motion'

// Offer closes 5 days after launch (2026-06-03)
const DEADLINE = new Date('2026-06-09T00:00:00Z').getTime()

const DIGIT_FONT: React.CSSProperties = {
  fontFamily: 'Orbitron, monospace',
  fontStyle: 'italic',
  fontWeight: 900,
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function computeTimeLeft(): TimeLeft {
  const remaining = Math.max(0, DEADLINE - Date.now())
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, expired: remaining === 0 }
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(computeTimeLeft)

  useEffect(() => {
    if (time.expired) return
    const id = setInterval(() => setTime(computeTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [time.expired])

  if (time.expired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-2xl p-8 text-center"
        style={{ background: 'hsl(0 0% 6%)', border: '2px solid hsl(0 60% 45% / 0.6)' }}
      >
        <p className="text-xl font-bold mb-2" style={{ ...DIGIT_FONT, color: 'hsl(0 60% 55%)' }}>
          ACCESS WINDOW CLOSED
        </p>
        <p className="text-sm" style={{ color: 'hsl(0 0% 44%)', fontFamily: 'Merriweather, serif' }}>
          The 5-day offer has ended.
        </p>
      </motion.div>
    )
  }

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HRS', value: time.hours },
    { label: 'MIN', value: time.minutes },
    { label: 'SEC', value: time.seconds },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: 'hsl(0 0% 5%)',
        border: '1px solid hsl(0 0% 14%)',
        boxShadow: '0 0 60px hsl(188 100% 43% / 0.08), inset 0 1px 0 hsl(0 0% 14%)',
      }}
    >
      {/* Top bar */}
      <div
        className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2"
        style={{ borderBottom: '1px solid hsl(0 0% 11%)', background: 'hsl(0 0% 4%)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <motion.div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: 'hsl(0 70% 50%)' }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          {/* Full label on sm+, short label on mobile */}
          <span
            className="hidden sm:block text-[9px] uppercase tracking-[0.22em] truncate"
            style={{ color: 'hsl(0 0% 35%)', fontFamily: 'Merriweather, serif' }}
          >
            This offer is open for 5 days only
          </span>
          <span
            className="block sm:hidden text-[9px] uppercase tracking-[0.1em]"
            style={{ color: 'hsl(0 0% 35%)', fontFamily: 'Merriweather, serif' }}
          >
            5-day offer window
          </span>
        </div>
        <span
          className="text-[9px] uppercase tracking-widest shrink-0"
          style={{ color: 'hsl(0 70% 50%)', fontFamily: 'Merriweather, serif' }}
        >
          LIVE
        </span>
      </div>

      {/* Digits — fluid 7-col grid: [digit colon digit colon digit colon digit] */}
      <div className="px-3 sm:px-6 py-5 sm:py-8">
        <div
          className="grid items-end"
          style={{ gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: '0 4px' }}
        >
          {units.map(({ label, value }, idx) => (
            <Fragment key={label}>
              {/* Digit block */}
              <div className="flex flex-col items-center w-full">
                <motion.div
                  key={`${label}-${value}`}
                  initial={{ opacity: 0.4, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="relative w-full py-3 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center"
                  style={{
                    background: 'hsl(0 0% 7%)',
                    border: '1px solid hsl(0 0% 13%)',
                  }}
                >
                  {/* Ghost digits */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl md:text-6xl select-none pointer-events-none"
                    style={{ ...DIGIT_FONT, color: 'hsl(188 100% 43% / 0.07)' }}
                    aria-hidden
                  >
                    88
                  </span>
                  {/* Live digits */}
                  <span
                    className="relative text-3xl sm:text-5xl md:text-6xl tabular-nums"
                    style={{ ...DIGIT_FONT, color: 'hsl(188 100% 43%)' }}
                  >
                    {String(value).padStart(2, '0')}
                  </span>
                </motion.div>
                <span
                  className="mt-1.5 text-[7px] sm:text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: 'hsl(0 0% 30%)', fontFamily: 'Merriweather, serif' }}
                >
                  {label}
                </span>
              </div>

              {/* Colon separator */}
              {idx < units.length - 1 && (
                <motion.span
                  className="pb-5 sm:pb-6 text-xl sm:text-3xl md:text-5xl font-bold self-center"
                  style={{ ...DIGIT_FONT, color: 'hsl(188 100% 43% / 0.5)', display: 'block', textAlign: 'center' }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  :
                </motion.span>
              )}
            </Fragment>
          ))}
        </div>

        <p
          className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs"
          style={{ color: 'hsl(0, 100%, 50%)', fontFamily: 'Merriweather, serif', letterSpacing: '0.04em' }}
        >
          Sign up before this window closes to unlock the full intel package.
        </p>
      </div>
    </motion.div>
  )
}
