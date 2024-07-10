/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='hover:text-accent-400 transition-colors'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors flex items-end  gap-4 '
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                refferrerPolicy='no-referrer'
                className=' h-8 rounded-full'
              />
              <p>{session.user.name.split(' ')[0]}</p>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
