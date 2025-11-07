"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import { useSwipeable } from "react-swipeable"

const projects = [
  {
    title: "Diana Page's Art Portfolio",
    status: "LIVE",
    description: (
      <>
        React-based frontend project showcasing{" "}
        <a
          href="https://dianapage.co.za/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 underline underline-offset-4"
        >
          Diana Page's
        </a>
        {" "}portfolio of paintings, drawings and other creative works. It demonstrates responsive design, component-based architecture, and modern React practices.
      </>
    ),
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/MrZedain/DianaPageSite-public",
    live: "https://dianapage.co.za/",
    images: [
      "/images/artist-1.jpg",
      "/images/artist-2.jpg",
      "/images/artist-3.jpg",
    ],
  },
  {
    title: "Istanbul&I NGO website",
    status: "IN DEVELOPMENT",
    description: (
      <>
        NGO Website for{" "}
        <a
          href="https://www.istanbulandi.org.tr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 underline underline-offset-4"
        >
          Istanbul&I
        </a>
        {" "}— A community-driven platform for Istanbul&I, a youth-led NGO based in Turkey that brings together local and international volunteers to create social impact. The organization focuses on empowering young people to connect, collaborate, and contribute through community service, educational workshops, and events that support those in need.
      </>
    ),
    tech: ["Next.js", "Tailwindcss", "Typescript"],
    github: "https://github.com/MrZedain/istanbulandi-site",
    live: "https://www.istanbulandi.org.tr/",
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
                  <div className="flex flex-col items-start sm:flex-row sm:items-center ">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    {project.status === "LIVE" ? (
                      <span className="text-xs px-2 mx-0 my-1 sm:mx-2 sm:my-0 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-400/30">
                        {project.status}
                      </span>
                    ):
                    ( <span className="text-xs px-2 mx-0 my-1 sm:mx-2 sm:my-0 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-400/30">
                        {project.status}
                      </span>)
                    }
                  </div>
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

                <div className="text-muted-foreground leading-relaxed">
                  {project.description}
                </div>

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
