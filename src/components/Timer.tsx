"use client";

import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  // Stopwatch state
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // Rest timer state
  const [restTime, setRestTime] = useState(120); // default 2 minutes
  const [currentRestTime, setCurrentRestTime] = useState(restTime);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);

  // Stopwatch useEffect
  useEffect(() => {
    let stopwatchInterval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(stopwatchInterval);
  }, [isStopwatchRunning]);

  // Rest timer useEffect
  useEffect(() => {
    let restInterval: NodeJS.Timeout;
    if (isRestTimerRunning && currentRestTime > 0) {
      restInterval = setInterval(() => {
        setCurrentRestTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (currentRestTime === 0 && isRestTimerRunning) {
      setIsRestTimerRunning(false);
      alert("Rest time is over!"); // Notify when rest ends
    }
    return () => clearInterval(restInterval);
  }, [isRestTimerRunning, currentRestTime]);

  // Stopwatch controls
  const startStopwatch = () => setIsStopwatchRunning(true);
  const stopStopwatch = () => setIsStopwatchRunning(false);
  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsStopwatchRunning(false);
  };

  // Rest timer controls
  const startRestTimer = () => {
    setCurrentRestTime(restTime);
    setIsRestTimerRunning(true);
  };
  const stopRestTimer = () => setIsRestTimerRunning(false);
  const resetRestTimer = () => {
    setCurrentRestTime(restTime);
    setIsRestTimerRunning(false);
  };

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0
       ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`
       : `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
 };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Stopwatch Display */}
      <div>
        <h2 className="text-xl font-semibold">Workout Stopwatch</h2>
        <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={startStopwatch}
            className="bg-orange-500 text-gray-800 py-1 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={stopStopwatch}
            className="bg-gray-400 text-gray-800 py-1 px-4 rounded"
          >
            Stop
          </button>
          <button
            onClick={resetStopwatch}
            className="bg-gray-600 text-gray-800 py-1 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Rest Timer Display */}
      <div>
        <h2 className="text-xl font-semibold">Rest Timer</h2>
        <div className="text-2xl font-bold">{formatTime(currentRestTime)}</div>
        <input
          type="range"
          min="60"
          max="300"
          step="60"
          value={restTime}
          onChange={(e) => setRestTime(Number(e.target.value))}
          className="w-full mt-2"
        />
        <p>Rest Interval: {formatTime(restTime)}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={startRestTimer}
            className="bg-orange-500 text-gray-800 py-1 px-4 rounded"
          >
            Start
          </button>
          <button
            onClick={stopRestTimer}
            className="bg-gray-400 text-gray-800 py-1 px-4 rounded"
          >
            Stop
          </button>
          <button
            onClick={resetRestTimer}
            className="bg-gray-600 text-gray-800 py-1 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
