"use client"
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

function TeamPointsCalculate() {
  const [results , setResults] = useState([])
  const [teamPoints, setTeamPoints] = useState([])
  const [sortedTeamPoints,setSortedTeamPoints] = useState([])
  const [sortedDisplayTeamPoints,setSortedDisplayTeamPoints] = useState({})
  const router = useRouter()
  


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

 
  const calculateTeamPoints = () => {
    const teamPoints = {};

    results.forEach(result => {
      const { pointFirst, pointSecond, pointThird, teamFirst, teamSecond, teamThird , otherTeam1 , otherPoint1 , otherTeam2 , otherPoint2,
      otherTeam3 , otherPoint3 , otherTeam4 , otherPoint4 } = result;

      // Update points for teamFirst
      if (pointFirst && teamFirst) {
        teamPoints[teamFirst] = (teamPoints[teamFirst] || 0) + pointFirst;
      }

      // Update points for teamSecond
      if (pointSecond && teamSecond) {
        teamPoints[teamSecond] = (teamPoints[teamSecond] || 0) + pointSecond;
      }

      // Update points for teamThird
      if (pointThird && teamThird) {
        teamPoints[teamThird] = (teamPoints[teamThird] || 0) + pointThird;
      }

      // calculation of other points
      if (otherPoint1 && otherTeam1) {
        teamPoints[otherTeam1] = (teamPoints[otherTeam1] || 0) + otherPoint1;
      }
      if (otherPoint2 && otherTeam2) {
        teamPoints[otherTeam2] = (teamPoints[otherTeam2] || 0) + otherPoint2;
      }
      if (otherPoint3 && otherTeam3) {
        teamPoints[otherTeam3] = (teamPoints[otherTeam3] || 0) + otherPoint3;
      }
      if (otherPoint4 && otherTeam4) {
        teamPoints[otherTeam4] = (teamPoints[otherTeam4] || 0) + otherPoint4;
      }
    });

    const sortedTeamPoints = Object.entries(teamPoints)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [team, points]) => {
        acc[team] = points;
        return acc;
      }, {});
      setSortedTeamPoints(sortedTeamPoints);
  }


  useEffect(()=>{
    getResults();
  },[])
  useEffect(() => {
    calculateTeamPoints();
    // console.log(sortedTeamPoints);
  }, [results]);

  const getPublishedTeamPoints = async () => {
    try {
      const fetchedTeamPoints = await fetch("/api/teampoint",{
        cache: "no-store",
      })

      if (!fetchedTeamPoints) {
        console.log("no team points fetched");
      }
      const fetchedTeampointsDB = await fetchedTeamPoints.json();
      setTeamPoints(fetchedTeampointsDB.dBFinalizedTeamPoints);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPublishedTeamPoints();
  },[]);



  Object.entries(sortedTeamPoints).forEach(([team , points], index)=>{
    if (index === 0){
      sortedDisplayTeamPoints.teamfirst = team
      sortedDisplayTeamPoints.pointforfirst = points
    }else if (index === 1){
      sortedDisplayTeamPoints.teamsecond = team;
      sortedDisplayTeamPoints.pointforsecond = points;
    }else if (index === 2){
      sortedDisplayTeamPoints.teamthird = team;
      sortedDisplayTeamPoints.pointforthird = points;
    }
  })

  

  const handlePublish = async (e) => {

    try {
      const res = await fetch ("/api/teampoint",{
        method: teamPoints.length === 0 ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sortedDisplayTeamPoints)
      });
      if (!res.ok) {
        console.log("failed to send point to server");
      }else{
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }



  };


  return (
    <div className='mx-auto'>
        <h1>Total Points</h1>
        <h1 className='font-semibold text-5xl font-[ambro]'>After : {results.length}</h1>
        <div className='pt-5 space-y-3 pb-4'>
        {Object.entries(sortedTeamPoints).map(([team, points]) => (
          <div className='flex items-end space-x-6' key={team}>
            <h1 className='text-2xl font-medium'>{team}</h1>
            <h1 className='text-2xl font-semibold'>{points}</h1>
          </div>
        ))}
        </div>

        <button onClick={handlePublish} className='bg-teal-900 text-white font-semibold text-lg p-2'>Publish</button>
    </div>
  )
}

export default TeamPointsCalculate
