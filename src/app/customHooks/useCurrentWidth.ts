import { useState, useEffect } from "react";


function getWidth(): number {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }
  
  export function useCurrentWidth():number {
    // save current window width in the state object
    let [width, setWidth] = useState(getWidth());
  
    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
      // timeoutId for debounce mechanism
      let timeoutId: any = null;
      let isMounted = true;
  
      function resizeListener() {
        if (isMounted) {
          // prevent execution of previous setTimeout
          clearTimeout(timeoutId);
          // change width from the state object after 150 milliseconds
          timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        }
      }
      // set resize listener
      window.addEventListener("resize", resizeListener);
  
      // clean up function
      return () => {
        // remove resize listener
        window.removeEventListener("resize", resizeListener);
        isMounted = false;
      };
    }, []);
  
    return width;
  }
  