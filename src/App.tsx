import MainTimerPage from "./components/MainTimerPage";
// import Settings from "./components/Settings"
// import TaskManagement from "./components/TaskManagement"
import { useState, useEffect } from "react";
import type { SessionType } from "./Type";

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);


  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        console.log(`Time remaining is ${newTime}`);

        if (newTime === 0) {
          if (sessionType === "focus") {
            setPomodoroCount((prevCount) => prevCount + 1);
            setSessionType("shortBreak");
          } else {
            setSessionType("focus");
          }
        }

        if (pomodoroCount === 4) {
          setSessionType("longBreak");
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, sessionType, pomodoroCount]);

  const toggleStart = () => {
  if (!hasStarted) {
    setHasStarted(true);
    setIsRunning(true);  
  } else {
    setIsRunning(prev => !prev); 
  }
};

  return (
    <div>
      <MainTimerPage
        isRunning={isRunning}
        timeRemaining={timeRemaining}
        toggleStart={toggleStart}
        hasStarted = {hasStarted}
      />
      {/* <Settings />
      <TaskManagement /> */}
    </div>
  );
};

export default App;
