import { useState, useEffect } from "react";

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export function useWindowSize() {
  // save current window width in the state object
  const [size, setSize] = useState(getSize());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    // let timeoutId = null
    // const resizeListener = () => {
    // prevent execution of previous setTimeout
    // clearTimeout(timeoutId)
    // change width from the state object after 150 milliseconds
    //   timeoutId = setTimeout(() => setWidth(getSize()), 50)
    // }
    // set resize listener
    const resizeListener = () => {
      // change width from the state object
      setSize(getSize());
    };
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return size;
}
