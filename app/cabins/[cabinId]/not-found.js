import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='text-center space-y-6 mt-4 h-full flex flex-col justify-center items-center '>
      <h1 className='text-3xl font-semibold'>
        This cabin could not be found :(
      </h1>
      <Link
        href='/'
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        Go back home
      </Link>
    </main>
  );
}
