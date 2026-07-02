import { useState, useEffect, useRef } from 'react'; // useRef может быть полезен

interface TimerProps {
  initialSeconds: number;
}

export const Timer = ({ initialSeconds }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);// @ts-ignore
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Условие остановки: если время вышло, ничего не делаем
    if (seconds <= 0) { 
      console.log('Проверка timerIdRef при seconds <= 0:', timerIdRef.current);
      // debugger;
      if (timerIdRef.current) {//
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null
      }
        return; 
    }

    // 2. Устанавливаем таймер на следующий "тик"
    timerIdRef.current = setTimeout(() => {
      setSeconds(predSecond => predSecond - 1)
    }, 1000);

    // 3. Функция очистки: ОБЯЗАТЕЛЬНО очищаем текущий таймер
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null
      }
    };
  }, [seconds]); // Эффект зависит от `seconds` и перезапускается на каждом изменении

  return (
    <div>
      {seconds > 0 ? (
        <p>Осталось {seconds} сек.</p>
      ) : (
        <p>Время вышло!</p>
      )}
    </div>
  );
};