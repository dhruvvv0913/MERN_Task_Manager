import { useEffect, useRef, useState } from "react";

// Shows a number that smoothly animates from its previous value to the new one.
// On first load the stats go from 0 to their real value, which gives a nice
// "count up" effect; later changes animate smoothly too.
function CountUp({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    prevRef.current = value;

    if (start === end) return;

    const duration = 400; // milliseconds
    const startTime = performance.now();
    let frame;

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(start + (end - start) * progress);
      setDisplay(current);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

export default CountUp;
