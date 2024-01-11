import React from 'react'
import DayAndDateMolecule from '../molecules/DayAndDateMolecule'
import useAPI from '../../states/Api'
import CurrentTemperatureMolecule from '../molecules/CurrentTemperatureMolecule';
import { Audio } from 'react-loader-spinner';



export default function MainDataComponent() {
  const { data } = useAPI();
  if (data.location == null) {
    console.log("jo nix do werte");
    return <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  }
  return (
    <div id="data" className="bg-white h-auto min-h-[400px] w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">
      <DayAndDateMolecule />
      <CurrentTemperatureMolecule />



    </div>
  )
}
