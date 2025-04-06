import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function MainPage() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome Section with GIF */}
        <section className="space-y-6">
          <div className="relative rounded-lg overflow-hidden h-68">
            <div className="relative w-full h-80">
                <Image
                  src="https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-color-tennis-sport-advertising-background-backgroundmotionwork-outtennistreeshand-paintedfreshhouses-image_75815.jpg"
                  alt="Fitness motivation"
                  fill
                  className="object-cover"
                  priority
                />
          </div>

            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">WELCOME BACK!</h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wider">
                TRACK | ANALYZE | OPTIMIZE | EXCEL
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">Daily Progress</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Steps</span>
                    <span className="text-sm font-bold">6,500/10,000</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Calories</span>
                    <span className="text-sm font-bold">250/500</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <h3 className="text-xl font-bold text-right">Overall Progress</h3>
              <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="white"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 81) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">81%</span>
                  <p className="text-xs text-gray-500">Progress</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-900 text-white p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">LEADERBOARD STATS</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Sarah Smith</span>
              <div className="flex-1 mx-4">
                <Progress value={90} className="h-2 bg-gray-700" />
              </div>
              <span className="font-bold">9000</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mark Davis</span>
              <div className="flex-1 mx-4">
                <Progress value={75} className="h-2 bg-gray-700" />
              </div>
              <span className="font-bold">7500</span>
            </div>
            <div className="flex items-center justify-between">
              <span>John Smith</span>
              <div className="flex-1 mx-4">
                <Progress value={60} className="h-2 bg-gray-700" />
              </div>
              <span className="font-bold">6000</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Lisa Jones</span>
              <div className="flex-1 mx-4">
                <Progress value={45} className="h-2 bg-gray-700" />
              </div>
              <span className="font-bold">4500</span>
            </div>
          </div>
        </section>
        
        {/* Challenges Section */}
        <section>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold whitespace-nowrap">TODAY'S CHALLENGES</h2>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
            <div className="border rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <Image
                  src="https://hips.hearstapps.com/hmg-prod/images/2cm2t8k-d-upscaled-1605715287.jpg"
                  alt="Marathon Challenge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Marathon</h3>
                <p className="text-sm text-gray-500 mb-3">Complete a 5K run</p>
                <Button className="w-full">Join Challenge</Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <Image
                  src="https://www.paralympic.org/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/2024-06/Susana%20Rodriguez%2C%20Span%2C%20Tokyo%202020%2C%20Para%20triathlon.jpg?itok=jul_UAoF"
                  alt="Triathlon Challenge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Triathlon</h3>
                <p className="text-sm text-gray-500 mb-3">Swim, bike, and run</p>
                <Button className="w-full">Join Challenge</Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <Image
                  src="https://media.istockphoto.com/id/615524918/photo/winner.jpg?s=612x612&w=0&k=20&c=Z-eRJbFT9hY-8GCs8FLS-Hn9-K9NZk5YULMt6WKxMHc="
                  alt="Strength Challenge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Strength</h3>
                <p className="text-sm text-gray-500 mb-3">Complete 100 pushups</p>
                <Button className="w-full">Join Challenge</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Injury Detector Section */}
        <section className="relative rounded-3xl  overflow-hidden transition-transform hover:scale-[1.02] ">
          <div className="relative h-80">
            <Image
              src="https://i.imgur.com/skPE1HE.jpeg"
              alt="Injury Detector"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0  bg-gradient-to-r from-grey-800/20 to-red-500/10 flex flex-col md:flex-row items-center justify-between p-8 ">
          <div className="relative max-w-md">
            <h2 className="text-5xl font-bold mb-2 drop-shadow-lg leading-none" style={{
    textShadow: '2px 2px 18px rgba(23, 35, 37, 0.8)', // teal glow
  }}>
              <span className="text-[#0097B2] italic font-light">Injury</span>
              <span className="text-[#4D81C6] font-extrabold"> DETECTOR</span>
            </h2>
            <p className="text-xl text-[#0097B2] italic drop-shadow-xl leading-tight font-medium">
              AI-powered injury prevention and analysis
            </p>
          </div>
            <Link href="/injury-detector">
              <div className="bg-gradient-to-r from-[#3827FD] to-[#7A4CFF] px-10 py-4 rounded-lg 
                            flex items-center justify-center text-[#272851] text-3xl italic font-bold 
                            shadow-lg hover:scale-105 transition-transform">
                START
              </div>
            </Link>
          </div>
        </section>

        {/* Today's Goal Section */}
        <section>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold whitespace-nowrap">TODAY'S CHALLENGES</h2>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center  rounded-full">
                <Image 
                  src="https://media.istockphoto.com/id/1218616386/vector/stair-way-ladder-icon.jpg?s=612x612&w=0&k=20&c=njw6OegQqvcVOkdSMUNj_d1IFKasvOhNe-Z9wAZa-yA="
                  alt="Steps"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">10,000</h3>
              <p className="text-sm text-gray-500 mb-3">Steps</p>
              <Progress value={65} className="h-2" />
              <p className="text-xs mt-2 text-gray-500">6,500/10,000 steps completed</p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center  rounded-full">
                <Image 
                  src="https://static.vecteezy.com/system/resources/previews/020/900/807/non_2x/burn-calories-icon-free-vector.jpg"
                  alt="Calories"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">500</h3>
              <p className="text-sm text-gray-500 mb-3">Calories Burned</p>
              <Progress value={64} className="h-2" />
              <p className="text-xs mt-2 text-gray-500">320 calories burned</p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full">
                <Image 
                  src="https://media.istockphoto.com/id/1442152045/vector/path-route-icon-distance-symbol.jpg?s=612x612&w=0&k=20&c=2ilIa1pWHJp550B31t__1NPc0CHpouutgdxt7QO4EJg="
                  alt="Distance"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">5 km</h3>
              <p className="text-sm text-gray-500 mb-3">Distance</p>
              <Progress value={40} className="h-2" />
              <p className="text-xs mt-2 text-gray-500">2.25 km completed</p>
            </div>
          </div>
        </section>

        {/* Calorie Calculator Section */}
        <section className="relative rounded-3xl overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="relative h-96 ">
            <Image
              src="https://i.imgur.com/t6qLihL.png"
              alt="Calorie Calculator"
              fill
              className="object-cover"
              style={{ objectPosition: '35% 20%' }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-start justify-center p-8">
            {/* Title */}
            <div className="text-white max-w-md" style={{textShadow: '4px 4px 18px rgba(255, 255, 255, 0.73)'}}>
              <h2 className="text-5xl font-bold" >
                <span className="text-[#B11822]">Calorie</span>
                <span className="text-[#1A3352] italic font-medium"> Calculator</span>
              </h2>
              <p className="text-lg text-[#1A3352] italic mt-2">Track your nutrition and workout calories</p>
            </div>

            {/* Button */}
            <Link href="/calorie-calculator" className="mt-6">
              <div className="bg-[#0E1F36] px-6 py-3 rounded-full flex items-center space-x-3 shadow-lg hover:scale-105 transition-transform">
                <span className="text-white text-2xl font-bold">GO</span>
                <span className="text-white text-3xl">→</span>
              </div>
            </Link>
          </div>
        </section>


        {/* FitAthlete Section */}
        <section className="relative rounded-3xl overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="relative h-96">
            <Image
              src="https://i.imgur.com/k4r5XoF.png"
              alt="FitAthlete"
              fill
              className="object-cover "
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            {/* Title */}
            <h2 className="text-5xl font-extrabold text-white">
              Unleash <span className="text-[#B11822]">Peak</span>
              <br />
              <span className="text-[#B11822]">Performance</span> with <br />
              Athlete AI!
            </h2>

            {/* Button */}
            <Link href="/fit-athlete" className="mt-6">
              <div className="bg-gradient-to-r from-[#3827FD] to-[#7A4CFF] px-10 py-4 rounded-full 
                            flex items-center justify-center text-[#272851] text-3xl italic font-bold 
                            shadow-lg hover:scale-105 transition-transform">
                START
              </div>
            </Link>
          </div>

          {/* Gemini Icon Box (Bottom Right Corner) */}
          
        </section>
      </div>
    </div>
  )
}