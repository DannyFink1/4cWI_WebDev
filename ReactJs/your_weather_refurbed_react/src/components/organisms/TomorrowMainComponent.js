import React from 'react'
import useAPI from '../../states/Api'

export default function TomorrowMainComponent({ timeIndex, timeTitle }) {

    const { tomorrowRange } = useAPI();
    
    console.log("tomorrowRange", tomorrowRange, timeIndex);
    let time = tomorrowRange.forecast.forecastday[0].hour[timeIndex];
    console.log(time);

    function minMaxTempInRange() {

        var startIndex = timeIndex - 3;
        var endIndex = timeIndex + 3;

        var minTemp = Infinity;
        var maxTemp = -Infinity;

        for (var i = startIndex; i <= endIndex; i++) {
            var temp = tomorrowRange.forecast.forecastday[0].hour[i].temp_c;
            minTemp = Math.min(minTemp, temp);
            maxTemp = Math.max(maxTemp, temp);
        }

        return { minTemp: minTemp, maxTemp: maxTemp };
    }

    return (
        <div class="bg-white h-auto w-[90vw] md:w-[70vw] rounded-[20px] m-2 border-solid border-black border-[2px] flex justify-evenly relative p-3">
            <div class="flex items-center">
                <div class="flex flex-row">
                    <div class="text-[40px] md:text-[50px] font-bold"> {time.temp_c}°</div>
                    <div class="text-[15px] font-bold hidden md:inline self-start"> {minMaxTempInRange().minTemp}°/ {minMaxTempInRange().maxTemp}°</div>
                </div>
            </div>
            <div class="flex flex-col justify-center">
                <div class="flex">
                    <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/rain.png" alt="" class="w-[30px]" />
                    <div class="hidden lg:inline">&nbsp;Niederschlag:</div>
                    <div>&nbsp;{time.precip_mm} mm/h</div>
                </div>
                <div class="flex">
                    <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784146/yourweather/humidity.png" alt="" class="w-[30px]" />
                    <div class="hidden lg:inline">&nbsp;Luftfeuchtigkeit:</div>
                    <div>&nbsp;{time.humidity} %</div>
                </div>
            </div>
            <div class="flex flex-col items-end w-[30vw] ">
                <div class="text-[25px] font-black">{timeTitle}</div>
                <img src={time.condition.icon} alt="" srcset="" class="w-[60px]" />
            </div>
        </div>
    )
}
