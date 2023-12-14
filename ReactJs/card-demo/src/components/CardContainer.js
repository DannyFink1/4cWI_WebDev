import React, { useEffect, useState } from 'react'
import Card from './Card'

export default function CardContainer() {

    const [people, setPeople] = useState([]);

    useEffect(()=>{
        
        fetch("https://657b3f25394ca9e4af140d28.mockapi.io/people").then(response => response.json()).then(response =>{

            console.log(response);
            setPeople(response);
        });
    },[])

  return (
    <div className='flex flex-wrap'>
        {people.map((element)=>{
            return (
                <Card name={element.name} jobTitle={element.jobTitle} imageURL={element.avatar}/>
            )
        })}
        
    </div>
  )
}
