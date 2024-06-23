import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function page() {
  return (
    <header>
      <Navigation />
      <h1 className=' capitalize'>account</h1>
    </header>
  );
}
