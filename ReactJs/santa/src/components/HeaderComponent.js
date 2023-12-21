import React from 'react'

export default function HeaderComponent({onClick}) {
  return (
    <div className='border-[2px] border-black w-[70vw] h-[100px] flex items-center justify-between p-4 top-[20px] fixed bg-white rounded-md'>
        <a href="/">
           <img src="https://th.bing.com/th/id/OIP.06EtX90LrDU9IJFsY-DzDgHaEM?rs=1&pid=ImgDetMain" className='h-[80px] ' alt='Logo'/>
        </a>
        <div className='flex'>
            <a className='p-3 border hover:bg-gray-600 hover:text-white transition mr-2' href='/'>
              Website
            </a>
 
            <select className='p-3 border hover:bg-gray-600 hover:text-white transition' onChange={()=>onClick(document.getElementById("select").value)} id="select">
                <option value='en'>EN</option>
                <option value='de'>DE</option>
            </select>            
        </div>
    </div>
  )
}
