import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'
import { TbEdit } from 'react-icons/tb'
import ResultRemoveButton from './ResultRemoveButton'



function ResultsView() {
  const [results,setResults] = useState([])
  const [showViewResult,setShowViewResult] = useState(false)
  const [filter,setFilter] = useState('All')


  const showViewIt = (()=>{
    setShowViewResult(!showViewResult);
  })

  const getDatas = async()=>{
  try {
    const fetchedDatas = await fetch("/api/results",{
      cache: "no-store",
    })
    if(!fetchedDatas.ok){
      throw new Error("Failed to fetch results")
    }

    const parsedData = await fetchedDatas.json()
    setResults(parsedData.allIndividualResults)

  } catch (error) {
    console.log("error loading results " ,error);
  }
}

  useEffect(()=>{
    getDatas()
  },[]);


  const filteredResults = () => {
    if (filter === 'All'){
      return results;
    }else if (filter === 'Y Zone'){
      return results.filter(r => r.category === 'Y Zone');
    }else if (filter === 'C Zone'){
      return results.filter(r => r.category === 'C Zone');
    }else if (filter === 'B Zone'){
      return results.filter(r => r.category === 'B Zone');
    }else if (filter === 'General'){
      return results.filter(r => r.category === 'General');
    }
  }

  return (
    <>
    <button 
      onClick={()=> {showViewIt()}}
      className='bg-gray-100 rounded w-full flex items-center justify-between p-3 overflow-hidden'>
      <h1 className='font-medium text-xl ml-9'>View Result</h1>
      {!showViewResult ? 
      <BsFillArrowDownSquareFill className='relative right-10' size={25} />
      : 
      <BsFillArrowUpSquareFill className='relative right-10' size={25} />
      }
      </button>
      {showViewResult ? 
      <div className='bg-gray-50 p-12 space-y-5 animate-in'>
        <select 
      className='p-2 rounded outline-none'
      name=""
      id=""
      value={filter}
      onChange={(e)=> setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Y Zone">Y Zone</option>
        <option value="C Zone">C Zone</option>
        <option value="B Zone">B Zone</option>
        <option value="General">General</option>
      </select>
      <div>
  {filteredResults().map((d,i)=>(
  <div className='pb-7' key={i}>
   <div className='pb-1' key={i}>
    <div className=''>
       <div className='flex gap-x-2 text-lg'>
        <h1 className='font-semibold text-lg'>Result</h1>
        <h1>{i +1}</h1>
       </div>
       <div className='flex items-center space-x-2'>
       <h1 className='font-medium text-sm '>{d.result}</h1>
        <h1 className='text-sm'>{d.category}</h1>
       </div>
    </div>
       {/* result */}
       <div className='flex flex-col items-start space-x-3 pt-4'>
        <div className='flex w-full justify-between'>
          <div className='flex space-x-3'>
        {/* first Prize */}
        <div className=' flex gap-1.5 items-center'>
       
           <h1 className='font-semibold text-lg'>{d.firstplace}</h1>
           <h1 className='font-medium '>{d.teamFirst}</h1>
           <h1 className='text-sm' >{d.pointFirst + "pts"}</h1>
       
       </div>
        {/* Second Prize */}
        <div className=' flex gap-1.5 items-center'>
       
          <h1 className='font-semibold text-lg'>{d.secondplace}</h1>
          <h1 className='font-medium '>{d.teamSecond}</h1>
          <h1 className='text-sm' >{d.pointSecond + "pts"}</h1>
       </div>
        {/* third Prize */}
        <div className=' flex gap-1.5 items-center'>
       
           <h1 className='font-semibold text-lg'>{d.thirdplace}</h1>
           <h1 className='font-medium '>{d.teamThird}</h1>
           <h1 className='text-sm' >{d.pointThird + "pts"}</h1>
       
       </div>
       </div>
       <div className='flex mr-10 gap-3'>
           <Link target='_blank' href={`/editresults/${d._id}`} className='button p-1.5 hover:bg-gray-200 rounded'>
            <TbEdit size={22}/>
           </Link>

           <ResultRemoveButton  id={d._id}/>
       </div>
       </div>
       {/* other Points */}
       <div className='text-sm'>
        <div className='flex gap-3 justify-between '>
        <h1>{d.otherTeam1}</h1>
        <h1 className='text-sm'>{d.otherPoint1}</h1>
        </div>
        <div className='flex gap-3 justify-between'>
        <h1>{d.otherTeam2}</h1>
        <h1 className='text-sm'>{d.otherPoint2}</h1>
        </div>
        <div className='flex gap-3 justify-between'>
        <h1>{d.otherTeam3}</h1>
        <h1 className='text-sm'>{d.otherPoint3}</h1>
        </div>
        <div className='flex gap-3 justify-between'>
        <h1>{d.otherTeam4}</h1>
        <h1 className='text-sm'>{d.otherPoint4}</h1>
        </div>
       </div>
       
       </div> 
   </div>
   <div className="bg-gray-200 w-full h-0.5"></div>
   </div>
))}
   
      </div>
   </div>
      : null}
   </>
  )
}

export default ResultsView
