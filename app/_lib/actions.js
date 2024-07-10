'use server';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

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
