"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Menu,
  X,
  Activity,
  ArrowLeft,
  Plus,
  Minus,
  Target,
  TrendingUp,
  Apple,
  Calculator,
  Calendar,
  Heart,
} from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

interface FoodItem {
  name: string
  calories: number
  quantity: number
}

interface CalorieGoal {
  bmr: number
  tdee: number
  goal: string
  targetCalories: number
}

export default function CalorieCounter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [newFood, setNewFood] = useState("")
  const [newCalories, setNewCalories] = useState("")
  const [newQuantity, setNewQuantity] = useState("1")

  // Goal calculation inputs
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [goal, setGoal] = useState("")
  const [calorieGoal, setCalorieGoal] = useState<CalorieGoal | null>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const addFoodItem = () => {
    if (!newFood || !newCalories) return

    const item: FoodItem = {
      name: newFood,
      calories: Number.parseInt(newCalories),
      quantity: Number.parseInt(newQuantity),
    }

    setFoodItems([...foodItems, item])
    setNewFood("")
    setNewCalories("")
    setNewQuantity("1")
  }

  const removeFoodItem = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index))
  }

  const getTotalCalories = () => {
    return foodItems.reduce((total, item) => total + item.calories * item.quantity, 0)
  }

  const calculateCalorieGoal = () => {
    if (!age || !gender || !weight || !height || !activityLevel || !goal) return

    const weightKg = Number.parseFloat(weight)
    const heightCm = Number.parseFloat(height)
    const ageYears = Number.parseInt(age)

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161
    }

    // Calculate TDEE based on activity level
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }

    const tdee = bmr * activityMultipliers[activityLevel]

    // Adjust for goal
    let targetCalories: number
    switch (goal) {
      case "lose":
        targetCalories = tdee - 500 // 1 lb per week
        break
      case "gain":
        targetCalories = tdee + 500 // 1 lb per week
        break
      default:
        targetCalories = tdee
    }

    setCalorieGoal({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goal,
      targetCalories: Math.round(targetCalories),
    })
  }

  const getProgressColor = () => {
    if (!calorieGoal) return "text-gray-600"

    const totalCalories = getTotalCalories()
    const percentage = (totalCalories / calorieGoal.targetCalories) * 100

    if (percentage < 80) return "text-blue-600"
    if (percentage <= 110) return "text-green-600"
    return "text-red-600"
  }

  const getProgressBgColor = () => {
    if (!calorieGoal) return "bg-gray-100"

    const totalCalories = getTotalCalories()
    const percentage = (totalCalories / calorieGoal.targetCalories) * 100

    if (percentage < 80) return "bg-blue-100"
    if (percentage <= 110) return "bg-green-100"
    return "bg-red-100"
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
              <Link href="/" className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-green-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 hover:text-green-600 transition-colors">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2 hover:bg-green-50"
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
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-green-50 py-20">
        <div className="absolute inset-0 bg-green-100/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="h-10 w-10 text-green-600" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Calorie Counter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track your daily calorie intake and reach your health goals
            </p>
          </div>
        </div>
      </section>

      {/* Calorie Counter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Goal Calculator */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Set Your Calorie Goal</CardTitle>
                <CardDescription>Calculate your daily calorie needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Age</Label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Weight (kg)</Label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Height (cm)</Label>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">Very Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Lose Weight</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="gain">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateCalorieGoal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  disabled={!age || !gender || !weight || !height || !activityLevel || !goal}
                >
                  Calculate Goal
                </Button>

                {/* Calorie Goal Results */}
                {calorieGoal && (
                  <Card className="border-2 border-green-200 bg-green-50 mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-green-800">Your Daily Calorie Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-green-700">BMR:</span>
                          <span className="font-semibold text-green-800">{calorieGoal.bmr} calories</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-green-700">TDEE:</span>
                          <span className="font-semibold text-green-800">{calorieGoal.tdee} calories</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-sm text-green-700">Target:</span>
                          <span className="font-bold text-green-800 text-lg">
                            {calorieGoal.targetCalories} calories
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Food Tracker */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Track Your Food</CardTitle>
                <CardDescription>Add foods to track your calorie intake</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="food" className="text-sm font-medium text-gray-700">
                      Food Item
                    </Label>
                    <Input
                      id="food"
                      type="text"
                      value={newFood}
                      onChange={(e) => setNewFood(e.target.value)}
                      placeholder="e.g., Apple, Rice, Chicken breast"
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories" className="text-sm font-medium text-gray-700">
                        Calories (per serving)
                      </Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newCalories}
                        onChange={(e) => setNewCalories(e.target.value)}
                        placeholder="100"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="1"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={addFoodItem}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2"
                    disabled={!newFood || !newCalories}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Food
                  </Button>
                </div>

                {/* Daily Progress */}
                {calorieGoal && (
                  <Card className={`border-2 ${getProgressBgColor()}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-900">Today's Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getProgressColor()}`}>{getTotalCalories()}</div>
                        <div className="text-lg text-gray-600 mb-2">of {calorieGoal.targetCalories} calories</div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                              getProgressColor() === "text-blue-600"
                                ? "bg-blue-600"
                                : getProgressColor() === "text-green-600"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                            }`}
                            style={{
                              width: `${Math.min((getTotalCalories() / calorieGoal.targetCalories) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {calorieGoal.targetCalories - getTotalCalories() > 0
                            ? `${calorieGoal.targetCalories - getTotalCalories()} calories remaining`
                            : `${getTotalCalories() - calorieGoal.targetCalories} calories over goal`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Food List */}
          {foodItems.length > 0 && (
            <div className="mt-12">
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${instrumentSerif.className}`}>Today's Food Log</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodItems.map((item, index) => (
                  <Card key={index} className="border-2 border-green-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                          <div className="text-lg font-bold text-green-600">
                            {item.calories * item.quantity} calories
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFoodItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nutrition Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Nutrition Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Apple className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Balanced Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Include a balance of proteins, carbohydrates, and healthy fats in every meal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Portion Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Be mindful of portion sizes to maintain a healthy calorie balance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Consistently track your intake to understand your eating patterns and progress.
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
              Explore our other health tools to help you achieve your wellness goals.
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
          </div>
        </div>
      </section>
    </div>
  )
}
