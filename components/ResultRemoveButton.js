"use client"
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';

function ResultRemoveButton({id}) {
    const removeThisResult = async () => {
        const confirmed = confirm("Are you sure you want to remove this result?");

        if (confirmed) {
            try {
                const res = await fetch(`/api/results?id=${id}`,{
                    method: 'DELETE',
                })
                if (res.ok) {
                   window.location.reload()
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


  return (
    <button onClick={removeThisResult} className='button p-1.5 hover:bg-gray-200 rounded'>
        <RiDeleteBin6Line size={22}/>
    </button>
  )
}

export default ResultRemoveButton
