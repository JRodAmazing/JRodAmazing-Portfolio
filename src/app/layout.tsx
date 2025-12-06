import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { AxiomTrigger } from '@/components/axiom/axiom-trigger';
import { LoadingProvider } from '@/components/providers/loading-provider';
import { PageTransition } from '@/components/ui/page-transition';
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
  title: 'Justin Roden | AI Solutions Architect',
  description: 'AI Solutions Architect & Engineering Lead. 17+ years building production AI systems from aerospace to industrial applications.',
  metadataBase: new URL('https://justinroden.dev'),
  openGraph: {
    title: 'Justin Roden | AI Solutions Architect',
    description: 'AI Solutions Architect & Engineering Lead',
    url: 'https://justinroden.dev',
    siteName: 'Justin Roden',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Roden | AI Solutions Architect',
    description: 'AI Solutions Architect & Engineering Lead',
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
        <LoadingProvider>
          <Navigation />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <AxiomTrigger />
        </LoadingProvider>
      </body>
    </html>
  );
}
