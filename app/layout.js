// Importing components and styles
import Logo from '@/app/_components/Logo'; // Importing the Logo component
import Navigation from '@/app/_components/Navigation'; // Importing the Navigation component
import '@/app/_styles/globals.css'; // Importing global CSS styles
import { Josefin_Sans } from 'next/font/google'; // Importing the Josefin Sans font from Google Fonts
import Header from './_components/Header';

// Configuring the Josefin Sans font
const josefin = Josefin_Sans({
  subsets: ['latin'], // Specifying the subset for the font
  display: 'swap', // Ensuring the font swaps into place once loaded
});

// Metadata for the web application
export const metadata = {
  title: {
    template: '%s » The Wild Oasis', // Template for the page titles
    default: 'Welcome To The Wild Oasis', // Default title for the page
  },
  description:
    'Luxurious cabin hotel, located in the heart of the italian dolomites, surrounded by beautiful mountains and dark forests.', // Description of the web application
};

// Root layout component for the application
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className=' flex-1 px-8 py-12 grid'>
          <main className=' max-w-7xl mx-auto w-full'>{children}</main>
        </div>
      </body>
    </html>
  );
}
