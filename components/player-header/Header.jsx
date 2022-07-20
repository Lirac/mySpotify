import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'
import PlayCircleFilledIcon from '@heroicons/react/solid/PlayIcon'
import PauseIcon from '@heroicons/react/solid/PauseIcon'
import MenuIcon from '@heroicons/react/solid/MenuIcon'
import { createContext, useEffect, useState } from 'react'
import AccountButton from './buttons/AccountButton'
import DropDownMenuItem from './dropdownMenu/DropdownMenuItem'
import { headerContext } from '../../context/headerContext'
import { useSession, signOut } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistState } from '../../atoms/playlistAtom'
import { isPlayingState } from '../../atoms/songAtom'
import { sidebarOpenState } from '../../atoms/uiAtom'
import spotifyApi from '../../lib/spotify'

const Header = ({ background, color }) => {
  const { data: session } = useSession()

  const dropDownItems = [
    { title: 'Account', hasIcon: true },
    { title: 'Profile', hasIcon: false },
    { title: 'Support', hasIcon: true },
    { title: 'Download', hasIcon: true },
    { title: 'Log Out', hasIcon: false },
  ]
  const [showDropdown, setShowDropdown] = useState(false)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState)
  const backgroundColor = background ? color?.color : `${color?.color}`

  const playIcon = () => {
    if (isPlaying) {
      return (
        <PauseIcon
          onClick={() => handlePlayPause()}
          className={`hover:scale-[1.1] text-green-400 w-14 duration-500 ${
            background ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )
    } else {
      return (
        <PlayCircleFilledIcon
          onClick={() => handlePlayPause()}
          className={`hover:scale-[1.1] text-green-400 w-14 duration-500 ${
            background ? 'opacity-100' : 'opacity-0'
          }`}
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
    <headerContext.Provider value={{ showDropdown, setShowDropdown }}>
      <div
        className={`py-5 flex justify-between to- px-7 h-[8vh] fixed min-w-full lg:min-w-[calc(100%-250px)] top-0 transition-all ease-in-out ${
          background ? `${color?.color}` : 'transparent'
        }`}
      >
        <div className="flex gap-3 items-center">
          <span>
            <MenuIcon
              className="w-10 text-white lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </span>
          <span className="bg-black/20 rounded-full text-white hidden lg:block">
            <ChevronLeftIcon className="w-8" />
          </span>
          <span className="bg-black/30 rounded-full text-white hidden lg:block">
            <ChevronRightIcon className="w-8" />
          </span>
          <span className="absolute sm:relative sm:top-0 sm:right-0 top-7 right-7">
            {playIcon()}
          </span>
          <span
            className={`text-[4vw] lg:text-xl font-bold text-white transition-all duration-500 ${
              background ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {playlist?.name}
          </span>
        </div>
        <div className="sm:flex items-center gap-4 relative hidden">
          <AccountButton user={session?.user} />
          <div
            className={`absolute top-10 right-0 w-48 bg-zinc-900/90 py-2 p-1 rounded-md ${
              showDropdown ? 'block' : 'hidden'
            }`}
          >
            <DropDownMenuItem title="Account" hasIcon={true} />
            <DropDownMenuItem title="Profile" hasIcon={false} />
            <DropDownMenuItem title="Support" hasIcon={true} />
            <DropDownMenuItem title="Download" hasIcon={true} />
            <DropDownMenuItem
              title="Log Out"
              hasIcon={false}
              clicked={() => signOut({ callbackUrl: '/login' })}
            />
          </div>
        </div>
      </div>
    </headerContext.Provider>
  )
}

export default Header
