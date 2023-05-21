import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Mukta } from 'next/font/google'

const mukta = Mukta({
  subsets:['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-primary'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${mukta.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
