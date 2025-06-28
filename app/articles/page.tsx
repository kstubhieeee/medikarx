"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Menu,
  X,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Heart,
  Brain,
  Activity,
  Apple,
  Shield,
  Stethoscope,
  ChevronRight,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import { Inter, Instrument_Serif } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
})

// Mock articles data
const mockArticles = [
  {
    id: 1,
    title: "10 Essential Health Checkups Everyone Should Get",
    excerpt: "Learn about the most important health screenings and when to get them for optimal health maintenance.",
    content: "Regular health checkups are crucial for maintaining good health and catching potential issues early...",
    category: "Preventive Care",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Health Checkups", "Prevention", "Screening"],
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Your Lab Reports: A Complete Guide",
    excerpt: "Decode your medical test results and understand what the numbers mean for your health.",
    content: "Medical lab reports can be confusing with all the numbers and medical terminology...",
    category: "Lab Tests",
    author: "Dr. Michael Chen",
    publishDate: "2024-01-12",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Lab Reports", "Blood Tests", "Health Metrics"],
    featured: false,
  },
  {
    id: 3,
    title: "Diabetes Prevention: Early Signs and Risk Factors",
    excerpt: "Identify early warning signs of diabetes and learn how to reduce your risk through lifestyle changes.",
    content: "Diabetes is a growing health concern worldwide, but many cases can be prevented...",
    category: "Diabetes",
    author: "Dr. Emily Rodriguez",
    publishDate: "2024-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Diabetes", "Prevention", "Lifestyle"],
    featured: true,
  },
  {
    id: 4,
    title: "Heart Health: Foods That Protect Your Cardiovascular System",
    excerpt: "Discover the best foods for heart health and how to incorporate them into your daily diet.",
    content:
      "Your heart is one of the most important organs in your body, and what you eat directly affects its health...",
    category: "Heart Health",
    author: "Dr. James Wilson",
    publishDate: "2024-01-08",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Heart Health", "Nutrition", "Diet"],
    featured: false,
  },
  {
    id: 5,
    title: "Mental Health and Physical Wellness: The Connection",
    excerpt: "Explore how mental health impacts physical wellness and vice versa in this comprehensive guide.",
    content: "The mind-body connection is more powerful than many people realize...",
    category: "Mental Health",
    author: "Dr. Lisa Thompson",
    publishDate: "2024-01-05",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Mental Health", "Wellness", "Mind-Body"],
    featured: false,
  },
  {
    id: 6,
    title: "Women's Health: Essential Screenings by Age",
    excerpt: "A comprehensive guide to important health screenings for women at different life stages.",
    content: "Women's health needs change throughout different life stages...",
    category: "Women's Health",
    author: "Dr. Rachel Green",
    publishDate: "2024-01-03",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Women's Health", "Screening", "Prevention"],
    featured: true,
  },
  {
    id: 7,
    title: "The Importance of Regular Blood Pressure Monitoring",
    excerpt:
      "Learn why monitoring your blood pressure regularly is crucial for preventing serious health complications.",
    content: "High blood pressure is often called the 'silent killer' because it typically has no symptoms...",
    category: "Heart Health",
    author: "Dr. Robert Kim",
    publishDate: "2024-01-01",
    readTime: "4 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Blood Pressure", "Monitoring", "Heart Health"],
    featured: false,
  },
  {
    id: 8,
    title: "Nutrition Myths Debunked: What Science Really Says",
    excerpt: "Separate fact from fiction with evidence-based insights into common nutrition myths.",
    content: "The world of nutrition is filled with conflicting information and myths...",
    category: "Nutrition",
    author: "Dr. Amanda Foster",
    publishDate: "2023-12-28",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Nutrition", "Myths", "Science"],
    featured: false,
  },
]

const categories = [
  "All Categories",
  "Preventive Care",
  "Lab Tests",
  "Heart Health",
  "Diabetes",
  "Mental Health",
  "Women's Health",
  "Nutrition",
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Heart Health":
      return <Heart className="h-4 w-4" />
    case "Mental Health":
      return <Brain className="h-4 w-4" />
    case "Nutrition":
      return <Apple className="h-4 w-4" />
    case "Preventive Care":
      return <Shield className="h-4 w-4" />
    case "Lab Tests":
      return <Activity className="h-4 w-4" />
    case "Women's Health":
      return <Stethoscope className="h-4 w-4" />
    default:
      return <BookOpen className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Heart Health":
      return "bg-red-100 text-red-800"
    case "Mental Health":
      return "bg-purple-100 text-purple-800"
    case "Nutrition":
      return "bg-green-100 text-green-800"
    case "Preventive Care":
      return "bg-blue-100 text-blue-800"
    case "Lab Tests":
      return "bg-orange-100 text-orange-800"
    case "Women's Health":
      return "bg-pink-100 text-pink-800"
    case "Diabetes":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ArticlesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredArticles, setFilteredArticles] = useState(mockArticles)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter and sort articles
  useEffect(() => {
    let filtered = mockArticles

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    // Sort articles
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())
        break
      case "readTime":
        filtered.sort((a, b) => Number.parseInt(a.readTime) - Number.parseInt(b.readTime))
        break
      default:
        break
    }

    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  const featuredArticles = mockArticles.filter((article) => article.featured)

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
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
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
                href="/dashboard"
                className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Dashboard
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
              Health Articles & Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay informed with the latest health insights, medical advice, and wellness tips from our expert
              healthcare professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <TrendingUp className="h-4 w-4 mr-2" />
                Featured Articles
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Latest Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="readTime">Read Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === "All Categories" && !searchTerm && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
                Featured Articles
              </h2>
              <p className="text-lg text-gray-600">Our most popular and important health articles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article) => (
                <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/10"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        <span className="flex items-center">
                          {getCategoryIcon(article.category)}
                          <span className="ml-1">{article.category}</span>
                        </span>
                      </Badge>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${instrumentSerif.className}`}>
              {selectedCategory === "All Categories" ? "All Articles" : selectedCategory}
            </h2>
            <div className="text-sm text-gray-600">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-600/10"></div>
                    {article.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        <span className="flex items-center">
                          {getCategoryIcon(article.category)}
                          <span className="ml-1">{article.category}</span>
                        </span>
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </CardDescription>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-600"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${instrumentSerif.className}`}>
            Stay Updated with Health Tips
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and get the latest health articles delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
