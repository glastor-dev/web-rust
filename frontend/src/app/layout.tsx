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
    default: 'Glastor | Consultora e Ingeniería de Software en Rust',
  },
  description:
    'Glastor: Consultora e ingeniería de software especializada en desarrollo backend en Rust, microservicios de alto rendimiento y arquitecturas críticas.',
  metadataBase: new URL('https://glastor.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://glastor.es',
    title: 'Glastor | Agencia de Ingeniería de Software en Rust',
    description:
      'Especialistas en backend en Rust, microservicios de latencia ultra baja y sistemas escalables de misión crítica.',
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
    title: 'Glastor | Ingeniería de Software en Rust',
    description:
      'Especialistas en backend en Rust, sistemas de misión crítica y microservicios de alta concurrencia.',
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
