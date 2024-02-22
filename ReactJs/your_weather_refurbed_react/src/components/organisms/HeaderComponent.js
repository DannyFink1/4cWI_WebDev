import React, { useState } from 'react';
import MenuComponent from './MenuComponent';
import useMiscellaneous from '../../states/Miscellaneous';

export default function HeaderComponent() {

  const {closeMenuN, setCloseMenuN} = useMiscellaneous();

  const toggleMenu = () => {

    if(closeMenuN == 0){
        setCloseMenuN(1);
    }
  };


  return (
    <div id="header" className="relative bg-[#FFE899] h-[120px] w-[100vw] flex flex-row items-center justify-between  border-solid border-black border-b-[3px] z-20" >
        <div id="img" className="mr-[100px] ml-[20px]">
            <a href="/">
                <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/logo.png" alt="" srcSet="" className="max-h-[110px]"/>
            </a>
        </div>
        <img 
          src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/menu.png" 
          alt="" 
          srcSet="" 
          className="max-h-[65px] absolute right-[10px] md:right-[100px] z-10" 
          id="menubtn" 
          onClick={toggleMenu}
        />
    </div>
  )
}
