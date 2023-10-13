import React, { useEffect, useState } from 'react';
import TeamPointsLoadedBox from './TeamPointsLoadedBox';
import Loading from '@/app/loading';

const fetchTeamPoints = async () => {
  const response = await fetch("/api/teampoint", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team points");
  }

  const data = await response.json();
  return data.dBFinalizedTeamPoints;
};

function TeamPointsLoader  () {
  const [teamPoints, setTeamPoints] = useState([]);

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      // await new Promise(resolve => setTimeout(resolve, 3000));  // 3-second delay
      fetchTeamPoints()
        .then(data => setTeamPoints(data))
        .catch(error => console.error(error));
    };

    fetchDataWithDelay();
  }, []);

  return (
    <React.Suspense fallback={<Loading/>}>
      <TeamPointsLoadedBox teamPoints={teamPoints} />
    </React.Suspense>
  );
};

export default TeamPointsLoader;
