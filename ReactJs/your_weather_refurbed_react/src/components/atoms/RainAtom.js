import React from 'react'
import useAPI from '../../states/Api'

export default function RainAtom() {

    const { current } = useAPI();

    return (
        <div id="rain" className="flex items-center ">
            <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/rain.png" alt="" className="md:hidden lg:inline w-[15vw] min-w-[60px] max-w-[60px] mr-4" />
            <div>
                <div className="hidden md:inline">Niederschlag: </div>
                {current.current.precip_mm} mm/h
            </div>
        </div>
    )
}
