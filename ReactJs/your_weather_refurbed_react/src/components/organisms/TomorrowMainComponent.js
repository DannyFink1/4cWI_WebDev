import React from 'react'
import useAPI from '../../states/Api'

export default function TomorrowMainComponent({timeIndex}) {

    const {tomorrowRange} = useAPI();
    console.log("tomorrowRange", tomorrowRange, timeIndex);
    let time = tomorrowRange.forecast.forecastday[0].hour[timeIndex];
    console.log(time);

    return (
    <div class="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">
    <div class="flex items-center">
        <div class="flex flex-row">
            <div class="text-[40px] md:text-[50px] font-bold"> {time.temp_c}°</div>
            <div class="text-[15px] font-bold hidden md:inline self-start"> {tomorrowRange.forecast.forecastday[0].hour[3].temp_c}°/ {tomorrowRange.forecast.forecastday[0].hour[9].temp_c}°</div>
        </div>
    </div>
    <div class="flex flex-col justify-center">
        <div class="flex">
            <img src="'+ m.condition.icon +'" alt="" class="w-[30px]"/>
            <div class="hidden lg:inline">&nbsp Niederschlag:</div>
            <div> {time.precip_mm} mm/h</div>
        </div>
        <div class="flex">
            <img src="./img/humidity.png" alt="" class="w-[30px]"/>
            <div class="hidden lg:inline">&nbsp Luftfeuchtigkeit:</div>
            <div> &nbsp'+ m.humidity +'%</div>
        </div>
    </div>
    <div class="flex flex-col items-end w-[30vw]">
        <div class="text-[25px] font-black">Morgens</div>
        <img src="./img/sun.png" alt="" srcset="" class="w-[60px]"/>
    </div>
</div>
  )
}
