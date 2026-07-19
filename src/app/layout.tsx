import type { Metadata } from 'next'
import { Noto_Serif_KR, IBM_Plex_Mono, Noto_Sans_KR } from 'next/font/google'
import '@/styles/globals.css'
import { profile } from '@/data/profile'

const serif = Noto_Serif_KR({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['600', '700'],
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

const sans = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.title}`,
  description: profile.summary,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  )
}
