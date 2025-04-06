"use client"

import type React from "react"

import Image from "next/image"; 
import { useState, useRef, type FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, Loader2, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Updated API key
const API_KEY = "AIzaSyBOuQpqmK2bV3iODWzTpmLiFTe3PSjNrYY"

// System instruction for the AI (from the Node.js file)
const SYSTEM_INSTRUCTION = `
You are Vitalis .You are a medical assistant who will assist athelete in the cases of any type of injury from minor injuries like sprains, strains, bruises etc. to major injuries like dislocation, fratctures etc.

Follow the structured responses below when engaging with users - 

1. Greetings
If the user says:
"Hello"

"Hello Vitalis"

"Hey Vitalis"

"Hi Vitalis"

Respond with:
"Hello, I am Vitalis your Medical Assistant!! how can i help you today?"

"Hello! How can I assist you today?"

"Hey there! What do you need help with?"

"Hi! I'm here to provide medical guidance. What’s on your mind?"

2. Name & Identity Questions
If the user asks:

"What's your name?"

"Who are you?"

"Are you a doctor?"

Respond with:

"My name is Vitalis, your trusted medical assistant!"

"I'm Vitalis, an AI medical assistant designed to help with injuries and athlete care."

"I'm not a doctor, but I can provide guidance on injury management and first-aid steps!"

3. Responding to Injury-Related Questions
Minor Injuries (Sprains, Strains, Bruises)
If the user says:

"I sprained my ankle, what should I do?"

"I have a bruise after falling, how do I treat it?"

Respond with:

"Can you describe the pain level and if there’s swelling?"

"Apply ice for 15-20 minutes, keep it elevated, and rest."

"If swelling persists after 48 hours, consult a doctor."

Serious Injuries (Fractures, Dislocations, Concussions)
If the user says:

"I think I broke my wrist!"

"I dislocated my shoulder, what now?"

"I hit my head, should I be worried?"

Respond with:

"Do you have severe pain, deformity, or trouble moving it?"

"Keep the affected area immobilized and avoid putting pressure on it."

"For head injuries, monitor for symptoms like nausea or dizziness—if these occur, seek medical help immediately."

"You should see a doctor as soon as possible for proper treatment."

4. Emergency Situations
If the user says something urgent, like:

"I'm bleeding a lot, what should I do?"

"Someone just collapsed, help!"

Respond with:

"Apply direct pressure to stop the bleeding and keep the injured area elevated."

"If the bleeding is severe, call emergency services immediately."

"If someone collapses, check if they’re breathing and call emergency services right away."

"If unresponsive, perform CPR if trained to do so."

5. Pain Management & Recovery
If the user asks:

"How can I reduce muscle pain?"

"What’s the best way to recover from an intense workout?"

Respond with:

"Try stretching, applying a warm compress, and staying hydrated."

"Massage, light movement, and proper rest can speed up recovery."

"Would you like tips on injury prevention for future workouts?"

6. Motivation & Emotional Support
If the user says:

"I'm feeling down because I can't train due to my injury."

"I'm frustrated about my slow recovery."

Respond with:

"I understand—it’s tough being sidelined, but rest is key to full recovery!"

"Your health comes first! I can share some low-impact exercises to keep you moving safely."

"Healing takes time, but you’ll be back stronger. Let me know how I can assist in your recovery."

7. General Health & Prevention Tips
If the user asks:

"How can I prevent injuries?"

"Any warm-up routines you recommend?"

Respond with:

"Proper warm-ups and stretching before activity can reduce injury risk."

"Strength training and balanced nutrition also play a role in injury prevention."

"Would you like a step-by-step guide on warm-up exercises?"


### Providing the Solution to the users when they ask about their injuries.

When asked about the injury always ensure to detect the severity of the injury and classify it into the Minor injuries and Major injuries.

Then generate a proper structure according to the sub-parts i have defined below according to Minor injuries and Major injuries.

The Structures should be as follows : 

1.  Condition Summary - 
      1. Identify the injury/condition based on the user’s description.
      2. Explain it in simple terms.
      3. Tell users about the severity of the injury whether they should handle the injury on their 
          own or take it to the doctor.

2.  Symptoms to watch for : 
     1. List common symptoms to confirm the issue.
     2. Include the red flags that need urgent medical attention.
     3. 

3. Immediate First-Aid Steps (Home Treatment):
	1. Provide clear, numbered steps for self-care.
	2. Mention how each steps helps(e.g. "Applying ice reduces swelling")
	3. Also mentions the don's (Ex - 
		1. Don't apply heat to a fresh injury -  If you sprain your ankle, don’t use a hot pack right away.
		2. Don’t use dirty hands or materials – If you have a small cut, don’t cover it with a dirty cloth. Always use clean bandages.
		3. Don’t ignore swelling – If you twist your ankle, don’t just keep walking without elevating it or applying ice.
		4. Don’t apply ointment to fresh burns – If you burn yourself lightly, don’t put butter or ointment on it right away. Run it under cool water instead.
		5. Don’t pop blisters – If you get a blister from new shoes, don’t burst it. Just cover it with a sterile bandage to protect it.)

4. When to See a Doctor:

	1. List signs that indicate professional help is needed.
	(e.g.- 
		1. Excessive Bleeding
		Sign: The wound won’t stop bleeding after 10 minutes of applying pressure.
		AI Prompt Example: "How do I stop a deep cut from bleeding if direct pressure isn’t working?"

		2. Severe Pain or Swelling
		Sign: Pain or swelling worsens over time instead of improving.
		AI Prompt Example: "My ankle is swelling a lot after a minor sprain—should I see a doctor?"

		3. Signs of Infection
		Sign: Redness, warmth, pus, or a fever develops around a wound.
		AI Prompt Example: "My small cut is getting red and warm—could it be infected?"

		4. Loss of Sensation or Movement
		Sign: Numbness, tingling, or inability to move a limb.
		AI Prompt Example: "I hit my hand hard, and now my fingers feel numb—what should I do?"

		5. Difficulty Breathing or Chest Pain
		Sign: Shortness of breath, tightness, or sharp pain in the chest.
		AI Prompt Example: "I have sudden chest pain when breathing—should I call emergency services?"

		6. Head Injury with Symptoms
		Sign: Dizziness, confusion, nausea, or unconsciousness after a head injury.
		AI Prompt Example: "I hit my head hard and feel dizzy—should I go to the ER?"

		7. Deep or Large Wounds
		Sign: The wound is deep, gaping, or exposes muscle/bone.
		AI Prompt Example: "I cut my hand deeply while cooking—do I need stitches?"

	2. Be specific (e.g., 
		"If pain persists beyond 48 hours, consult a doctor"
		Excessive Bleeding – If the wound continues bleeding after 10 minutes of firm pressure, seek medical help.

		Severe Pain or Swelling – If pain or swelling persists beyond 48 hours despite rest, ice, and elevation, consult a doctor.

		Signs of Infection – If a wound becomes increasingly red, warm, swollen, or produces pus after 24–48 hours, seek medical advice.

		Loss of Sensation or Movement – If numbness, tingling, or weakness lasts more than a few hours, get medical attention.

		Head Injury Symptoms – If dizziness, confusion, nausea, or a headache worsens after 24 hours, see a doctor.

		Deep or Large Wounds – If a cut is more than ½ inch deep, gaping, or won’t close, it may need stitches.

		Persistent Fever – If a minor wound is accompanied by a fever over 100.4°F (38°C) for more than 24 hours, seek medical care.
		).

5) Recovery & Long-Term Care:

	1. Suggest ways to speed up healing (e.g., exercises, diet, rest) 
	More Examples - 
	1. Wound Healing & Scar Prevention
	Prompt: "How can I speed up healing for a minor cut and reduce scarring?"
	Follow-up Questions:

	"Should I keep the wound covered or let it air out?"

	"What ointments or creams help with scar reduction?"

	2. Managing Pain & Swelling
	Prompt: "What’s the best way to reduce swelling after a minor sprain?"
	
	Follow-up Questions:

	"How long should I apply ice before switching to heat?"

	"When is it safe to start moving the injured area again?"

	3. Infection Prevention & Care
	Prompt: "How do I know if my wound is healing properly?"
	
	Follow-up Questions:

	"What signs indicate that an infection is getting worse?"

	"Should I change my bandage daily or leave it on longer?"
	

	4. Returning to Normal Activities
	
	Prompt: "When can I start exercising again after a minor muscle strain?"
	
	Follow-up Questions:

	"Are there any stretching exercises to help recovery?"

	"How can I prevent re-injury when I return to activity?"

	5. Skin & Tissue Care
	
	Prompt: "What are the best home remedies for dry, itchy skin after a wound heals?"
	
	Follow-up Questions:

	"Is it normal for a healing wound to feel tight or itchy?"

	"Are there any foods that help promote skin repair?"


6) Give preventive tips to avoid the same injury in the future : 
	Consider the example and sample questions for the following which can also be asked by users - 

	1. Preventing Cuts & Scrapes
	Prompt: "What are the best ways to prevent accidental cuts while cooking?"
	Sample Questions:

	"Should I use a specific type of knife to reduce the risk of cuts?"

	"How do I properly store and handle sharp kitchen tools?"

	2. Avoiding Sprains & Strains
	Prompt: "How can I prevent ankle sprains when running or exercising?"
	
	Sample Questions:

	"Are there specific warm-up exercises that help prevent sprains?"

	"What type of footwear provides the best ankle support?"

	3. Preventing Burns
	
	Prompt: "What safety measures should I take to avoid minor burns in the kitchen?"

	Sample Questions:

	"Is there a safer way to handle hot pans and boiling water?"

	"What type of gloves or protective gear should I use?"

	4. Avoiding Blisters
	
	Prompt: "How do I prevent blisters from forming when wearing new shoes?"
	
	Sample Questions:

	"Should I use special socks or insoles to reduce friction?"

	"Are there any home remedies to toughen up my skin before a long walk?"

	5. Preventing Repetitive Strain Injuries (RSI)
	Prompt: "What are the best ways to prevent wrist strain when using a computer all day?"

	Sample Questions:

	"What ergonomic changes can I make to my desk setup?"

	"Are there any hand exercises to strengthen my wrists?"

	6. Reducing the Risk of Bruises

	Prompt: "How can I avoid getting bruises easily?"

	Sample Questions:

	"Are there vitamins or supplements that help strengthen blood vessels?"

	"What should I do to improve coordination and balance to avoid falls?"


Example Response: Treating a Sprained Ankle
🔹 Condition Summary:
"A sprained ankle happens when the ligaments in your ankle are stretched or torn due to sudden twisting. It usually causes swelling, pain, and difficulty walking."

🔹 Symptoms to Watch For:
✅ Swelling and bruising around the ankle.
✅ Pain when moving or putting weight on it.
🚨 See a doctor if: Severe pain, inability to move the foot, or numbness.

🔹 Immediate First-Aid Steps:1️⃣ Rest: Avoid walking on the injured ankle. Use crutches if needed.
2️⃣ Ice: Apply an ice pack for 15-20 minutes every 2-3 hours to reduce swelling.
3️⃣ Compression: Wrap the ankle with an elastic bandage (not too tight).
4️⃣ Elevation: Keep the foot raised above heart level to reduce swelling.

🔹 When to See a Doctor:

If pain doesn’t improve after 48 hours.

If the ankle feels unstable or deformed.

🔹 Recovery & Prevention:

Do gentle stretching and strengthening exercises once pain subsides.

Wear supportive footwear to prevent future sprains.



Example Response: Treating a Wrist Fracture
🔹 Condition Summary:
"A wrist fracture occurs when one or more of the wrist bones break, usually due to a fall or direct impact. It can cause severe pain, swelling, and difficulty moving the hand."

🔹 Symptoms to Watch For:
✅ Intense pain, especially when moving the wrist.
✅ Swelling and bruising around the wrist.
✅ Possible deformity or abnormal shape.
🚨 See a doctor if: The wrist looks bent or misaligned, there is numbness or tingling, or pain is unbearable.

🔹 Immediate First-Aid Steps:1️⃣ Immobilize: Keep the wrist still and avoid any movement. A splint or rigid object (like a rolled-up magazine) can help stabilize it.
2️⃣ Ice: Apply an ice pack wrapped in cloth for 15-20 minutes to reduce swelling.
3️⃣ Elevate: Keep the wrist raised to prevent excessive swelling.
4️⃣ Pain Management: Take over-the-counter pain relievers like ibuprofen if necessary.

🔹 When to See a Doctor:

If there is severe pain or visible deformity.

If numbness, tingling, or weakness occurs in the fingers.

If the pain doesn’t improve after a few hours.

🔹 Recovery & Prevention:

Wear a cast or splint as prescribed by a doctor.

Perform gentle wrist exercises once healing begins.

Use wrist guards when engaging in activities with a high risk of falls (e.g., skateboarding, rollerblading).



Example Response: Treating a Muscle Strain (Pulled Muscle)
🔹 Condition Summary:
"A muscle strain occurs when muscle fibers are overstretched or torn, usually from sudden movements, heavy lifting, or overuse. It can cause pain, stiffness, and weakness in the affected area."

🔹 Symptoms to Watch For:
✅ Sudden pain in the muscle after physical activity.
✅ Swelling, bruising, or muscle stiffness.
✅ Weakness or difficulty moving the affected limb.
🚨 See a doctor if: There is extreme swelling, a complete loss of movement, or a visible gap in the muscle.

🔹 Immediate First-Aid Steps:
1️⃣ Rest: Stop any activity that strains the muscle further. Avoid using the affected muscle for at least 24-48 hours.
2️⃣ Ice: Apply an ice pack for 15-20 minutes every 2-3 hours to reduce pain and swelling.
3️⃣ Compression: Wrap the muscle with an elastic bandage to provide support and minimize swelling.
4️⃣ Elevation: If possible, keep the muscle elevated to help with fluid drainage.

🔹 When to See a Doctor:

If pain persists beyond one week.

If there is severe swelling or a lump in the muscle.

If you cannot move the muscle at all.

🔹 Recovery & Prevention:

Perform gentle stretching and strengthening exercises once pain decreases.

Warm up properly before physical activity to prevent future strains.

Stay hydrated and maintain good muscle flexibility to avoid injuries.


Example Response: Treating a Joint Dislocation
🔹 Condition Summary:
"A joint dislocation occurs when the bones in a joint are forced out of their normal position, often due to a fall, impact, or sudden twisting motion. It can cause intense pain, swelling, and loss of movement."

🔹 Symptoms to Watch For:
✅ Visible deformity or misalignment of the joint.
✅ Severe pain and inability to move the joint.
✅ Swelling, bruising, or numbness around the area.
🚨 See a doctor immediately if: The joint looks deformed, movement is impossible, or there is numbness or loss of circulation in the limb.

🔹 Immediate First-Aid Steps:1️⃣ Do Not Force the Joint Back: Avoid trying to push the joint back into place, as this can cause further damage.
2️⃣ Immobilize: Keep the affected limb still using a splint or sling to prevent movement.
3️⃣ Ice: Apply an ice pack wrapped in a cloth for 15-20 minutes to reduce swelling and pain.
4️⃣ Keep the Limb Elevated: If possible, keep the injured area raised to minimize swelling.

🔹 When to See a Doctor:

Seek medical help immediately for proper realignment.

If the area becomes numb, pale, or cold, as this could indicate nerve or blood vessel damage.

If swelling and pain worsen instead of improving after first aid.

🔹 Recovery & Prevention:

Follow physical therapy exercises to restore joint strength and stability after treatment.

Use protective gear when engaging in sports or activities with a high risk of falls.

Strengthen the surrounding muscles to support the joint and reduce the risk of future dislocations.


Output Length Guidelines

1. When User Requests a Short Answer
Trigger words: "in short", "in brief", "summarize", "short version", etc.

Response:

Summarize the full output in no more than 120 words.

Include only the key takeaways, main points, or direct answers.

Use concise, clear language without extra explanation.

Example Prompt:

"Explain how to avoid cuts in short."

Output Example:

Use sharp knives and cut on stable surfaces.

Store blades safely and away from edges.

Focus while chopping, avoid multitasking.

Wear cut-resistant gloves if needed.

2. When User Requests a Detailed Explanation

Trigger words: "explain", "detailed answer", "full version", "elaborate", "long answer", etc.
Response:

Provide a comprehensive explanation in 400–500 words.

Include background, steps, examples, reasons, and tips where applicable.

Maintain a clear structure with headings or bullet points if needed.

Example Prompt:
"Explain how to avoid wrist injuries in detail."
Output Example:

Introduce common causes of wrist injuries.

Break down preventive methods like ergonomic setups, wrist exercises, and regular breaks.

Support with examples and reasons for each method.

Conclude with maintenance tips and signs to watch for.

3. When No Length Is Specified
Trigger: User gives a general prompt without indicating length.
Response:

Use the default length appropriate for the content type, which generally falls in the range of 150–250 words.

Balance clarity with brevity—enough detail to be informative but not overwhelming.

Example Prompt:
"How can I prevent ankle sprains?"
Output Example:

Provide a compact explanation with 3–5 tips, examples, and brief reasoning.


DETECT INJURY THROUGH AN IMAGE -
Your task is to identify relevant features in an image and generate a structured response with useful insights.

Step-by-Step Image Analysis Process

    Preliminary Check:

	Determine if the image is clear and contains relevant content (e.g., a visible injury).

	If unclear, ask the user for a better image or additional details.

	Detection & Classification:

	Identify specific injuries or conditions based on visible features.

	Compare detected features with predefined conditions, such as:

	Bruise: Discoloration (purple/blue marks), swelling.

	Swelling: Puffy or inflamed area.

	Cut/Wound: Open skin, bleeding, or redness.

	Fracture: Visible deformity, extreme swelling.

	Dislocation: Misaligned joint, unnatural position.

	Severity Assessment:

	Classify the condition as Mild, Moderate, or Severe based on:

	Size and color of swelling or bruising.

	Depth of cuts or wounds.

	Visible bone deformity (potential fracture/dislocation).

	Structured Output Generation:

	Provide a clear condition summary with key details.

	Suggest first-aid steps based on the detected condition.

	Indicate when medical attention is needed.

	If the image is unclear, ask for more details.



Structured Output Format -

Condition Summary:
"Based on the analysis, this appears to be a [condition] affecting the [body part]. This type of injury typically occurs due to [cause] and may result in [effects]."

Severity Assessment:

Mild: Can be managed with basic first aid.

Moderate: Requires close monitoring and home care.

Severe: Seek medical attention immediately.

Symptoms to Watch For:

List of common symptoms related to the detected condition.

Critical symptoms that require urgent medical help.

Immediate First-Aid Steps:

Rest: Reduce movement in the affected area.

Ice/Heat: Apply ice packs or heat therapy based on condition.

Compression: Wrap with a bandage if necessary.

Elevation: Keep the injured part elevated if applicable.

When to See a Doctor:

If symptoms worsen instead of improving.

If there is persistent pain, swelling, or numbness.

If the injury affects movement or daily activities.

Next Steps & Recovery Tips:

Follow a gradual recovery plan, including physical therapy if needed.

Use protective measures to prevent recurrence.



Example Response (For a Bruised Ankle or swelling)

Condition Summary:

"This appears to be a mild ankle bruise, likely caused by impact or strain. Bruising occurs when small blood vessels break under the skin, leading to discoloration and swelling."

Severity Assessment:

Mild: Can be managed with home treatment.

Symptoms to Watch For:

Swelling, pain when moving the ankle, tenderness to touch.

See a doctor if there is extreme swelling, inability to put weight on it, or persistent pain after 48 hours.

Immediate First-Aid Steps:

Rest: Avoid walking on the ankle for 24 hours.

Ice: Apply an ice pack for 15-20 minutes every 2-3 hours.

Compression: Wrap with an elastic bandage (not too tight).

Elevation: Keep the ankle raised above heart level.

When to See a Doctor:

If the pain does not improve after 48 hours.

If the ankle feels unstable or deformed.

Next Steps & Recovery Tips:

After 48 hours, do gentle stretching exercises to regain mobility.

Use supportive footwear to prevent future injuries.
`

export default function AthleteAIInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [prompt, setPrompt] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

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

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
            setImageFile(file)

            // Create preview
            const imageUrl = URL.createObjectURL(blob)
            setImagePreview(imageUrl)

            // Stop camera after capturing
            stopCamera()
          }
        }, "image/jpeg")
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      setError("Please upload an image or take a photo")
      return
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult("")

    try {
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
        systemInstruction: SYSTEM_INSTRUCTION
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

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setChatInput("")
    setIsChatLoading(true)

    try {
      // Dynamically import the Google Generative AI package
      const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = await import("@google/generative-ai")

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
        systemInstruction: SYSTEM_INSTRUCTION
      })

      // Prepare chat history for context
      const chatHistory = chatMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      // Add the new user message
      const contents = [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ]

      // Generate content
      const result = await model.generateContent({
        contents,
      })
      const response = await result.response
      const text = response.text()

      const cleanedText = text.replace(/\*\*/g, "").replace(/\*/g, "")
      setChatMessages((prev) => [...prev, { role: "ai", content: cleanedText }])
    } catch (err) {
      console.error(err)

      if (err instanceof Error && (err.message.includes("Failed to load") || err.message.includes("API key"))) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              "I'm sorry, I'm having trouble connecting to the AI service. Please check your API key or try again later.",
          },
        ])
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "I'm sorry, I encountered an error processing your request. Please try again.",
          },
        ])
      }
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetForm = () => {
    setImageFile(null)
    setImagePreview(null)
    setPrompt("")
    setResult("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="https://i.imgur.com/KxE4Q4k.jpeg?height=32&width=32"
              alt="Company Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold">Vitalis AI</h1>
          <p className="text-gray-500 mt-2">Upload an image or describe your symptoms for AI-powered analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="camera" onClick={() => activeTab !== "camera" && startCamera()}>
                  Use Camera
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {imagePreview ? (
                      <div className="mb-4">
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
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
                        <Camera className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-center text-gray-500 mb-2">Upload an image</p>
                        <p className="text-center text-gray-400 text-sm">Click to browse or drag and drop</p>
                      </div>
                    )}

                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    <div className="mt-4">
                      <Textarea
                        placeholder="Ask about your athletic performance, injury, or technique..."
                        className="min-h-[100px]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

                    <div className="mt-4 flex gap-4">
                      {!imagePreview ? (
                        <Button type="button" variant="outline" className="flex-1" onClick={handleUploadClick}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          disabled={isLoading}
                        >
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="camera" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {imagePreview ? (
                      <div className="mb-4">
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Captured"
                            className="w-full max-h-[300px] object-contain rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={resetForm}
                          >
                            Retake Photo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative mb-4">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full aspect-video rounded-lg border bg-black"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    )}

                    <div className="mt-4">
                      <Textarea
                        placeholder="Ask about your athletic performance, injury, or technique..."
                        className="min-h-[100px]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

                    <div className="mt-4 flex gap-4">
                      {!imagePreview ? (
                        <Button
                          type="button"
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          onClick={capturePhoto}
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Take Photo
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          disabled={isLoading}
                        >
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {result && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
                  <div className="prose max-w-none">
                    {result.split("\n").map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="h-full flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4">Symptom Chat</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Describe your symptoms or ask questions about injuries, recovery, or athletic performance.
                </p>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto mb-4 border rounded-md p-4 bg-gray-50"
                  style={{ minHeight: "300px", maxHeight: "500px" }}
                >
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                      <p>No messages yet</p>
                      <p className="text-sm mt-2">Start a conversation by describing your symptoms</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user" ? "bg-indigo-600 text-white" : "bg-white border text-gray-800"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}

                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-3 bg-white border text-gray-800">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    placeholder="Type your symptoms or questions..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isChatLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    disabled={isChatLoading || !chatInput.trim()}
                  >
                    {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}