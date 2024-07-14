import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

/* The generateStaticParams function provides the list of cabinId values for which to generate static pages.
Next.js will pre-generate a static page for each cabinId returned by generateStaticParams.
When a user visits a URL like /cabins/1, Next.js will serve the pre-generated page for cabinId 1, improving performance and SEO. */

export async function generateStaticParams() {
  const cabins = await getCabins();
  const IDs = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return IDs;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
