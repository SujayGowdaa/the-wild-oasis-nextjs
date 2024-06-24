import Image from 'next/image';
import logo from '@/public/logo.png';

function Logo() {
  return (
    <a href='/' className='flex items-center gap-4 z-10'>
      <Image
        src={logo}
        alt='The Wild Oasis logo'
        height='60'
        width='60'
        quality={100}
      />
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </a>
  );
}

export default Logo;
