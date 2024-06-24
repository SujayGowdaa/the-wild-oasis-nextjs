// Importing components and styles
import Logo from '@/app/_components/Logo'; // Importing the Logo component
import Navigation from '@/app/_components/Navigation'; // Importing the Navigation component
import '@/app/_styles/globals.css'; // Importing global CSS styles
import { Josefin_Sans } from 'next/font/google'; // Importing the Josefin Sans font from Google Fonts

// Configuring the Josefin Sans font
const josefin = Josefin_Sans({
  subsets: ['latin'], // Specifying the subset for the font
  display: 'swap', // Ensuring the font swaps into place once loaded
});

// Metadata for the web application
export const metadata = {
  title: {
    template: '%s » the wild oasis', // Template for the page titles
    default: 'welcome to the wild oasis', // Default title for the page
  },
  description:
    'Luxurious cabin hotel, located in the heart of the italian dolomites, surrounded by beautiful mountains and dark forests.', // Description of the web application
};

// Root layout component for the application
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${josefin.className}`}>
        <header className=''>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer className=' capitalize'>copyright by the wild oasis</footer>
      </body>
    </html>
  );
}
