"use client"
import React, { useEffect, useState } from 'react'
import TeamPointsLoader from './TeamPointsLoader'

function TeamPointDisplay() {
    
    const [finalizedteamPointsDisplay, setTeamPointsDisplay] = useState([]) 
    const [totalPoint, setTotalPoint] = useState(0)
    const [widthForFirst, setWidthForFirst] = useState(0)
    const [widthForSecond, setWidthForSecond] = useState(0)
    const [widthForThird, setWidthForThird] = useState(0)
    
    
    const getTeamPoints = async()=>{
        try {
            await new Promise(resolve=> setTimeout(resolve,3000))
            const fetchedpoints = await fetch("/api/teampoint",{
                cache: "no-store"
            })
            if(!fetchedpoints){
                console.log("Something went wrong when fetching team points");
            }
            const fetched = await fetchedpoints.json()
            setTeamPointsDisplay(fetched.dBFinalizedTeamPoints)

        } catch (error) {
            console.log(error);
        }
    }

        const calculateTotalPoints = ()=>{
        if(finalizedteamPointsDisplay.length > 0){
          let total = 0;
          finalizedteamPointsDisplay.forEach((points)=>{
            total += points.pointforfirst + points.pointforsecond + points.pointforthird
          })
          setTotalPoint(total);
        }}

        const calculateWidth = ()=>{
            if(totalPoint > 0){
                let firstWidth = 0;
                let secondWidth = 0;
                let thirdWidth = 0;

                // width for first
            finalizedteamPointsDisplay.forEach((points)=>{
            const nonPercentagedWidthFirst = (points.pointforfirst / totalPoint) * 100;
            const nonPercentagedWidthSecond = (points.pointforsecond / totalPoint) * 100;
            const nonPercentagedWidthThird = (points.pointforthird / totalPoint) * 100;

            firstWidth += nonPercentagedWidthFirst;
            secondWidth += nonPercentagedWidthSecond;
            thirdWidth += nonPercentagedWidthThird;
        });

        setWidthForFirst(firstWidth);
        setWidthForSecond(secondWidth);
        setWidthForThird(thirdWidth);
        

            }
        }

    useEffect(()=>{
        getTeamPoints();
    },[])

    useEffect(()=>{
        calculateTotalPoints();
    },[finalizedteamPointsDisplay])

    useEffect(()=>{
        calculateWidth();
    },[totalPoint])

  return (
    <div className='flex flex-col mx-auto items-center py-14 w-full '>
     <h1 className='text-3xl font-semibold'>Team Status</h1>

     <TeamPointsLoader/>
    </div>
  )
}

export default TeamPointDisplay
