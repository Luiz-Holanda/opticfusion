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
  title: 'OPTIC FUSION',
  description: 'Fotografia inteligente movida por IA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={FONT_VARIABLES}>
      <body>{children}</body>
    </html>
  );
}
