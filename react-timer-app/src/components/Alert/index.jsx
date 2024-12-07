import React, { useEffect, useState } from 'react';
import './styles.css';

const Alert = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setVisible(false);
  //       if (onClose) onClose();
  //     }, duration);

  //     return () => clearTimeout(timer);
  //   }, [duration, onClose]);
  useEffect(() => {
    const fadeOutTime = 200; // Тривалість анімації зникання (в мілісекундах)
    const timer = setTimeout(() => {
      setFading(true); // Почати анімацію зникання
      setTimeout(() => {
        setVisible(false); // Прибрати елемент
        if (onClose) onClose();
      }, fadeOutTime);
    }, duration - fadeOutTime);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className={`alert ${fading ? 'fade-out' : ''}`}>{message}</div>;
};

export default Alert;
