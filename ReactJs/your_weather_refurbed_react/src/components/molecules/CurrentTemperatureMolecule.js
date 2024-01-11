import React from 'react'
import useAPI from '../../states/Api'

export default function CurrentTemperatureMolecule() {

    const { data } = useAPI();
    return (
        <div>
            <div id="prim-inf" class="mt-2 ml-10 relative flex items-center">
                <div>
                    <div id="temp" class="font-extrabold text-[40px]">{data.current.temp_c}°</div>
                    <div id="maxmin" class="text-[30px]">8°/16°</div>
                </div>
                <div id="img" class="absolute right-10 md:right-[5vw]">
                    <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/sun.png" alt="" class="md:w-[25vw] max-w-[250px]" />
                </div>
            </div>
        </div>
    )
}
