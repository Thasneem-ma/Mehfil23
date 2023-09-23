import EditParticipantForm from '@/components/EditParticipantForm'
import React from 'react'


async function editparticipant({params}) {
    const {id} =params;

    const getParticipantsById = async (id)=>{
        try {
            const res = await fetch(`/api/participants/${id}`,{
                cache: "no-store"
            });
            if (!res.ok){
                throw new Error("Failed to fetch participants")
            }
            return res.json();
        } catch (error) {
            console.log(error);
        }
    }

    const participants  = await getParticipantsById(id);
    const {participantName , team , category , participantClassName} = {participants};
  return (
    <div className='mx-auto p-7 w-full'>
       

        <h1 className='font-semibold italic text-3xl '>
            Type Edited Details Here
        </h1>
      <EditParticipantForm id={id} participantName={participantName} participantClassName={participantClassName} category={category} team={team} />

    </div>
  )
}

export default editparticipant
