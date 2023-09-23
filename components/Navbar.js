"use client"
import {React,useState} from 'react'
import {MdOutlineCollectionsBookmark} from 'react-icons/md'
import {LiaWindowCloseSolid} from 'react-icons/lia'
import Link from 'next/link'


function Navbar() {
    const [responsiveButton ,setResponsiveButton] = useState(false)

    const handleChange = () => {
        setResponsiveButton(!responsiveButton)
    }

  return (
    <div className='flex bg-white shadow-sm justify-between w-full h-20 items-center fixed z-50'>
        <div className='relative md:left-28 left-8'>
            <h1>Logo Here</h1>
        </div>
      <div className='md:flex space-x-6 relative md:right-28 text-[12pt] cursor-pointer font-semibold hidden'>
        <Link href={"/"} className='hover-underline-animation'>Home</Link>
        <Link href={"/result"} className='hover-underline-animation'>Result</Link>
        <Link href={"/gallery"} className='hover-underline-animation'>Gallery</Link>
        <a className='hover-underline-animation'>Schedule</a>
        
      </div>


      {/* responsive Bar */}
      <div className='md:hidden block '>
        <button onClick={handleChange} className='text-2xl text-teal-900 relative right-8'>
          {!responsiveButton ? <MdOutlineCollectionsBookmark/> : <LiaWindowCloseSolid size={30} /> }
        </button>
        <div>
            {responsiveButton ? <div className='absolute top-13 right-9 w-44 h-36 bg-teal-900
            text-end sideBar rounded-bl-2xl '>
              <div className='flex flex-col space-y-1.5 text-white font-semibold 
              mt-3 mr-5 '>
                <Link href={"/"} className='cursor-pointer'>Home</Link>
                <Link href={"/result"} className='cursor-pointer'>Result</Link>
                <Link href={"/gallery"} className='cursor-pointer'>Gallery</Link>
                <Link href={"/"} className='cursor-pointer'>Schedule</Link>
              </div>
                 </div> : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar
