'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from './Button';

export default function Filter() {
  // Get the current search parameters from the URL
  const searchParams = useSearchParams();
  // Get the router object to navigate programmatically
  const router = useRouter();
  // Get the current pathname of the URL
  const pathName = usePathname();

  // Function to handle filter changes
  function handleFilter(filter) {
    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams);
    // Set the 'capacity' parameter to the new filter value
    params.set('capacity', filter);
    // Replace the current URL with the new one, including the updated search parameters
    // { scroll: false } prevents the page from scrolling to the top on navigation
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // Get the current active filter value from the search parameters, defaulting to 'all' if not present
  const activeFilter = searchParams.get('capacity') ?? 'all';

  return (
    <div className=' border border-primary-800 flex '>
      <Button
        filter={'all'}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All
      </Button>
      <Button
        filter={'small'}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        filter={'medium'}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        filter={'large'}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
}
