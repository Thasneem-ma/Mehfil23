"use client"
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';

function EditResultForm({
    result,
    id,
    category,
    firstplace,
    pointFirst,
    teamFirst ,
    secondplace,
    pointSecond,
    teamSecond ,
    thirdplace,
    pointThird,
    teamThird ,
    otherPlace1,
    otherPlace2,
    otherPlace3,
    otherPlace4,
    otherTeam1 ,
    otherPoint1 ,
    otherTeam2 ,
    otherPoint2 ,
    otherTeam3 ,
    otherPoint3 ,
    otherTeam4 ,
    otherPoint4 ,
}) {
    const [newresult , setNewResult] = useState('');
    const [newfirstplace , setNewFirstplace] = useState('');
    const [newsecondplace , setNewSecondplace] = useState('');
    const [newthirdplace , setNewThirdplace] = useState('');
    const [newpointFirst , setNewPointFirst] = useState()
    const [newpointSecond , setNewPointSecond] = useState()
    const [newpointThird , setNewPointThird] = useState()
    const [newteamFirst , setNewTeamFirst] = useState('');
    const [newteamSecond , setNewTeamSecond] = useState('');
    const [newteamThird , setNewTeamThird] = useState('');
    const [newcategory , setNewCategory] = useState('');
    const [newotherPlace1 , setNewOtherPlace1] = useState()
    const [newotherPlace2 , setNewOtherPlace2] = useState()
    const [newotherPlace3 , setNewOtherPlace3] = useState()
    const [newotherPlace4 , setNewOtherPlace4] = useState()
    const [newotherPoint1 , setNewOtherPoint1] = useState()
    const [newotherPoint2 , setNewOtherPoint2] = useState()
    const [newotherPoint3 , setNewOtherPoint3] = useState()
    const [newotherPoint4 , setNewOtherPoint4] = useState()
    const [newotherTeam1 , setNewOtherTeam1] = useState()
    const [newotherTeam2 , setNewOtherTeam2] = useState()
    const [newotherTeam3 , setNewOtherTeam3] = useState()
    const [newotherTeam4 , setNewOtherTeam4] = useState()
    const [names, setNames] = useState([])
    const router = useRouter()

    const getNames = async()=> {
        try {
          const fetchedNames = await fetch("/api/participants",{
            cache: "no-store",
          })
    
          if(!fetchedNames.ok){
            throw new Error("Failed to get datas")
          }
    
          const fetchedNameDatas = await fetchedNames.json();
    
          setNames(fetchedNameDatas.names);
    
        } catch (error) {
          console.log(error);
        }
      }
    
    
        const filteredNames = names.filter(name => {
          return newcategory === '' || name.category === newcategory;
        });
        useEffect(()=>{
            getNames();
          },[newcategory]);
        

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/results/${id}`,{
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({newresult ,
                    newfirstplace ,
                    newsecondplace ,
                    newthirdplace ,
                    newpointFirst ,
                    newpointSecond ,
                    newpointThird ,
                    newteamFirst ,
                    newteamSecond ,
                    newteamThird ,
                    newcategory ,
                    newotherPlace1,
                    newotherPlace2,
                    newotherPlace3,
                    newotherPlace4,
                    newotherPoint1 ,
                    newotherPoint2 ,
                    newotherPoint3 ,
                    newotherPoint4 ,
                    newotherTeam1 ,
                    newotherTeam2 ,
                    newotherTeam3 ,
                    newotherTeam4 ,})
            })

            if(!res.ok){
                throw new Error("failed to edit the result")
            }

            router.push("/addresult")

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form action="" 
    onSubmit={handleSubmit}
         className='flex flex-col p-12 animate-in bg-gray-50 duration-75 '
         >
            <div className='grid md:grid-cols-2 md:gap-12 gap-10  pb-10'>
            <div className='flex flex-col'>
                <label htmlFor="Category">Category</label>
                <select 
                required
                id="category"
                name="category"
                value={newcategory}
                onChange={(e)=> setNewCategory(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option value="" className=''>Select a Category</option>
                    <option value="Y Zone" className=''>Y Zone</option>
                    <option value="C Zone" className=''>C Zone</option>
                    <option value="B Zone" className=''>B Zone</option>
            </select>
            </div>           
            <div className="flex flex-col">
                <label htmlFor="">Result</label>
                <input 
                required
                type="text"
                value={newresult}
                className='w-full border outline-none border-gray-300 rounded p-2 font-medium'
                onChange={(e)=> setNewResult(e.target.value)}
                />
            </div>

            </div>
            <h1 className=''>First Place</h1>
            <div className='grid grid-cols-3  gap-3 '>
            <div className='flex flex-col'>
              <select 
              required
              id="firstplace"
              name="firstplace"
              value={newfirstplace}
              onChange={(e)=> setNewFirstplace(e.target.value)}
              className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participantName</option>
                {newcategory  ? 
                <>
                {filteredNames.map((par)=>(
                  <option key={par._id} value={par.participantName}>{par.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
                </select>
                    
                    
            </div>
            <div className='flex flex-col'>
                <select 
                required
                id='team'
                name='team'
                value={newteamFirst}
                onChange={(e)=>setNewTeamFirst(e.target.value)}
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
                value={newpointFirst}
                onChange={(e)=> setNewPointFirst(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>
            <h1 className=''>Second Place</h1>
            <div className='grid grid-cols-3  gap-3 '>
            <div className=''>
                <select 
                required
                id="secondPlace"
                name="secondPlace"
                value={newsecondplace}
                onChange={(e)=>setNewSecondplace(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
            </select>
            </div>
            <div className='flex flex-col'>
              <select 
                required
                id="teamSecond"
                name="teamSecond"
                value={newteamSecond}
                onChange={(e)=>setNewTeamSecond(e.target.value)}
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
                value={newpointSecond}
                onChange={(e)=> setNewPointSecond(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>
            <h1 className=''>Third Place</h1>
            <div className='grid grid-cols-3  gap-3 '>
            <div className='flex flex-col'>
                <select 
                required
                id="thirdplace"
                name="thirdplace"
                value={newthirdplace}
                onChange={(e)=> setNewThirdplace(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participantName</option>
                   {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category First</option>}
            </select>
            </div>
            <div className='flex flex-col'>
                <select 
                required
                id="teamThird"
                name="teamThird"
                value={newteamThird}
                onChange={(e)=> setNewTeamThird(e.target.value)}
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
                value={newpointThird}
                onChange={(e)=> setNewPointThird(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
            </input>
            </div>
            </div>
            {/* other Points */}
            <div className='pt-8'>

            <button
            className='p-2 button bg-black text-white rounded font-medium flex items-center'>
              Other Points
              <AiOutlinePlusCircle size={20} />
            </button>
            <div className='flex pt-4 gap-2'>
            <div className=''>
                <select 
                id="otherP1"
                name="otherP1"
                value={newotherPlace1}
                onChange={(e)=>setNewOtherPlace1(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
            </select>
            </div>
              <select 
                id="otherTeam1"
                name="otherTeam1"
                value={newotherTeam1}
                onChange={(e)=> setNewOtherTeam1(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
              </select>
              <input
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="otherPoint1"
                name="otherPoint1"
                value={newotherPoint1}
                onChange={(e)=> setNewOtherPoint1(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <div className=''>
                <select 
                id="otherP2"
                name="otherP2"
                value={newotherPlace2}
                onChange={(e)=>setNewOtherPlace2(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
            </select>
            </div>
              <select 
                id="otherTeam2"
                name="otherTeam2"
                value={newotherTeam2}
                onChange={(e)=> setNewOtherTeam2(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
              </select>
              <input
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="otherPoint2"
                name="otherPoint2"
                value={newotherPoint2}
                onChange={(e)=> setNewOtherPoint2(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <div className=''>
                <select 
                id="otherP3"
                name="otherP3"
                value={newotherPlace3}
                onChange={(e)=>setNewOtherPlace3(e.target.value)}
                className=" border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
            </select>
            </div>
              <select 
                id="otherTeam3"
                name="otherTeam3"
                value={newotherTeam3}
                onChange={(e)=> setNewOtherTeam3(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
              </select>
              <input
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="otherPoint3"
                name="otherPoint3"
                value={newotherPoint3}
                onChange={(e)=> setNewOtherPoint3(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <div className=''>
                <select 
                id="otherP4"
                name="otherP4"
                value={newotherPlace4}
                onChange={(e)=>setNewOtherPlace4(e.target.value)}
                className=" border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {newcategory  ? 
                <>
                {filteredNames.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
            </select>
            </div>
              <select 
                id="otherTeam4"
                name="otherTeam4"
                value={newotherTeam4}
                onChange={(e)=> setNewOtherTeam4(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a Team</option>
                    <option value="LEGACY LEGENDS" className=''>LEGACY LEGENDS</option>
                    <option value="TRADITIONAL TRACKERS" className=''>TRADITIONAL TRACKERS</option>
                    <option value="ANCIENT ALLIANCE" className=''>ANCIENT ALLIANCE</option>
              </select>
              <input
                placeholder='Enter the Point'
                type='number'
                inputMode='numeric'
                id="otherPoint4"
                name="otherPoint4"
                value={newotherPoint4}
                onChange={(e)=> setNewOtherPoint4(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            
            </div>
            <button
             type='submit' className='mt-6 w-fit button-green mx-auto px-8 py-2 text-lg text-center text-white bg-teal-900 rounded-md
             hover:bg-teal-950'>Submit</button>
        </form>
  )
}

export default EditResultForm
