import React from 'react'

export default function HourDataMolecule({ hour, temp, icon, humidity }) {
    return (
        <div
            class="bg-[#8ECAE6] h-auto w-[100px] m-4 rounded-[10px] border-solid border-black border-[1px] p-1 flex flex-col items-center hover:drop-shadow-lg">
            <div>{hour} Uhr</div>
            <div class="font-bold">{temp}°</div>
            <div><img src={icon} alt="" class="w-[16vw] max-w-[65px] md:w-[4vw]" /></div>
            <div class="text-[15px]">{humidity}%</div>
        </div>
    )
}
