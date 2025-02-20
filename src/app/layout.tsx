import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClientNav } from '@/components/shared/ClientNav'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { Providers } from '@/components/shared/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyFicha',
  description: 'A modern Cuban domino game platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* Wrap the content in a client-side only div */}
            <div suppressHydrationWarning>
              <div className="min-h-screen">
                <ClientNav />
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#FFC107] text-[#4F3D2E] px-4 py-2 rounded-lg"
                >
                  Skip to main content
                </a>
                <div className="flex flex-col lg:flex-row">
                  <div className="w-0 md:w-[250px] flex-shrink-0" />
                  <main id="main-content" className="flex-1 min-h-screen pb-16 md:pb-0">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
