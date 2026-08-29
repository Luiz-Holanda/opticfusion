import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

/**
 * @typedef {Object} LayoutProps
 * @property {React.ReactNode} children
 */

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const FONT_VARIABLES = `${geistSans.variable} ${geistMono.variable}`;

export const metadata = {
  title: 'OPTIC FUSION — Fotografia inteligente movida por IA',
  description:
    'Optic Fusion é um assistente de câmera com Inteligência Artificial que corrige enquadramento, iluminação e composição em tempo real. Landing page do projeto acadêmico.',
  keywords: [
    'Optic Fusion',
    'IA',
    'Inteligência Artificial',
    'fotografia',
    'câmera',
    'Next.js',
    'React',
    'Front-End',
    'Challenge',
    'Landing Page',
  ],
  authors: [{ name: 'Equipe Optic Fusion' }],
  creator: 'Equipe Optic Fusion',
  publisher: 'Optic Fusion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: null,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'OPTIC FUSION — Fotografia inteligente movida por IA',
    description:
      'Assistente de câmera com IA para fotos de qualidade profissional no primeiro clique.',
    siteName: 'Optic Fusion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPTIC FUSION',
    description:
      'Fotografia inteligente movida por IA — Landing page do projeto acadêmico.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05060a' },
    { media: '(prefers-color-scheme: light)', color: '#05060a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={FONT_VARIABLES}>
      <body>
        {children}
      </body>
    </html>
  );
}
