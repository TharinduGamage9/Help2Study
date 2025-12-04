import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Help2Study - Free Notes & Study Materials Platform',
    template: '%s | Help2Study'
  },
  description: 'Free notes and study materials for OL, AL, NVQ, Psychology, B Com, Languages, BA External, and Grade 5. Access comprehensive study resources and drive links for all subjects.',
  keywords: ['free notes', 'study materials', 'OL notes', 'AL notes', 'NVQ courses', 'psychology notes', 'B Com notes', 'language learning', 'BA external degree', 'grade 5 notes', 'Sri Lanka education', 'free study resources'],
  authors: [{ name: 'Note Creates' }],
  creator: 'Note Creates',
  publisher: 'Help2Study',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://help2study.com',
    siteName: 'Help2Study',
    title: 'Help2Study - Free Notes & Study Materials Platform',
    description: 'Free notes and study materials for OL, AL, NVQ, Psychology, B Com, Languages, BA External, and Grade 5.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help2Study - Free Notes & Study Materials Platform',
    description: 'Free notes and study materials for OL, AL, NVQ, Psychology, B Com, Languages, BA External, and Grade 5.',
  },
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

