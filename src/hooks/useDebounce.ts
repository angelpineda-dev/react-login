import { useEffect, useState } from 'react'

interface Debouce {
    value: string;
    delay?: number;
    cb?: () => void;
}

const useDebounce = (value, delay = 300, cb) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {

    const timer = setTimeout(() => {
        setDebounceValue(value);
        cb()
    }, delay);
  
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay])
  
  return debounceValue;
}

export default useDebounce