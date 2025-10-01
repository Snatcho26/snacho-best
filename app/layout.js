import '../styles/globals.css'

export const metadata = {
  title: 'Snatcho — Snatch the best deals',
  description: 'Snatcho — price comparison and exclusive offers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
