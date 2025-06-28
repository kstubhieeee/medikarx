import { Inter, Instrument_Serif } from 'next/font/google'

// Inter font configuration
export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Instrument Serif font configuration with only available weights
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'], // Only use available weight to prevent errors
  display: 'swap',
  variable: '--font-instrument-serif',
})

// Export font class names for easy use
export const fontClasses = {
  inter: inter.className,
  instrumentSerif: instrumentSerif.className,
  interVariable: inter.variable,
  instrumentSerifVariable: instrumentSerif.variable,
} as const 