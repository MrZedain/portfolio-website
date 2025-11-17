"use client"
import { useEffect, useState } from "react"

export function TypewriterText() {
  const lines = [
    { text: "ZAIN ALI", className: "text-6xl md:text-8xl font-bold" },
    { text: "Frontend Developer & Visual Creative", className: "mt-2 text-lg md:text-xl" },
    { text: "React • Next.js • TypeScript • Tailwind CSS", className: "pt-3 text-sm md:text-base text-muted-foreground" },
    { text: "Photography • Filming • Sketching", className: "pt-3 text-sm md:text-base text-muted-foreground" },
  ]

  const finalBlinkDuration = 3000 // ms to blink after final line before disappearing
  const typingSpeed = 75          // ms per character

  const [currentLine, setCurrentLine] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [cursorBlink, setCursorBlink] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true) // controls final disappearance

  useEffect(() => {
    const fullText = lines[currentLine].text
    let i = 0

    setDisplayed("")
    setCursorBlink(false) // solid cursor while typing
    setCursorVisible(true)

    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1))
      i++

      if (i === fullText.length) {
        clearInterval(interval)
        setCursorBlink(true) // start blinking after line finished

        if (currentLine < lines.length - 1) {
          // move to next line after short pause
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setCursorBlink(false)
          }, 500)
        } else {
          // final line → blink for a few seconds, then disappear
          setTimeout(() => {
            setCursorBlink(false)
            setCursorVisible(false)
          }, finalBlinkDuration)
        }
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [currentLine])

  return (
    <div className="flex flex-col items-center text-white font-mono text-center">
      {lines.map((line, i) => (
        <div key={i} className={line.className}>
          {i < currentLine ? (
            <span>{line.text}</span>
          ) : i === currentLine ? (
            <span>
              {displayed}
              {cursorVisible && (
                <span className={cursorBlink ? "blink" : ""}>|</span>
              )}
            </span>
          ) : (
            <span className="opacity-0">{line.text}</span>
          )}
        </div>
      ))}
    </div>
  )
}
