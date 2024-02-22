import React, { useEffect, useRef } from 'react';
import useMiscellaneous from '../../states/Miscellaneous';

export default function MenuComponent({ closeMenu }) {

    const {closeMenuN, setCloseMenuN} = useMiscellaneous();
    const menuRef = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (!event.target.closest("#menu") && !event.target.closest("#menubtn")) {
    //             closeMenu();
    //             console.log("Irgendwas hier");
    //         }
    //     };
    //     document.addEventListener("click", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, [closeMenu]);

    useEffect(()=>{
        console.log("Änderung", closeMenuN);
        if(closeMenuN == 1)
        {
            menuRef.current.style = "display: inline; right: 0; transition: right 0.3s ease-in-out;";
        }
    }, [closeMenuN]);

    const toggleMenu = () => {
        if(closeMenuN == 1){
            setCloseMenuN(0);
            menuRef.current.style = "right: -1000px; transition: right 0.3s ease-in-out;";
        }
      };

    return (
        <div className="absolute border-solid border-l-[3px] border-b-[3px] md:border-black/[.50] right-[-1000px] w-[100%] top-0 md:w-[25%] h-[100%] bg-[#FFE899] flex flex-col items-center z-10" id="menu" ref={menuRef}>
            <svg className="absolute right-4 top-[130px]" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" id="close-x" onClick={toggleMenu}>
                <path d="M7.0051 0L0 7.0051L3.57707 10.5822L12.4204 19.5745L3.57707 28.4178L0 31.8459L7.0051 39L10.5822 35.4229L19.5745 26.4306L28.4178 35.4229L31.8459 39L39 31.8459L35.4229 28.4178L26.4306 19.5745L35.4229 10.5822L39 7.0051L31.8459 0L28.4178 3.57707L19.5745 12.4204L10.5822 3.57707L7.0051 0Z" fill="#023047" fillOpacity="0.9" />
            </svg>
            <div className="absolute top-[230px] left-[50px] flex flex-col text-[45px]">
                <a href="/">Heute</a>
                <a href="tomorrow">Morgen</a>
                <a href="threeDays">3-Tage</a>
            </div>
        </div>
    )
}
