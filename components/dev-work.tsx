"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import { useSwipeable } from "react-swipeable"

const projects = [
  {
    title: "Artist Portfolio",
    description:
      "React-based frontend project showcasing Diana Page’s portfolio/work. It demonstrates responsive design, component-based architecture, and modern React practices.",
    tech: ["React", "JavaScript", "CSS"],
    github: "#",
    live: "#",
    images: [
      "/images/artist-1.jpg",
      "/images/artist-2.jpg",
      "/images/artist-3.jpg",
    ],
  },
  {
    title: "NGO Website (Istanbul&I)",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop interface, and team features.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "#",
    live: "#",
    images: [
      "/images/ngo-1.jpg",
      "/images/ngo-2.jpg",
      "/images/ngo-3.jpg",
    ],
  },
]

export function DevWork() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-cycle carousel every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % 3),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + 3) % 3),
    trackMouse: true,
  })

  return (
    <section id="development" className="min-h-screen py-5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
      <div className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            DEVELOPMENT WORK
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Frontend projects showcasing responsive design and best practices
          </p>
        </div>

        <div className="flex flex-col justify-between">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border my-2 p-6 md:p-8 hover:border-white/20 transition-colors group"
            >
              {/* Carousel */}
              <div
                className="relative w-full aspect-video bg-black/10 overflow-hidden rounded-lg mb-4"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={project.images[currentIndex]}
                    src={project.images[currentIndex]}
                    alt={project.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-contain bg-black/5"
                  />
                </AnimatePresence>
              </div>

              {/* Text content */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3 shrink-0">
                    <Link
                      href={project.github}
                      className="text-muted-foreground hover:text-white transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link
                      href={project.live}
                      className="text-muted-foreground hover:text-white transition-colors"
                      aria-label="View live site"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>


    </section>
  )
}
