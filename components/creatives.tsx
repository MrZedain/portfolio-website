import { Card } from "@/components/ui/card"
import { Camera, Video, Palette } from "lucide-react"

const creativeWorks = [
  {
    title: "Urban Photography",
    description: "Street photography capturing the essence of city life, architecture, and human moments.",
    icon: Camera,
    image: "/urban-street-bw.png",
  },
  {
    title: "Short Films",
    description: "Experimental video projects exploring narrative storytelling and visual aesthetics.",
    icon: Video,
    image: "/cinematic-film-still-black-and-white.jpg",
  },
  {
    title: "Digital Art",
    description: "Abstract digital compositions and generative art experiments.",
    icon: Palette,
    image: "/abstract-digital-art-black-and-white.jpg",
  },
]

const hobbies = [
  {
    title: "Analog Photography",
    description: "Shooting with vintage film cameras and developing in the darkroom.",
  },
  {
    title: "Music Production",
    description: "Creating ambient soundscapes and electronic music.",
  },
  {
    title: "Hiking & Nature",
    description: "Exploring trails and capturing landscape photography.",
  },
]

export function Creatives() {
  return (
    <section id="creative" className="min-h-screen py-5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
      <div className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Creative Work</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Photography, videography, and artistic projects beyond the screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {creativeWorks.map((work, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="aspect-3/2 overflow-hidden bg-secondary">
                <img
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
  )
}
