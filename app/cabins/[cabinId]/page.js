import { getCabin, getCabins } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

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
  // Retrieve the list of cabins. This could be an API call, database query, etc.
  const cabins = await getCabins();

  // Map over the cabins to create an array of objects with a `cabinId` property.
  // Each `cabinId` is converted to a string.
  const IDs = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  // Return the array of objects. This will be used by Next.js to generate static paths.
  return IDs;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { name, maxCapacity, image, description } = cabin;
  const imageUrl = image.replace(
    '/src/data/cabins/',
    '/storage/v1/object/public/cabin-images/'
  );

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24'>
        <div className='relative scale-[1.15] -translate-x-3'>
          <Image
            fill
            className=' object-cover'
            src={imageUrl}
            alt={`Cabin ${name}`}
          />
        </div>
        <div>
          <h3 className='text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]'>
            Cabin {name}
          </h3>
          <p className='text-lg text-primary-300 mb-10'>{description}</p>
          <ul className='flex flex-col gap-4 mb-7'>
            <li className='flex gap-3 items-center'>
              <UsersIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                For up to <span className='font-bold'>{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <MapPinIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Located in the heart of the{' '}
                <span className='font-bold'>Dolomites</span> (Italy)
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <EyeSlashIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Privacy <span className='font-bold'>100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className='text-5xl font-semibold text-center'>
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
