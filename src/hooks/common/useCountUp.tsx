import { useEffect, useRef, useCallback } from 'react';

const useCountUp = (end: number, start = 0, duration = 1000) => {
  const element = useRef<HTMLElement>(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onCount = useCallback(() => {
    const { current } = element;

    let currentNumber = start;
    const counter = setInterval(() => {
      currentNumber += 1;

      if (current) {
        current.innerHTML = String(currentNumber);
      }

      if (currentNumber === end) {
        clearInterval(counter);
      }
    }, stepTime);
  }, [start, end, stepTime, element]);

  useEffect(() => {
    if (element.current && end !== 0) {
      onCount();
    }
  }, [onCount, end]);

  return {
    ref: element,
  };
};

export default useCountUp;
