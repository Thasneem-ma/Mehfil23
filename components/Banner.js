import Link from 'next/link'
import React from 'react'
import {BsYoutube} from 'react-icons/bs'


function Banner() {
  return (
    <div className='bg-green-50 container mt-20 h-[70vh] flex flex-col items-center justify-center
    space-y-4'>
      <div className='text-center items-center space-y-2'>
        <h1 className=''>art Will be posted here</h1>
        <h1 className='text-3xl font-semibold'>Suffa Mehfil&apos;23</h1>
      </div>
      <div className='flex space-x-4'>
        <button className='p-1.5 flex shadow-md px-2.5 bg-teal-900 text-white font-medium '>
          <BsYoutube className='text-2xl p-0.5'/> Watch Live</button>
        <Link href={"https://www.ahlussuffadars.in"} className='p-1.5 shadow-md px-2.5 bg-teal-900 text-white font-medium '>Visit Ahlussuffa</Link>
      </div>
    </div>
  )
}

export default Banner
