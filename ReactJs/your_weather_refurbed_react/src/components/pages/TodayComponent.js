import React, { useState } from 'react'
import HeaderComponent from '../organisms/HeaderComponent'
import SearchBarComponent from '../organisms/SearchBarComponent'
import MainDataComponent from '../organisms/MainDataComponent'

export default function TodayComponent() {
const [dataNow, setDataNow] = useState([]);


  return (
    <div className='bg-blue-500 min-h-screen '>
        <HeaderComponent/>
        <div className='flex flex-col items-center justify-center'>
            
            <SearchBarComponent/>
            <MainDataComponent/>
        </div>
    </div>
  )
}
