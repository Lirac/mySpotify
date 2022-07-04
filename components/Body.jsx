import React, { useEffect, useState } from 'react'
import PlayCircleFilledIcon from '@heroicons/react/solid/PlayIcon'
import FavoriteBorderIcon from '@heroicons/react/solid/HeartIcon'
import MoreHorizIcon from '@heroicons/react/solid/DotsHorizontalIcon'
import AccessTimeIcon from '@heroicons/react/solid/ClockIcon'
import { useSession } from 'next-auth/react'
import Header from '../components/player-header/Header'
import { shuffle } from 'lodash'

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
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  },[])

  return (
    <div className="flex-grow overflow-y-scroll scrollbar-hide bg-zinc-900">
      <div
        className={`bg-gradient-to-b ${color} to-zinc-900 h-full w-full  pb-28`}
      >
        <Header />

        <div className="flex items-end gap-8 text-white mb-6 px-7">
          <img src={session?.user?.image} alt="" className="w-[15vw]" />
          <div>
            <p className="font-bold text-white text-xs">PLAYLIST</p>
            <h2 className="text-[6.3vw] font-bold text-white leading-none mb-4">
              {/* {global?.name} */}
              Name
            </h2>
            <h6 className="text-white/80 text-sm font-semibold">Description</h6>
            <div className="text-sm font-medium">
              <span>
                Spotify
                <span className="bg-white p-[2px] rounded-[50%] inline-block mx-1"></span>
              </span>
              <span>
                {/* {global?.followers?.total?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '} */}
                12345 likes
              </span>
              <span className="bg-white p-[2px] rounded-[50%] inline-block mx-1"></span>
              <span>7456 songs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/10 px-7 pt-8 h-fit mt-[-50vh] mb-6">
        <div className="flex">
          <PlayCircleFilledIcon className="scale-[1.7] hover:scale-[1.8] text-green-400 mr-8 w-10" />
          <FavoriteBorderIcon className="text-white/70 hover:text-white mr-5 w-8" />
          <MoreHorizIcon className="text-white/70 hover:text-white w-8" />
        </div>
        <div className="text-white/70 font-medium text-xs mt-8 border-b border-slate-50/30 pb-2">
          <div className="px-2 flex items-center">
            <div className="basis-[3%] text-lg text-center">#</div>
            <div className="basis-[40%] text-left ">TITLE</div>
            <div className="basis-[35%]">ALBUM</div>
            <div className="basis-[15%] text-left">DATE ADDED</div>
            <div className="basis-[5%] text-right">
              <AccessTimeIcon fontSize="small" />
            </div>
          </div>
        </div>

        {/* <div>
          {global?.tracks?.items?.map((item, index) => (
            <SongRow item={item} index={index}></SongRow>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default Body
