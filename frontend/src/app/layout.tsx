import type { Metadata } from 'next';
import { Red_Hat_Text, Red_Hat_Display, Red_Hat_Mono } from 'next/font/google';
import '../index.css';
import { ClientLayout } from './ClientLayout';

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-red-hat-text',
  display: 'swap',
});

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap',
});

const redHatMono = Red_Hat_Mono({
  subsets: ['latin'],
  variable: '--font-red-hat-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Glastor',
    default: 'Glastor | Soluciones Industriales',
  },
  description:
    'Glastor: Distribución B2B de herramientas premium e Ingeniería de software de alto rendimiento en Rust.',
  metadataBase: new URL('https://glastor.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://glastor.es',
    title: 'Glastor | Soluciones Industriales & Desarrollo Web',
    description: 'Distribuidor oficial de herramientas premium y Agencia de desarrollo de software crítico.',
    siteName: 'Glastor',
    images: [
      {
        url: '/images/glastor-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Glastor Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glastor',
    description: 'Distribuidor oficial de herramientas premium y Agencia de desarrollo en Rust.',
    images: ['/images/glastor-logo.webp'],
    creator: '@glastor_es',
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
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
};

import { PremiumBackground } from '@/components/ui/PremiumBackground';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`dark ${redHatText.variable} ${redHatDisplay.variable} ${redHatMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-transparent min-h-screen text-white font-sans overflow-x-hidden selection:bg-brand selection:text-black relative">
        <PremiumBackground 
          baseColor="#141416" 
          textureUrl="https://www.transparenttextures.com/patterns/darth-stripe.png"
          textureOpacity={0.4}
        />
        <NoiseOverlay />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
