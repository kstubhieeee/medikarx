"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menu,
  X,
  Home,
  ArrowLeft,
  Search,
  FileQuestion,
  Calculator,
  Calendar,
  Heart,
  Activity,
  BookOpen,
  LayoutDashboard,
} from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

export default function NotFound() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const popularPages = [
    {
      title: "Health Dashboard",
      description: "View your health metrics and reports",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index",
      href: "/bmi",
      icon: <Calculator className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Health Articles",
      description: "Read our latest health tips and insights",
      href: "/articles",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Menstrual Tracker",
      description: "Track your menstrual cycle",
      href: "/menstrual",
      icon: <Calendar className="h-6 w-6 text-pink-600" />,
    },
    {
      title: "BP Tracker",
      description: "Monitor your blood pressure",
      href: "/bp",
      icon: <Heart className="h-6 w-6 text-red-600" />,
    },
    {
      title: "Calorie Counter",
      description: "Track your daily calorie intake",
      href: "/calorie",
      icon: <Activity className="h-6 w-6 text-green-600" />,
    },
  ]

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
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors">
                Articles
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
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/articles"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Articles
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

      {/* 404 Error Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Error Icon */}
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileQuestion className="h-16 w-16 text-blue-600" />
          </div>

          {/* Error Message */}
          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>404</h1>
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
            URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent px-8 py-3"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Pages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Popular Pages
            </h3>
            <p className="text-lg text-gray-600">Maybe you were looking for one of these?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => (
              <Link key={index} href={page.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      {page.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">{page.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
            Still Can't Find What You're Looking For?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our support team is here to help you navigate our healthcare services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-semibold">Search Our Site</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use our search feature to find specific health information or services
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-semibold">Browse Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Check out our comprehensive health articles and medical insights</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-lg font-semibold">Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Reach out to our healthcare support team for personalized assistance</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/images/medikarx-logo.png"
              alt="MedikaRx Labs"
              width={240}
              height={80}
              className="h-24 w-auto mx-auto mb-4"
            />
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              MedikaRx Labs - Your trusted partner in healthcare and wellness
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors">
                Articles
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="border-t border-blue-300 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MedikaRx Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
