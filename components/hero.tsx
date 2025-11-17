"use client"

import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import useMeasure from "react-use-measure"
import { useEffect, useRef } from "react"
import { TypewriterText } from "./typwriter-text"

// Cloudinary helpers
const getCloudinaryImageUrl = (publicId: string) =>
  `https://res.cloudinary.com/zain-portfolio/image/upload/f_auto,q_auto,w_1200/${publicId}`

const getCloudinaryVideoUrl = (publicId: string) =>
  `https://res.cloudinary.com/zain-portfolio/video/upload/f_auto,q_auto,vc_auto/${publicId}.mp4`

// Media list
const mediaItems = [
  "/public/images/photography/eminonu-street-2",
  "/public/videos/vapur-abi",
  "/public/images/photography/birds-on-a-wire",
  "/public/videos/bus-galata",
  "/public/images/photography/raindrops",
  "public/videos/camels-sunset",
  "/public/images/photography/cami",
  "/public/videos/ferry",
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

  // Measure strip A only
  const [wRef, { width }] = useMeasure()

  const xTranslation: MotionValue<number> = useMotionValue(0)

  // Smooth infinite marquee without snapping
  useEffect(() => {
    if (!width) return

    const distance = -width // correct loop distance

    const controls = animate(xTranslation, [0, distance], {
      ease: "linear",
      duration: 40,
      repeat: Infinity,
      repeatType: "loop",
    })

    return controls.stop
  }, [width])

  // Renders video or image depending on the path
  const renderMedia = (src: string, key: string) => {
    const isVideo = src.includes("/videos/")

    return isVideo ? (
      <video
        key={key}
        src={getCloudinaryVideoUrl(src)}
        className="h-screen w-auto object-cover rounded-lg mx-1.5"
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        key={key}
        src={getCloudinaryImageUrl(src)}
        className="h-screen w-auto object-cover rounded-lg mx-1.5"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <motion.section
      ref={ref}
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center text-center z-0 overflow-hidden"
      style={{ scale, filter: blur, opacity }}
    >
      {/* Background infinite loop */}
      <div className="absolute inset-0 gap-3 overflow-hidden opacity-70">
        <motion.div
          className="flex h-full w-max"
          style={{ x: xTranslation }}
        >
          {/* STRIP A — Measured */}
          <div ref={wRef} className="flex shrink-0">
            {mediaItems.map((src, i) => renderMedia(src, `A-${i}`))}
          </div>

          {/* STRIP B — Exact duplicate */}
          <div className="flex shrink-0">
            {mediaItems.map((src, i) => renderMedia(src, `B-${i}`))}
          </div>
        </motion.div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

      {/* Foreground text */}
      <div className="relative z-10 text-white px-4">
        <TypewriterText />
      </div>
    </motion.section>
  )
}
