import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  visible: boolean
  onDismiss: () => void
}

export default function Toast({ message, type = 'success', visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-xs rounded-xl px-5 py-4 shadow-2xl"
          style={{
            background: 'hsl(0 0% 7%)',
            border: `1px solid ${type === 'success' ? 'hsl(120 55% 44% / 0.3)' : 'hsl(0 60% 44% / 0.3)'}`,
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="font-mono text-sm shrink-0 mt-0.5"
              style={{ color: type === 'success' ? 'hsl(120 55% 54%)' : 'hsl(0 60% 54%)' }}
            >
              {type === 'success' ? '✓' : '!'}
            </span>
            <p className="font-mono text-[11px] leading-relaxed flex-1" style={{ color: 'hsl(0 0% 65%)' }}>
              {message}
            </p>
            <button
              onClick={onDismiss}
              className="shrink-0 font-mono text-[10px] mt-0.5 hover:opacity-70 transition-opacity"
              style={{ color: 'hsl(0 0% 30%)' }}
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
