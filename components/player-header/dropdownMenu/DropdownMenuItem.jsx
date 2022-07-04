import LaunchIcon from '@heroicons/react/solid/ChevronRightIcon'

const dropDownMenuItem = ({ title, hasIcon }) => {
  return (
    <div className="flex justify-between px-2 py-3 hover:bg-zinc-700/70 text-white">
      <h4 className='text-sm font-medium'>{title}</h4>
      {hasIcon && <LaunchIcon className='w-5' />}
    </div>
  )
}

export default dropDownMenuItem
