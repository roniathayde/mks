import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'

import { ReactQueryProvider } from '@/assets/lib/react-query'

import { Footer } from './_layouts/footer'
import { Header } from './_layouts/header'
import { DialogContextProvider } from './contexts/dialog-root-context'
import { ProductsContextProvider } from './contexts/products-context'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MKS Sistemas',
  description: 'Suporte e serviços para computadores em São Paulo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReactQueryProvider>
          <ProductsContextProvider>
            <DialogContextProvider>
              <Header />
              <Toaster closeButton richColors />
              {children}
              <Footer />
            </DialogContextProvider>
          </ProductsContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
