import './globals.css'

export const metadata = {
  title: 'Snatcho India',
  description: 'The crazy mad founder startup page — join the waitlist now.',
  openGraph: {
    title: 'Snatcho India',
    description: 'Join Snatcho waitlist, get exclusive coupons.',
    url: 'https://snatchoindia.com',
    siteName: 'Snatcho',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}