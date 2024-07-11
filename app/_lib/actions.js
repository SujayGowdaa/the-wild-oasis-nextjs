'use server';
import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('Please login in before updating your profile');

  // Extract the form data
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  // Validate the form data
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Invalid national ID');

  // Update the guest profile in the database
  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.guestId)
    .select();
  // .single(); // inCase we are returning a single record else not required

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  // revalidate the route on demand
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('Please login in before updating your profile');
  const guestBookings = await getBookings(session.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error('You are not authorized to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account',
  });
}
export async function signOutAction() {
  await signOut({
    redirectTo: '/',
  });
}
