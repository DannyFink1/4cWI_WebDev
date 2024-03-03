import React, { useEffect, useRef, useState } from 'react'
import AutoCompleteMolecule from '../molecules/AutoCompleteMolecule'
import useAPI from '../../states/Api';
import useMiscellaneous from '../../states/Miscellaneous';



export default function SearchBarComponent({ siteIndex }) { // Site-Index: Today (0), Tomorrow (1), 3-Days (2)
  const [visible, setVisible] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState([]);
  const { setCurrent, setTodayRange, tomorrow, setTomorrow, setTomorrowRange } = useAPI();


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

      switch (siteIndex) {
        case 0:
          getWeatherToday(event.target.value);
          getHourData(event.target.value);
          break;
        case 1:
          getWeatherTomorrow(event.target.value);
          break;
        case 2:
          break;
        default:
          break;
      }

    }
    if (event.key === '?') {
      console.log("Frage");
      console.log(event.target.value);
      fetchAutoComplete(event.target.value);
    }
  }

  function fetchAutoComplete(value) {
    fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=" + value + "&type=city&format=json&apiKey=2c9b4a0d91734167acac6edcb58a8f41")
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setAutocompleteValue(result);
      }
      )
      .catch(error => console.log('error', error));
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


  function getWeatherTomorrow(value) {
    fetch('http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=' + value + '&dt=' + getTomorrowDateMinus())
      .then(response => response.json())
      .then(response => {
        setTomorrowRange(response);

        setTomorrow(response.forecast.forecastday[0].hour[12]);


      }).catch(error => {
        alert("Stadt nicht gefunden!");
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
  return (


    <div className='relative'>
      <div id="searchbar" className="w-[90vw] md:w-[30vw] h-[5vh] min-h-[50px] bg-white flex justify-between items-center pl-4 pr-4 mt-10 rounded-[50px]  border-solid border-black border-[2px]" >
        <input type="text" className="w-[60vw] md:w-[20vw] h-[4vh] min-h-[40px] text-[30px]" placeholder="Suche (Ort)" id="input" onClick={visibleTrue} onKeyDown={handleKeyPress} />
        <img src="https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/search.png" alt="" srcset="" className="max-h-[30px]" id="searchIcon" />
      </div>

      <AutoCompleteMolecule visible={visible} autocompleteValue={autocompleteValue} visibleTrue={visibleTrue} visibleFalse={visibleFalse} />
    </div>
  )
}



