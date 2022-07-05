import React, { useEffect, useState } from 'react'
import SidebarItem from './SidebarItem'
import HomeIcon from '@heroicons/react/solid/HomeIcon'
import SearchIcon from '@heroicons/react/solid/SearchIcon'
import LibraryMusicIcon from '@heroicons/react/solid/LibraryIcon'
import AddBoxIcon from '@heroicons/react/solid/PlusCircleIcon'
import FavoriteIcon from '@heroicons/react/solid/HeartIcon'
import LogooutIcon from '@heroicons/react/solid/LogoutIcon'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import { playlistIdState } from '../../atoms/playlistAtom'
import { useRecoilState } from 'recoil'

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi?.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then(data => {
          setPlaylists(data.body.items)
        })
        .catch(err => console.log(err))
    }
  }, [session, spotifyApi])

  return (
    <div className="bg-black text-white min-w-[250px] p-5 overflow-y-scroll scrollbar-hide h-screen hidden md:block">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
        className="h-[70px]"
      />

      <div className="ml-4 mt-4">
        <SidebarItem Icon={HomeIcon} title="Home"></SidebarItem>
        <SidebarItem Icon={SearchIcon} title="Search"></SidebarItem>
        <SidebarItem Icon={LibraryMusicIcon} title="Your Library"></SidebarItem>
      </div>

      <div className="ml-4 mt-4 pb-2 border-b border-stone-300/25">
        <SidebarItem Icon={AddBoxIcon} title="Create Playlist" />
        <SidebarItem Icon={FavoriteIcon} title="Liked Songs" />
      </div>

      <div className="ml-4">
        {playlists?.map(item => (
          <SidebarItem
            key={item.id}
            title={item.name}
            clicked={() => setPlaylistId(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
