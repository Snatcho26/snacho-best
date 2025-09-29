import './globals.css'

export const metadata = {
  title: 'Snatcho - Compare & Save',
  description: 'Snatcho helps you compare prices instantly across Amazon, Flipkart, Blinkit, Zepto and more.',
  openGraph: {
    title: 'Snatcho - Compare & Save',
    description: 'Snatcho helps you compare prices instantly across Amazon, Flipkart, Blinkit, Zepto and more.',
    url: 'https://snatchoindia.com',
    siteName: 'Snatcho',
    images: [
      { url: '/logo.png', width: 800, height: 600, alt: 'Snatcho Logo' }
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors">
        {children}
      </body>
    </html>
  )
}
