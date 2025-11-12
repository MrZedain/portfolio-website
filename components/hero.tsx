
"use client"

import { animate, motion, MotionValue, useMotionValue, useScroll, useTransform } from "framer-motion"
import useMeasure from "react-use-measure";
import { useEffect, useRef, useState } from "react"
import { BsGithub } from "react-icons/bs"

// Cloudinary URLs helper
const getCloudinaryImageUrl = (publicId: string) =>
  `https://res.cloudinary.com/zain-portfolio/image/upload/f_auto,q_auto,w_1200/${publicId}`
const getCloudinaryVideoUrl = (publicId: string) =>
  `https://res.cloudinary.com/zain-portfolio/video/upload/f_auto,q_auto,vc_auto/${publicId}.mp4`
const getBlurredThumbnail = (publicId: string) =>
  `https://res.cloudinary.com/zain-portfolio/image/upload/w_300,q_10,e_blur:1000/${publicId}`


const mediaItems = [
  "/public/images/photography/eminonu-street-2",
  "/public/videos/vapur-abi",
  "/public/images/photography/birds-on-a-wire",
  "/public/videos/bus-galata",
  "/public/images/photography/raindrops",
  "/public/videos/ferry",
  "/public/images/photography/cami",
  "/public/videos/pink-sky-birds",

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



  let [wRef, {width}] = useMeasure();
    const xTranslation: MotionValue<number> = useMotionValue(0)
   
  useEffect(() => {
    let controls;        
    let finalPosition = -width / 2 - 5 

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear", 
      duration: 40, 
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    })

    return controls.stop
  
  }, [xTranslation, width])

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
      {/* 🔹 Continuous Horizontal Loop */}
      <div className="absolute inset-0 gap-3 overflow-hidden opacity-70">
        <motion.div
          className="flex h-full w-max"
          ref={wRef}
          style={{x: xTranslation}}
        >
          {[...Array(2)].map((_, copyIndex) => (
            <div
              key={copyIndex}
              // ref={copyIndex === 0 ? sequenceRef : undefined}
              className="flex shrink-0"
            >
              {mediaItems.map((src, i) =>
                src.includes("videos/") ? (
                  <video
                    key={`${copyIndex}-${i}`}
                    src={getCloudinaryVideoUrl(src)}
                    className="h-screen w-auto object-cover rounded-lg mx-1.5"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    key={`${copyIndex}-${i}`}
                    src={getCloudinaryImageUrl(src)}
                    className="h-screen w-auto object-cover rounded-lg mx-1.5"
                    loading="lazy"
                    decoding="async"
                  />
                )
              )}
            </div>
          ))}
        </motion.div>


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