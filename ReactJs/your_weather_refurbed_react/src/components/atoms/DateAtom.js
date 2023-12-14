import React from 'react'

export default function DateAtom() {
  return (
    <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
                <div id="day" class="text-[40px] hidden md:inline">Heute, Do</div>
                <div id="date" class="text-[40px] hidden md:inline">1.12.2023</div>
            </div>
  )
}

