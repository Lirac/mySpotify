import React, { useCallback, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@heroicons/react/outline/HeartIcon'
import SwitchHorizontal from '@heroicons/react/solid/SwitchHorizontalIcon'
import ShuffleIcon from '@heroicons/react/solid/CubeTransparentIcon'
import SkipPreviousIcon from '@heroicons/react/solid/RewindIcon'
import PlayCircleIcon from '@heroicons/react/solid/PlayIcon'
import SkipNextIcon from '@heroicons/react/solid/FastForwardIcon'
import RepeatIcon from '@heroicons/react/solid/RefreshIcon'
import VolumeUpIcon from '@heroicons/react/solid/VolumeUpIcon'
import VolumeDownIcon from '@heroicons/react/outline/VolumeUpIcon'
import PauseIcon from '@heroicons/react/solid/PauseIcon'
import { useRecoilState } from 'recoil'
import useSongInfo from '../../hooks/useSongInfo'
import useSpotify from '../../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../../atoms/songAtom'
import { useSession } from 'next-auth/react'
import { debounce } from 'lodash'

const Footer = () => {
  const spotifyApi = useSpotify()
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const { data: session } = useSession()
  const songInfo = useSongInfo()

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const fetchCurrentSong = () => {
    spotifyApi.getMyCurrentPlayingTrack().then(data => {
      setCurrentTrackId(data.body?.item?.id)

      spotifyApi.getMyCurrentPlaybackState().then(data => {
        setIsPlaying(data.body?.is_playing)
      })
    })
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const handleNext = () => {
    spotifyApi
      .skipToNext()
      .then(() => {
        fetchCurrentSong()
        console.log('Skipped to next')
      })
      .catch(() => {
        console.log('Skipping failed')
      })
  }
  const handlePrevious = () => {
    spotifyApi
      .skipToPrevious()
      .then(() => {
        fetchCurrentSong()
        console.log('Skipped to previous')
      })
      .catch(() => {
        console.log('Skipping failed')
      })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken) {
      fetchCurrentSong()
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce(volume => {
      spotifyApi.setVolume(volume).catch(err => {})
    }, 500),
    []
  )

  return (
    <div className="flex items-center justify-between bg-zinc-900 bottom-0 fixed w-full py-3 px-5">
      <div className="flex items-center gap-3">
        <img
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
          className="h-9 sm:h-12 object-contain"
        />
        <div className="text-white mr-4">
          <h3 className="text-[2.5vw] md:text-sm font-semibold leading-[0.5rem]">
            {truncate(songInfo?.name,30)}
          </h3>
          <small className="text-[10px] text-gray-300 leading-3">
            {truncate(songInfo?.album?.name, 20)}
          </small>
        </div>
        <FavoriteBorderIcon className="text-gray-300 w-6 hidden sm:block" />
      </div>

      <div className="text-gray-300 flex items-center gap-3 justify-center grow">
        <SwitchHorizontal className="hover:text-white w-6 hidden sm:block" />
        <SkipPreviousIcon
          className="hover:text-white w-6"
          onClick={() => handlePrevious()}
        />
        {isPlaying ? (
          <PauseIcon
            onClick={() => handlePlayPause()}
            className="hover:text-white hover:scale-110 transition-all duration-200 w-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={() => handlePlayPause()}
            className="hover:text-white hover:scale-110 transition-all duration-200 w-10"
          />
        )}
        <SkipNextIcon
          className="hover:text-white w-6"
          onClick={() => handleNext()}
        />
        <RepeatIcon className="hover:text-white w-6 hidden sm:block" />
      </div>
      <div className="text-gray-400 hidden sm:flex gap-3 items-center justify-end md:space-x-2 pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="hover:text-white w-6"
        />
        <input
          onChange={e => setVolume(Number(e.target.value))}
          className="w-14 md:w-28 h-1"
          type="range"
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="hover:text-white w-6"
        />
      </div>
    </div>
  )
}

export default Footer
