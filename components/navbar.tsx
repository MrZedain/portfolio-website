"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  // small helper to animate scroll to a target Y with control over duration
  const smoothScrollTo = (targetY: number, duration = 600) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop
    const distance = targetY - startY
    const startTime = performance.now()

    // easeInOutQuad
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = ease(progress)
      window.scrollTo(0, Math.round(startY + distance * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const handleScroll = (id: string) => {
    // Prevent re-entrancy while a scroll is in progress
    if (isScrolling) {
      console.log('handleScroll: ignoring click while scrolling')
      return
    }

    console.log('Trying to scroll to:', id)
    const element = document.getElementById(id)
    console.log('Found element:', element)
    if (!element) {
      console.warn('handleScroll: element not found', id)
      return
    }

    setIsScrolling(true)

    const doScroll = () => {
      // compute navbar height and target position at time of scroll
      const navbar = document.querySelector('nav')
      const navbarHeight = navbar ? navbar.offsetHeight : 0
      const rect = element.getBoundingClientRect()
      const elementPosition = rect.top
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      const offsetPosition = currentScroll + elementPosition - navbarHeight

      console.log({ navbarHeight, elementPosition, currentScroll, offsetPosition, rect })
      // perform smooth scroll, using a longer duration on mobile for a gentler feel
      const isMobile = window.innerWidth <= 768
      const duration = isMobile ? 900 : 600
      smoothScrollTo(offsetPosition, duration)

      // clear scrolling flag after scroll duration + small buffer
      const clearMs = duration + 200
      setTimeout(() => setIsScrolling(false), clearMs)
    }

    if (isOpen) {
      // Close the mobile menu first so layout stabilizes, then scroll after
      // the menu exit animation (~250ms).
      setIsOpen(false)
      const waitMs = 300
      setTimeout(doScroll, waitMs)
    } else {
      // Desktop: scroll immediately
      doScroll()
    }
  }

  const textVariants = {
    hiddenUp: { y: -15, opacity: 0 },
    hiddenDown: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.4, 0.0, 0.2, 1], // Smooth easeInOut cubic
      }
    },
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="flex justify-center md:justify-center px-8 py-6 relative">
        {/* Large screen nav items */}
        <div className="hidden md:flex space-x-8">
          <a 
            href="#hero" 
            className="hover:text-gray-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('hero');
            }}
          >
            HOME
          </a>
          <a 
            href="#development" 
            className="hover:text-gray-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('development');
            }}
          >
            DEVELOPMENT
          </a>
          <a 
            href="#creative" 
            className="hover:text-gray-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('creative');
            }}
          >
            CREATIVE
          </a>
          <a 
            href="#contact" 
            className="hover:text-gray-400 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('contact');
            }}
          >
            CONTACT
          </a>
        </div>

        {/* Small screen MENU/CLOSE toggle */}
        <div
          className="md:hidden flex justify-between items-center w-full cursor-pointer"
          onClick={toggleMenu}
        >
          <h2 className="font-bold">ZAIN ALI</h2>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="menu"
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ 
                  duration: 0.35,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                MENU
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{ 
                  duration: 0.35,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                CLOSE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-black overflow-hidden"
          >
            <div className="flex flex-col items-start px-8 py-4 space-y-4">
              <button 
                className="hover:text-gray-400 transition-colors w-full text-left"
                onClick={() => handleScroll('hero')}
              >
                HOME
              </button>
              <button 
                className="hover:text-gray-400 transition-colors w-full text-left"
                onClick={() => handleScroll('development')}
              >
                DEVELOPMENT
              </button>
              <button 
                className="hover:text-gray-400 transition-colors w-full text-left"
                onClick={() => handleScroll('creative')}
              >
                CREATIVE
              </button>
              <button 
                className="hover:text-gray-400 transition-colors w-full text-left"
                onClick={() => handleScroll('contact')}
              >
                CONTACT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
