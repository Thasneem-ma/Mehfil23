"use client"
import React, { useEffect, useState } from 'react'


function Result() {
  const [results , setResults] = useState([])
  const [filter,setFilter] = useState('All')


  const getResults = async()=> {
    try {
      const fetchedResults = await fetch("/api/results",{
        cache: "no-store",
      })

      if(!fetchedResults.ok){
        throw new Error("Failed to get datas")
      }

      const fetchedResultsDatas = await fetchedResults.json();
      setResults(fetchedResultsDatas.allIndividualResults);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getResults();
  },[])

  


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
    <div className='bg-fixed bgresult w-full h-[100vh] overflow-scroll bg-teal-50'>
      <div className='flex justify-between px-[9%] md:pt-52 pt-40 pb-6'>
      <h1 className='font-semibold text-4xl'>Results</h1>
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
      </div>
      <div className='space-y-7 pb-12'>
        {!results.length == 0 ? 
        filteredResults().map((r,i)=>(
        <div key={i} className='bg-gray-50 w-[85%] mx-auto p-8 md:p-10 md:px-16 rounded-xl shadow-lg
         flex flex-col-reverse md:flex-row items-start md:justify-between'>
        {/* info Line */}
        <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-20 md:items-end w-fit'>
          {/* first */}
          <div className='flex space-x-1 md:space-x-2 items-end md:items-center'>
            <div className='w-7'>
            <h1 className='text-4xl md:text-6xl'>1</h1>
            </div>
            <div className='-space-y-1 md:-space-y-2 flex flex-col w-full relative -top-0.5'>
              <h1 className='font-bold md:text-lg'>{r.firstplace}</h1>
              <h1 className='md:text-base text-xs'>{r.teamFirst}</h1>
            </div>
          </div>
          {/* Second */}
          <div className='flex space-x-1.5 md:space-x-2 items-end md:items-center'>
          <div className='w-7'>
            <h1 className='text-4xl md:text-6xl '>2</h1>
            </div>
            <div className='-space-y-1.5 md:-space-y-2 flex flex-col w-full relative -top-0.5'>
              <h1 className='font-bold md:text-lg'>{r.secondplace}</h1>
              <h1 className='md:text-base text-sm'>{r.teamSecond}</h1>
            </div>
          </div>

          {/* third */}
          <div className='flex space-x-1 md:space-x-2 items-end md:items-center'>
          <div className='w-7'>
            <h1 className='text-4xl md:text-6xl'>3</h1>
            </div>
            <div className='-space-y-1.5 md:-space-y-2 flex flex-col w-full -top-0.5'>
              <h1 className='font-bold md:text-lg '>{r.thirdplace}</h1>
              <h1 className='md:text-base text-sm'>{r.teamThird}</h1>
            </div>
          </div>
        </div>
        <div className='md:w-fit w-full pb-2'>
        <div className='flex items-end justify-between md:flex-col text-start md:text-end
        pb-3 md:pb-0 -space-y-1'>
        <h1 className='font-semibold'>{r.result}</h1>
        <h1>{r.category}</h1>
        </div>
        <div className='bg-gray-200 w-full h-0.5 md:hidden relative -top-2'></div>
        </div>
      </div>
      ))
        : <h1 className='italic bg-gray-100 w-[90%] mx-auto p-5'>Results are not Uploaded yet</h1>}
      
      
      
      </div>
      {!results.length == 0 ? 
      <div className='justify-center text-center pb-4 hover:cursor-pointer'>
        <h1 className='text-sm font-medium'>Published by</h1>
        <h1 className='text-xs'>Standing Committee</h1>
        <div  className='mx-auto w-36 h-0.5 bg-teal-900 relative top-1'></div>
      </div>
      : null }
      
    </div>
  )
}

export default Result
