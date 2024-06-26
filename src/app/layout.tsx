import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import Providers from './provider';
import Fitlers from '@/components/filters';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className=" flex-col lg:flex lg:flex-row w-full">
            <Fitlers />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
