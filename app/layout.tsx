import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { inter, instrumentSerif } from '@/lib/fonts'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://medikarx.com'),
  title: {
    default: 'MedikaRx Labs | Leading Healthcare & Diagnostic Services',
    template: '%s | MedikaRx Labs'
  },
  description: 'MedikaRx Labs offers comprehensive healthcare services, diagnostic tests, health monitoring tools, and expert medical consultations. Your trusted partner for better health outcomes.',
  keywords: [
    'healthcare',
    'diagnostic tests',
    'medical lab',
    'health checkup',
    'blood tests',
    'BMI calculator',
    'blood pressure monitoring',
    'menstrual cycle tracker',
    'calorie counter',
    'health dashboard',
    'medical reports',
    'preventive care',
    'health screening',
    'medical consultation',
    'lab services',
    'health tools',
    'wellness',
    'medical testing',
    'pathology lab',
    'health monitoring'
  ],
  authors: [{ name: 'MedikaRx Labs Team' }],
  creator: 'MedikaRx Labs',
  publisher: 'MedikaRx Labs',
  category: 'Healthcare',
  classification: 'Healthcare Services',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://medikarx.com',
    siteName: 'MedikaRx Labs',
    title: 'MedikaRx Labs | Leading Healthcare & Diagnostic Services',
    description: 'Comprehensive healthcare services, diagnostic tests, and health monitoring tools. Your trusted partner for better health outcomes.',
    images: [
      {
        url: '/images/medikarx-logo.png',
        width: 1200,
        height: 630,
        alt: 'MedikaRx Labs - Healthcare Services',
        type: 'image/png',
      },
      {
        url: '/images/medikarx-clinic.jpg',
        width: 1200,
        height: 630,
        alt: 'MedikaRx Labs Clinic',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@MedikaRxLabs',
    creator: '@MedikaRxLabs',
    title: 'MedikaRx Labs | Leading Healthcare & Diagnostic Services',
    description: 'Comprehensive healthcare services, diagnostic tests, and health monitoring tools.',
    images: ['/images/medikarx-logo.png'],
  },

  // App metadata
  applicationName: 'MedikaRx Labs',
  generator: 'Next.js',
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    // Add other verification codes as needed
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional metadata
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2563eb',
      },
    ],
  },

  // Manifest
  manifest: '/site.webmanifest',
}

// Structured Data for Healthcare Organization
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'MedikaRx Labs',
  alternateName: 'MedikaRx Laboratories',
  description: 'Leading healthcare and diagnostic services provider offering comprehensive medical testing, health monitoring tools, and expert consultations.',
  url: 'https://medikarx.com',
  logo: 'https://medikarx.com/images/medikarx-logo.png',
  image: 'https://medikarx.com/images/medikarx-clinic.jpg',
  telephone: '+1-800-MEDIKARX',
  email: 'info@medikarx.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Healthcare Drive',
    addressLocality: 'Medical City',
    addressRegion: 'State',
    postalCode: '12345',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.7128,
    longitude: -74.0060
  },
  openingHours: [
    'Mo-Fr 08:00-18:00',
    'Sa 09:00-15:00'
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Insurance',
  medicalSpecialty: [
    'Pathology',
    'Clinical Laboratory',
    'Preventive Medicine',
    'Health Screening'
  ],
  availableService: [
    {
      '@type': 'MedicalTest',
      name: 'Blood Tests',
      description: 'Comprehensive blood testing services'
    },
    {
      '@type': 'MedicalTest', 
      name: 'Health Checkups',
      description: 'Complete health screening packages'
    },
    {
      '@type': 'Service',
      name: 'Health Monitoring Tools',
      description: 'Digital health tracking and monitoring'
    }
  ],
  sameAs: [
    'https://facebook.com/medikarxlabs',
    'https://twitter.com/medikarxlabs',
    'https://linkedin.com/company/medikarxlabs',
    'https://instagram.com/medikarxlabs'
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
      return (
      <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Additional Meta Tags */}
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="light dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Canonical URL - will be overridden by page-specific canonical */}
        <link rel="canonical" href="https://medikarx.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
