import React from "react"
const MODEL_ENDPOINTS = {
  "stable-diffusion-3": "stabilityai/stable-diffusion-3-medium-diffusers",
  "FLUX.1-schnell": "black-forest-labs/FLUX.1-schnell"
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

  const seed = Math.floor(Math.random() * 123456789);

  const requestData = {
    inputs: prompt,
    parameters: {
      num_inference_steps: 30,
      guidance_scale: 7.5,
      width: dimensions.width,
      height: dimensions.height,
      seed
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
