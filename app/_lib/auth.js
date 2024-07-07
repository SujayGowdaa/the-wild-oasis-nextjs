// Importing NextAuth and Google provider from 'next-auth'
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// Configuring NextAuth with Google as a provider
export const {
  auth, // Exporting the 'auth' object for authentication
  handlers: { GET, POST }, // Exporting the 'GET' and 'POST' handlers for the NextAuth API routes
} = NextAuth({
  providers: [
    // Configuring Google as an authentication provider
    Google({
      clientId: process.env.AUTH_GOOGLE_ID, // Google Client ID from environment variables
      clientSecret: process.env.AUTH_GOOGLE_SECRET, // Google Client Secret from environment variables
    }),
  ],
  callbacks: {
    // Custom callback to check if the user is authorized
    authorized({ auth, request }) {
      // Returning true if the user is authenticated (i.e., has a user object)
      return !!auth?.user;
    },
  },
});
