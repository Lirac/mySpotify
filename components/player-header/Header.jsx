import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'
import { createContext, useEffect, useState } from 'react'
import AccountButton from './buttons/AccountButton'
import DropDownMenuItem from './dropdownMenu/DropdownMenuItem'
import { headerContext } from '../../context/headerContext'
import { useSession, signOut } from 'next-auth/react'

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
  const backgroundColor = background ? 'bg-black/90' : `bg-gradient-to-r ${color} to-transparent`

  return (
    <headerContext.Provider value={{ showDropdown, setShowDropdown }}>
      <div
        className={`py-5 ${backgroundColor} flex justify-between w-full to- px-7 h-[8vh] sticky top-0 transition-all ease-in-out`}
      >
        <div>
          <span className="bg-black/20 rounded-full text-white inline-block  mr-3">
            <ChevronLeftIcon className="w-8" />
          </span>
          <span className="bg-black/30 rounded-full text-white inline-block">
            <ChevronRightIcon className="w-8" />
          </span>
        </div>
        <div className="flex items-center gap-4 relative">
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
