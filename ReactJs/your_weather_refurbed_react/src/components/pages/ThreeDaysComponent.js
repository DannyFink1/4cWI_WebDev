import React, { useEffect } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import useAPI from '../../states/Api';
import { MagnifyingGlass } from 'react-loader-spinner';
import MenuComponent from '../organisms/MenuComponent';
import TomorrowMainComponent from '../organisms/TomorrowMainComponent';
import MainHeaderComponent from '../organisms/MainHeaderComponent';
import ThreeDaysMainComponent from '../organisms/ThreeDaysMainComponent';



export default function ThreeDaysComponent() {

    const { setThreeDays, threeDays } = useAPI();

    useEffect(() => {

        //Fetch for all 3 days
        fetch('http://api.weatherapi.com/v1/forecast.json?key=5fa2dd3419924cd88d871245231710&q=' + "Dornbirn" + '&days=3&aqi=no&alerts=no')
            .then(response => response.json())
            .then(response => {
                console.log("Three Days", response);
                setThreeDays(response);

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



    if (threeDays.forecast == null || threeDays.location == null) {
        return <div id="data" className="bg-white w-screen min-h-[400px] rounded-[20px] m-10 border-solid border-black border-[2px] flex flex-col items-center justify-center relative self-center justify-self-center"><MagnifyingGlass
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
    console.log("dsdf", threeDays.forecast.forecastday[0]);
    return (
        <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
            <HeaderComponent />
            <div className='flex flex-col items-center justify-center'>
                <SearchBarComponent siteIndex={2} />
                <MainHeaderComponent getDate={getTomorrowDateMinus()} title={"Drei Tage"} region={threeDays.location.region} city={threeDays.location.name} />
                <ThreeDaysMainComponent data={threeDays.forecast.forecastday[0]} />
                <ThreeDaysMainComponent data={threeDays.forecast.forecastday[1]} />
                <ThreeDaysMainComponent data={threeDays.forecast.forecastday[2]} />
            </div>
            <MenuComponent />
        </div>
    )
}
