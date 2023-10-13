import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from 'react-icons/bs';


function GeneralResultForm() {
    const [result , setResult] = useState('');
    const [firstplace , setFirstplace] = useState('');
    const [secondplace , setSecondplace] = useState('');
    const [thirdplace , setThirdplace] = useState('');
    const [pointFirst , setPointFirst] = useState()
    const [pointSecond , setPointSecond] = useState()
    const [pointThird , setPointThird] = useState()
    const [teamFirst , setTeamFirst] = useState('');
    const [teamSecond , setTeamSecond] = useState('');
    const [teamThird , setTeamThird] = useState('');
    const [category , setCategory] = useState('');
    const [otherPlace1 , setOtherPlace1] = useState()
    const [otherPlace2 , setOtherPlace2] = useState()
    const [otherPlace3 , setOtherPlace3] = useState()
    const [otherPlace4 , setOtherPlace4] = useState()
    const [otherPoint1 , setOtherPoint1] = useState()
    const [otherPoint2 , setOtherPoint2] = useState()
    const [otherPoint3 , setOtherPoint3] = useState()
    const [otherPoint4 , setOtherPoint4] = useState()
    const [otherTeam1 , setOtherTeam1] = useState()
    const [otherTeam2 , setOtherTeam2] = useState()
    const [otherTeam3 , setOtherTeam3] = useState()
    const [otherTeam4 , setOtherTeam4] = useState()
    const [showGeneralForm, setGeneralForm] = useState(false)
    const [addIndividualPoint, setAddIndividualPoint] = useState(true)
    const [names , setNames] = useState([]);
  
    const router = useRouter();


    const handleRadioChange = (event) => {
      const value = event.target.value === 'addIndividualPoint';
      setAddIndividualPoint(value);
    };

    const showViewIt = (()=>{
      setGeneralForm(!showGeneralForm);
    })
  
  // getting names from database
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
  
  
      
      useEffect(()=>{
        getNames();
      },[category]);
  
  
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
            category,
            addIndividualPoint,
            firstplace,
            pointFirst,
            teamFirst,
            secondplace,
            pointSecond,
            teamSecond,
            thirdplace,
            pointThird,
            teamThird,
            otherPlace1,
            otherPlace2,
            otherPlace3,
            otherPlace4,
            otherTeam1,otherPoint1,otherTeam2,otherPoint2,otherTeam3,otherPoint3,otherTeam4,otherPoint4,
          })
        })
        if(!res.ok){
          throw new Error("failed to upload the results")
        }else{
          window.location.reload()
        }
      } catch (error) {
        console.log(error); 
      }
      
    };
      
    return (
    <div className='pb-10'>
      <button 
      onClick={()=> {showViewIt()}}
      className='bg-gray-100 rounded w-full flex items-center justify-between p-3 overflow-hidden'>
      <h1 className='font-medium text-xl ml-9'>Upload General Result</h1>
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
          <div className='pb-4 space-x-5'>

          <label>
        <input
        required
          type="radio"
          value="addIndividualPoint"
          checked={addIndividualPoint}
          onChange={handleRadioChange}
        />
        Add Individual Point
      </label>
      <label>
        <input
        required
          type="radio"
          value="dontAddIndividualPoint"
          checked={!addIndividualPoint}
          onChange={handleRadioChange}
        />
        Do not Add Individual Point
      </label>
      </div>

            <div className='grid md:grid-cols-2 md:gap-12 gap-10  pb-10'>
            <div className='flex flex-col'>
                <label htmlFor="Category">Category</label>
                <select 
                required
                id="category"
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option value="" className=''>Select a Category</option>
                    <option value="General" className=''>General</option>
            </select>
            </div>           
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
            <div className='grid grid-cols-3  gap-3 '>
            <div className='flex flex-col'>
              <select 
              required
              id="firstplace"
              name="firstplace"
              value={firstplace}
              onChange={(e)=> setFirstplace(e.target.value)}
              className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participantName</option>
                {category  ? 
                <>
                {names.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
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
            <div className='grid grid-cols-3  gap-3 '>
            <div className='flex flex-col'>
                <select 
                required
                id="secondPlace"
                name="secondPlace"
                value={secondplace}
                onChange={(e)=>setSecondplace(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {category  ? 
                <>
                {names.map((name)=>(
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
            <div className='grid grid-cols-3  gap-3 '>
            <div className='flex flex-col'>
                <select 
                required
                id="thirdplace"
                name="thirdplace"
                value={thirdplace}
                onChange={(e)=> setThirdplace(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participantName</option>
                   
                {names.map((name)=>(
                  
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                
            </select>
            </div>
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
            {/* other Points */}
            <div className='pt-8'>

            <button
            className='p-2 button bg-black text-white rounded font-medium flex items-center'>
              Other Points
              <AiOutlinePlusCircle size={20} />
            </button>
            <div className='flex pt-4 gap-2'>
            <select 
                id="otherP1"
                name="otherP1"
                value={otherPlace1}
                onChange={(e)=>setOtherPlace1(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {category  ? 
                <>
                {names.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
                </select>
              <select 
                id="otherTeam1"
                name="otherTeam1"
                value={otherTeam1}
                onChange={(e)=> setOtherTeam1(e.target.value)}
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
                value={otherPoint1}
                onChange={(e)=> setOtherPoint1(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <select 
                id="otherP2"
                name="otherP2"
                value={otherPlace2}
                onChange={(e)=>setOtherPlace2(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {category  ? 
                <>
                {names.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
                </select>
              <select 
                id="otherTeam2"
                name="otherTeam2"
                value={otherTeam2}
                onChange={(e)=> setOtherTeam2(e.target.value)}
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
                value={otherPoint2}
                onChange={(e)=> setOtherPoint2(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <select 
                id="otherP3"
                name="otherP3"
                value={otherPlace3}
                onChange={(e)=>setOtherPlace3(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {category  ? 
                <>
                {names.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
                </select>
              <select 
                id="otherTeam3"
                name="otherTeam3"
                value={otherTeam3}
                onChange={(e)=> setOtherTeam3(e.target.value)}
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
                value={otherPoint3}
                onChange={(e)=> setOtherPoint3(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded p-2 font-medium ">
              </input>
            </div>
            <div className='flex pt-4 gap-2'>
            <select 
                id="otherP4"
                name="otherP4"
                value={otherPlace4}
                onChange={(e)=>setOtherPlace4(e.target.value)}
                className="border outline-none border-gray-300 rounded p-2 font-medium ">
                    <option className=''>Select a participant</option>
                    {category  ? 
                <>
                {names.map((name)=>(
                  <option key={name._id} value={name.participantName}>{name.participantName}</option>
                  ))}
                </>
                :<option value="" >Select category</option>}
                </select>
              <select 
                id="otherTeam4"
                name="otherTeam4"
                value={otherTeam4}
                onChange={(e)=> setOtherTeam4(e.target.value)}
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
                value={otherPoint4}
                onChange={(e)=> setOtherPoint4(e.target.value)}
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
  )
}

export default GeneralResultForm
