"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Menu,
  X,
  LayoutDashboard,
  ArrowLeft,
  Calculator,
  Calendar,
  Heart,
  Activity,
  FileText,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Plus,
  Filter,
  Search,
  Bell,
  User,
  LogOut,
} from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

// Mock data for demonstration
const mockHealthData = {
  bmi: {
    current: 23.5,
    category: "Normal",
    trend: "stable",
    lastUpdated: "2024-01-15",
    history: [22.8, 23.1, 23.5, 23.2, 23.5],
  },
  bloodPressure: {
    current: { systolic: 118, diastolic: 78 },
    category: "Normal",
    trend: "improving",
    lastUpdated: "2024-01-14",
    history: [
      { systolic: 125, diastolic: 82 },
      { systolic: 122, diastolic: 80 },
      { systolic: 118, diastolic: 78 },
    ],
  },
  menstrualCycle: {
    nextPeriod: "2024-01-25",
    daysUntil: 10,
    cycleLength: 28,
    lastUpdated: "2024-01-10",
  },
  calories: {
    todayIntake: 1850,
    goal: 2000,
    remaining: 150,
    trend: "on-track",
    lastUpdated: "2024-01-15",
  },
}

const mockReports = [
  {
    id: 1,
    name: "Complete Blood Count",
    date: "2024-01-10",
    status: "completed",
    type: "Lab Test",
    downloadUrl: "#",
  },
  {
    id: 2,
    name: "Lipid Profile",
    date: "2024-01-08",
    status: "completed",
    type: "Lab Test",
    downloadUrl: "#",
  },
  {
    id: 3,
    name: "Thyroid Function Test",
    date: "2024-01-05",
    status: "processing",
    type: "Lab Test",
    downloadUrl: null,
  },
  {
    id: 4,
    name: "Full Body Checkup",
    date: "2024-01-03",
    status: "completed",
    type: "Health Package",
    downloadUrl: "#",
  },
]

const mockBookings = [
  {
    id: 1,
    service: "Home Sample Collection",
    date: "2024-01-20",
    time: "10:00 AM",
    status: "confirmed",
    type: "collection",
  },
  {
    id: 2,
    service: "Dr. Consultation",
    date: "2024-01-18",
    time: "2:30 PM",
    status: "confirmed",
    type: "consultation",
  },
  {
    id: 3,
    service: "Full Body Checkup",
    date: "2024-01-15",
    time: "9:00 AM",
    status: "completed",
    type: "checkup",
  },
  {
    id: 4,
    service: "Blood Test",
    date: "2024-01-22",
    time: "11:00 AM",
    status: "pending",
    type: "test",
  },
]

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getBMIColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "normal":
        return "text-green-600"
      case "underweight":
        return "text-blue-600"
      case "overweight":
        return "text-yellow-600"
      case "obese":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getBPColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "normal":
        return "text-green-600"
      case "elevated":
        return "text-yellow-600"
      case "high stage 1":
      case "high stage 2":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
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
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
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
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-50 py-12">
        <div className="absolute inset-0 bg-blue-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <LayoutDashboard className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 ${instrumentSerif.className}`}>
                    Health Dashboard
                  </h1>
                  <p className="text-lg text-gray-600">Welcome back! Here's your health overview</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="health-tools">Health Tools</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">BMI Status</CardTitle>
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockHealthData.bmi.current}</div>
                    <p className={`text-xs ${getBMIColor(mockHealthData.bmi.category)}`}>
                      {mockHealthData.bmi.category}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                    <Heart className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockHealthData.bloodPressure.current.systolic}/{mockHealthData.bloodPressure.current.diastolic}
                    </div>
                    <p className={`text-xs ${getBPColor(mockHealthData.bloodPressure.category)}`}>
                      {mockHealthData.bloodPressure.category}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Period</CardTitle>
                    <Calendar className="h-4 w-4 text-pink-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockHealthData.menstrualCycle.daysUntil}</div>
                    <p className="text-xs text-gray-600">days remaining</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
                    <Activity className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockHealthData.calories.todayIntake}</div>
                    <p className="text-xs text-gray-600">of {mockHealthData.calories.goal} goal</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockReports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">{report.name}</p>
                            <p className="text-xs text-gray-600">{report.date}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockBookings
                      .filter((booking) => booking.status === "confirmed")
                      .slice(0, 3)
                      .map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-sm">{booking.service}</p>
                              <p className="text-xs text-gray-600">
                                {booking.date} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Health Tools Tab */}
            <TabsContent value="health-tools" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* BMI Tracker */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Calculator className="h-5 w-5 text-blue-600 mr-2" />
                        BMI Tracker
                      </span>
                      {getTrendIcon(mockHealthData.bmi.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">{mockHealthData.bmi.current}</div>
                      <div className={`text-lg font-semibold ${getBMIColor(mockHealthData.bmi.category)}`}>
                        {mockHealthData.bmi.category}
                      </div>
                      <p className="text-sm text-gray-600">Last updated: {mockHealthData.bmi.lastUpdated}</p>
                    </div>
                    <div className="flex justify-between">
                      <Link href="/bmi">
                        <Button variant="outline" size="sm">
                          Update BMI
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Pressure Tracker */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Heart className="h-5 w-5 text-red-600 mr-2" />
                        Blood Pressure
                      </span>
                      {getTrendIcon(mockHealthData.bloodPressure.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600">
                        {mockHealthData.bloodPressure.current.systolic}/{mockHealthData.bloodPressure.current.diastolic}
                      </div>
                      <div className={`text-lg font-semibold ${getBPColor(mockHealthData.bloodPressure.category)}`}>
                        {mockHealthData.bloodPressure.category}
                      </div>
                      <p className="text-sm text-gray-600">Last updated: {mockHealthData.bloodPressure.lastUpdated}</p>
                    </div>
                    <div className="flex justify-between">
                      <Link href="/bp">
                        <Button variant="outline" size="sm">
                          Add Reading
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Menstrual Cycle Tracker */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 text-pink-600 mr-2" />
                      Menstrual Cycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-pink-600">{mockHealthData.menstrualCycle.daysUntil}</div>
                      <div className="text-lg font-semibold text-gray-900">Days until next period</div>
                      <p className="text-sm text-gray-600">Expected: {mockHealthData.menstrualCycle.nextPeriod}</p>
                    </div>
                    <div className="flex justify-between">
                      <Link href="/menstrual">
                        <Button variant="outline" size="sm">
                          Update Cycle
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Calorie Counter */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 text-green-600 mr-2" />
                      Calorie Tracker
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Today's Progress</span>
                        <span>
                          {mockHealthData.calories.todayIntake} / {mockHealthData.calories.goal}
                        </span>
                      </div>
                      <Progress
                        value={(mockHealthData.calories.todayIntake / mockHealthData.calories.goal) * 100}
                        className="h-2"
                      />
                      <p className="text-sm text-gray-600">{mockHealthData.calories.remaining} calories remaining</p>
                    </div>
                    <div className="flex justify-between">
                      <Link href="/calorie">
                        <Button variant="outline" size="sm">
                          Add Food
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Log
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Medical Reports</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{report.name}</h3>
                            <p className="text-sm text-gray-600">
                              {report.type} • {report.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          {report.status === "completed" && (
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          )}
                          {report.status === "processing" && (
                            <div className="flex items-center text-yellow-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm">Processing...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Appointments & Bookings</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                            <p className="text-sm text-gray-600">
                              {booking.date} at {booking.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          {booking.status === "confirmed" && (
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600 bg-transparent"
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                          {booking.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
