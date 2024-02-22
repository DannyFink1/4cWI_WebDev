import React from 'react'
import { useLocation } from 'react-router-dom';

export default function DateAtom() {

  const location = useLocation();

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

function getCurrentWeekday() {
  const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const today = new Date();
  const dayIndex = today.getDay();
  return weekdays[dayIndex];
}

function getTomorrowDateMinus() {
  const now = new Date();
  const day = now.getDate() + 1;
  const month = now.getMonth() + 1; 
  const year = now.getFullYear();
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}

function getTomorrowWeekday() {
const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const today = new Date();
const dayIndex = today.getDay();
return weekdays[dayIndex];
}

if(location.pathname == "/"){
  return (
    <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
                <div id="day" class="text-[40px] hidden md:inline">Heute, {getCurrentWeekday()}</div>
                <div id="date" class="text-[40px] hidden md:inline">{getTodayDateMinus()}</div>
            </div>
  )
} else {
  return (
    <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
                <div id="day" class="text-[40px] hidden md:inline">Morgen, {getTomorrowWeekday()}</div>
                <div id="date" class="text-[40px] hidden md:inline">{getTomorrowDateMinus()}</div>
            </div>
  )
}
  
}



