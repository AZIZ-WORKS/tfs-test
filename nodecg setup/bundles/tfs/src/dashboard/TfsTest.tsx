import React, { useEffect, useState } from 'react';

// Replicant setup
import { useReplicant } from './../useReplicant';

export const TfsTest: React.FC = () => {
  const [timer, setTimer] = useReplicant('matchTimer', {
    timeInSeconds: 0,
    gameType: 'football',
    isRunning: false,
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 0,
    scoreB: 0,
    extraTime: null,
    isVisible: true, // We will toggle this from here
  });

  const [extraTimeInput, setExtraTimeInput] = useState('');

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleToggle = () => {
    console.log('handleToggle called');
    if (timer.isRunning) {
      console.log('Stopping timer...');
      nodecg.sendMessage('stopTimer');
    } else {
      console.log('Starting timer...');
      nodecg.sendMessage('startTimer');
    }
  };

  const handleReset = () => {
    console.log('Resetting timer...');
    nodecg.sendMessage('resetTimer');
  };

  const handleSetTo45 = () => {
    console.log('Setting timer to 45:00...');
    nodecg.sendMessage('setTimer', 45 * 60);
  };

  const handleSetTo90 = () => {
    console.log('Setting timer to 90:00...');
    nodecg.sendMessage('setTimer', 90 * 60);
  };

  const handleSetExtraTime = () => {
    const extraTime = parseInt(extraTimeInput, 10);
    if (!isNaN(extraTime)) {
      console.log(`Setting extra time to ${extraTime} minutes...`);
      nodecg.sendMessage('setExtraTime', extraTime);
    }
    setExtraTimeInput('');
  };

  // Show the timer
  const handleShowTimer = () => {
    console.log('Showing timer');
    nodecg.sendMessage('showTimer', true);
  };

  // Hide the timer
  const handleHideTimer = () => {
    console.log('Hiding timer');
    nodecg.sendMessage('hideTimer', false);
  };

  return (
    <>
      <div style={{ fontSize: '2rem', marginTop: '5px', textAlign: 'center' }}>
        <h3>
          {formatTime(timer.timeInSeconds)} {timer.extraTime && `+${timer.extraTime}`}
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleToggle}
          style={{
            backgroundColor: timer.isRunning ? '#e74c3c' : '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s, transform 0.1s',
          }}
        >
          {timer.isRunning ? 'Stop' : 'Start'}
        </button>

        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>

        <button
          onClick={handleSetTo45}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          45:00
        </button>

        <button
          onClick={handleSetTo90}
          style={{
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          90:00
        </button>

        <button
          onClick={handleSetExtraTime}
          style={{
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Set ET
          <input
            type="number"
            value={extraTimeInput}
            onChange={(e) => setExtraTimeInput(e.target.value)}
            style={{
              marginLeft: '2px',
              padding: '8px',
              width: '50px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1.1rem',
            }}
            aria-label="Extra Time Input"
          />
        </button>

        {/* Buttons to Show/Hide Timer */}
        <button
          onClick={handleShowTimer}
          style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          Show Timer
        </button>

        <button
          onClick={handleHideTimer}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 12px',
            fontSize: '1.1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          Hide Timer
        </button>
      </div>
    </>
  );
};

export default TfsTest;
