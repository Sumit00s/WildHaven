
import Header from "./_components/Header";

import '@/app/_styles/globals.css';
import {Josefin_Sans} from 'next/font/google'
import {ReservationProvider} from "./_context/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: { 
      template: '%s | The Wild Oasis', 
      default: 'Welcome | The Wild Oasis' 
  },
  description:"Discover the finest luxury hotels worldwide with our seamless Next.js booking platform. Explore exclusive accommodations, enjoy personalized services, and book your dream stay effortlessly. Elevate your travel experience with luxury redefined."
}

export default function RootLayout({children}){
  return(
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <header>
          <Header/>
        </header>
        <div className=" flex-1 px-8 py-12 grid">
          <main className=" max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
