import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import SpotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    SpotifyApi.setAccessToken(token.accessToken)
    SpotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await SpotifyApi.refreshAccessToken()
    console.log('refreshedToken: ', refreshedToken)
    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, //1 hour
      refreshedToken: refreshedToken.refreshToken ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'Refreshed token failed',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial signin
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.access_token_expires_at * 1000, //Miliseconds
        }
      }
      //Return token if the access token has not expired
      if (Date.now() < token.accessTokenExpiresAt) {
        console.log('Token not expired')
        return token
      }

      //Access token has expired
      console.log('Token expired')
      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.accessToken = token.refreshToken
      session.user.username = token.username

      return session;
    }
  },
})
