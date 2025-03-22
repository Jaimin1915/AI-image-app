import React from "react"
import { Download } from "lucide-react"
import { downloadImage } from "../utils/image-generator"

const ImageGrid = ({ images, aspectRatio }) => {
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

  if (!images || images.length === 0) return null

  return (
    <div className={`grid ${getGridClass()} gap-4 w-full mt-4`}>
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={image || "/placeholder.svg"}
            alt={`Generated image ${index + 1}`}
            className={`w-[400px] ${getAspectRatioClass()} object-cover rounded-lg`}
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
  )
}

export default ImageGrid

