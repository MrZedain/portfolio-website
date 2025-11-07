"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BsGithub } from "react-icons/bs"

const mediaItems = [
  
  "/images/photography/eminonu-street-2.JPG",
  "/images/photography/birds-on-a-wire.JPG",
  "/videos/vapur-abi.mp4",
  "/videos/bus-galata.mp4",
  "/images/photography/raindrops.JPG",
  
  
  "/videos/pink-sky-birds.mp4",
  "/videos/ferry.mp4",
  "/images/photography/balat-sahil.JPG",
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
    <motion.section
      ref={ref}
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center text-center z-0 overflow-hidden"
      style={{
        scale,
        filter: blur,
        opacity,
      }}
    >
      {/* 🔹 Background collage */}
      <div className="absolute inset-0 grid grid-cols-3 gap-2 md:gap-3 opacity-60">
        {mediaItems.map((src, i) =>
          src.endsWith(".mp4") ? (
            <motion.video
              key={i}
              src={src}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ) : (
            <motion.img
              key={i}
              src={src}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          )
        )}
      </div>

      {/* 🔹 Overlay gradient for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      {/* 🔹 Foreground text */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-6xl md:text-8xl font-bold">ZAIN ALI</h1>
        <p className="mt-2 text-lg md:text-xl">Frontend Developer & Visual Creative</p>

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
