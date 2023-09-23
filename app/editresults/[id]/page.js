import React from "react";
import EditResultForm from '@/components/EditResultForm'



async function editresult ({params}) {
    const {id} = params;

    const getResultById = async (id) => {
        try {
            const res = await fetch(`/api/results/${id}`, {
                cache: "no-store"
            });
            if(!res.ok) {
                throw new Error("The Result was not found")
            }
            return res.json();

        } catch (error) {
            console.log(error);
        }
    }
    const results = await getResultById(id);
    const  {result,firstplace,secondplace,thirdplace,pointFirst,pointSecond,pointThird,teamFirst,teamSecond,teamThird,
        category,otherTeam1,otherPlace1,otherPlace2,otherPlace3,otherPlace4,otherPoint1,otherTeam2,otherPoint2,otherTeam3,otherPoint3,otherTeam4,otherPoint4} = {results};

    return(
        <div className='mx-auto p-7 w-full'>
       

        <h1 className='font-semibold italic text-3xl '>
            Type Edited Details Here
        </h1>
      <EditResultForm id={id} result={result} category={category} firstplace={firstplace} secondplace={secondplace} 
      thirdplace={thirdplace} pointFirst={pointFirst} pointSecond={pointSecond} pointThird={pointThird} teamFirst={teamFirst}
       teamSecond={teamSecond} teamThird={teamThird} otherPlace1={otherPlace1} otherPlace2={otherPlace2} otherPlace3={otherPlace3} otherPlace4={otherPlace4}  otherTeam1={otherTeam1} otherTeam2={otherTeam2} otherTeam3={otherTeam3} 
       otherTeam4={otherTeam4} otherPoint1={otherPoint1} otherPoint2={otherPoint2} otherPoint3={otherPoint3} otherPoint4={otherPoint4} />

    </div>
    )
}

export default editresult;