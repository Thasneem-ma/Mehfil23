"use client"
import {React,useEffect,useState} from 'react'
import {MdOutlineCollectionsBookmark} from 'react-icons/md'
import {LiaWindowCloseSolid} from 'react-icons/lia'
import Link from 'next/link'


function Navbar() {
    const [responsiveButton ,setResponsiveButton] = useState(false)

    const handleChange = () => {
        setResponsiveButton(!responsiveButton)
    }
    useEffect(()=>{
      const handlescrollVisibility = () => {
        window.scrollY && setResponsiveButton(false)
      }
      window.addEventListener('scroll',handlescrollVisibility)
    })

  return (
    <div className='flex bg-white shadow-sm justify-between w-full h-20 items-center fixed
    mx-auto z-50 px-[14%] md:px-[6%]'>
        <div className='relative md:left-28 '>
            <h1>Logo Here</h1>
        </div>
      <div className='md:flex space-x-6 relative md:right-28 text-[12pt] cursor-pointer font-semibold hidden'>
        <Link href={"/"} onClick={()=> setResponsiveButton(false)} className='hover-underline-animation'>Home</Link>
        <Link href={"/result"} onClick={()=> setResponsiveButton(false)} className='hover-underline-animation'>Result</Link>
        <Link href={"/gallery"} onClick={()=> setResponsiveButton(false)} className='hover-underline-animation'>Gallery</Link>
        {/* <a className='hover-underline-animation'>Schedule</a> */}
        
      </div>


      {/* responsive Bar */}
      <div className='md:hidden block '>
        <button onClick={handleChange} className='text-2xl text-teal-900'>
          {!responsiveButton ? <MdOutlineCollectionsBookmark/> : <LiaWindowCloseSolid size={30} /> }
        </button>
        <div>
            {responsiveButton ? <div className='absolute right-[15%] w-36 py-4 bg-teal-900
            text-end sideBar rounded-bl-2xl '>
              <div className='flex flex-col space-y-1.5 text-white font-semibold pr-4'>
                <Link href={"/"} onClick={()=> setResponsiveButton(false)} className='cursor-pointer'>Home</Link>
                <Link href={"/result"} onClick={()=> setResponsiveButton(false)} className='cursor-pointer'>Result</Link>
                <Link href={"/gallery"} onClick={()=> setResponsiveButton(false)} className='cursor-pointer'>Gallery</Link>
                {/* <Link href={"/"} onClick={()=> setResponsiveButton(false)} className='cursor-pointer'>Schedule</Link> */}
              </div>
                 </div> : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar
