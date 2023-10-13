"use client"
import React, { useState } from 'react'
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from 'react-icons/bs';

function AdditionalResultForm() {
    const [result , setResult] = useState('');
    const [pointFirst , setPointFirst] = useState()
    const [pointSecond , setPointSecond] = useState()
    const [pointThird , setPointThird] = useState()
    const [teamFirst , setTeamFirst] = useState('');
    const [teamSecond , setTeamSecond] = useState('');
    const [teamThird , setTeamThird] = useState('');
    const [showGeneralForm, setGeneralForm] = useState(false)


    const showViewIt = (()=>{
        setGeneralForm(!showGeneralForm);
      })
      const handleSubmit = async(event) => {
        event.preventDefault();
    
        try {
          const res = await fetch('/api/results',{
            method:'POST',
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              result,
              pointFirst,
              teamFirst,
              pointSecond,
              teamSecond,
              pointThird,
              teamThird,
            })
          })

          if(!res.ok){
            throw new Error("failed to upload the results")
          }else{
            window.location.reload();
          }

        } catch (error) {
          console.log(error); 
        }
        
      };

  return (
    <div>
      <div className='pb-10'>
      <button 
      onClick={()=> {showViewIt()}}
      className='bg-gray-100 rounded w-full flex items-center justify-between p-3 overflow-hidden'>
      <h1 className='font-medium text-xl ml-9'>Upload Additional Result</h1>
      {!showGeneralForm ? 
      <BsFillArrowDownSquareFill className='relative right-10' size={25} />
      : 
      <BsFillArrowUpSquareFill className='relative right-10' size={25} />
      }
      </button>
      {showGeneralForm ?
      
    <form action="" 
        onSubmit={handleSubmit}
         className='flex flex-col p-12 animate-in bg-gray-50 duration-75 '
         >
        

            <div className='grid md:grid-cols-2 md:gap-12 gap-10  pb-10'>       
            <div className="flex flex-col">
                <label htmlFor="">Result</label>
                <input 
                required
                type="text"
                value={result}
                className='w-full border outline-none border-gray-300 rounded p-2 font-medium'
                onChange={(e)=> setResult(e.target.value)}
                />
            </div>

            </div>
            <h1 className=''>First Place</h1>
            <div className='grid grid-cols-2  gap-3 '>
            <div className='flex flex-col'>
                <select 
                required
                id='team'
                name='team'
                value={teamFirst}
                onChange={(e)=>setTeamFirst(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
            </select>
            </div>
            <div className='flex flex-col'>
                <input
                required
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="pointfirst"
                name="pointfirst"
                value={pointFirst}
                onChange={(e)=> setPointFirst(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>
            <h1 className=''>Second Place</h1>
            <div className='grid grid-cols-2  gap-3 '>
            <div className='flex flex-col'>
              <select 
                required
                id="teamSecond"
                name="teamSecond"
                value={teamSecond}
                onChange={(e)=>setTeamSecond(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
            </select>
            </div>
            <div className='flex flex-col'>
                <input
                required
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="pointSecond"
                name="pointSecond"
                value={pointSecond}
                onChange={(e)=> setPointSecond(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>
            <h1 className=''>Third Place</h1>
            <div className='grid grid-cols-2  gap-3 '>
            <div className='flex flex-col'>
                <select 
                required
                id="teamThird"
                name="teamThird"
                value={teamThird}
                onChange={(e)=> setTeamThird(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
            </select>
            </div>
            <div className='flex flex-col'>
                <input
                required
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="pointThird"
                name="pointThird"
                value={pointThird}
                onChange={(e)=> setPointThird(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>

            <button
             type='submit' className='mt-6 w-fit button-green mx-auto px-8 py-2 text-lg text-center text-white bg-teal-900 rounded-md
             hover:bg-teal-950'>Submit</button>
        </form>
    :null}

    </div>
    </div>
  )
}

export default AdditionalResultForm
