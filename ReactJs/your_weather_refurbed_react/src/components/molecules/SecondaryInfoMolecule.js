import React from 'react'
import RainAtom from '../atoms/RainAtom'
import WindAtom from '../atoms/WindAtom'
import HumidityAtom from '../atoms/HumidityAtom'
import useAPI from '../../states/Api';
import { MagnifyingGlass } from 'react-loader-spinner';

export default function SecondaryInfoMolecule() {
    const { todayRange } = useAPI();
    if (todayRange.forecast == null) {
        return <div id="data" className="bg-white h-auto min-h-[400px] w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col items-center justify-center relative"><MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64" s
        /></div>
    }

    return (
        <div className='ml-5 md:ml-10 text-[25px] pt-4 pb-6 font-semibold'>
            <RainAtom />
            <WindAtom />
            <HumidityAtom />
        </div>
    )
}
