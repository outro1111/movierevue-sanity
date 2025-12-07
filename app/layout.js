import localFont from 'next/font/local'
import { Suspense } from 'react';
import "./globals.css";
import Navbar from '@/components/Navbar';

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
    <html lang="kr">
      <body className={pretendard.className}>
        <div id="wrap">
          <Suspense fallback={<div className="data-loader"></div>}>
            <Navbar />
          </Suspense>
          <div id="content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
