"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Heart, ArrowLeft, Activity, AlertTriangle, CheckCircle, Calculator, Calendar } from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

interface BPReading {
  systolic: number
  diastolic: number
  date: string
  time: string
}

export default function BPTracker() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [systolic, setSystolic] = useState("")
  const [diastolic, setDiastolic] = useState("")
  const [readings, setReadings] = useState<BPReading[]>([])
  const [currentReading, setCurrentReading] = useState<BPReading | null>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const addReading = () => {
    if (!systolic || !diastolic) return

    const now = new Date()
    const newReading: BPReading = {
      systolic: Number.parseInt(systolic),
      diastolic: Number.parseInt(diastolic),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setReadings([newReading, ...readings])
    setCurrentReading(newReading)
    setSystolic("")
    setDiastolic("")
  }

  const getBPCategory = (sys: number, dia: number) => {
    if (sys < 90 || dia < 60) {
      return { category: "Low", color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-200" }
    } else if (sys < 120 && dia < 80) {
      return { category: "Normal", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-200" }
    } else if (sys < 130 && dia < 80) {
      return {
        category: "Elevated",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-200",
      }
    } else if (sys < 140 || dia < 90) {
      return {
        category: "High Stage 1",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-200",
      }
    } else if (sys < 180 || dia < 120) {
      return { category: "High Stage 2", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-200" }
    } else {
      return { category: "Crisis", color: "text-red-800", bgColor: "bg-red-200", borderColor: "border-red-400" }
    }
  }

  const getAverageReading = () => {
    if (readings.length === 0) return null

    const recentReadings = readings.slice(0, 5) // Last 5 readings
    const avgSystolic = Math.round(recentReadings.reduce((sum, r) => sum + r.systolic, 0) / recentReadings.length)
    const avgDiastolic = Math.round(recentReadings.reduce((sum, r) => sum + r.diastolic, 0) / recentReadings.length)

    return { systolic: avgSystolic, diastolic: avgDiastolic }
  }

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/medikarx-logo.png"
                  alt="MedikaRx Labs"
                  width={240}
                  height={80}
                  className="h-32 w-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2 hover:bg-blue-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100/50 bg-white/80 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-50 py-20">
        <div className="absolute inset-0 bg-blue-100/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Blood Pressure Tracker
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor and track your blood pressure readings to maintain heart health
            </p>
          </div>
        </div>
      </section>

      {/* BP Tracker Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Record Blood Pressure</CardTitle>
                <CardDescription>Enter your blood pressure reading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systolic" className="text-sm font-medium text-gray-700">
                      Systolic (mmHg)
                    </Label>
                    <Input
                      id="systolic"
                      type="number"
                      value={systolic}
                      onChange={(e) => setSystolic(e.target.value)}
                      placeholder="120"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diastolic" className="text-sm font-medium text-gray-700">
                      Diastolic (mmHg)
                    </Label>
                    <Input
                      id="diastolic"
                      type="number"
                      value={diastolic}
                      onChange={(e) => setDiastolic(e.target.value)}
                      placeholder="80"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <Button
                  onClick={addReading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  disabled={!systolic || !diastolic}
                >
                  Add Reading
                </Button>

                {/* Current Reading */}
                {currentReading && (
                  <Card
                    className={`border-2 ${getBPCategory(currentReading.systolic, currentReading.diastolic).borderColor} ${getBPCategory(currentReading.systolic, currentReading.diastolic).bgColor}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-900">Latest Reading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {currentReading.systolic}/{currentReading.diastolic}
                      </div>
                      <div
                        className={`text-lg font-semibold mb-2 ${getBPCategory(currentReading.systolic, currentReading.diastolic).color}`}
                      >
                        {getBPCategory(currentReading.systolic, currentReading.diastolic).category}
                      </div>
                      <div className="text-sm text-gray-600">
                        {currentReading.date} at {currentReading.time}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* BP Categories & Average */}
            <div className="space-y-6">
              {/* Average Reading */}
              {getAverageReading() && (
                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-purple-800">Average (Last 5 Readings)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {getAverageReading()?.systolic}/{getAverageReading()?.diastolic}
                    </div>
                    <div
                      className={`text-lg font-semibold ${getBPCategory(getAverageReading()!.systolic, getAverageReading()!.diastolic).color}`}
                    >
                      {getBPCategory(getAverageReading()!.systolic, getAverageReading()!.diastolic).category}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* BP Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Blood Pressure Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Low</span>
                    <span className="text-blue-600 font-semibold">{"<90/<60"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Normal</span>
                    <span className="text-green-600 font-semibold">{"<120/<80"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Elevated</span>
                    <span className="text-yellow-600 font-semibold">120-129/{"<80"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">High Stage 1</span>
                    <span className="text-orange-600 font-semibold">130-139/80-89</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">High Stage 2</span>
                    <span className="text-red-600 font-semibold">140-179/90-119</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg">
                    <span className="font-medium">Crisis</span>
                    <span className="text-red-800 font-semibold">{"≥180/≥120"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reading History */}
          {readings.length > 0 && (
            <div className="mt-12">
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${instrumentSerif.className}`}>Reading History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readings.slice(0, 6).map((reading, index) => {
                  const category = getBPCategory(reading.systolic, reading.diastolic)
                  return (
                    <Card key={index} className={`border-2 ${category.borderColor} ${category.bgColor}`}>
                      <CardContent className="p-4">
                        <div className="text-xl font-bold text-gray-900">
                          {reading.systolic}/{reading.diastolic}
                        </div>
                        <div className={`text-sm font-semibold ${category.color}`}>{category.category}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {reading.date} at {reading.time}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Health Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Heart Health Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Regular Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Engage in regular physical activity to strengthen your heart and lower blood pressure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Healthy Diet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Follow a heart-healthy diet low in sodium and rich in fruits and vegetables.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Monitor Regularly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Check your blood pressure regularly and consult your doctor about any concerns.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Health Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Other Health Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our other health tools to help you stay informed and proactive about your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/bmi">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">BMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Calculate your Body Mass Index and health status
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/menstrual">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-pink-200 h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Calendar className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Menstrual Cycle Tracker</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Track your menstrual cycle and predict future periods
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/calorie">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-200 h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Calorie Counter</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Track your daily calorie intake and expenditure
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
