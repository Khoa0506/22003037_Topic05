import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  // remember the last callback if it changes
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  //set up the interval
  useEffect(() => {
    if (delay === null) {
      return;
    }
    const id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => {
      clearInterval;
    };
  }, [delay]);
}
