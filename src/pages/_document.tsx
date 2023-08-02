import { Html, Main, Head, NextScript } from 'next/document'
import Navbar from '../components/Navbar';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
