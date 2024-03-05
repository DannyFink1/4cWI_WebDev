import React from 'react'

export default function ThreeDaysMainComponent({ data }) {



    console.log(data);
    let date = data.date;
    let temp1, temp2;
    date = date.substring(5);
    temp1 = date.substring(0,2);
    temp2 = date.substring(3);
    date = `${temp2}.${temp1}`;



    return (
        <div id="1" class="bg-white h-auto min-h-[150px] w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">
            <div class="flex items-center">
                <div class="flex flex-row">
                    <div class="text-[40px] md:text-[50px] font-bold">{data.day.avgtemp_c}°</div>
                    <div class="text-[15px] font-bold hidden md:inline self-start">{data.day.mintemp_c}°/{data.day.maxtemp_c}°</div>
                </div>
            </div>
            <div class="flex flex-col justify-center">
                <div class="flex">
                    <img src="./img/rain.png" alt="" class="w-[30px] m-1" />
                    <div class="hidden lg:inline">&nbsp;Niederschlag:</div>
                    <div>&nbsp;{data.day.totalprecip_mm} mm/h</div>
                </div>
                <div class="flex">
                    <img src="./img/humidity.png" alt="" class="w-[30px] m-1" />
                    <div class="hidden lg:inline">&nbsp;Luftfeuchtigkeit:</div>
                    <div> &nbsp;{data.day.avghumidity}%</div>
                </div>
                <div class="flex">
                    <img src="./img/wind.png" alt="" class="w-[30px] m-1" />
                    <div class="hidden lg:inline">&nbsp;Wind:</div>
                    <div> &nbsp;{data.day.maxwind_kph} km/h</div>
                </div>
            </div>
            <div class="flex flex-col items-end w-[30vw]">
                <div class="text-[25px] font-black hidden md:inline">{date}</div>
                <div class="text-[25px] font-black md:hidden">{date}</div>
                <img src={data.day.condition.icon} alt="" srcset="" class="w-[80px]" />
            </div>
        </div>
    )
}
