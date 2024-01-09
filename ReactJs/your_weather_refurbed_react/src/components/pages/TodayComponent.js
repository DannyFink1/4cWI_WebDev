import React, { useState } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import MainDataComponent from '../organisms/MainDataComponent'

export default function TodayComponent() {

  return (
    <div className='bg-[url("https://res.cloudinary.com/dr72f1r80/image/upload/v1704784147/yourweather/bgBig.jpg")] min-h-screen '>
        <HeaderComponent/>
        <div className='flex flex-col items-center justify-center'>
            <SearchBarComponent/>
            <MainDataComponent/>
        </div>
    </div>
  )
}
