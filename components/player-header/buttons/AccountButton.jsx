import ArrowDropDownIcon from '@heroicons/react/solid/ChevronDownIcon'
import { useContext } from 'react'
import { headerContext } from '../../../context/headerContext'

const AccountButton = ({ user }) => {
  const { setShowDropdown, showDropdown } = useContext(headerContext)

  return (
    <div
      className="flex gap-2 items-center h-8 bg-black/70 hover:bg-black/50 rounded-2xl text-white cursor-pointer"
      onClick={() => {
        setShowDropdown(!showDropdown)
      }}
    >
      <div className="rounded-full h-full flex items-center">
        <img
          src={user?.image}
          alt=""
          className="object-contain w-6 rounded-full"
        />
      </div>
      <h4 className="font-semibold text-sm">{user?.name}</h4>
      <ArrowDropDownIcon
        className={`transition-all duration-300 w-6 ${
          showDropdown ? 'rotate-180' : ''
        }`}
      />
    </div>
  )
}

export default AccountButton
