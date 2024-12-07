import { useState, useEffect } from 'react';
import { formatTime } from '../utils';

const useCountdownTimer = (initialTime = 0) => {
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(initialTime); // Час, що залишився
  const [isRunning, setIsRunning] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSetTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    reset(totalSeconds);
  };

  const start = () => {
    if (timeLeft > 0) setIsRunning(true);
  };
  const stop = () => setIsRunning(false);
  const reset = (newTime) => {
    setIsRunning(false);
    setTimeLeft(newTime || initialTime);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
    setMessage('');
  };

  function handleStart() {
    // handleSetTimer();
    start();
  }
  function handleChangeHours(value) {
    setHours(value);
    const totalSeconds = value * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
  }
  function handleChangeMinutes(value) {
    setMinutes(value);
    const totalSeconds = hours * 3600 + value * 60 + seconds;
    setTimeLeft(totalSeconds);
  }
  function handleChangeSeconds(value) {
    setSeconds(value);
    const totalSeconds = hours * 3600 + minutes * 60 + value;
    setTimeLeft(totalSeconds);
  }

  useEffect(() => {
    let timerId;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false); // Зупинка таймера, коли час вийшов
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(totalSeconds);
      setAlertMessage(message || 'Час вийшов!');
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, message, hours, minutes, seconds]);

  return {
    state: {
      hours,
      minutes,
      seconds,
      timeLeft,
      isRunning,
      formattedTime: formatTime(timeLeft),
      message,
      alertMessage,
    },

    start,
    stop,
    reset,
    handleSetTimer,
    setHours,
    setMinutes,
    setSeconds,
    setMessage,
    handleStart,
    handleChangeHours,
    handleChangeMinutes,
    handleChangeSeconds,
    setAlertMessage,
  };
};

export default useCountdownTimer;
