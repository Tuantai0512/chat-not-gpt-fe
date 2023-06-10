import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Mukta } from '@next/font/google'
import { wrapper, store } from "../stores/stores";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes"

const mukta = Mukta({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-primary'
})

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <div className={`${mukta.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  )
}


export default wrapper.withRedux(App);
