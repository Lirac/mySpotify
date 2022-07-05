import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'Refresh token expired') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi;
}

export default useSpotify
