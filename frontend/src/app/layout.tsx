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
