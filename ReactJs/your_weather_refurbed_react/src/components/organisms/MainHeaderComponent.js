import React from 'react'




export default function MainHeaderComponent({ getDate, region, city, title }) {
  return (
    <div class="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">
      <div class="absolute right-5 top-10 text-[30px] font-black md:hidden">{title}</div>
      <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
        <div id="day" class="text-[40px] hidden md:inline">{title}</div>
        <div id="date" class="text-[40px] hidden md:inline">{getDate}</div>
      </div>
      <div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">
        <div id="region" class="font-bold">{region}</div>
        <div id="city" class="">{city}</div>
      </div>
    </div>
  )
}
