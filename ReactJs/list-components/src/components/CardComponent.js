import React from 'react'

export default function CardComponent(props) {
  return (
    <div className='shadow-2xl w-max pb-6'>
        <div className=''>
            <img src={props.src} alt="Nope"/>
        </div>
        <div className='text-[30px] font-bold ml-8 mt-4'>{props.name}</div>
        <div className='text-[30px] ml-8 mt-4'>{props.title}</div>
    </div>
  )
}
