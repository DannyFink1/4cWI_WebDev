import React from 'react'

export default function NewsComponent({data}) {
  return (
    <a href={data.url}>
        <div className='h-[60vh] w-[60vw] bg-white border-black border-[2px] p-4 flex flex-col items-center justify-evenly rounded-md'>
            <div className='text-[25px] font-black'>
                <div>
                {data.title}
                </div>
            </div>
            <div className='flex'>
                <div>
                <img src={data.urlToImage} className='max-h-[40vh]' alt='News'></img>
                </div>
            </div>
        </div>
    </a>
  )
}
