import React from 'react'
import useAPI from '../../states/Api';

export default function WindAtom() {

    const { current } = useAPI();

    return (
        <div id="wind" class="flex items-center ">
            <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/wind.png" alt="" class="md:hidden lg:inline w-[15vw] min-w-[60px] max-w-[60px]  mr-4" />
            <div class="">
                <div class="hidden md:inline">Wind: </div>
                {current.current.wind_kph} km/h
            </div>
        </div>
    )
}
