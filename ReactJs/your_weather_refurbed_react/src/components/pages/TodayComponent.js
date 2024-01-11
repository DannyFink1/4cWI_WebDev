import React, { useEffect } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import MainDataComponent from '../organisms/MainDataComponent'
import useAPI from '../../states/Api';
import HourDataComponent from '../organisms/HourDataComponent';



export default function TodayComponent() {

  const { setCurrent, setTodayRange } = useAPI();

  useEffect(() => {

    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=Dornbirn')
      .then(response => response.json())
      .then(response => {
        console.log("Current", response);
        setCurrent(response);
      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })

    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=Dornbirn&dt=' + getTodayDateMinus())
      .then(response => response.json())
      .then(response => {
        console.log("TodayRange", response);
        setTodayRange(response);
      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })
  }, [])

  function getTodayDateMinus() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  }


  return (
    <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
      <HeaderComponent />
      <div className='flex flex-col items-center justify-center'>
        <SearchBarComponent />
        <MainDataComponent />
        <HourDataComponent />
      </div>
    </div>
  )
}
