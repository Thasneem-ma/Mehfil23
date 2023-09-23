"use client"
import React, { useEffect, useState } from 'react'

function TeamPointDisplay() {
    const [finalizedteamPointsDisplay, setTeamPointsDisplay] = useState([]) 

    const getTeamPoints = async()=>{
        try {
            const fetchedpoints = await fetch("/api/teampoint",{
                cache: "no-store"
            })
            if(!fetchedpoints){
                console.log("Something went wrong when fetching team points");
            }
            const fetched = await fetchedpoints.json()
            setTeamPointsDisplay(fetched.dBFinalizedTeamPoints)
            console.log(finalizedteamPointsDisplay);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getTeamPoints();
    },[getTeamPoints])

  return (
    <div className='flex flex-col mx-auto items-center py-14 '>
     <h1 className='text-3xl font-semibold'>Team Status</h1>

     <div className=' md:mt-16 mt-12 space-y-5 justify-center text-center items-center flex flex-col '>

         {/* points from DB */}
         {/* team 1 */}
     {finalizedteamPointsDisplay && finalizedteamPointsDisplay.map((t,i)=>(
        <>
        <div className='mx-auto flex items-center gap-4' key={t._id} >
        <div className=''>
            <h3 className='text-2xl  font-semibold'>{t.teamfirst }</h3>
            </div>
            <div className='flex'>
                <h1 className='text-white shadow-xl font-bold text-2xl p-2 px-4  bg-teal-900' >{t.pointforfirst}</h1>
                <span class="relative right-2 -top-1.5 flex h-4 w-4 ">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
            </span>
            </div>
        </div>

    
        {/* team 2 */}
      
        <div className='mx-auto flex items-center gap-4'>
            <div className='shadow-xl bg-orange-900'>
                <h1 className='text-white font-semibold text-2xl p-2 px-4' >
                {t.pointforsecond}

                    </h1>
            </div>
        <div className=''>
            <h3 className='text-2xl font-semibold'>
                {t.teamsecond}
                </h3>
            </div>
        </div>
      
   

        {/* team 3 */}
    


        <div className='mx-auto flex items-center gap-4' >
        <div className=''>
            <h3 className='text-2xl font-semibold'>
                {t.teamthird}
            </h3>
            </div>
            <div className='shadow-xl bg-purple-900'>
                <h1 className='text-white font-semibold text-2xl p-2 px-4' >
                    {t.pointforthird}
                    </h1>
            </div>
        </div>
        </>
         ))} 

         {/* Points when null */}
         {finalizedteamPointsDisplay == '' ?
        <>
        <div className='mx-auto flex items-center ' >
        <div className=' pr-10'>
            <h3 className='text-2xl  font-semibold'>Ancient Alliance</h3>
            </div>
            <h1 className='text-white shadow-xl font-bold text-2xl p-2 px-4  bg-teal-900' >00</h1>
        </div>

    
        {/* team 2 */}
      
        <div className='mx-auto flex items-center'>
            <div className='shadow-xl bg-orange-900'>
                <h1 className='text-white font-semibold text-2xl p-2 px-4' >00</h1>
            </div>
        <div className=' pl-10'>
            <h3 className='text-2xl font-semibold'>
                Legacy Legends
                </h3>
            </div>
        </div>
      
   

        {/* team 3 */}
    


        <div className='mx-auto flex items-center ' >
        <div className=' pr-10'>
            <h3 className='text-2xl  font-semibold'>Traditional Trackers</h3>
            </div>
            <div className='shadow-xl bg-purple-900'>
            <h1 className='text-white shadow-xl font-bold text-2xl p-2 px-4' >00</h1>
            </div>
        </div>
        </>
         : null} 

        
    
     </div>
    </div>
  )
}

export default TeamPointDisplay
