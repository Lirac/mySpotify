import React from 'react'

const sidebarItem = ({ title, Icon }) => {
  return (
    <div className="h-[40px] flex items-center gap-3 text-white/80 hover:text-white transition-all duration-200 cursor-pointer">
      {Icon && <Icon className='h-5 w-5' />}
      {Icon ? (
        <h4 className="font-semibold text-sm">{title}</h4>
      ) : (
        <h4 className="text-sm ">{title}</h4>
      )}
    </div>
  )
}

export default sidebarItem
