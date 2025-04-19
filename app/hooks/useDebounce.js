import { useEffect, useRef, useState } from 'react';

function useDebounce(searchTerm = '', timeInMs = 500) {
  const [value, setValue] = useState(searchTerm);
  const timeOutIdRef = useRef(null);
  useEffect(() => {
    if (timeOutIdRef.current !== null) {
      clearTimeout(timeOutIdRef.current);
    }
    timeOutIdRef.current = setTimeout(() => {
      setValue(searchTerm);
    }, timeInMs);
    return () => {
      clearTimeout(timeOutIdRef.current);
    };
  }, [searchTerm, timeInMs]);
  return value;
}

export default useDebounce;
