"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Camera, Video, Palette, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const creativeWorks = [
  {
    title: "Photography",
    description: "Street photography.",
    icon: Camera,
    images: [
      "/images/photography/eminonu-street.JPG",
      "/images/photography/birds-on-a-wire.JPG",
      "/images/photography/home.JPG",
      "/images/photography/eminonu-street-2.JPG",
      "/images/photography/tower.JPG",
      "/images/photography/clouds.JPG",
      "/images/photography/leaves.JPG",
      "/images/photography/light.JPG",
      "/images/photography/raindrops.JPG",
      "/images/photography/aksaray-street.JPG",
      "/images/photography/cami.JPG",
      "/images/photography/levazim.JPG",
      "/images/photography/sariyer-street.JPG",
      "/images/photography/uskudar.JPG",
      "/images/photography/eminonu-pasaj.JPG",
      "/images/photography/camlica.JPG",
      "/images/photography/clouds-bosphorus.JPG",
      "/images/photography/birds.JPG",
      "/images/photography/balat-sahil.JPG",
    ],
  },
  {
    title: "Short Films",
    description: "Capturing cinematic moments throughout Istanbul, Karachi and Dubai",
    icon: Video,
    images: [
      "/videos/bridge-bosphorus.mp4",
      "/videos/bus-galata.mp4",
      "/videos/ferry.mp4",
      "/videos/pink-sky-birds.mp4",
      "/videos/rain-street.mp4",
      "/videos/street-through-tree.mp4",
      "/videos/vapur-abi.mp4",
    ],
  },
  {
    title: "Digital Art",
    description: "From pixel art to hand drawn sketches",
    icon: Palette,
    images: [
      "/images/art/coffee-shop.png",
      "/images/art/city.png",
      "/images/art/desert.png",
      "/images/art/Totem pole.png",
      "/images/art/train.png",
    ],
  },
]

const hobbies = [
  {
    title: "Bouldering",
    description: "Shooting with vintage film cameras and developing in the darkroom.",
    images: [
      "/videos/bouldering/comp-orange.mp4",
      "/videos/bouldering/pink-gray.mp4",
      "/videos/bouldering/gray-1.mp4",
      "/videos/bouldering/orange-gray.mp4",
      "/videos/bouldering/blue-gray.mp4",
    ],
  },
  {
    title: "Horse riding",
    description: "Creating ambient soundscapes and electronic music.",
  },
]

export function Creatives() {
  const [currentIndexes, setCurrentIndexes] = useState(creativeWorks.map(() => 0));
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Auto-cycle carousels
  useEffect(() => {
    const intervals = creativeWorks.map((_, index) => {
      return setInterval(() => {
        setCurrentIndexes(prev => {
          const newIndexes = [...prev];
          newIndexes[index] = (newIndexes[index] + 1) % creativeWorks[index].images.length;
          return newIndexes;
        });
      }, 3000 + (index * 500)); // Stagger the intervals
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Handle keyboard navigation in gallery view and navbar visibility
  useEffect(() => {
    if (selectedWork === null) {
      document.body.classList.remove('modal-open');
      return;
    }

    document.body.classList.add('modal-open');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWork(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev =>
          (prev - 1 + creativeWorks[selectedWork].images.length) % creativeWorks[selectedWork].images.length
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev =>
          (prev + 1) % creativeWorks[selectedWork].images.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [selectedWork]);

  return (
    <>
      <section id="creative" className="min-h-screen py-5 px-3 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Creative Work</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              Photography, videography, and artistic projects beyond the screen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {creativeWorks.map((work, workIndex) => (
              <Card
                key={workIndex}
                className="bg-card border-border overflow-hidden group hover:border-white/20 transition-colors"
              >
                <div
                  className="aspect-4/5 overflow-hidden bg-secondary cursor-pointer"
                  onClick={() => {
                    setSelectedWork(workIndex);
                    setSelectedImageIndex(currentIndexes[workIndex]);
                  }}
                >
                  <AnimatePresence mode="wait">
                    {work.images[currentIndexes[workIndex]].endsWith('.mp4') ? (
                      <motion.video
                        key={work.images[currentIndexes[workIndex]]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        muted
                        loop
                        autoPlay
                        playsInline
                      >
                        <source src={work.images[currentIndexes[workIndex]]} type="video/mp4" />
                      </motion.video>
                    ) : (
                      <motion.img
                        key={work.images[currentIndexes[workIndex]]}
                        src={work.images[currentIndexes[workIndex]]}
                        alt={`${work.title} - Image ${currentIndexes[workIndex] + 1}`}
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
            ))}
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
                {/* Close button positioned relative to viewport so it's always visible */}
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-6 right-6 text-white z-50 p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div
                  className="relative w-full max-h-screen md:h-auto md:max-w-3xl md:aspect-3/4 p-4 overflow-auto flex items-center justify-center py-8 md:py-0"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="relative w-full md:h-auto">
                    <AnimatePresence mode="wait">
                      {creativeWorks[selectedWork].images[selectedImageIndex].endsWith('.mp4') ? (
                        <motion.video
                          key={selectedWork + '-' + selectedImageIndex}
                          className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          controls
                          autoPlay
                          playsInline
                        >
                          <source src={creativeWorks[selectedWork].images[selectedImageIndex]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </motion.video>
                      ) : (
                        <motion.img
                          key={selectedWork + '-' + selectedImageIndex}
                          src={creativeWorks[selectedWork].images[selectedImageIndex]}
                          alt={`${creativeWorks[selectedWork].title} - Image ${selectedImageIndex + 1}`}
                          className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev =>
                          (prev - 1 + creativeWorks[selectedWork].images.length) % creativeWorks[selectedWork].images.length
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(prev =>
                          (prev + 1) % creativeWorks[selectedWork].images.length
                        );
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
          <div className="pt-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8">Hobbies & Interests</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hobbies.map((hobby, index) => (
                <div key={index} className="space-y-2 p-6 border border-border hover:border-white/20 transition-colors">
                  <h4 className="text-lg font-semibold text-white">{hobby.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
