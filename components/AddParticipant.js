"use client"
import React , {  useState } from 'react'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'

function AddParticipant() {
    // const [participantStore,setParticipantStore] = useState([])
    const [participantDetailShow,setParticipantDetailShow] = useState(false)
    const [participantShow,setParticipantShow] = useState(false)
    const [participantName,setParticipantName] = useState('')
    const [participantClassName,setParticipantClassName] = useState('')
    const [category,setCategory] = useState('')
    const [team,setTeam] = useState('')


    const arrowChange = (event)=>{
        setParticipantShow(!participantShow)
    }
    const handleSubmit = async(event)=>{
        try {
            const res = await fetch("/api/participants",{
                method: "POST",
                headers: {
                    "content-type": "application/json",
            },
            body: JSON.stringify({participantName , team , participantClassName , category})
        });

        if(!res.ok) {
            throw new Error ("Failed to create participants")
        }else{
            throw new alert("created successfully")
        }
        } catch (error) {
          console.log(error);  
        }
    }


  return (
    <div className=''>
        <div className='flex pb-6 px-4 '>
            <h1 className='text-3xl font-semibold'>Add Participants</h1>
        </div>
        <button className='flex w-full bg-gray-100 flex-shrink p-4 justify-between text-lg' onClick={arrowChange}>Add Participant 
            {participantShow ? <BsFillArrowUpSquareFill className='text-3xl md:mr-12'/> : <BsFillArrowDownSquareFill className='text-3xl md:mr-12'/> }
        </button>
        {participantShow ? <form action="" 
        onSubmit={handleSubmit}
         className='flex flex-col pb-8 animate-in bg-gray-50 duration-75'
         >
            <div className='grid md:grid-cols-2 md:gap-12 p-5 gap-10 px-12'>

           
            <div className=' flex flex-col'>
                <label htmlFor="Name">Full Name</label>
                <input 
                required
                type="text" 
                id='ParticipantName'
                className='p-2 '
                value={participantName}
                onChange={(e)=> setParticipantName(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="Class">Class</label>
                <select 
                required
                id="Class"
                value={participantClassName}
                onChange={(e)=> setParticipantClassName(e.target.value)}
                name="ClassName"
                className="w-full border border-gray-300 rounded p-2 font-medium ">
                    <option value="" className=''>Select a Class</option>
                    <option value="1" className=''>1</option>
                    <option value="2" className=''>2</option>
                    <option value="3" className=''>3</option>
                    <option value="4" className=''>4</option>
                    <option value="5" className=''>5</option>
                    <option value="6" className=''>6</option>
                    <option value="7" className=''>7</option>
                    <option value="8" className=''>8</option>
                    <option value="9" className=''>9</option>
            </select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="Category">Category</label>
                <select 
                required
                id="category"
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 font-medium ">
                    <option value="" className=''>Select a Category</option>
                    <option value="Y Zone" className=''>Y Zone</option>
                    <option value="C Zone" className=''>C Zone</option>
                    <option value="B Zone" className=''>B Zone</option>
            </select>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="Team">Team</label>
                <select 
                required
                id="category"
                value={team}
                onChange={(e)=> setTeam(e.target.value)}
                name="category"
                className="w-full border border-gray-300 rounded p-2 font-medium ">
                    <option value="" className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
            </select>
            </div>
            </div>
            <button
             type='submit' className='mt-6 w-fit mx-auto px-8 py-2 text-lg text-center text-white bg-teal-900 rounded-md
             hover:bg-teal-950'>Submit</button>
        </form> : null}
        
        </div>
  )
}

export default AddParticipant
