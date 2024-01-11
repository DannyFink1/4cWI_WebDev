import React from 'react'
import useAPI from '../../states/Api'

export default function CurrentTemperatureMolecule() {

    const { current, todayRange } = useAPI();

    function findMinAndMaxTemp(data) {


        let minTemp = data[0].temp_c;
        let maxTemp = data[0].temp_c;

        data.forEach((data, index) => {
            const temp = data.temp_c;

            if (temp < minTemp) {
                minTemp = temp;

            }

            if (temp > maxTemp) {
                maxTemp = temp;

            }
        });
        return { minTemp, maxTemp };
    }

    return (
        <div>
            <div id="prim-inf" class="mt-2 ml-10 relative flex items-center">
                <div>
                    <div id="temp" class="font-extrabold text-[40px]">{current.current.temp_c}°</div>
                    <div id="maxmin" class="text-[30px]">{findMinAndMaxTemp(todayRange.forecast.forecastday[0].hour).minTemp}°/{findMinAndMaxTemp(todayRange.forecast.forecastday[0].hour).maxTemp}°</div>
                </div>
                <div id="img" class="absolute right-10 md:right-[5vw]">
                    <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/sun.png" alt="" class="md:w-[25vw] max-w-[250px]" />
                </div>
            </div>
        </div>
    )
}
