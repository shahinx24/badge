import { useState, useEffect } from "react";
import "./timer.css";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  function handleReset() {
    setRunning(false);
    setSeconds(0);
  }

  return (
    <div className="container">
      <h1 className="time">{formatTime()}</h1>

      <div className="buttons">
        <button onClick={() => setRunning(true)}>Play</button>
        <button onClick={() => setRunning(false)}>Pause</button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}