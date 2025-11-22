import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { AxiomTrigger } from '@/components/axiom/axiom-trigger';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Justin Roden | Solutions Engineer',
  description: 'Systems Architect: From Launch Pads to Launch Days. 17+ years bridging aerospace, construction, and software engineering.',
  metadataBase: new URL('https://justinroden.dev'),
  openGraph: {
    title: 'Justin Roden | Solutions Engineer',
    description: 'Systems Architect: From Launch Pads to Launch Days',
    url: 'https://justinroden.dev',
    siteName: 'Justin Roden',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Roden | Solutions Engineer',
    description: 'Systems Architect: From Launch Pads to Launch Days',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-void text-text-primary antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <AxiomTrigger />
      </body>
    </html>
  );
}
