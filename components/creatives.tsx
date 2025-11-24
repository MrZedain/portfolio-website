"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Camera, Video, Palette, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Cloudinary URLs helper
const getCloudinaryImageUrl = (publicId: string) =>
  `https://res.cloudinary.com/portfolio2/image/upload/f_auto,q_auto,w_1200/${publicId}`

const getCloudinaryVideoUrl = (publicId: string) =>
  `https://res.cloudinary.com/portfolio2/video/upload/f_auto,q_auto,vc_auto/${publicId}.mp4`

const getBlurredThumbnail = (publicId: string) =>
  `https://res.cloudinary.com/portfolio2/image/upload/w_300,q_10,e_blur:1000/${publicId}`

// Data with Cloudinary public IDs
const creativeWorks = [
  {
    title: "Photography",
    description: "Shots taken throughout Istanbul.",
    icon: Camera,
    images: [
      "eminonu-street",
      "birds-on-a-wire",
      "home",
      "eminonu-street-2",
      "tower",
      "clouds",
      "leaves",
      "light",
      "raindrops",
      "aksaray-street",
      "cami",
      "levazim",
      "sariyer-street",
      "uskudar",
      "eminonu-pasaj",
      "camlica",
      "clouds-bosphorus",
      "birds",
      "balat-sahil",
    ],
  },
  {
    title: "Short Films",
    description: "Capturing cinematic moments throughout Istanbul, Karachi and Dubai",
    icon: Video,
    videos: [
      "bridge-bosphorus",
      "bus-galata",
      "ferry",
      "camels-sunset",
      "pink-sky-birds",
      "rain-street",
      "camels-side",
      "street-through-tree",
      "vapur-abi",
      "palm-tree"
    ],
  },
  {
    title: "Art",
    description: "From pixel art to hand drawn sketches",
    icon: Palette,
    images: [
      "coffee-shop",
      "father-gascoigne",
      "city",
      "knight",
      "desert",
      "hunter",
      "kurucesme",
      "totem-pole",
      "man",
      "train",
      "lady-maria",
      "alien",
      "doodle",
      "tem",
    ],
  },
]


export function Creatives() {
  const [currentIndexes, setCurrentIndexes] = useState(
    creativeWorks.map(() => 0)
  )
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  // Auto-cycle carousels
  useEffect(() => {
    const intervals = creativeWorks.map((work, index) =>
      setInterval(() => {
        const items = work.images || work.videos
        setCurrentIndexes(prev => {
          const newIndexes = [...prev]
          newIndexes[index] = (newIndexes[index] + 1) % items.length
          return newIndexes
        })
      }, 5000 + index * 500)
    )

    return () => intervals.forEach(clearInterval)
  }, [])

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedWork === null) {
      document.body.classList.remove("modal-open")
      return
    }

    document.body.classList.add("modal-open")
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedWork(null)
      else if (e.key === "ArrowLeft") {
        const items =
          creativeWorks[selectedWork].images || creativeWorks[selectedWork].videos
        setSelectedItemIndex(prev => (prev - 1 + items.length) % items.length)
      } else if (e.key === "ArrowRight") {
        const items =
          creativeWorks[selectedWork].images || creativeWorks[selectedWork].videos
        setSelectedItemIndex(prev => (prev + 1) % items.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("modal-open")
    }
  }, [selectedWork])

  return (
    <section className="min-h-screen py-5 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
      <div className="space-y-16">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Creative Work
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Photography, videography, and artistic projects beyond the screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {creativeWorks.map((work, workIndex) => {
            const currentIndex = currentIndexes[workIndex]
            const items = work.images || work.videos
            const isVideo = !!work.videos
            const currentItem = items[currentIndex]

            return (
              <Card
                key={workIndex}
                className="bg-black border-black py-0 overflow-hidden group hover:border-white/20 transition-colors"
              >
                <div
                  className="aspect-4/5 overflow-hidden bg-secondary cursor-pointer"
                  onClick={() => {
                    setSelectedWork(workIndex)
                    setSelectedItemIndex(currentIndex)
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isVideo ? (
                      <motion.video
                        key={currentItem}
                        poster={getBlurredThumbnail(currentItem)}
                        src={getCloudinaryVideoUrl(currentItem)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <motion.img
                        key={currentItem}
                        src={getCloudinaryImageUrl(currentItem)}
                        loading="lazy"
                        whileInView={{ opacity: 1 }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <work.icon className="w-5 h-5 text-white" />
                    <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{work.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Gallery Modal */}
        <AnimatePresence>
          {selectedWork !== null && (
            <motion.div
              className="fixed inset-0 min-h-dvh bg-black/90 flex items-center justify-center z-50 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 text-white z-50 p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                className="relative w-full max-h-screen md:h-auto md:max-w-3xl md:aspect-3/4 p-4 overflow-auto flex items-center justify-center py-8 md:py-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full md:h-auto">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const work = creativeWorks[selectedWork]
                      const items = work.images || work.videos
                      const current = items[selectedItemIndex]
                      const isVideo = !!work.videos

                      if (isVideo) {
                        return (
                          <motion.video
                            key={current}
                            src={getCloudinaryVideoUrl(current)}
                            controls
                            autoPlay
                            playsInline
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto"
                          />
                        )
                      } else {
                        return (
                          <motion.img
                            key={current}
                            src={getCloudinaryImageUrl(current)}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto"
                          />
                        )
                      }
                    })()}
                  </AnimatePresence>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const work = creativeWorks[selectedWork]
                      const items = work.images || work.videos
                      setSelectedItemIndex(
                        (prev) => (prev - 1 + items.length) % items.length
                      )
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const work = creativeWorks[selectedWork]
                      const items = work.images || work.videos
                      setSelectedItemIndex(
                        (prev) => (prev + 1) % items.length
                      )
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
