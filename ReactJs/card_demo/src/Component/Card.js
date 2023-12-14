import React from 'react'

export default function Card({name, job, text, imageURL}) {
  return (
    <div className='bg-blue-500 h-[300px] w-[300px] border-solid border-black border-[0.5px] flex '>
        <div className='w-[50%]'>
            <h4>{name}</h4>
            <h3>{job}</h3>
            <h2>{text}</h2>
        </div>
        <div className='w-[50%]'>
            Bild
            <img src={imageURL}></img>
        </div>

    </div>
  )
}

