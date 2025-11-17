import { Hero } from "@/components/hero"
import { DevWork } from "@/components/dev-work"
import { Creatives } from "@/components/creatives"
import { Contact } from "@/components/contact"
import { Navbar } from "@/components/navbar"
import { Hobbies } from "@/components/hobbies"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar/>
      {/* Hero section with scroll target */}
      <div id="hero" className="h-screen">
        <Hero />
      </div>

      {/* Foreground content that scrolls over the Hero */}
      <div className="relative z-10 bg-black">
        <DevWork />
        <Creatives />
        <Hobbies />
        <Contact />
      </div>
    </main>
  )
}
