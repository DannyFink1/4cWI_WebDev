import React from 'react'
import DateSmallScreenAtom from '../atoms/DaySmallAtom'
import DateAtom from '../atoms/DateAtom'
import LocationAtom from '../atoms/LocationAtom'

export default function DayAndDateMolecule() {
  return (
    <div>
        <LocationAtom region='Vorarlberg' city='Dornbirn'/>
        <DateSmallScreenAtom/>    
        <DateAtom/>
    </div>
  )
}
