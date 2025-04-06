import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Globe } from "lucide-react"

export default function About() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">About ATHLETYX</h1>
          <p className="text-gray-500 mt-2">Meet the team behind the platform</p>
        </div>

        <div className="prose max-w-none">
          <p>
            ATHLETYX is a comprehensive sports and fitness platform designed to help athletes of all levels track,
            analyze, and optimize their performance. Our AI-powered tools provide personalized insights, training plans,
            and financial guidance to help you excel in your athletic journey.
          </p>
          <p>
            Our mission is to make professional-level sports analytics and training methodologies accessible to
            everyone, from beginners to elite athletes. We believe that with the right tools and guidance, anyone can
            achieve their fitness goals and unlock their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src="https://i.imgur.com/DBoioCp.png?height=128&width=128"
                    alt="Team Member 1"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">Srish Jana</h2>
                <p className="text-gray-500">Co-Founder & Developer</p>

                <div className="mt-4 space-y-2 w-full">
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Linkedin className="w-5 h-5 text-blue-600 mr-3" />
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                      linkedin.com/in/teammember1
                    </a>
                  </div>
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Github className="w-5 h-5 text-gray-800 mr-3" />
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                      github.com/teammember1
                    </a>
                  </div>
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Mail className="w-5 h-5 text-red-500 mr-3" />
                    <a href="mailto:teammember1@athletyx.com" className="text-gray-700 hover:text-red-500">
                      teammember1@athletyx.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
                  <p className="text-gray-600 italic">
                    "Add your personal quote or bio here. This space is reserved for a short description about yourself,
                    your role, and your vision for ATHLETYX."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src="https://i.imgur.com/DBoioCp.png?height=128&width=128"
                    alt="Team Member 2"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">Vanshika Arora</h2>
                <p className="text-gray-500">Co-Founder & Designer</p>

                <div className="mt-4 space-y-2 w-full">
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Linkedin className="w-5 h-5 text-blue-600 mr-3" />
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                      linkedin.com/in/teammember2
                    </a>
                  </div>
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Github className="w-5 h-5 text-gray-800 mr-3" />
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                      github.com/teammember2
                    </a>
                  </div>
                  <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Mail className="w-5 h-5 text-red-500 mr-3" />
                    <a href="mailto:teammember2@athletyx.com" className="text-gray-700 hover:text-red-500">
                      teammember2@athletyx.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
                  <p className="text-gray-600 italic">
                    "Add your personal quote or bio here. This space is reserved for a short description about yourself,
                    your role, and your vision for ATHLETYX."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              At ATHLETYX, we envision a future where technology and sports science come together to create
              personalized, data-driven training experiences for athletes of all levels. Our platform combines
              cutting-edge AI with proven sports science methodologies to help you track your progress, prevent
              injuries, and achieve your fitness goals.
            </p>
            <p className="text-gray-600 mt-4">
              We're committed to continuous innovation and improvement, always striving to provide the most accurate,
              helpful, and user-friendly tools for our community. Whether you're a professional athlete, a weekend
              warrior, or just starting your fitness journey, ATHLETYX is designed to support you every step of the way.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">contact@athletyx.com</p>
                  <p className="text-gray-600">support@athletyx.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Website</h3>
                  <p className="text-gray-600">www.athletyx.com</p>
                  <p className="text-gray-600">blog.athletyx.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

