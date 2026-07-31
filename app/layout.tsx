import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '想和你建立情侣关系',
  description: '和我成为情侣，让QQ帮我们记录每日点滴',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    siteName: '情侣空间',
    title: '想和你建立情侣关系',
    description: '和我成为情侣，让QQ帮我们记录每日点滴',
    images: [
      {
        url: '/og-couple.png',
        width: 1024,
        height: 1024,
        alt: '情侣关系邀请',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '想和你建立情侣关系',
    description: '和我成为情侣，让QQ帮我们记录每日点滴',
    images: ['/og-couple.png'],
  },
  other: {
    'og:image:type': 'image/png',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f5f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-qq-bg">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
