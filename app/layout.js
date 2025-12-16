import localFont from 'next/font/local'
import { Suspense } from 'react'
import "./globals.css"
import Navbar from '@/components/Navbar'
import NextAuthSession from '@/components/NextAuthSession'
import { ThemeProvider } from 'next-themes'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
})

export const metadata = {
  title: "Home | MovieRevue",
  description: "MovieRevue Homepage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr" suppressHydrationWarning>
      <body className={pretendard.className}>
        <NextAuthSession>
          <ThemeProvider enableSystem={true} attribute="class">
            <div id="wrap">
              <Suspense fallback={<div className="data-loader"></div>}>
                <Navbar />
              </Suspense>
              <div id="content">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </NextAuthSession>
      </body>
    </html>
  );
}
