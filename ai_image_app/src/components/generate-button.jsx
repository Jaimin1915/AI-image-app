import React from 'react';
import { WandSparkles } from "lucide-react"

const GenerateButton = ({ onClick, isGenerating }) => {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating}
      className="flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <WandSparkles className="h-5 w-5" />
      <span>Generate</span>
    </button>
  )
}

export default GenerateButton

