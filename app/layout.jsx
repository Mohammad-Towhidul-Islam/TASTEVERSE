
import './globals.css'
import Providers from '../components/Providers'

export const metadata = {
  title: 'TASTEVERSE — Good food. Great mood.',
  description: 'Discover delicious food, crafted fresh and delivered with love.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
