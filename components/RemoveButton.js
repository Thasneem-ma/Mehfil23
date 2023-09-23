"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

function RemoveButton({id}) {
    const router = useRouter()
    const removeThisParticipant = async () =>{
        const confirmed = confirm("Are you sure you want to remove this participant");

        if (confirmed) {
            const res = await fetch(`/api/participants?id=${id}`,{
                method: 'DELETE',
            });

            if(res.ok) {
            router.refresh();
            }
        }
    }

  return (
    <button onClick={removeThisParticipant} className='button p-1.5 hover:bg-gray-200 rounded'>
        <RiDeleteBin6Line size={22}/>
    </button>
  )
}

export default RemoveButton
