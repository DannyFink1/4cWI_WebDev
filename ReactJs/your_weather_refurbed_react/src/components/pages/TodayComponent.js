import React, { useEffect } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import MainDataComponent from '../organisms/MainDataComponent'
import useAPI from '../../states/Api';
import { Audio } from 'react-loader-spinner';


export default function TodayComponent() {

  const { data, setData } = useAPI();

  useEffect(() => {
    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=' + "Berlin")
      .then(response => response.json())
      .then(response => {
        console.log("Today", response);
        setData(response);
      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })
  }, [])



  return (
    <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
      <HeaderComponent />
      <div className='flex flex-col items-center justify-center'>
        <SearchBarComponent />
        <MainDataComponent />
      </div>
    </div>
  )
}
