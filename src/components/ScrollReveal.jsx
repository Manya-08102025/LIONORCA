import React from 'react'
import { motion } from 'framer-motion'

/**
 * ScrollReveal
 * High-end editorial scroll-reveal component powered by Framer Motion.
 * Smoothly animates in every time the user scrolls up and down (once: false).
 * Elements glide softly up with high-contrast visibility.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 26,
  style = {},
  ...props
}) {
  // Convert milliseconds if passed (e.g. 850ms -> 0.85s) to prevent frozen opacity
  const durationSec = typeof duration === 'number' ? (duration > 5 ? duration / 1000 : duration) : 0.7
  const delaySec = typeof delay === 'number' ? (delay > 5 ? delay / 1000 : delay) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: durationSec,
        delay: delaySec,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  )
}
