import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { TRPCReactProvider } from '@/lib/trpc'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Vetra - Where Ideas Become Real Together',
  description: 'A community platform for vetted professionals to collaborate on projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
