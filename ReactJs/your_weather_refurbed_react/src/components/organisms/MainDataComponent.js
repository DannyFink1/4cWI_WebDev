import React from 'react'
import DayAndDateMolecule from '../molecules/DayAndDateMolecule'
import useAPI from '../../states/Api'
import CurrentTemperatureMolecule from '../molecules/CurrentTemperatureMolecule';
import { MagnifyingGlass } from 'react-loader-spinner';
import SecondaryInfoMolecule from '../molecules/SecondaryInfoMolecule';



export default function MainDataComponent() {
  const { current, todayRange } = useAPI();
  if (todayRange.forecast == null || current.current == null) {
    console.log("jo nix do werte");
    return <div id="data" className="bg-white h-auto min-h-[400px] w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col items-center justify-center relative"><MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    /></div>
  }
  return (
    <div id="data" className="bg-white h-auto min-h-[400px] w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">
      <DayAndDateMolecule />
      <CurrentTemperatureMolecule />
      <SecondaryInfoMolecule />
    </div>
  )
}
