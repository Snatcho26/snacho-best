import './globals.css'

export const metadata = {
  title: 'Snatcho — Snatch the best deal',
  description: 'Compare prices across Amazon, Flipkart, Blinkit, Zepto & more. Join the waitlist.',
  openGraph: {
    title: 'Snatcho — Snatch the best deal',
    description: 'Compare prices across Amazon, Flipkart, Blinkit, Zepto & more. Join the waitlist.',
    url: 'https://snatchoindia.com',
    siteName: 'Snatcho',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
