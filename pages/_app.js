// Nome do Arquivo: pages/_app.js

// Esta linha importa os estilos do Tailwind
import '../styles/globals.css' 

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}