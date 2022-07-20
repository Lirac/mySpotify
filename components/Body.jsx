import React, { useEffect, useRef, useState } from 'react'
import PlayCircleFilledIcon from '@heroicons/react/solid/PlayIcon'
import PauseIcon from '@heroicons/react/solid/PauseIcon'
import FavoriteBorderIcon from '@heroicons/react/solid/HeartIcon'
import MoreHorizIcon from '@heroicons/react/solid/DotsHorizontalIcon'
import AccessTimeIcon from '@heroicons/react/solid/ClockIcon'
import { useSession } from 'next-auth/react'
import Header from '../components/player-header/Header'
import SongRow from '../components/SongRow'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import { isPlayingState } from '../atoms/songAtom'

const colors = [
  { gradient: 'from-indigo-500', color: 'bg-indigo-500' },
  { gradient: 'from-red-500', color: 'bg-red-500' },
  { gradient: 'from-orange-500', color: 'bg-orange-500' },
  { gradient: 'from-green-500', color: 'bg-green-500' },
  { gradient: 'from-blue-500', color: 'bg-blue-500' },
  { gradient: 'from-pink-500', color: 'bg-pink-500' },
  { gradient: 'from-teal-500', color: 'bg-teal-500' },
  { gradient: 'from-yellow-500', color: 'bg-yellow-500' },
]

const Body = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const bodyRef = useRef()
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState(false)
  const [navBackground, setNavBackground] = useState(false)

  const bodyScrolled = () => {
    const screenWidth = screen.width
    if (screenWidth > 600) {
      bodyRef.current.scrollTop >= 500
        ? setNavBackground(true)
        : setNavBackground(false)
      bodyRef.current.scrollTop >= 550
        ? setHeaderBackgroundColor(true)
        : setHeaderBackgroundColor(false)
    } else {
      bodyRef.current.scrollTop >= 250
      ? setNavBackground(true)
      : setNavBackground(false)
    bodyRef.current.scrollTop >= 300
      ? setHeaderBackgroundColor(true)
      : setHeaderBackgroundColor(false)
    }
  }

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => {
        setPlaylist(data.body)
      })
      .catch(err => console.log(err))
  }, [spotifyApi, playlistId])

  console.log('Your current playlist >>>', playlist)
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  const playIcon = () => {
    if (isPlaying) {
      return (
        <PauseIcon
          onClick={() => handlePlayPause()}
          className="hover:scale-[1.1] text-green-400 mr-8 w-16"
        />
      )
    } else {
      return (
        <PlayCircleFilledIcon
          onClick={() => handlePlayPause()}
          className="hover:scale-[1.1] text-green-400 mr-8 w-16"
        />
      )
    }
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

  return (
    <div
      ref={bodyRef}
      onScroll={() => {
        bodyScrolled()
      }}
      className={`flex-grow overflow-y-scroll scrollbar-hide h-screen w-full bg-black pb-12`}
    >
      <Header background={navBackground} color={color} />
      <div
        className={`bg-gradient-to-b  ${color?.gradient} to-transparent h-screen w-full pt-10`}
      >
        <div className="flex items-end gap-8 text-white mb-6 px-7">
          <img
            src={playlist?.images?.[0].url}
            alt=""
            className="w-[15vw] shadow-2xl"
          />
          <div>
            <p className="font-bold text-white text-xs">PLAYLIST</p>
            <h2 className="text-[5.5vw] font-bold text-white leading-none mb-4">
              {playlist?.name}
            </h2>
            <h6 className="text-white/80 text-sm font-semibold">
              {playlist?.description}
            </h6>
            <div className="text-sm font-medium">
              <span>
                {playlist?.owner?.display_name}
                <span className="bg-white p-[2px] rounded-[50%] inline-block mx-1"></span>
              </span>
              <span>
                {playlist?.followers?.total?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '}
                likes
              </span>
              <span className="bg-white p-[2px] rounded-[50%] inline-block mx-1"></span>
              <span>
                {playlist?.tracks.total > 1
                  ? `${playlist?.tracks.total} songs`
                  : `${playlist?.tracks.total} song`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/30 pt-8 h-fit xl:mt-[-50vh] mt-[-80vh] mb-6">
        <div className="flex px-7">
          {playIcon()}
          <FavoriteBorderIcon className="text-white/70 hover:text-white mr-5 w-8" />
          <MoreHorizIcon className="text-white/70 hover:text-white w-8" />
        </div>
        <div
          className={`text-white/70 font-medium text-xs mt-8 border-b border-slate-50/30 pb-2 hidden md:block sticky top-[8vh] transition-all ease-in-out ${
            headerBackgroundColor ? 'bg-zinc-900 px-7' : 'mx-7'
          } `}
        >
          <div className={`px-2 flex items-center `}>
            <div className="min-w-[5%] text-lg text-left">#</div>
            <div className="min-w-[50%] sm:min-w-[40%] text-left">TITLE</div>
            <div className="min-w-[40%] sm:min-w-[35%] hidden sm:block text-left">ALBUM</div>
            <div className="min-w-[15%] sm:min-w-[10%] hidden xl:block">DATE ADDED</div>
            <div className="min-w-[10%] text-center flex justify-center">
              <AccessTimeIcon className="w-6" />
            </div>
          </div>
        </div>

        <div className="px-7">
          {playlist?.tracks?.items?.map((item, index) => (
            <SongRow key={item.track.id} item={item} index={index}></SongRow>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Body
