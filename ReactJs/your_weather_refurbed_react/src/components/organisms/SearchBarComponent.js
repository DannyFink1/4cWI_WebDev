import React, { useState } from 'react'
import AutoCompleteMolecule from '../molecules/AutoCompleteMolecule'

export default function SearchBarComponent() {
  const [visible, setVisible] = useState(false);
  

  const visibleTrue = (e) => {
    e.preventDefault();
    setVisible(true);
  }

  const visibleFalse = (e) => {
    e.preventDefault();
    setVisible(false);
  }
  return (


    <div className='relative'>
      <div id="searchbar" className="w-[90vw] md:w-[30vw] h-[5vh] min-h-[50px] bg-white flex justify-between items-center pl-4 pr-4 mt-10 rounded-[50px]  border-solid border-black border-[2px]" >
              <input type="text" className="w-[60vw] md:w-[20vw] h-[4vh] min-h-[40px] text-[30px]" placeholder="Suche (Ort)" id="input"  onClick={visibleTrue} onBlur={visibleFalse}/>
              <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/search.png" alt="" srcset="" className="max-h-[30px]" id="searchIcon"/>
      </div>
      <AutoCompleteMolecule visible={visible}/>
    </div>
  )
}
