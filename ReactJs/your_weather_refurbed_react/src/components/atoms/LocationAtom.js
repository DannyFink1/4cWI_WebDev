import React from 'react'
import useAPI from '../../states/Api';

export default function LocationAtom({ region, city }) {
  const { data } = useAPI();
  return (
    <div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">
      <div id="region" class="font-bold"></div>
      <div id="city" class=""></div>
    </div>
  )
}
