import React from 'react';

import { Send } from "lucide-react"

const PromptInput = ({ prompt, setPrompt }) => {
  return (
    <div className="relative w-full">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your imagination in detail..."
        className="w-full p-4 rounded-xl input-gradient text-white dark:text-gray-100 min-h-[110px] bg-[#374151] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
      />
      <button
        className="absolute bottom-3 right-3 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
        aria-label="Send prompt"
        onClick={() => setPrompt("")}
      >
        <Send className="h-6 w-5" />
      </button>
    </div>
  )
}

export default PromptInput
