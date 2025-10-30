"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function Contact() {
  return (
    <section id="contact" className="min-h-screen py-5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto scroll-mt-24">
      <div className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            CONTACT
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Let's connect and discuss potential collaborations
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href="mailto:libranzain@gmail.com"
            className="flex items-center gap-3 text-lg hover:text-gray-400 transition-colors"
          >
            <Mail className="w-6 h-6" />
            libranzain@gmail.com
          </Link>
          
          <Link
            href="https://github.com/MrZedain"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-gray-400 transition-colors"
          >
            <Github className="w-6 h-6" />
            GitHub
          </Link>
          
          <Link
            href="https://www.linkedin.com/in/zain-ali-a4855a310/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-gray-400 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
            LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}