import dateFormat, { masks } from 'dateformat'
import FavoriteBorderIcon from '@heroicons/react/solid/HeartIcon'
import MoreHorizIcon from '@heroicons/react/solid/DotsHorizontalIcon'
import PlayArrowIcon from '@heroicons/react/solid/PlayIcon'
import { useState } from 'react'

const SongRow = ({ item, index }) => {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  const [rowHover, setRowHover] = useState(false)
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
      <div className="basis-[3%] text-center">
        {(rowHover && <PlayArrowIcon className='w-6' />) || index + 1}
      </div>
      <div className="basis-[40%] flex gap-3">
        <img
          src={item.track.album.images[0].url}
          alt=""
          className="w-9 object-contain"
        />
        <div>
          <p className="font-semibold text-white">
            {truncate(item.track.name, 50)}
          </p>
          <p className="text-xs font-semibold">
            {item.track.artists.map((artist, index) => artist.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="basis-[35%] text-xs font-medium">
        {item.track.album.name}
      </div>
      <div className="basis-[15%] text-left text-sm">
        {dateFormat(item.added_at, 'mmm dd, yyyy')}
      </div>
      <div className="text-sm flex items-center gap-3">
        <span
          className={`${
            rowHover ? 'visible' : 'invisible'
          } transition-all duration-100 text-white/70 hover:text-white`}
        >
          <FavoriteBorderIcon className='w-6' />
        </span>
        {(item.track.duration_ms / 60000).toFixed(2)}
        <span
          className={`${
            rowHover ? 'visible' : 'invisible'
          } transition-all duration-100 text-white/70`}
        >
          <MoreHorizIcon className='w-6' />
        </span>
      </div>
    </div>
  )
}

export default SongRow
