import React from 'react'

export default function Card({name, jobTitle, imageURL}) {
  return (
    <div className='flex border-[#AAAAAA] border-solid border-2 w-[300px] m-2 rounded-b-xl shadow-md '>
        <div className='w-[50%] p-4'>
            <h1 className='font-black text-lg'>{name}</h1>
            <h2>{jobTitle}</h2>
        </div>
        <div className='w-[50%]'>
            <img src={imageURL} className='object.cover w-full h-full rounded-br-xl'/>
        </div>
    </div>
  )
}
