import { useState, useEffect } from "react";
import { throttle } from "lodash";

function useSmallScreen(throttleTime = 500) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = throttle(() => {
      setIsSmallScreen(window.innerWidth <= 900);
    }, throttleTime);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [throttleTime]);

  return isSmallScreen;
}

export default useSmallScreen;
