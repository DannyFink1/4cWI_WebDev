import React from 'react'

export default function ListElementComponent(props) {
  return (
    <div className='bg-[#128783] w-[300px] h-[70px] text-[25px] m-[1px] flex items-center ease-in duration-300 hover:text-[30px]'>
        <div className="p-4">{props.item}</div>

    </div>
  )
}
