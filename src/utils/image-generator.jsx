import React from "react"
const MODEL_ENDPOINTS = {
  "FLUX.1-dev": "black-forest-labs/FLUX.1-dev",
  "FLUX.1-schnell": "black-forest-labs/FLUX.1-schnell",
  "Stable Diffusion v1.5": "stabilityai/stable-diffusion-xl-base-1.0",
  "Stabilityai": "stabilityai/stable-diffusion-3.5-large",
  "Stabilityai 3.0": "stabilityai/stable-diffusion-3-medium-diffusers",
}

const API_KEY = import.meta.env.VITE_APP_API

function getImageDimensions(aspectRatio) {
  switch (aspectRatio) {
    case "Square (1:1)":
      return { width: 512, height: 512 }
    case "Landscape (16:9)":
      return { width: 768, height: 432 }
    case "Portrait (9:16)":
      return { width: 432, height: 768 }
    default:
      return { width: 512, height: 512 }
  }
}

export async function generateImageFromModel({ model, prompt, aspectRatio }) {
  const modelEndpoint = MODEL_ENDPOINTS[model]
  if (!modelEndpoint) {
    throw new Error(`Unknown model: ${model}`)
  }

  const dimensions = getImageDimensions(aspectRatio)

  const requestData = {
    inputs: prompt,
    parameters: {
      num_inference_steps: 30,
      guidance_scale: 7.5,
      width: dimensions.width,
      height: dimensions.height,
    },
  }

  try {
    const response = await fetch(`https://router.huggingface.co/hf-inference/models/${modelEndpoint}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error (${response.status}): ${errorText}`)
    }

    return await response.blob()
  } catch (error) {
    console.error("Error generating image:", error)
    throw error
  }
}

export function downloadImage(imageUrl, filename = "generated-image.png") {
  const a = document.createElement("a")
  a.href = imageUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
