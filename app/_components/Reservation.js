import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

export default async function Reservation({ cabin }) {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);

  return (
    <div className=' grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector settings={settings} cabin={cabin} />
      <ReservationForm bookedDates={bookedDates} cabin={cabin} />
    </div>
  );
}
