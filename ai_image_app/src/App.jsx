

import React from "react"
import { useState, useEffect } from "react"
import { WandSparkles } from "lucide-react"
import ThemeToggle from "./components/theme-toggle"
import PromptInput from "./components/prompt-input"
import DropdownSelector from "./components/dropdown-selector"
import GenerateButton from "./components/generate-button"
import ImageGrid from "./components/image-grid"
import { generateImageFromModel } from "./utils/image-generator"

const modelOptions = [
  "FLUX.1-dev",
  "FLUX.1-schnell",
  "Stable Diffusion v1.5",
  "Stabilityai",
  "CompVis",
]

const imageCountOptions = ["1 Image", "2 Images", "3 Images", "4 Images"]

const aspectRatioOptions = ["Square (1:1)", "Landscape (16:9)", "Portrait (9:16)"]

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState(modelOptions[0])
  const [selectedImageCount, setSelectedImageCount] = useState(imageCountOptions[0])
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatioOptions[0])
  const [generatedImages, setGeneratedImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError("")
    setGeneratedImages([])

    try {
      const count = Number.parseInt(selectedImageCount.split(" ")[0])
      const imageUrls = []

      for (let i = 0; i < count; i++) {
        // Create placeholder URLs while images are generating
        imageUrls.push("/placeholder.svg?height=512&width=512")
      }

      // Set placeholders immediately
      setGeneratedImages([...imageUrls])

      // Generate actual images
      const generatedImageBlobs = []

      for (let i = 0; i < count; i++) {
        const imageBlob = await generateImageFromModel({
          model: selectedModel,
          prompt: prompt,
          aspectRatio: selectedAspectRatio,
        })

        // Create object URL from the blob
        const imageUrl = URL.createObjectURL(imageBlob)
        generatedImageBlobs[i] = imageUrl

        // Update images one by one as they complete
        setGeneratedImages((prev) => {
          const updated = [...prev]
          updated[i] = imageUrl
          return updated
        })
      }
    } catch (err) {
      console.error("Error generating images:", err)
      setError("Failed to generate images. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen app-gradient transition-colors bg-[#161E2D] duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-xl">
              <WandSparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-white">AI Image Generator</h1>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
        </div>

        <div className="bg-[#1F2937] dark:bg-white rounded-2xl shadow-lg p-6">
          <PromptInput prompt={prompt} setPrompt={setPrompt} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <DropdownSelector
              label="Select Model"
              options={modelOptions}
              selectedOption={selectedModel}
              onSelect={setSelectedModel}
            />
            <DropdownSelector
              label="Image Count"
              options={imageCountOptions}
              selectedOption={selectedImageCount}
              onSelect={setSelectedImageCount}
            />
            <DropdownSelector
              label="Aspect Ratio"
              options={aspectRatioOptions}
              selectedOption={selectedAspectRatio}
              onSelect={setSelectedAspectRatio}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />
          </div>

          {error && <div className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-lg">{error}</div>}

          <ImageGrid images={generatedImages} aspectRatio={selectedAspectRatio} />
        </div>
      </div>
    </div>
  )
}

export default App

