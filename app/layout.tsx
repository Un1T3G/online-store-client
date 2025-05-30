import { Providers } from 'app'
import 'app/styles/globals.css'
import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Онлайн магазин',
  description: 'Онлайн магазин Fake-Store',
  authors: [
    { name: 'Хайратдинов Камалатдин', url: 'https://github.com/un1t3g' },
  ],
}

const interFont = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-roboto',
})

const geistMonoFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`antialiased ${geistMonoFont.className} ${interFont.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
