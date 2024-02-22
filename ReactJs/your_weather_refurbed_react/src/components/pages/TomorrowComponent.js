import React, { useEffect } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import MainDataComponent from '../organisms/MainDataComponent'
import useAPI from '../../states/Api';
import HourDataComponent from '../organisms/HourDataComponent';
import { MagnifyingGlass } from 'react-loader-spinner';
import MenuComponent from '../organisms/MenuComponent';
import TomorrowHeaderComponent from '../organisms/TomorrowHeaderComponent';



export default function TomorrowComponent() {

  const { setCurrent, setTodayRange, current, todayRange } = useAPI();

  useEffect(() => {

    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=Dornbirn')
      .then(response => response.json())
      .then(response => {
        console.log("Current", response);
        setCurrent(response);
      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })

    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=Dornbirn&dt=' + getTomorrowDateMinus())
      .then(response => response.json())
      .then(response => {
        console.log("TodayRange", response);
        setTodayRange(response);
      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })
  }, [])

  function getTomorrowDateMinus() {
    const now = new Date();
    const day = now.getDate()+1;
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  }

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
      color="#e15b64" s
    /></div>
  }

  return (
    <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
      <HeaderComponent />
      <div className='flex flex-col items-center justify-center'>
        <SearchBarComponent />
        <TomorrowHeaderComponent/>
        <HourDataComponent />
      </div>
      <MenuComponent />
    </div>
  )
}
