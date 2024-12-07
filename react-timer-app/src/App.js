import React from 'react';
import './App.css';

import useCountdownTimer from './hooks/useCountdownTimer';

import Timer from './components/Timer';

function App() {
  const {
    state,
    start,
    stop,
    reset,
    handleSetTimer,
    setAlertMessage,
    setMessage,
    handleStart,
    handleChangeHours,
    handleChangeMinutes,
    handleChangeSeconds,
  } = useCountdownTimer();

  return (
    <Timer
      state={state}
      handleSetTimer={handleSetTimer}
      setHours={handleChangeHours}
      setMinutes={handleChangeMinutes}
      setSeconds={handleChangeSeconds}
      setMessage={setMessage}
      handleStart={handleStart}
      start={start}
      stop={stop}
      reset={reset}
      setAlertMessage={setAlertMessage}
    />
  );
}

export default App;
