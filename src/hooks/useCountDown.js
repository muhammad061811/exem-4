import { useEffect, useState } from "react";

const useCountDown = (start) => {
    const [counter, setCounter] = useState(start);
    useEffect(() => {
      if (counter === 0) {
        return counter +1;
      }
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }, [counter]);
    return counter;
  };

  export default useCountDown
  