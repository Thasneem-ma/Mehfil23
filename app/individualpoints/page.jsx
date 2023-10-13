"use client"
import React,{useState,useEffect} from 'react'
import { BsPlayFill } from 'react-icons/bs'

function individualpoints() {
  const [buttonIsB , setButtonIsB] = useState(false)
  const [buttonIsC , setButtonIsC] = useState(false)
  const [buttonIsY , setButtonIsY] = useState(false)
  const [resultsFromDb,setResultsFromDb] = useState([])
  const [participantsFromDb,setParticipantsFromDb] = useState([])
  const [calculatedPoints, setCalculatedPoints] = useState([]);
  const [withCategoryList, setWithCategoryList] = useState([])


  // if (buttonIsB) {
  //   return withCategoryList.filter(r => r.category === 'B Zone')
  // }
  // if (buttonIsC) {
  //   return withCategoryList.filter(r => r.category === 'C Zone')
  // }
  // if (buttonIsY) {
  //   return withCategoryList.filter(r => r.category === 'Y Zone')
  // }
  // button handle function
  const handleZoneButton = (event)=>{
    event.preventDefault()
    
    let button = event.target.value
    switch(button){
      case 'b':
        setButtonIsB(true)
        setButtonIsC(false)
        setButtonIsY(false)
        break
      case 'c':
        setButtonIsC(true)
        setButtonIsB(false)
        setButtonIsY(false)
        break
      case 'y':
        setButtonIsY(true)
        setButtonIsB(false)
        setButtonIsC(false)
        break
      default:
        break
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const resultsRes = await fetch("api/results",{cache: 'no-store',})
        const resultData = await resultsRes.json()
        setResultsFromDb(resultData.allIndividualResults)

        const participantRes = await fetch("api/participants",{
          cache: 'no-store',
        })
        const participantData = await participantRes.json()
        setParticipantsFromDb(participantData.names)
      } catch (error) {
        
      }
    }
    fetchData()
  },[])

  
  //  calculate individual points
  const calculatePoints = async(e)=>{
    e.preventDefault()
    
    // Initialize a dictionary to store points for each participant
    try {
      
    
    const participantPoints = {};

    // Iterate through the results and calculate points for each participant
    resultsFromDb.forEach(result => {
      const {
        addIndividualPoint,
        firstplace,
        pointFirst,
        secondplace,
        pointSecond,
        thirdplace,
        pointThird,
        otherPlace1,
        otherPoint1,
        otherPlace2,
        otherPoint2,
        otherPlace3,
        otherPoint3,
        otherPlace4,
        otherPoint4
      } = result;

      if (addIndividualPoint) {
        // Calculate points for first, second, third places and other places
        participantPoints[firstplace] = (participantPoints[firstplace] || 0) + pointFirst;
        participantPoints[secondplace] = (participantPoints[secondplace] || 0) + pointSecond;
        participantPoints[thirdplace] = (participantPoints[thirdplace] || 0) + pointThird;

        if(otherPlace1){
          participantPoints[otherPlace1] = (participantPoints[otherPlace1] || 0) + otherPoint1;
        }

        if(otherPlace2){
          participantPoints[otherPlace2] = (participantPoints[otherPlace2] || 0) + otherPoint2;
        }
        if(otherPlace2){
          participantPoints[otherPlace3] = (participantPoints[otherPlace3] || 0) + otherPoint3;
        }
        if(otherPlace2){
          participantPoints[otherPlace4] = (participantPoints[otherPlace4] || 0) + otherPoint4;
        }
      }
    });

    const calculatedPointsArray = Object.keys(participantPoints).map(participant => ({
      name: participant,
      points: participantPoints[participant]
    }));

    setCalculatedPoints(calculatedPointsArray);

    const categorizedParticipants = calculatedPoints.map(point => {
      const participantInfo = participantsFromDb.find(participant => participant.participantName === point.name);
      return {
        name: point.name,
        points: point.points,
        team: participantInfo?.team || 'N/A',
        participantClassName: participantInfo?.participantClassName || 'N/A',
        category: participantInfo?.category || 'N/A',
      };
      
    });

    const sortedParticipants = categorizedParticipants.sort(function (a, b) {return a.points - b.points});
    sortedParticipants.reverse()

    setWithCategoryList(prevList => [
      ...prevList,
      ...sortedParticipants.map(participant => ({
        participantName: participant.name,
        points: participant.points,
        team: participant.team,
        category: participant.category,
      }))
    ]);

    

  } catch (error) {
   console.log(error);   
  }
  }

  const filteredParticipants = withCategoryList.filter(participant =>{
    if(buttonIsB){
      return participant.category === 'B Zone'
    }
    if(buttonIsC){
      return participant.category === 'C Zone'
    }
    if(buttonIsY){
      return participant.category === 'Y Zone'
    }
  })


  return (
    <div className='flex flex-col pt-36 px-[13%]'>
        <div className='flex justify-between pb-6'>
        <h1 className='font-semibold text-2xl'>Individual Points</h1>
        <button 
        onClick={calculatePoints}
        className='flex items-center shadow-md bg-teal-900 hover:bg-teal-950
        duration-200 text-white font-medium text-lg p-1 px-2 rounded-lg '>
            <BsPlayFill size={23} />
            <h1>Calculate</h1>
            </button>
        </div>
      
      {/* button section */}
      <div className='flex gap-14 pb-6'>
        <button 
        value={"b"}
        onClick={handleZoneButton}
        className={`bg-${buttonIsB ? 'white' : 'black'} text-${buttonIsB ? 'black' : 'white'} 
        duration-200 p-2 px-5 text-lg font-medium rounded shadow-md`}>B Zone</button>
        <button 
        value={"c"}
        onClick={handleZoneButton}
        className={`bg-${buttonIsC ? 'white' : 'black'} text-${buttonIsC ? 'black' : 'white'} 
        duration-200 p-2 px-5 text-lg font-medium rounded shadow-md`}>C Zone</button>
        <button 
        value={"y"}
        onClick={handleZoneButton}
        className={`bg-${buttonIsY ? 'white' : 'black'} text-${buttonIsY ? 'black' : 'white'} 
        duration-200 p-2 px-5 text-lg font-medium rounded shadow-md`}>Y Zone</button>
      </div>

      {/* detail section */}
      {withCategoryList.length>0 ?
      <div className='bg-gray-50 w-full flex flex-col p-7 gap-6 font-medium text-xl'>
      {filteredParticipants.map((par,i) =>(
        <div className='flex w-[80%] items-end border-b-2 border-b-gray-200 pb-2 gap-3' key={i}>
        <div  className='w-24 flex gap-2 flex-col'>
        <h1>{i+1}</h1>
        </div>
        <div className='w-full flex gap-2 flex-col'>
        <h1 className='font-semibold'>{par.participantName}</h1>
        </div>
        <div className='w-64 flex gap-2 flex-col'>
        <h1 className='font-semibold'>{par.points} <span className='font-light text-sm'>pts</span> </h1>
        </div>
        <div className='w-full flex gap-2 flex-col'>
        <h1>{par.team}</h1>
        </div>
        </div>
        ))}
      </div>
      : 
      <div className='bg-gray-50 w-full p-7'>
        <h1 className='italic'>Press any category and Click Calculate button twice slowly....</h1>
      </div>
      }
        
    </div>
  )
}

export default individualpoints
