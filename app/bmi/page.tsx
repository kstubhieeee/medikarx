"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, X, Calculator, ArrowLeft, Scale, Target, Activity, Heart, Calendar } from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

export default function BMICalculator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("metric")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const calculateBMI = () => {
    if (!height || !weight) return

    let heightInMeters: number
    let weightInKg: number

    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      // Imperial: height in inches, weight in pounds
      heightInMeters = (Number.parseFloat(height) * 2.54) / 100
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters)
    setBmi(Number.parseFloat(bmiValue.toFixed(1)))

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight")
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("Normal weight")
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("Overweight")
    } else {
      setCategory("Obese")
    }
  }

  const getBMIColor = () => {
    if (!bmi) return "text-gray-600"
    if (bmi < 18.5) return "text-blue-600"
    if (bmi >= 18.5 && bmi < 25) return "text-green-600"
    if (bmi >= 25 && bmi < 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getBMIBgColor = () => {
    if (!bmi) return "bg-gray-100"
    if (bmi < 18.5) return "bg-blue-100"
    if (bmi >= 18.5 && bmi < 25) return "bg-green-100"
    if (bmi >= 25 && bmi < 30) return "bg-yellow-100"
    return "bg-red-100"
  }

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
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

            {/* Back to Home */}
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

            {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
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
              <Calculator className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              BMI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your Body Mass Index and understand your health status
            </p>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Calculate Your BMI</CardTitle>
                <CardDescription>Enter your measurements to calculate your Body Mass Index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium text-gray-700">
                    Height {unit === "metric" ? "(cm)" : "(inches)"}
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === "metric" ? "Enter height in cm" : "Enter height in inches"}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
                    Weight {unit === "metric" ? "(kg)" : "(lbs)"}
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === "metric" ? "Enter weight in kg" : "Enter weight in lbs"}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button
                  onClick={calculateBMI}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  disabled={!height || !weight}
                >
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* BMI Result */}
              {bmi && (
                <Card className={`border-2 ${getBMIBgColor()}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900">Your BMI</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className={`text-6xl font-bold mb-4 ${getBMIColor()}`}>{bmi}</div>
                    <div className={`text-2xl font-semibold mb-4 ${getBMIColor()}`}>{category}</div>
                  </CardContent>
                </Card>
              )}

              {/* BMI Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">BMI Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Underweight</span>
                    <span className="text-blue-600 font-semibold">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Normal weight</span>
                    <span className="text-green-600 font-semibold">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Overweight</span>
                    <span className="text-yellow-600 font-semibold">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Obese</span>
                    <span className="text-red-600 font-semibold">30.0 and above</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Health Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Maintain a healthy BMI with these lifestyle recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Balanced Diet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Maintain a balanced diet with proper portions of proteins, carbohydrates, and healthy fats.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Regular Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Engage in at least 150 minutes of moderate-intensity exercise per week.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Set Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Set realistic weight management goals and track your progress regularly.
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our other health calculators and trackers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
