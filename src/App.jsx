import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PromptInput from "./components/prompt-input"
import DropdownSelector from "./components/dropdown-selector"
import GenerateButton from "./components/generate-button"
import ImageGrid from "./components/image-grid"
import Navbar from "./components/Navbar"
import { generateImageFromModel } from "./utils/image-generator"

const modelOptions = ["FLUX.1-dev", "FLUX.1-schnell", "Stable Diffusion v1.5", "Stabilityai", "Stabilityai 3.0"]

const imageCountOptions = ["1 Image", "2 Images", "3 Images", "4 Images"]

const aspectRatioOptions = ["Square (1:1)", "Landscape (16:9)", "Portrait (9:16)"]

function App() {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState(modelOptions[0])
  const [selectedImageCount, setSelectedImageCount] = useState(imageCountOptions[0])
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatioOptions[1])
  const [generatedImages, setGeneratedImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt before generating images.")
      return
    }

    setIsGenerating(true)
    setError("")
    setGeneratedImages([])

    try {
      const count = Number.parseInt(selectedImageCount.split(" ")[0])

      for (let i = 0; i < count; i++) {
        try {
          const imageBlob = await generateImageFromModel({
            model: selectedModel,
            prompt: prompt,
            aspectRatio: selectedAspectRatio,
          })

          const imageUrl = URL.createObjectURL(imageBlob)

          setGeneratedImages((prev) => {
            const updated = [...prev]
            updated[i] = imageUrl
            return updated
          })
        } catch (err) {

          console.error(`Error generating image ${i + 1}:`, err)
          setGeneratedImages((prev) => {
            const updated = [...prev]
            updated[i] = null
            return updated
          })
        }
      }
    } catch (err) {
      console.error("Error generating images:", err)
      setError("Failed to generate images. Please check your API key and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <div
          className="bg-[#1F2937] dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <PromptInput prompt={prompt} setPrompt={setPrompt} onSubmit={handleGenerate} />

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

          {error && (
            <div
              className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-lg"
              style={{
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {error}
            </div>
          )}

          <ImageGrid images={generatedImages} aspectRatio={selectedAspectRatio} isLoading={isGenerating} />
        </div>
      </div>
    </div>
  )
}

export default App
