import React from 'react'

export default function AutoCompleteMolecule({visible}) {
    let elementStyle;

    if(visible){
        elementStyle = "bg-white rounded-lg shadow-xl px-4 absolute mt-8 w-[90vw] md:w-[30vw] border-solid border-black border-[2px] top-[80px] z-10";
    }else{
        elementStyle = "bg-white rounded-lg shadow-xl px-4 absolute mt-8 w-[90vw] md:w-[30vw] border-solid border-black border-[2px] top-[80px] z-10 hidden";
    }
  return (
    <div className={elementStyle} id="autocomplete">
            
            <div className="py-6 flex items-center w-full hover:bg-gray-50">
                <a href="#root" class="flex-1">
                    <div className="text-gray-400 text-base"></div>
                </a>
                <div>
                    <a href="https://www.google.at/maps/place/City+Dornbirn">
                    </a>  
                </div>
            </div>


        </div>
  )
}
