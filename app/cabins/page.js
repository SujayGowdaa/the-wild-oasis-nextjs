import { Suspense } from 'react';

import CabinList from '../_components/CabinList';
import Spinner from '../_components/Spinner';

export const metadata = {
  title: 'cabins',
};

/* Next.js will regenerate the page in the background at most once every 15 seconds. This allows you to have static pages that can be updated with fresh data without needing a full rebuild */

export const revalidate = 15;

export default function Page() {
  return (
    <div className=' h-full'>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense
        fallback={
          <div className=' h-full w-full flex justify-center items-center'>
            <Spinner />
          </div>
        }
      >
        <CabinList />
      </Suspense>
    </div>
  );
}
