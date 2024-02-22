import React from 'react'

export default function TomorrowHeaderComponent() {
  return (
    <div class="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">
                            <div class="absolute right-5 top-0 text-[30px] font-black md:hidden">Morgen</div>
                                <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
                                    <div id="day" class="text-[40px] hidden md:inline">Morgen</div>
                                    <div id="date" class="text-[40px] hidden md:inline"></div>
                             </div>
                                <div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">
                                    <div id="region" class="font-bold"></div>
                                    <div id="city" class=""></div>
                             </div>
                        </div>
  )
}
