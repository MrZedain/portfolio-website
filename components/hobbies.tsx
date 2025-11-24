"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const hobbies = [
  {
    title: "Bouldering",
    description: "I started bouldering in August of 2025 and have been hooked ever since. Here are some videos of my climbs thus far.",
    videos: [
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/comp-orange",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/pink-gray",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/gray-1",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/orange-gray",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/blue-gray",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/bw-orange",
      "https://res.cloudinary.com/portfolio2/video/upload/f_auto:video/q_auto/green-orange",
    ],
  },
  {
    title: "Horse riding",
    description: "I've always felt a strong connection to animals, particularly horses and the sport of horse riding",
    images: [
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto/sea",
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto/cleaning",
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto//walking",
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto/stable",
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto/forest",
      "https://res.cloudinary.com/portfolio2/image/upload/f_auto/q_auto/forest2",
    ],
  },
]

export function Hobbies() {
  const [currentIndexes, setCurrentIndexes] = useState(hobbies.map(() => 0))
  const [selectedHobby, setSelectedHobby] = useState<number | null>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  // Auto-cycle carousel
  useEffect(() => {
    const intervals = hobbies.map((hobby, index) =>
      setInterval(() => {
        const items = hobby.images || hobby.videos
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
    if (selectedHobby === null) {
      document.body.classList.remove("modal-open")
      return
    }

    document.body.classList.add("modal-open")
    const handleKeyDown = (e: KeyboardEvent) => {
      const items = hobbies[selectedHobby].images || hobbies[selectedHobby].videos
      if (e.key === "Escape") setSelectedHobby(null)
      else if (e.key === "ArrowLeft") setSelectedItemIndex(prev => (prev - 1 + items.length) % items.length)
      else if (e.key === "ArrowRight") setSelectedItemIndex(prev => (prev + 1) % items.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("modal-open")
    }
  }, [selectedHobby])

  return (
    <section className="min-h-screen py-5 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        Hobbies & Interests
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {hobbies.map((hobby, hobbyIndex) => {
          const currentIndex = currentIndexes[hobbyIndex]
          const items = hobby.images || hobby.videos
          const isVideo = !!hobby.videos
          const currentItem = items?.[currentIndex]

          return (
            <Card
              key={hobbyIndex}
              className="bg-black border-black py-0 overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div
                className="aspect-4/5 overflow-hidden bg-secondary cursor-pointer"
                onClick={() => {
                  setSelectedHobby(hobbyIndex)
                  setSelectedItemIndex(currentIndex)
                }}
              >
                <AnimatePresence mode="wait">
                  {isVideo ? (
                    <motion.video
                      key={currentItem}
                      src={currentItem}
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
                      src={currentItem}
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
                <h3 className="text-xl font-semibold text-white">{hobby.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedHobby !== null && (
          <motion.div
            className="fixed inset-0 min-h-dvh bg-black/90 flex items-center justify-center z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHobby(null)}
          >
            <button
              onClick={() => setSelectedHobby(null)}
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
                    const work = hobbies[selectedHobby]
                    const items = work.images || work.videos
                    const current = items[selectedItemIndex]
                    const isVideo = !!work.videos

                    if (isVideo) {
                      return (
                        <motion.video
                          key={current}
                          src={current}
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
                          src={current}
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
                    const work = hobbies[selectedHobby]
                    const items = work.images || work.videos
                    setSelectedItemIndex((prev) => (prev - 1 + items.length) % items.length)
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const work = hobbies[selectedHobby]
                    const items = work.images || work.videos
                    setSelectedItemIndex((prev) => (prev + 1) % items.length)
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
    </section>
  )
}
