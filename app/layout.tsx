import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Furia - Know Your Fan',
  description: 'A plataforma oficial para fãs da FURIA se conectarem, registrarem perfis e participarem da comunidade.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/furia-icon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
