import { useState, useEffect } from "react";
import "./timer.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time (MM:SS)
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="container">
      <h1 className="time">{formatTime()}</h1>

      <div className="buttons">
        <button onClick={() => setIsRunning(true)}>Play</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
