"use client"
import AdditionalResultForm from '@/components/AdditionalResultForm'
import GeneralResultForm from '@/components/GeneralResultForm'
import ResultForm from '@/components/ResultForm'
import ResultsView from '@/components/ResultsView'
import React, { useState } from 'react'
import {BsFillArrowDownSquareFill,BsFillArrowUpSquareFill} from 'react-icons/bs'

function AddResult() {
  const [showAddResult,setShowAddResult] = useState(false)

  const showAddIt = (()=>{
    setShowAddResult(!showAddResult);
  })


  return (
    <div className='flex flex-col mx-auto overflow-auto p-24'>
      <h1 className='font-medium italic text-3xl pb-4'>Add And View Results</h1>
      <div className='w-full pb-8'>
      <button 
      onClick={showAddIt}
      className='bg-gray-100 rounded w-full flex items-center justify-between p-3 overflow-hidden'>
      <h1 className='font-medium text-xl pl-9'>Upload Individual Result</h1>
      {!showAddResult ? 
      <BsFillArrowDownSquareFill className='relative right-10' size={25} />
      : 
      <BsFillArrowUpSquareFill className='relative right-10' size={25} />
      }
      </button>
      {showAddResult ?
      
      <ResultForm />
    : null}
      </div>

      {/* General result component */}
      <div className='w-full'>
      <GeneralResultForm/>
      </div>

      {/* Additional Result */}
      <div className='w-full'>
      <AdditionalResultForm/>
      </div>


      {/* result view component */}
      <div className='w-full'>
      <ResultsView/>
      </div>
    </div>
  )
}

export default AddResult
