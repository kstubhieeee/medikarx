"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, X, Calendar, ArrowLeft, Heart, Clock, AlertCircle, Calculator, Activity } from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

export default function MenstrualTracker() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [periodLength, setPeriodLength] = useState("5")
  const [predictions, setPredictions] = useState<any>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const calculatePredictions = () => {
    if (!lastPeriodDate) return

    const lastPeriod = new Date(lastPeriodDate)
    const cycle = Number.parseInt(cycleLength)
    const period = Number.parseInt(periodLength)

    // Calculate next period
    const nextPeriod = new Date(lastPeriod)
    nextPeriod.setDate(lastPeriod.getDate() + cycle)

    // Calculate ovulation (typically 14 days before next period)
    const ovulation = new Date(nextPeriod)
    ovulation.setDate(nextPeriod.getDate() - 14)

    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileStart = new Date(ovulation)
    fertileStart.setDate(ovulation.getDate() - 5)
    const fertileEnd = new Date(ovulation)
    fertileEnd.setDate(ovulation.getDate() + 1)

    // Calculate next 3 periods
    const futurePeriods = []
    for (let i = 1; i <= 3; i++) {
      const futurePeriod = new Date(lastPeriod)
      futurePeriod.setDate(lastPeriod.getDate() + cycle * i)
      futurePeriods.push(futurePeriod)
    }

    setPredictions({
      nextPeriod,
      ovulation,
      fertileStart,
      fertileEnd,
      futurePeriods,
      periodLength: period,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntil = (date: Date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
              <Link href="/" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-pink-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-pink-600 transition-colors">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2 hover:bg-pink-50"
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
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-pink-50 py-20">
        <div className="absolute inset-0 bg-pink-100/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-pink-600" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Menstrual Cycle Tracker
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your cycle and predict your next period, ovulation, and fertile window
            </p>
          </div>
        </div>
      </section>

      {/* Tracker Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Track Your Cycle</CardTitle>
                <CardDescription>Enter your cycle information to get predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lastPeriod" className="text-sm font-medium text-gray-700">
                    Last Period Start Date
                  </Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Cycle Length (days)</Label>
                  <Select value={cycleLength} onValueChange={setCycleLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cycle length" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} days
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Period Length (days)</Label>
                  <Select value={periodLength} onValueChange={setPeriodLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period length" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i + 3).map((days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} days
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculatePredictions}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg font-semibold"
                  disabled={!lastPeriodDate}
                >
                  Calculate Predictions
                </Button>
              </CardContent>
            </Card>

            {/* Predictions */}
            {predictions && (
              <div className="space-y-6">
                <Card className="border-2 border-pink-200 bg-pink-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-pink-800">Next Period</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-pink-600 mb-2">{formatDate(predictions.nextPeriod)}</div>
                    <div className="text-lg text-pink-700">
                      {getDaysUntil(predictions.nextPeriod) > 0
                        ? `In ${getDaysUntil(predictions.nextPeriod)} days`
                        : getDaysUntil(predictions.nextPeriod) === 0
                          ? "Today"
                          : `${Math.abs(getDaysUntil(predictions.nextPeriod))} days ago`}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-purple-800">Ovulation Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{formatDate(predictions.ovulation)}</div>
                    <div className="text-lg text-purple-700">
                      {getDaysUntil(predictions.ovulation) > 0
                        ? `In ${getDaysUntil(predictions.ovulation)} days`
                        : getDaysUntil(predictions.ovulation) === 0
                          ? "Today"
                          : `${Math.abs(getDaysUntil(predictions.ovulation))} days ago`}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-green-800">Fertile Window</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-green-600 mb-2">
                      {formatDate(predictions.fertileStart)}
                    </div>
                    <div className="text-lg font-semibold text-green-600 mb-2">
                      to {formatDate(predictions.fertileEnd)}
                    </div>
                    <div className="text-sm text-green-700">6-day fertile window including ovulation day</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Future Periods */}
          {predictions && (
            <div className="mt-12">
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${instrumentSerif.className}`}>Upcoming Periods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {predictions.futurePeriods.map((date: Date, index: number) => (
                  <Card key={index} className="border-2 border-pink-100">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900">Period {index + 2}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold text-pink-600">{formatDate(date)}</div>
                      <div className="text-sm text-gray-600 mt-1">In {getDaysUntil(date)} days</div>
                    </CardContent>
                  </Card>
                ))}
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
              Menstrual Health Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Track Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Keep track of symptoms like cramps, mood changes, and flow intensity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Regular Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track your cycle for at least 3 months to identify patterns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Consult Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Consult a healthcare provider for irregular cycles or severe symptoms.
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

            <Link href="/bp">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 h-full flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">BP Tracker</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Monitor and track your blood pressure readings
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
