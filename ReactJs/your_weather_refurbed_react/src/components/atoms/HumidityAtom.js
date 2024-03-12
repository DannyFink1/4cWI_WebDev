import React from 'react'
import useAPI from '../../states/Api';

export default function HumidityAtom() {

    const { current } = useAPI();
    return (
        <div id="humidity" className="flex items-center ">
            <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784146/yourweather/humidity.png" alt="" className="md:hidden lg:inline w-[15vw] min-w-[60px] max-w-[60px]  mr-4" />
            <div>
                <div className="hidden md:inline">Luftfeuchtigkeit: </div>
                {current.current.humidity}%
            </div>
        </div>
    )
}
