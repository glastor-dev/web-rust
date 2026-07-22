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
  title: 'Glastor | Ingeniería de Software & Interfaces Premium',
  description:
    'Desarrollo web avanzado, micro-interacciones, WebGL, Next.js y ecosistemas Rust. Creamos plataformas para el 1%.',
  metadataBase: new URL('https://glastor.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://glastor.es',
    title: 'Glastor | Ingeniería de Software & Interfaces Premium',
    description: 'Desarrollo web avanzado, micro-interacciones, WebGL, Next.js y ecosistemas Rust. Creamos plataformas para el 1%.',
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
    title: 'Glastor | Ingeniería de Software & Interfaces Premium',
    description: 'Desarrollo web avanzado, micro-interacciones, WebGL, Next.js y ecosistemas Rust. Creamos plataformas para el 1%.',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`dark ${redHatText.variable} ${redHatDisplay.variable} ${redHatMono.variable}`}
    >
      <body className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-brand selection:text-black">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
