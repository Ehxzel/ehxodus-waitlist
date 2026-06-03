import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-20 px-4 overflow-hidden"
      style={{ background: 'hsl(0 0% 100%)' }}
    >
      {/* Diagonal grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, hsl(0 0% 0% / 0.03) 0px, hsl(0 0% 0% / 0.03) 1px, transparent 1px, transparent 28px)',
          opacity: 1,
        }}
      />
      {/* Radial top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '320px',
          background: 'radial-gradient(ellipse at center top, hsl(188 100% 43% / 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span
            className="text-[9px] tracking-[0.28em] uppercase px-3 py-1.5 rounded"
            style={{
              fontFamily: 'Merriweather, serif',
              color: 'hsl(188, 100%, 43%)',
              background: 'hsl(188 100% 43% / 0.08)',
              border: '1px solid hsl(188 100% 43% / 0.2)',
            }}
          >
            ◈ For Non-Technical Founders
          </span>
          <div className="h-px w-10 shrink-0" style={{ background: 'hsl(188 100% 43% / 0.2)' }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.07] mb-7"
          style={{ fontFamily: 'Merriweather, serif', color: 'hsl(0 0% 8%)' }}
        >
          Your AI-generated code{' '}
          <span style={{ color: 'hsl(188 80% 30%)' }}>looked like it worked.</span>
          <br />
          <span style={{ color: 'hsl(0 0% 52%)' }}>It didn't.</span>
        </motion.h1>

        {/* Story pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease }}
          className="mb-9 pl-5 sm:pl-6"
          style={{ borderLeft: '3px solid hsl(188 80% 30% / 0.35)' }}
        >
          <p
            className="text-base md:text-lg lg:text-xl leading-[1.85] max-w-2xl"
            style={{ color: 'hsl(0 0% 34%)', fontFamily: 'Merriweather, serif' }}
          >
            A senior executive had a full coding agent running in his browser. Backend logs firing.
            Frontend ports active. Everything{' '}
            <span style={{ color: 'hsl(0 0% 22%)' }}>looked</span> live. We opened Supabase.{' '}
            <span style={{ color: 'hsl(0 0% 8%)', fontWeight: 700 }}>
              It was blank. Not a single record.
            </span>{' '}
            The AI had been lying the whole time.
          </p>
        </motion.div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease }}
          className="text-base md:text-lg leading-[1.82] max-w-xl mb-12"
          style={{ color: 'hsl(0 0% 36%)', fontFamily: 'Merriweather, serif' }}
        >
          No serious team has ever pushed pure AI-generated code to production without an expert
          reviewing it first. Not one.{' '}
          <span style={{ color: 'hsl(0 0% 10%)', fontWeight: 700 }}>
            Your reputation took years to build. It can become dust in an afternoon.
          </span>{' '}
          Here's the free stack that keeps that from happening.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4, ease }}
          className="flex flex-wrap gap-8 items-end mb-10"
        >
          {[
            { val: '4', label: 'Free Resources' },
            { val: '$0', label: 'Cost to access' },
            { val: '5 days', label: 'Access window' },
          ].map((s, i) => (
            <div key={i}>
              <p
                className="text-2xl font-bold leading-none mb-1"
                style={{ color: 'hsl(188 80% 30%)', fontFamily: 'Merriweather, serif' }}
              >
                {s.val}
              </p>
              <p className="text-[8px] uppercase tracking-widest" style={{ color: 'hsl(0 0% 44%)', fontFamily: 'Merriweather, serif' }}>
                {s.label}
              </p>
            </div>
          ))}

          <div className="ml-auto hidden md:flex items-center gap-3">
            <div className="h-px w-8" style={{ background: 'hsl(0 0% 14%)' }} />
            <span className="text-[8px] uppercase tracking-widest" style={{ color: 'hsl(0 0% 52%)', fontFamily: 'Merriweather, serif' }}>
              Scroll to unlock
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'hsl(0 0% 52%)', fontSize: 10 }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>

        {/* 5-day offer countdown — centered, bomb-timer style */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.55, ease }}
          className="w-full"
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </section>
  )
}
