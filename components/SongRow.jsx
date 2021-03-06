import dateFormat, { masks } from 'dateformat'
import FavoriteBorderIcon from '@heroicons/react/solid/HeartIcon'
import MoreHorizIcon from '@heroicons/react/solid/DotsHorizontalIcon'
import PlayArrowIcon from '@heroicons/react/solid/PlayIcon'
import MusicNoteIcon from '@heroicons/react/solid/MusicNoteIcon'
import PauseIcon from '@heroicons/react/solid/PauseIcon'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import spotifyApi from '../lib/spotify'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { useSession } from 'next-auth/react'

const SongRow = ({ item, index }) => {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  const [rowHover, setRowHover] = useState(false)
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const { data: session, status } = useSession()

  const playSong = () => {
    if (!isPlaying && currentTrackId !== item.track.id) {
      setCurrentTrackId(item.track.id)
      setIsPlaying(true)
      spotifyApi.play({ uris: [item.track.uri] })
    } else if (!isPlaying && currentTrackId === item.track.id) {
      spotifyApi.play().then(() => {
        setIsPlaying(true)
      })
    } else if (isPlaying && currentTrackId !== item.track.id) {
      spotifyApi.play({ uris: [item.track.uri] })
      setCurrentTrackId(item.track.id)
    } else {
      spotifyApi.pause()
      setIsPlaying(false)
    }
  }

  // useEffect(() => {
  //   console.log('current track id = ' + currentTrackId)
  // }, [isPlaying, currentTrackId])

  const rowPlayIcon = () => {
    if (rowHover) {
      if (isPlaying && currentTrackId === item.track.id) {
        return <PauseIcon className="w-6" />
      } else {
        return <PlayArrowIcon className="w-6" />
      }
    } else {
      if (isPlaying && currentTrackId === item.track.id) {
        return <MusicNoteIcon className="w-3" />
      } else {
        return <p className=""> {index + 1}</p>
      }
    }
  }

  const screenWidth = screen.width

  return (
    <div
      className="text-white/70 hover:text-white flex my-2 py-2 items-center hover:bg-slate-200/20 rounded-md px-2"
      onMouseOver={() => {
        setRowHover(true)
      }}
      onMouseOut={() => {
        setRowHover(false)
      }}
    >
      <div className="min-w-[10%] sm:min-w-[5%] text-left" onClick={playSong}>
        {rowPlayIcon()}
      </div>
      <div className="min-w-[50%] xl:min-w-[40%] flex gap-3">
        <img
          src={item.track.album.images[0].url}
          alt=""
          className="w-9 object-contain"
        />
        <div>
          <p className="font-semibold text-xs sm:text-sm text-white">
            {screenWidth > 1000
              ? truncate(item.track.name, 50)
              : truncate(item.track.name, 40)}
          </p>
          <p className="text-xs font-semibold">
            {item.track.artists.map((artist, index) => artist.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="min-w-[40%] sm:min-w-[35%] hidden sm:block text-xs font-medium">
        {truncate(item.track.album.name, 35)}
      </div>
      <div className="min-w-[15%] sm:min-w-[10%] text-left text-sm hidden xl:block">
        {dateFormat(item.added_at, 'mmm dd, yyyy')}
      </div>
      <div className="min-w-[10%] text-sm hidden  sm:flex justify-center items-center gap-3">
        <span
          className={`${
            rowHover ? 'visible' : 'invisible'
          } transition-all duration-100 text-white/70 hover:text-white`}
        >
          <FavoriteBorderIcon className="w-6" />
        </span>
        {(item.track.duration_ms / 60000).toFixed(2)}
        <span
          className={`${
            rowHover ? 'visible' : 'invisible'
          } transition-all duration-100 text-white/70`}
        >
          <MoreHorizIcon className="w-6" />
        </span>
      </div>
    </div>
  )
}

export default SongRow
