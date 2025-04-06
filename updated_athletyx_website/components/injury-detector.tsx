"use client"

import type React from "react"

import { useState, useRef, type FormEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Search, Loader2 } from "lucide-react"

// API key should be stored in environment variables in a real application
const API_KEY = "AIzaSyBnQVg1wbEksrbVwMkAbTOjf-ejngnPgcw"

export default function InjuryDetector() {
  const [activeTab, setActiveTab] = useState("upload")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("Analyze this injury and provide recommendations for treatment and recovery.")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async (e: FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      setError("Please upload an image of the injury")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult("")

    try {
      // No need to check for API key since we're hardcoding it

      // Dynamically import the Google Generative AI package
      const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = await import("@google/generative-ai")

      // Convert image to base64
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onload = () => {
          const base64String = (reader.result as string).split(",")[1] // Extract base64 part
          resolve(base64String)
        }
        reader.onerror = reject
      })

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      })

      // Prepare content for the model
      const contents = [
        {
          role: "user",
          parts: [{ inline_data: { mime_type: "image/jpeg", data: imageBase64 } }, { text: prompt }],
        },
      ]

      // Generate content
      const result = await model.generateContent({ contents })
      const response = await result.response
      const text = response.text()

      // Clean up markdown symbols from the response
      const cleanedText = text.replace(/\*\*/g, "").replace(/\*/g, "")
      setResult(cleanedText)
    } catch (err) {
      console.error(err)

      if (err instanceof Error && (err.message.includes("Failed to load") || err.message.includes("API key"))) {
        setError("Unable to connect to AI service. Please check your API key or try again later.")
      } else {
        setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetForm = () => {
    setImageFile(null)
    setImagePreview(null)
    setResult("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=300&width=1000"
            alt="Injury Detector"
            width={1000}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-500/80 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Injury Detector</h1>
              <p className="text-xl">AI-powered injury prevention and analysis</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="camera">Use Camera</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <div className="max-w-md mx-auto border rounded-lg p-6">
              {imagePreview ? (
                <div className="mb-4">
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Injury Preview"
                      className="w-full max-h-[300px] object-contain rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={resetForm}
                    >
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors mb-4"
                  onClick={handleUploadClick}
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-center text-gray-500 mb-2">
                    Drag and drop your injury image here or click to browse
                  </p>
                </div>
              )}

              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

              {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

              <div className="flex gap-4 mt-4">
                {!imagePreview ? (
                  <Button variant="outline" className="flex-1" onClick={handleUploadClick}>
                    Upload Image
                  </Button>
                ) : (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAnalyze} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="camera" className="mt-6">
            <div className="max-w-md mx-auto border rounded-lg p-6">
              <div className="bg-gray-100 rounded-lg p-12 flex flex-col items-center justify-center mb-4 aspect-video">
                <Camera className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-center text-gray-500">Camera preview will appear here</p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Take Photo
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Analyze</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {result && (
          <div className="max-w-3xl mx-auto border rounded-lg p-6 bg-white shadow">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            <div className="prose max-w-none">
              {result.split("\n").map((line, i) => (
                <p key={i}>{line || <br />}</p>
              ))}
            </div>
          </div>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">Upload</h3>
              <p className="text-sm text-gray-500">Upload a photo of your injury or use your camera</p>
            </div>

            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold mb-2">Analyze</h3>
              <p className="text-sm text-gray-500">Our AI analyzes the image to identify the injury type</p>
            </div>

            <div className="border rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Image src="/placeholder.svg?height=32&width=32" alt="Results" width={32} height={32} />
              </div>
              <h3 className="font-bold mb-2">Results</h3>
              <p className="text-sm text-gray-500">Get detailed information and recovery recommendations</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center text-xs text-gray-500 mt-8 pb-4">ATHLETYX™</footer>
    </div>
  )
}

