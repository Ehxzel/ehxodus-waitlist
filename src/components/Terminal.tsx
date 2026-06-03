import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  "Verifying submission...",
  "Indexing AI Stack Checklist...",
  "Indexing Supabase Security Guide...",
  "Indexing Production Readiness Audit...",
  "Indexing Vibe-Coding Survival Guide...",
  "Compiling your intel package...",
  "Transmitting to secure inbox...",
]

interface TerminalProps {
  timeLeft: number
  msgIndex: number
  isComplete: boolean
  total: number
}

export default function Terminal({ timeLeft, msgIndex, isComplete, total }: TerminalProps) {
  const progress = 1 - timeLeft / total
  const R = 36
  const CIRC = 2 * Math.PI * R

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'hsl(0 0% 5%)',
        border: '1px solid hsl(0 0% 12%)',
        fontFamily: 'Merriweather, serif',
      }}
    >
      {/* Top bar */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: '1px solid hsl(0 0% 10%)', background: 'hsl(0 0% 4%)' }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? 'hsl(0 60% 45%)' : i === 1 ? 'hsl(40 60% 45%)' : 'hsl(120 40% 38%)',
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] tracking-widest uppercase ml-1" style={{ color: 'hsl(0 0% 28%)' }}>
          ehxodus — secure-transmit
        </span>
        <motion.div
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ background: isComplete ? 'hsl(120 55% 42%)' : 'hsl(188, 100%, 43%)' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-6">
          {/* Arc progress ring */}
          <div className="relative shrink-0">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r={R} fill="none" stroke="hsl(0 0% 11%)" strokeWidth="5" />
              <circle
                cx="44" cy="44" r={R}
                fill="none"
                stroke={isComplete ? 'hsl(120 55% 44%)' : 'hsl(188, 100%, 43%)'}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * (1 - progress)}
                transform="rotate(-90 44 44)"
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isComplete ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ color: 'hsl(120 55% 50%)', fontSize: 22 }}
                >
                  ✓
                </motion.span>
              ) : (
                <>
                  <span className="font-mono text-base font-bold leading-none" style={{ color: 'hsl(0 0% 82%)' }}>
                    {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[8px] mt-0.5 uppercase tracking-widest" style={{ color: 'hsl(0 0% 30%)' }}>
                    remaining
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Status log */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={isComplete ? 'done' : msgIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'hsl(0 0% 30%)' }}>
                  {isComplete ? 'STATUS' : 'PROCESS'}
                </p>
                <p className="font-mono text-xs leading-relaxed" style={{ color: isComplete ? 'hsl(120 55% 54%)' : 'hsl(188, 100%, 43%)' }}>
                  {isComplete
                    ? 'Package transmitted. Check your inbox.'
                    : MESSAGES[Math.min(msgIndex, MESSAGES.length - 1)]}
                  {!isComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    >
                      ▌
                    </motion.span>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 w-full h-0.5 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 10%)' }}>
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
                style={{ background: isComplete ? 'hsl(120 55% 44%)' : 'hsl(188, 100%, 43%)' }}
              />
            </div>
          </div>
        </div>

        {/* Log history */}
        <div className="mt-4 space-y-1 pt-3" style={{ borderTop: '1px solid hsl(0 0% 9%)' }}>
          {MESSAGES.slice(0, Math.min(msgIndex + 1, MESSAGES.length)).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[8px]" style={{ color: 'hsl(0 0% 22%)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-mono text-[9px]"
                style={{ color: i === msgIndex ? 'hsl(0 0% 44%)' : 'hsl(0 0% 22%)' }}
              >
                {i < msgIndex ? '✓ ' : '→ '}{msg}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
