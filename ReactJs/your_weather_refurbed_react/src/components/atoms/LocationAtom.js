import React from 'react'

export default function LocationAtom({region, city}) {
  return (
    <div id="place" class="text-[30px] p-4 md:absolute md:left-[10px]">
                <div id="region" class="font-bold">{region}</div>
                <div id="city" class="">{city}</div>
            </div>
  )
}
