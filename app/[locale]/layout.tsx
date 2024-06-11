import '../globals.css'

import localFont from 'next/font/local'

import { SpeedInsights } from '@vercel/speed-insights/next'
import BackgroundCanvas from '@/components/BackgroundCanvas'

const fontPrimary = localFont({
  src: [
    {
      path: '../fonts/ABCFavoritLight-Regular.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/ABCFavoritBook-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/ABCFavoritMedium-Regular.woff2',
      weight: '500',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-primary'
})

export default function RootLayout({
  params: { locale },
  children
}: Readonly<{
  params: { locale: string }
  children: React.ReactNode
}>) {
  return (
    <html lang={locale} className={`${fontPrimary.variable}`}>
      <body className="font-primary">
        <BackgroundCanvas />
        <div className="absolute z-10 top-0 left-0 size-full pointer-events-none">
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
