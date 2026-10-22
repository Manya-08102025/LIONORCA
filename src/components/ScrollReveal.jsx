import { useEffect, useRef, useState } from 'react'

/**
 * ScrollReveal
 * High-performance, GPU-accelerated scroll animation component
 * Uses IntersectionObserver with Apple-like cubic-bezier physics.
 */
export default function ScrollReveal({
  children,
  animation = 'blur-up', // 'blur-up' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'soft-scale' | 'flip-up'
  delay = 0, // delay in ms
  duration = 900, // duration in ms
  threshold = 0.08,
  once = true,
  className = '',
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once && domRef.current) {
              observer.unobserve(domRef.current)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const currentEl = domRef.current
    if (currentEl) {
      observer.observe(currentEl)
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl)
      }
    }
  }, [threshold, once])

  const getHiddenTransform = () => {
    switch (animation) {
      case 'blur-up':
        return 'translate3d(0, 36px, 0)'
      case 'soft-scale':
        return 'scale(0.96) translate3d(0, 28px, 0)'
      case 'fade-up':
        return 'translate3d(0, 42px, 0)'
      case 'fade-down':
        return 'translate3d(0, -32px, 0)'
      case 'fade-left':
        return 'translate3d(-42px, 0, 0)'
      case 'fade-right':
        return 'translate3d(42px, 0, 0)'
      case 'zoom-in':
        return 'scale(0.93) translate3d(0, 24px, 0)'
      case 'flip-up':
        return 'perspective(1200px) rotateX(10deg) translate3d(0, 36px, 0) scale(0.97)'
      default:
        return 'translate3d(0, 36px, 0)'
    }
  }

  const getVisibleTransform = () => {
    switch (animation) {
      case 'flip-up':
        return 'perspective(1200px) rotateX(0deg) translate3d(0, 0, 0) scale(1)'
      case 'soft-scale':
      case 'zoom-in':
        return 'scale(1) translate3d(0, 0, 0)'
      default:
        return 'translate3d(0, 0, 0)'
    }
  }

  const getHiddenFilter = () => {
    if (animation === 'blur-up' || animation === 'soft-scale') {
      return 'blur(8px)'
    }
    return 'none'
  }

  const getVisibleFilter = () => {
    return 'blur(0px)'
  }

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? getVisibleTransform() : getHiddenTransform(),
        filter: isVisible ? getVisibleFilter() : getHiddenFilter(),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  )
}
