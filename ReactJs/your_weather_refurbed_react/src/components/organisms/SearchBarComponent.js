import React, { useState } from 'react'
import AutoCompleteMolecule from '../molecules/AutoCompleteMolecule'
import useAPI from '../../states/Api';

export default function SearchBarComponent() {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setCurrent, setTodayRange } = useAPI();


  const visibleTrue = (e) => {
    e.preventDefault();
    setVisible(true);
  }

  const visibleFalse = (e) => {
    e.preventDefault();
    setVisible(false);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ')
      getWeatherToday(event.target.value);
      getHourData(event.target.value);
    }
    if (event.key === '?') {
      console.log("Frage");
      console.log(event.target.value);
    }
  }

  function getWeatherToday(value) {
    fetch('https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=' + value)
      .then(response => response.json())
      .then(response => {
        console.log("Today", response);
        if (response.error == null) {
          setCurrent(response);
        }

      }).catch(error => {
        alert("Stadt nicht gefunden!");
      })
  }

  function getHourData(value) {
    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=' + value + "&dt=" + getTodayDateMinus())
      .then(response => response.json())
      .then(response => {
        console.log("Hourly", response);
        if (response.error == null) {
          setTodayRange(response);
        }
      })
  }

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


    <div className='relative'>
      <div id="searchbar" className="w-[90vw] md:w-[30vw] h-[5vh] min-h-[50px] bg-white flex justify-between items-center pl-4 pr-4 mt-10 rounded-[50px]  border-solid border-black border-[2px]" >
        <input type="text" className="w-[60vw] md:w-[20vw] h-[4vh] min-h-[40px] text-[30px]" placeholder="Suche (Ort)" id="input" onClick={visibleTrue} onBlur={visibleFalse} onKeyDown={handleKeyPress} />
        <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/search.png" alt="" srcset="" className="max-h-[30px]" id="searchIcon" />
      </div>
      <AutoCompleteMolecule visible={visible} />
    </div>
  )
}
