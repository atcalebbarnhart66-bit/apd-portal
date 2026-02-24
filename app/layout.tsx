import type { Metadata } from 'next'
import { Rajdhani, Roboto_Condensed } from 'next/font/google'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'APD Administration Portal',
  description: 'Abilene Police Department — Internal Administration System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${robotoCondensed.variable}`}>
      <body>{children}</body>
    </html>
  )
}
