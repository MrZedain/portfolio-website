"use client"

import { ArrowDown } from "lucide-react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { BsGithub } from "react-icons/bs";

export function Hero() {

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // As user scrolls, hero scales down & blurs
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
     <motion.section
      ref={ref}
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center text-center z-0"
      style={{
        scale,
        filter: blur,
        opacity,
      }}
    >
      <div>
        <h1 className="text-8xl font-bold">ZAIN ALI</h1>
        <p className="mt-2 text-lg">
          Frontend Developer & Visual Creative
        </p>
       <div className="pt-3 flex flex-wrap gap-4 justify-center text-sm md:text-base text-muted-foreground">
          <span>React</span>
          <span>•</span>
          <span>Next.js</span>
          <span>•</span>
          <span>TypeScript</span>
          <span>•</span>
          <span>Tailwind CSS</span>
        </div>

        <div className="pt-3 flex justify-center flex-wrap gap-4 text-sm md:text-base text-muted-foreground">
          <span>Photography</span>
          <span>•</span>
          <span>Filming</span>
          <span>•</span>
          <span>Sketching</span>
        </div>
      </div>
    </motion.section>
  )
}
