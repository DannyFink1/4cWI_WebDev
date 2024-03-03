import React, { useEffect } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import useAPI from '../../states/Api';
import { MagnifyingGlass } from 'react-loader-spinner';
import MenuComponent from '../organisms/MenuComponent';
import TomorrowMainComponent from '../organisms/TomorrowMainComponent';
import MainHeaderComponent from '../organisms/MainHeaderComponent';



export default function TomorrowComponent() {

  const { setTomorrow, setTomorrowRange, tomorrow, tomorrowRange } = useAPI();

  useEffect(() => {


    // Fetch for Tomorrow Data
    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=Dornbirn&dt=' + getTomorrowDateMinus())
      .then(response => response.json())
      .then(response => {
        setTomorrowRange(response);

        setTomorrow(response.forecast.forecastday[0].hour[12]);


      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })
  }, [])

  function getTomorrowDateMinus() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }



  if (tomorrowRange.forecast == null || tomorrow == null) {
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
    <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
      <HeaderComponent />
      <div className='flex flex-col items-center justify-center'>
        <SearchBarComponent siteIndex={1} />
        <MainHeaderComponent getDate={getTomorrowDateMinus()} region={tomorrowRange.location.region} city={tomorrowRange.location.name} />
        <TomorrowMainComponent timeIndex={6} timeTitle={"Morgens"} />
        <TomorrowMainComponent timeIndex={12} timeTitle={"Mittags"} />
        <TomorrowMainComponent timeIndex={16} timeTitle={"Nachmittags"} />
        <TomorrowMainComponent timeIndex={20} timeTitle={"Abends"} />
        {/* <TomorrowHourDataComponent /> */}
      </div>
      <MenuComponent />
    </div>
  )
}
