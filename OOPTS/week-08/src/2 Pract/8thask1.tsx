import { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
}

export const Timer = ({ initialSeconds = 10 }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [timeIsUp, setTimeIsUp] = useState<boolean>(false);

  useEffect(() => {
    if(seconds <= 0) {
      setTimeIsUp(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds(predSecond => predSecond - 1)
    }, 1000);
    
    return () => { // То, что надо было в основном исправить
      clearInterval(interval);
    }
  }, [seconds]);

  return (
    <div>
      {timeIsUp ? (
        <p>Time's up!</p>
      ) : (
        <p>Осталось {seconds} сек.</p>
      )}
    </div>
  );
};