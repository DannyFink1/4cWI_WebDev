import React from 'react'

export default function DateAtom() {

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

  return (
    <div id="dayanddate" class="flex flex-col items-center text-[40px] font-extrabold self-center">
                <div id="day" class="text-[40px] hidden md:inline">Heute, {getCurrentWeekday()}</div>
                <div id="date" class="text-[40px] hidden md:inline">{getTodayDateMinus()}</div>
            </div>
  )
}



