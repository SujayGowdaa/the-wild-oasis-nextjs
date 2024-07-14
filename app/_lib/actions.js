'use server';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { getBooking, getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('Please login in before updating your profile');

  const newBooking = {
    ...bookingData,
    guestId: session.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.price,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}

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

export async function updateReservation(formData) {
  const booking = await getBooking(formData.get('reservationId'));
  const session = await auth();
  const guestBookings = await getBookings(session.guestId);

  if (!session) throw new Error('Please login in before updating your profile');

  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(Number(formData.get('reservationId'))))
    throw new Error('You are not authorized to delete this booking');

  const updatedFields = {
    ...booking,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 500),
  };

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', formData.get('reservationId'))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

export async function deleteReservation(bookingId) {
  // await new Promise((res) => setTimeout(res, 2000));
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
