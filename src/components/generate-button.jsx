import React from "react"
import { WandSparkles } from "lucide-react"

const GenerateButton = ({ onClick, isGenerating }) => {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating}
      className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
    >
      <WandSparkles className="h-5 w-5" />
      <span>{isGenerating ? "Generating..." : "Generate"}</span>
    </button>
  )
}

export default GenerateButton
