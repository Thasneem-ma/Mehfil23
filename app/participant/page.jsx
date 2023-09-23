"use client"
import React from 'react'
import EditOrView from '@/components/EditOrView'
import AddParticipant from '@/components/AddParticipant'


function Participant() {
    
    
  return (
    <div className='w-full space-y-8 py-20 md:px-36 px-16'>
        {/* Add */}
        
        <AddParticipant/>

        {/* Edit or View */}
        <div>
        <EditOrView/>
            
        </div>
      
    </div>
  )
}

export default Participant
