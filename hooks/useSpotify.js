import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'Refresh token expired') {
        signIn()
      }
      SpotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return SpotifyApi;
}

export default useSpotify
