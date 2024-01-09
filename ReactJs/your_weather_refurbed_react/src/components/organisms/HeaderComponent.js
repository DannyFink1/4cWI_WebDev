import React from 'react';


export default function HeaderComponent() {
  return (
    <div id="header" class="bg-[#FFE899] h-[120px] w-[100vw] flex flex-row items-center justify-between relative border-solid border-black border-b-[3px] z-20">
        <div id="img" class="mr-[100px] ml-[20px]">
            <a href="index.html">
                <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/logo.png" alt="" srcset="" class="max-h-[110px]"/>
            </a>
        </div>
        <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/menu.png" alt="" srcset="" class="max-h-[65px] absolute right-[10px] md:right-[100px] z-10" id="menubtn"/>
    </div>
  )
}
