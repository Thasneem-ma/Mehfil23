import React, { useEffect, useState } from 'react'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'
import {TbEdit} from 'react-icons/tb'
import Link from 'next/link'
import RemoveButton from './RemoveButton'




function  EditOrView() {
    const [participantDetailShow,setParticipantDetailShow] = useState(false)
    const [datas,setDatas] = useState([])
    const [filter,setFilter] = useState('All')

    const arrowChangeDetail = (event)=>{
        setParticipantDetailShow(!participantDetailShow)
    }

    // fetching datas from mongodb
const  getDatas = async () => {
    try{
        const fetchedDatas = await fetch("/api/participants", {
            cache: "no-store",
        })

        if(!fetchedDatas.ok){
            throw new Error("Failed to get datas")
        }
        const parsedData = await fetchedDatas.json();
        setDatas(parsedData.names);
        
        
    }catch(error){
        console.log("error loading datas", error);
    }
};
    
    useEffect(()=>{
        getDatas();
    },[]);
    
    const filteredParticipants = () => {
        if (filter === 'All'){
          return datas;
        }else if (filter === 'Y Zone'){
          return datas.filter(r => r.category === 'Y Zone');
        }else if (filter === 'C Zone'){
          return datas.filter(r => r.category === 'C Zone');
        }else if (filter === 'B Zone'){
          return datas.filter(r => r.category === 'B Zone');
        }
      }

  return (
    <div>
      <button className='flex w-full bg-gray-100 flex-shrink p-4 justify-between text-lg' onClick={() => {arrowChangeDetail(); }}>View Participants 
            {participantDetailShow ? <BsFillArrowUpSquareFill className='text-3xl md:mr-12'/> : <BsFillArrowDownSquareFill className='text-3xl md:mr-12'/> }
        </button>
        {participantDetailShow ? 
        <div className=''>
            
{datas  ? <div className='bg-gray-50 p-6 space-y-5 animate-in'>
<select 
            className='p-2 rounded outline-none shadow-lg border-2 bg-black text-white border-gray-200 border-spacing-9'
            name=""
            id=""
            value={filter}
            onChange={(e)=> setFilter(e.target.value)}
            >
        <option value="All">All</option>
        <option value="Y Zone">Y Zone</option>
        <option value="C Zone">C Zone</option>
        <option value="B Zone">B Zone</option>
      </select>
{filteredParticipants().map((d,i)=>(
    
   <div className='flex flex-row  gap-6 items-center' key={i}>
       <div className=' w-10'>

   <h1>{i +1}</h1>
       </div>
       <div className=' w-full'>
           <h1 className='font-medium'>{d.participantName}</h1>
       </div>
       <div className=' w-full'> 
           <h1 >{d.participantClassName}</h1>
       </div>
       <div className=' w-full'>
           <h1>{d.team}</h1>
       </div>
       <div className=' w-full'>
           <h1>{d.category}</h1>
       </div>

       <div className='flex mr-10 gap-3'>
           <Link href={`/editparticipants/${d._id}`} className='button p-1.5 hover:bg-gray-200 rounded'>
           <TbEdit size={22}/>
           </Link>

           <RemoveButton  id={d._id}/>
       </div>
   </div>
))}
       
  
   </div> : <h1>There are no Participants Updated</h1>}

        
    </div>
    : null}
        
            
    </div>
  )
}

export default EditOrView
