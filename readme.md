# MedikaRx Labs

A modern healthcare and diagnostic services platform built with Next.js, providing comprehensive medical testing, health monitoring tools, and patient management solutions.

## Overview

MedikaRx Labs is a full-featured healthcare website that connects patients with diagnostic services, health monitoring tools, and medical consultations. The platform offers an intuitive interface for managing health data, scheduling appointments, and accessing medical reports.

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui built on Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Fonts**: Inter and Instrument Serif (Google Fonts)
- **Theme**: next-themes for dark/light mode support

## Key Features

### Core Services
- Comprehensive diagnostic testing services
- Health checkup packages
- Laboratory test management
- Medical consultation booking
- Home sample collection

### Health Monitoring Tools
- BMI Calculator with metric/imperial units
- Blood Pressure Tracker
- Calorie Counter with daily tracking
- Menstrual Cycle Tracker
- Health metrics dashboard

### User Management
- Secure authentication system
- Personal health dashboard
- Medical report management
- Appointment scheduling
- Profile management

### Content Platform
- Health articles and blog
- Medical information resources
- Category-based content filtering
- Search functionality

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout with SEO
│   ├── login/             # Authentication
│   ├── signup/            
│   ├── dashboard/         # User dashboard
│   ├── bmi/               # Health calculators
│   ├── bp/                
│   ├── calorie/           
│   ├── menstrual/         
│   └── articles/          # Content management
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── utils.ts          # Utility functions
│   └── fonts.ts          # Font configurations
├── public/               # Static assets
│   └── images/           # Brand and content images
└── styles/               # Global styles
```

## Installation

Clone the repository and install dependencies:

```bash
git clone [repository-url]
cd medikarx-landing
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build Commands

```bash
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Configuration

The project includes optimized configurations for:

- **Performance**: Disabled type checking and linting during builds for faster compilation
- **SEO**: Comprehensive metadata, Open Graph tags, and structured data
- **PWA**: Web app manifest for mobile app-like experience
- **Accessibility**: ARIA-compliant components via Radix UI

## Environment Setup

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://medikarx.com
# Add other environment variables as needed
```

## SEO Features

- Structured data for healthcare organization
- Open Graph and Twitter Card support
- Comprehensive metadata configuration
- Sitemap and robots.txt optimization
- Performance optimized font loading

## Browser Support

- Modern browsers with ES6+ support
- Mobile-responsive design
- Progressive Web App capabilities

## Deployment

The application is optimized for deployment on:

- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

Build artifacts are generated in the `.next` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright (c) 2024 MedikaRx Labs. All rights reserved.
