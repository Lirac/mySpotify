import React, { useEffect, useState } from 'react'
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
  'from-indigo-500',
  'from-red-500',
  'from-orange-500',
  'from-green-500',
  'from-blue-500',
  'from-purple-500',
  'from-pink-500',
  'from-teal-500',
  'from-yellow-500',
]

const Body = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

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
        <PauseIcon className="hover:scale-[1.1] text-green-400 mr-8 w-16" />
      )
    } else {
      return (
        <PlayCircleFilledIcon className="hover:scale-[1.1] text-green-400 mr-8 w-16" />
      )
    }
  }

  return (
    <div className="flex-grow overflow-y-scroll scrollbar-hide bg-zinc-900">
      <div
        className={`bg-gradient-to-b ${color} to-zinc-900 h-full w-full  pb-28`}
      >
        <Header />

        <div className="flex items-end gap-8 text-white mb-6 px-7">
          <img
            src={playlist?.images?.[0].url}
            alt=""
            className="w-[15vw] shadow-2xl"
          />
          <div>
            <p className="font-bold text-white text-xs">PLAYLIST</p>
            <h2 className="text-[6.3vw] font-bold text-white leading-none mb-4">
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
      <div className="bg-black/10 px-7 pt-8 h-fit mt-[-50vh] mb-6">
        <div className="flex">
          {playIcon()}
          <FavoriteBorderIcon className="text-white/70 hover:text-white mr-5 w-8" />
          <MoreHorizIcon className="text-white/70 hover:text-white w-8" />
        </div>
        <div className="text-white/70 font-medium text-xs mt-8 border-b border-slate-50/30 pb-2 hidden md:block">
          <div className="px-2 flex items-center">
            <div className="basis-[3%] text-lg text-center pr-3">#</div>
            <div className="basis-[40%]">TITLE</div>
            <div className="basis-[35%]">ALBUM</div>
            <div className="basis-[15%]">DATE ADDED</div>
            <div className="basis-[5%]">
              <AccessTimeIcon className="w-6" />
            </div>
          </div>
        </div>

        <div>
          {playlist?.tracks?.items?.map((item, index) => (
            <SongRow key={item.track.id} item={item} index={index}></SongRow>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Body
