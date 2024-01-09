import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  const decrementBreak = () => {
    setBreakLength((prev) => Math.max(1, prev - 1));
  };

  const incrementBreak = () => {
    setBreakLength((prev) => Math.min(60, prev + 1));
  };

  const decrementSession = () => {
    setSessionLength((prev) => Math.max(1, prev - 1));
    setTimeLeft((prev) => Math.max(1, prev - 60));
  };

  const incrementSession = () => {
    setSessionLength((prev) => Math.min(60, prev + 1));
    setTimeLeft((prev) => Math.min(3600, prev + 60));
  };

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimerLabel("Session");
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            audioRef.current.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, breakLength, sessionLength, timerLabel]);

  return (
    <main className="App">
      <div id="break-label">Break Length</div>
      <div id="session-label">Session Length</div>
      <div id="break-decrement" onClick={decrementBreak}>
        decremento
      </div>
      <div id="break-increment" onClick={incrementBreak}>
        iNcremento
      </div>
      <div id="break-length">{breakLength}</div>
      <div id="session-decrement" onClick={decrementSession}>
        Decrement Session
      </div>
      <div id="session-increment" onClick={incrementSession}>
        Increment Session
      </div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{`${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0")}:${(timeLeft % 60)
        .toString()
        .padStart(2, "0")}`}</div>
      <div id="start_stop" onClick={toggleTimer}>
        iNICIO/PARAR
      </div>
      <div id="reset" onClick={resetTimer}>
        RESETEAR
      </div>
      <audio id="beep" ref={audioRef} src="/pepetrueno.mp3" />
    </main>
  );
};

export default App;
