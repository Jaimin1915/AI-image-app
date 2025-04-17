import React from "react"
import { Download } from "lucide-react"
import { downloadImage } from "../utils/image-generator"
import LoadingSpinner from "./LoadingSpinner"

const ImageGrid = ({ images, aspectRatio, isLoading }) => {
  const getGridClass = () => {
    if (!images || images.length === 0) return ""

    if (images.length === 1) return "grid-cols-1"
    if (images.length === 2) return "grid-cols-1 sm:grid-cols-2"
    return "grid-cols-1 sm:grid-cols-2"
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "Square (1:1)":
        return "aspect-square"
      case "Landscape (16:9)":
        return "aspect-video"
      case "Portrait (9:16)":
        return "aspect-[9/16]"
      default:
        return "aspect-square"
    }
  }

  if ((!images || images.length === 0) && !isLoading) return null

  return (
    <div className="mt-8">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-10">
          <LoadingSpinner />
          <p className="mt-4 text-purple-300 text-lg font-medium animate-pulse">Generating your masterpiece...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments depending on the complexity</p>
        </div>
      )}

      {images && images.length > 0 && !isLoading && (
        <div className={`grid ${getGridClass()} gap-4 w-full`}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image || "/placeholder.svg"}
                alt={`Generated image ${index + 1}`}
                className={`w-full ${getAspectRatioClass()} object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]`}
              />
              <button
                className="absolute bottom-3 right-3 p-2 bg-gray-800/70 hover:bg-gray-900/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Download image"
                onClick={() => downloadImage(image, `generated-image-${index + 1}.png`)}
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGrid
