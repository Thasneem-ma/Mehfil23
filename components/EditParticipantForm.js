"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function EditParticipantForm({id , participantName, participantClassName, team , category}) {

    const [newparticipantName, setNewparticipantName] = useState(participantName)
    const [newparticipantClassName, setNewparticipantClassName] = useState(participantClassName)
    const [newcategory, setNewCategory] = useState(category)
    const [newteam, setNewTeam] = useState(team)
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/participants/${id}`,{
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({newparticipantName,newparticipantClassName,newcategory,newteam}),
            });

            if (!res.ok){
                throw new Error("Failed to Update Participant")
            }
            router.push("/addresult")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form action="" 
    onSubmit={handleSubmit}
    className='flex flex-col pb-8 bg-gray-50 duration-75'
         >
            <div className='grid md:grid-cols-2 md:gap-12 p-5 gap-10 px-12'>

           
            <div className=' flex flex-col'>
                <label htmlFor="Name">Full Name</label>
                <input 
                required
                value={newparticipantName}
                onChange={(e)=> setNewparticipantName(e.target.value)}
                type="text" 
                placeholder='Type The Upadated Name'
                id='ParticipantName'
                className='p-2 '
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="Class">Class</label>
                <select 
                required
                value={newparticipantClassName}
                onChange={(e)=> setNewparticipantClassName(e.target.value)}
                id="Class"
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
                value={newcategory}
                onChange={(e)=> setNewCategory(e.target.value)}
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
                value={newteam}
                onChange={(e)=> setNewTeam(e.target.value)}
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
        </form>
  )
}

export default EditParticipantForm
