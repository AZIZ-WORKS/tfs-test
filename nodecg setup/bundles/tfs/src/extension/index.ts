import NodeCG from '@nodecg/types';

export interface MatchTimerReplicant {
  timeInSeconds: number;
  gameType: 'football' | 'basketball' | 'volleyball';
  isRunning: boolean;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  extraTime: number | null;
  isVisible: boolean;
}
module.exports = function (nodecg: NodeCG.ServerAPI) {
	const matchTimerReplicant = nodecg.Replicant<MatchTimerReplicant>('matchTimer', {
	  defaultValue: {
		timeInSeconds: 0,
		gameType: 'football',
		isRunning: false,
		teamA: 'Team A',
		teamB: 'Team B',
		scoreA: 0,
		scoreB: 0,
		extraTime: null,
		isVisible: true,
	  },
	  persistent: true,
	});
  
	nodecg.listenFor('startTimer', () => {
	  matchTimerReplicant.value.isRunning = true;
	  console.log("Timer started.");
	});
  
	nodecg.listenFor('stopTimer', () => {
	  matchTimerReplicant.value.isRunning = false;
	  console.log("Timer stopped.");
	});
  
	nodecg.listenFor('resetTimer', () => {
	  // Reset the timer to initial default values
	  matchTimerReplicant.value = {
		timeInSeconds: 0,
		gameType: 'football',
		isRunning: false,
		teamA: 'Team A',
		teamB: 'Team B',
		scoreA: 0,
		scoreB: 0,
		extraTime: null,
		isVisible: true,
	  };
	  console.log("Timer reset to default values.");
	});
  
	nodecg.listenFor('setTimer', (newTime: number) => {
	  matchTimerReplicant.value.timeInSeconds = newTime;
	  console.log(`Timer set to ${newTime} seconds.`);
	});
  
	nodecg.listenFor('setExtraTime', (extraTime: number) => {
	  matchTimerReplicant.value.extraTime = extraTime;
	  console.log(`Extra time set to ${extraTime} minutes.`);
	});

	// Replicant setup
nodecg.listenFor('showTimer', () => {
	console.log('Received showTimer message. Showing timer.');
	matchTimerReplicant.value.isVisible = true;
  });
  
  nodecg.listenFor('hideTimer', () => {
	console.log('Received hideTimer message. Hiding timer.');
	matchTimerReplicant.value.isVisible = false;
  });
  
	  
	// Make sure the timer continues to update every second if it's running
	setInterval(() => {
	  if (matchTimerReplicant.value.isRunning) {
		matchTimerReplicant.value.timeInSeconds += 1; // Update every second
	  }
	}, 1000);
  };
  