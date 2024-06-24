import Link from 'next/link';

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link className=' capitalize' href={'/'}>
          home
        </Link>
      </li>
      <li>
        <Link className=' capitalize' href={'/cabins'}>
          cabins
        </Link>
      </li>
      <li>
        <Link className=' capitalize' href={'/about'}>
          about
        </Link>
      </li>
      <li>
        <Link className=' capitalize' href={'/account'}>
          account
        </Link>
      </li>
    </ul>
  );
}
