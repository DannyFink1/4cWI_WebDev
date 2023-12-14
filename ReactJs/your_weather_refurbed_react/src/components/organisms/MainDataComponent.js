import React from 'react'
import DayAndDateMolecule from '../molecules/DayAndDateMolecule'

export default function MainDataComponent() {
  return (
    <div id="data" className="bg-white h-auto min-h-[400px] w-[90vw] md:w-[70vw] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col relative">
      <DayAndDateMolecule/>
        
    </div>
  )
}
