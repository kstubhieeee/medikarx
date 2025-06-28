"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menu,
  X,
  TestTube,
  Package,
  Stethoscope,
  Home,
  UserCheck,
  Calendar,
  Phone,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Upload,
  Calculator,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

export default function MedikaRxLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

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
              <Image
                src="/images/medikarx-logo.png"
                alt="MedikaRx Labs"
                width={240}
                height={80}
                className="h-32 w-auto"
              />
            </div>

            {/* Centered Desktop Navigation */}
            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center space-x-1">
                <button
                  onClick={() => smoothScrollTo("home")}
                  className="text-gray-900 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Home
                </button>
                <button
                  onClick={() => smoothScrollTo("services")}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Services
                </button>
                <button
                  onClick={() => smoothScrollTo("reports")}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Reports
                </button>
                <button
                  onClick={() => smoothScrollTo("health-tools")}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Health Tools
                </button>
                <button
                  onClick={() => smoothScrollTo("blogs")}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Blogs/Articles
                </button>
                <button
                  onClick={() => smoothScrollTo("contact")}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-blue-50"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Login/Signup Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full px-6"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6">
                  Sign Up
                </Button>
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
              <button
                onClick={() => {
                  smoothScrollTo("home")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  smoothScrollTo("services")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Services
              </button>
              <button
                onClick={() => {
                  smoothScrollTo("reports")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Reports
              </button>
              <button
                onClick={() => {
                  smoothScrollTo("health-tools")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Health Tools
              </button>
              <button
                onClick={() => {
                  smoothScrollTo("blogs")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Blogs/Articles
              </button>
              <button
                onClick={() => {
                  smoothScrollTo("contact")
                  setIsMenuOpen(false)
                }}
                className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
              >
                Contact
              </button>
              <div className="border-t pt-4 mt-4 space-y-3">
                <Link href="/login">
                  <Button variant="ghost" className="w-full text-left justify-start hover:bg-blue-50 rounded-lg">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-blue-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-blue-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 ${instrumentSerif.className}`}
            >
              <span className="text-blue-600">MedikaRx Labs</span>
              <span className="text-gray-700"> & </span>
              <span className="text-pink-600">Redcliffe Labs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trusted Pathology & Health Services in Bijainagar, Rajasthan
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Advanced diagnostic solutions with state-of-the-art technology and expert care, bringing quality
              healthcare services to your doorstep.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Go to Dashboard
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Promotional Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/images/medikarx-promo.jpg"
                alt="Full Body Checkup - 81 Tests for ₹499"
                width={600}
                height={600}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${instrumentSerif.className}`}>
                Comprehensive Health Checkups
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a complete full body checkup with 81 essential tests at an unbeatable price. Our comprehensive
                packages cover Heart, Thyroid, Kidney, and Liver health assessments.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">81 Essential Tests included</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Free Home Sample Collection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Quick and Accurate Results</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Expert Medical Consultation</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Full Body Checkup
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white bg-transparent"
                >
                  Call: 78 77 33 44 88
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Your Health Reports
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access your test results and health reports securely online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Digital Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Receive your test results digitally via email and SMS
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Phone className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Access your reports anytime, anywhere with our secure portal
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Health Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Track your health progress with historical report comparisons
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Access My Reports
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to meet all your diagnostic and medical needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lab Testing */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <TestTube className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Lab Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Comprehensive laboratory tests with accurate results and quick turnaround times
                </CardDescription>
              </CardContent>
            </Card>

            {/* Health Checkup Packages */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Package className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Health Checkup Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Tailored health packages for preventive care and early detection of health issues
                </CardDescription>
              </CardContent>
            </Card>

            {/* Doctor Consultation */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Doctor Consultation / OPD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Expert medical consultations and outpatient department services
                </CardDescription>
              </CardContent>
            </Card>

            {/* Medical Equipment */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <Home className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Medical Equipment for Home Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Buy or rent medical equipment for comfortable home healthcare
                </CardDescription>
              </CardContent>
            </Card>

            {/* Specialist Appointments */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Specialist Doctor Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Book appointments with specialist doctors for expert medical care
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Home Sample Collection */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Book Free Home Collection
            </h2>
            <p className="text-lg text-gray-600">Convenient sample collection from the comfort of your home</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescription" className="text-sm font-medium text-gray-700">
                    Upload Prescription
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    <Input id="prescription" type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Book Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Health Tools Section */}
      <section id="health-tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Health Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Free health calculators and trackers to monitor your wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BMI Calculator */}
            <Link href="/bmi">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">BMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Calculate your Body Mass Index
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Menstrual Cycle Tracker */}
            <Link href="/menstrual">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-pink-200 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Calendar className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Menstrual Cycle Tracker</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Track your menstrual cycle
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* BP Tracker */}
            <Link href="/bp">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">BP Tracker</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Monitor blood pressure levels
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Calorie Counter */}
            <Link href="/calorie">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-pink-200 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-pink-100 group-hover:bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                    <Activity className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Calorie Counter</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-center text-gray-600 text-sm">
                    Track daily calorie intake
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Clinic Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Visit Our Modern Clinic
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience world-class healthcare facilities at our state-of-the-art diagnostic center in Bijainagar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Clinic Image */}
            <div>
              <Image
                src="/images/medikarx-clinic.jpg"
                alt="MedikaRx Labs Clinic - Modern Healthcare Facility"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>

            {/* Clinic Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Clinic?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Modern Equipment</h4>
                    <p className="text-gray-600">Latest diagnostic technology for accurate and reliable test results</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-pink-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">3600+ Tests Available</h4>
                    <p className="text-gray-600">Comprehensive range of diagnostic tests under one roof</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                    <p className="text-gray-600">Qualified healthcare professionals and experienced technicians</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-pink-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Convenient Location</h4>
                    <p className="text-gray-600">Easily accessible location opposite Petrol Pump, Pipli Chouraha</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Articles Section */}
      <section id="blogs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}
            >
              Health Articles & Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest health insights and medical advice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-blue-100 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  10 Essential Health Checkups Everyone Should Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Learn about the most important health screenings and when to get them for optimal health maintenance.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-pink-100 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Understanding Your Lab Reports: A Complete Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Decode your medical test results and understand what the numbers mean for your health.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-blue-50 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Diabetes Prevention: Early Signs and Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Identify early warning signs of diabetes and learn how to reduce your risk through lifestyle changes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/articles">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Image
                src="/images/medikarx-logo.png"
                alt="MedikaRx Labs"
                width={240}
                height={80}
                className="h-32 w-auto mb-4"
              />
              <p className="text-gray-600 mb-6 max-w-md">
                MedikaRx Labs in partnership with Redcliffe Labs brings world-class diagnostic services to Bijainagar,
                Rajasthan. Your health is our priority.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-white hover:bg-blue-600">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-white hover:bg-pink-600">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-white hover:bg-blue-600">
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">Bijainagar, Rajasthan</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-pink-600 mr-3" />
                  <span className="text-gray-600">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-600">info@medikarxlabs.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
              <div className="space-y-2">
                <Link href="#services" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Our Services
                </Link>
                <Link href="#health-tools" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Health Tools
                </Link>
                <Link href="#blogs" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Health Articles
                </Link>
                <Link href="/terms" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-300 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} MedikaRx Labs. All rights reserved. | Powered by Redcliffe Labs
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
