import React from 'react'
import {BiSolidUserPlus} from 'react-icons/bi'
import {MdOutlineSettingsInputComposite,MdOutlineSubtitles,MdOutlineSchedule} from 'react-icons/md'
import {BsImageFill,BsYoutube} from 'react-icons/bs'
import {PiListNumbersDuotone} from 'react-icons/pi'
import Link from 'next/link'



function EditPannel() {
  return (
    <div className='h-screen md:pl-36'>
        <div className='w-fit md:pt-24 '>
            <h1 className='text-3xl font-semibold '>Add Details</h1>
        </div>

        <div className='grid  grid-cols-4 gap-6 mt-8 pr-24'>
            <Link href={"/participant"} target='_blank' className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <BiSolidUserPlus />
                <h1 className='text-lg '>Add Participant</h1>
            </Link>
            <Link href={"/asignprogramme"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSettingsInputComposite/>
                <h1 className='text-lg '>Asign Programmes</h1>
            </Link>
            <Link href={"/addresult"} target='_blank' className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSubtitles/>
                <h1 className='text-lg '> Submit Result</h1>
            </Link>
            <Link href={"/publishimage"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <BsImageFill/>
                <h1 className='text-lg '>Publish Images</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <BsYoutube/>
                <h1 className='text-lg '>Live Url</h1>
            </Link>
            <Link href={"/teampoints"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <PiListNumbersDuotone/>
                <h1 className='text-lg'>Team Points</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSchedule/>
                <h1 className='text-lg'>Schedule</h1>
            </Link>
            
            
        </div>
        {/* <div className='w-fit md:pt-24 '>
            <h1 className='text-3xl font-semibold '>View Details</h1>
        </div>

        <div className='grid  grid-cols-4 gap-6 mt-8 pr-24'>
            <Link href={"/"}  className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <BiSolidUserPlus />
                <h1 className='text-lg '>Participant List</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSettingsInputComposite/>
                <h1 className='text-lg '>Competetion List</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSubtitles/>
                <h1 className='text-lg '>Result List</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <BsImageFill/>
                <h1 className='text-lg '>Published Images</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <PiListNumbersDuotone/>
                <h1 className='text-lg '>Points</h1>
            </Link>
            <Link href={"/"} className='flex items-center text-xl space-x-2 bg-teal-900 p-2 text-white pl-5 cursor-pointer'>
                <MdOutlineSchedule/>
                <h1 className='text-lg'>Schedule</h1>
            </Link>
            
            
        </div> */}
    </div>
  )
}

export default EditPannel
