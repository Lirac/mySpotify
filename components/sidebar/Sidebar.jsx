import React from 'react'
import SidebarItem from './SidebarItem'
import HomeIcon from '@heroicons/react/solid/HomeIcon'
import SearchIcon from '@heroicons/react/solid/SearchIcon'
import LibraryMusicIcon from '@heroicons/react/solid/LibraryIcon'
import AddBoxIcon from '@heroicons/react/solid/PlusCircleIcon'
import FavoriteIcon from '@heroicons/react/solid/HeartIcon'
import LogooutIcon from '@heroicons/react/solid/LogoutIcon'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session, status } = useSession()
  console.log(status)

  return (
    <div className="bg-black w-1/4 text-white p-5">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
        className="h-[70px]"
      />

      <div className="mt-4">
        <SidebarItem Icon={HomeIcon} title="Home"></SidebarItem>
        <SidebarItem Icon={SearchIcon} title="Search"></SidebarItem>
        <SidebarItem Icon={LibraryMusicIcon} title="Your Library"></SidebarItem>
      </div>

      <div className="mt-4 pb-2 border-b border-stone-300/25">
        <SidebarItem Icon={AddBoxIcon} title="Create Playlist" />
        <SidebarItem Icon={FavoriteIcon} title="Liked Songs" />
      </div>

      <div
        onClick={() => {
          signOut({ callbackUrl: '/login' })
        }}
      >
        <SidebarItem Icon={LogooutIcon} title="Logout"></SidebarItem>
      </div>

      {/* <div>
        {playlists?.items?.map(item => (
          <SidebarItem title={item.name} />
        ))}
      </div> */}
    </div>
  )
}

export default Sidebar
