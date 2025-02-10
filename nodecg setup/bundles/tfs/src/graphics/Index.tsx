import React from 'react';
import { useReplicant } from './../useReplicant';

export function Index() {
  // Get the replicant value for matchTimer
  const [timer] = useReplicant('matchTimer', {
    timeInSeconds: 0,
    gameType: 'football',
    isRunning: false,
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 0,
    scoreB: 0,
    extraTime: null,
    isVisible: true,
  });

  // Log the timer visibility
  console.log(`Timer visibility: ${timer.isVisible}`);

  // If the timer is not visible, return null
  if (!timer.isVisible) {
    console.log('Timer is hidden. Returning null.');
    return (
      <div></div>
    );
  }

  // Helper function to format the time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Log timer time
  console.log(`Timer time: ${formatTime(timer.timeInSeconds)}`);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.teamName}>{timer.teamA}</span>
        <span style={styles.score}>{timer.scoreA}</span>
        <span style={styles.timer}>
          {formatTime(timer.timeInSeconds)} {timer.extraTime && `+${timer.extraTime}`}
        </span>
        <span style={styles.score}>{timer.scoreB}</span>
        <span style={styles.teamName}>{timer.teamB}</span>
      </div>
    </div>
  );
}

// Styles for the graphics display
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)', // Center the container horizontally
    zIndex: 1000,
    width: '400px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: '20px 30px',
    borderRadius: '10px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.5)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  teamName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: '0 10px',
  },
  score: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 10px',
  },
  timer: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 10px',
  },
};
  