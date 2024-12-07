import React from 'react';
import './styles.css';
import Alert from '../Alert';

const Timer = ({
  state,
  handleSetTimer,
  setHours,
  setMinutes,
  setSeconds,
  setMessage,
  stop,
  handleStart,
  setAlertMessage,
}) => {
  const generateOptions = (range) =>
    Array.from({ length: range }, (_, i) => (
      <option key={i} value={i}>
        {String(i).padStart(2, '0')}
      </option>
    ));
  return (
    <div className='timer'>
      <h1>Таймер</h1>
      <div className='selectors'>
        <label>
          Години:
          <select
            value={state.hours}
            size='10'
            onChange={(e) => setHours(Number(e.target.value))}
          >
            {generateOptions(24)}
          </select>
        </label>
        <label>
          Хвилини:
          <select
            value={state.minutes}
            size='10'
            onChange={(e) => setMinutes(Number(e.target.value))}
            disabled={state.isRunning}
          >
            {generateOptions(60)}
          </select>
        </label>
        <label>
          Секунди:
          <select
            value={state.seconds}
            size='10'
            onChange={(e) => setSeconds(Number(e.target.value))}
          >
            {generateOptions(60)}
          </select>
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          id='message'
          type='text'
          placeholder='Введіть повідомлення'
          className='message-input'
          value={state.message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className='time-display'>{state.formattedTime}</div>

      <div className='controls'>
        <button
          onClick={handleStart}
          disabled={state.isRunning || state.timeLeft === 0}
        >
          Старт
        </button>
        <button onClick={stop} disabled={!state.isRunning}>
          Стоп
        </button>
        <button onClick={handleSetTimer}>Скинути</button>
      </div>
      {state.alertMessage && (
        <Alert
          message={state.alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default Timer;
