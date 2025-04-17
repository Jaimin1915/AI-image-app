import React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

const DEFAULT_PROMPTS = [
  "A turquoise sea with gentle waves washing over white sand, surrounded by rocky cliffs and tropical palms",
  "An astronaut floating in the silence of deep space, gazing at a glowing planet below and a shimmering trail of stardust beyond",
  "A calm mountain lake at sunrise, mist floating over the water. Snowy peaks and pine trees reflect in the glassy surface.",
  "A deep sea trench illuminated by faint bioluminescent light, with glowing jellyfish, anglerfish, and ghostly eels drifting through the dark abyss",
  "A billionaire's private island with a modern glass mansion, infinity pool overlooking turquoise waters, and a private yacht anchored nearby",
  "A luxury high-tech villa in the mountains, featuring holographic assistants, voice-activated walls, and panoramic smart windows showing the view.",
  "A tropical beach at sunset with pink and orange skies, crystal-clear waves, and palm trees swaying gently.",
  "Lush green forest with sunlight filtering through tall trees, creating magical light rays",
  "An ultra-modern penthouse at the top of a skyscraper, featuring floor-to-ceiling windows, a rooftop helipad, and a panoramic city skyline at night.",
  "A tranquil river winding through a lush green forest at golden hour, with sunlight sparkling on the water.",
  "A glamorous evening gala at a billionaire's estate, with guests arriving in designer wear, chandeliers glowing, and live orchestra music by the poolside",
  "A futuristic smart skyscraper with a sleek glass exterior, vertical gardens on every floor, and AI-controlled lighting glowing at dusk.",
  "The surface of an alien planet with a glowing ringed gas giant on the horizon, under a sky filled with stars and multiple moons",
  "Cyberpunk alley glowing with neon signs, steam rising from sewer vents. Futuristic characters in high-tech gear walk under towering holographic billboards, their faces illuminated by neon reflections",
]

const PromptInput = ({ prompt, setPrompt, onSubmit }) => {
  const [promptIndex, setPromptIndex] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSubmit()
    }
  }

  const insertDefaultPrompt = () => {
    setPrompt(DEFAULT_PROMPTS[promptIndex])

    setPromptIndex((prevIndex) => (prevIndex + 1) % DEFAULT_PROMPTS.length)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your imagination in detail..."
        className="w-full p-4 rounded-xl input-gradient text-white dark:text-gray-100 min-h-[110px] bg-[#374151] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
      />
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={insertDefaultPrompt}
          className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
          aria-label="Insert prompt suggestion"
          title="Get a prompt suggestion"
        >
          <Send className="h-6 w-5" />
        </button>
      </div>
    </form>
  )
}

export default PromptInput
