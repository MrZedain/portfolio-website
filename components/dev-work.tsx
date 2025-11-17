"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useSwipeable } from "react-swipeable"

// Cloudinary URL helper
const getCloudinaryImageUrl = (publicId: string, w = 1200) =>
  `https://res.cloudinary.com/zain-portfolio/image/upload/f_auto,q_auto:eco,dpr_auto,w_${w}/${publicId}`

// Project data
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
        </a>{" "}
        portfolio of paintings, drawings and creative works. It demonstrates responsive design,
        component-based architecture, and modern React practices.
      </>
    ),
    tech: ["React", "JavaScript", "CSS"],
    github: "https://github.com/MrZedain/DianaPageSite-public",
    live: "https://dianapage.co.za/",
    images: [
      "/public/images/artist-1.jpg",
      "/public/images/artist-2.jpg",
      "/public/images/artist-3.jpg",
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
        {" "}— A youth-led NGO based in Turkey uniting volunteers for social impact. It empowers
        collaboration and community through service and education.
      </>
    ),
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/MrZedain/istanbulandi-site",
    live: "https://www.istanbulandi.org.tr/",
    images: [
      "/public/images/ngo-1.jpg",
      "/public/images/ngo-2.jpg",
      "/public/images/ngo-3.jpg",
    ],
  },
]

export function DevWork() {
  const [currentIndex, setCurrentIndex] = useState(0)

  //Auto-cycle carousel every 3s
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

  // Memoize Cloudinary URLs to avoid recalculation on re-render
  const projectData = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        cloudImages: project.images.map((src) => getCloudinaryImageUrl(src)),
      })),
    []
  )

  return (
    <section
      id="development"
      className="min-h-screen pt-10 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24"
    >
      <div className="space-y-4">
        <header className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            DEVELOPMENT WORK
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Frontend projects showcasing responsive design and best practices
          </p>
        </header>

        <div className="flex flex-col justify-between">
          {projectData.map((project, index) => {
            const currentImage = project.cloudImages[currentIndex]

            return (
              <Card
                key={index}
                className="bg-black border-black my-2 md:p-8 hover:border-white/20 transition-colors group"
              >
                {/* 🖼 Image Carousel */}
                <div
                  {...swipeHandlers}
                  className="relative w-full aspect-video bg-black/10 overflow-hidden rounded-lg mb-4"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={project.title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* 📄 Text Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-white/90 transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs w-fit px-2 py-0.5 rounded-full border ${
                          project.status === "LIVE"
                            ? "bg-green-500/20 text-green-400 border-green-400/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="flex gap-3">
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

                  <div className="text-muted-foreground leading-relaxed">{project.description}</div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-3 py-1 bg-white text-black rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
