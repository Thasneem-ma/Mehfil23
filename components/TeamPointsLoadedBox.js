import React, { useEffect, useState } from 'react';

function TeamPointsLoadedBox({teamPoints}) {
    // const [finalizedteamPointsDisplay, setTeamPointsDisplay] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);
  const [widthForFirst, setWidthForFirst] = useState(0);
  const [widthForSecond, setWidthForSecond] = useState(0);
  const [widthForThird, setWidthForThird] = useState(0);

  

  const calculateTotalPoints = () => {
    if (teamPoints.length > 0) {
      let total = 0;
      teamPoints.forEach((points) => {
        total += points.pointforfirst + points.pointforsecond + points.pointforthird;
      });
      setTotalPoint(total);
    }
  }

  const calculateWidth = () => {
    if (totalPoint > 0) {
      let firstWidth = 0;
      let secondWidth = 0;
      let thirdWidth = 0;

      teamPoints.forEach((points) => {
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

  useEffect(() => {
    calculateTotalPoints();
  }, [teamPoints]);

  useEffect(() => {
    calculateWidth();
  }, [totalPoint]);

  const delayforMinutes = async() =>{
    await new Promise(resolve => setTimeout(resolve, 2000));  // 3-second delay
  }
  useEffect(()=>{
    delayforMinutes();
  },[])

  return (
    <div className=' md:mt-16 mt-12 space-y-5 justify-center text-center items-center flex flex-col w-[78%] md:w-[60%]'>

         {/* points from DB */}
         {/* team 1 */}
     {teamPoints && teamPoints.map((t,i)=>(
        <div key={t._id} className='mx-auto flex flex-col gap-8 w-full'>
        <div className='flex flex-col items-start gap-0.5'>
            <div className='flex w-full justify-between'>
                <h1 className='font-semibold text-xl md:text-2xl'>{t.teamfirst}</h1>
                <h1 className='font-semibold text-2xl'>{t.pointforfirst}</h1>
            </div>
            <div className='w-full bg-gray-50'>
            <div className= 'bg-teal-900 h-4 ' style={{width: `${widthForFirst}%`}} >
            <h1 className='text-white text-xs float-right mr-2 font-sans'>{Math.floor(widthForFirst)}%</h1>    
            </div>    
            </div>
        </div>

    
        {/* team 2 */}
        <div className='flex flex-col items-start gap-0.5'>
            <div className='flex w-full justify-between'>
                <h1 className='font-semibold text-xl md:text-2xl'>{t.teamsecond}</h1>
                <h1 className='font-semibold text-2xl'>{t.pointforsecond}</h1>
            </div>
            <div className='w-full bg-gray-50'>
            <div className= 'bg-orange-900 h-4 ' style={{width: `${widthForSecond}%`}} >
            <h1 className='text-white text-xs float-right mr-2 font-sans'>{Math.floor(widthForSecond)}%</h1>    
            </div>    
            </div>
        </div>      

        {/* team 3 */}
        <div className='flex flex-col items-start gap-0.5'>
            <div className='flex w-full justify-between'>
                <h1 className='font-semibold text-xl md:text-2xl'>{t.teamthird}</h1>
                <h1 className='font-semibold text-2xl'>{t.pointforthird}</h1>
            </div>
            <div className='w-full bg-gray-50'>
            <div className= 'bg-purple-900 h-4 ' style={{width: `${widthForThird}%`}} >
            <h1 className='text-white text-xs float-right mr-2 font-sans'>{Math.floor(widthForThird)}%</h1>    
            </div>    
            </div>
        </div>

        </div>
         ))} 


        
    
     </div>
  )
}

export default TeamPointsLoadedBox
