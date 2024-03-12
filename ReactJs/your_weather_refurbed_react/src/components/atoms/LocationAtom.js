import React from 'react'
import useAPI from '../../states/Api';

export default function LocationAtom({ region, city }) {
  const { current } = useAPI();
  return (
    <div id="place" className="text-[30px] p-4 md:absolute md:left-[10px]">
      <div id="region" className="font-bold">{current.location.region}</div>
      <div id="city" className="">{current.location.name}</div>
    </div>
  )
}
