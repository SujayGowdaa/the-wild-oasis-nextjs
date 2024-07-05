import { Suspense } from 'react';

import CabinList from '../_components/CabinList';
import Spinner from '../_components/Spinner';
import Filter from '../_components/Filter';
import ReservationReminder from '../_components/ReservationReminder';

export const metadata = {
  title: 'cabins',
};

/* Next.js will regenerate the page in the background at most once every 15 seconds. This allows you to have static pages that can be updated with fresh data without needing a full rebuild */

// export const revalidate = 15;

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? 'all';

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
      <div className=' flex justify-end mb-8'>
        <Filter />
      </div>
      {/*  Key Prop and Re-rendering When you add a key prop to a component, it
        tells React to treat that component instance as unique. If the key
        changes, React will unmount the existing component and mount a new
        instance of it. This behavior can be particularly useful in Suspense for
        managing asynchronous data or resetting component state. */}
      <Suspense
        fallback={
          <div className=' h-full w-full flex justify-center items-center'>
            <Spinner />
          </div>
        }
        key={filter} // key prop
      >
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
