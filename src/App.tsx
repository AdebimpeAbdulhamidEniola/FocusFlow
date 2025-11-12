import MainTimerPage from "./components/MainTimerPage";
// import Settings from "./components/Settings"
// import TaskManagement from "./components/TaskManagement"
import { useState, useEffect, useRef } from "react";
import type { SessionType } from "./Type";
import { getItem} from "./utils/localStorage";
import { usePersistPomodoroState } from "./hooks/usePersistPomodoroState";
import { useAudioAlert } from "./hooks/useAudioAlert";

const App = () => {
  const [isRunning, setIsRunning] = useState<boolean>(() => {
    const running = getItem("isRunning");
    return running || false;
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const time: number = getItem("count");
    return time || 10;
  });

  const [sessionType, setSessionType] = useState<SessionType>(() => {
    const session: SessionType = getItem("session");
    return session || "focus";
  });

  const [pomodoroCount, setPomodoroCount] = useState<number>(() => {
    const count = getItem("pomodoroCount");
    return count || 0;
  });

  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    const started = getItem("hasStarted");
    return started || false;
  });
  const intervalRef = useRef<number | null>(null);

  const { playAlert } = useAudioAlert();

  usePersistPomodoroState({
    isRunning,
    timeRemaining,
    sessionType,
    pomodoroCount,
    hasStarted,
  });

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0;

        const newTime = prev - 1;
        console.log(`Time remaining is ${newTime}`);

        if (newTime === 0) {
          // Play sound alert when session ends
          playAlert();

          if (sessionType === "focus") {
            setPomodoroCount((prevCount) => prevCount + 1);
            console.log(`Pomodoro count is ${pomodoroCount}`);
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

    return () => clearInterval(intervalRef.current as number);
  }, [isRunning, sessionType, pomodoroCount, playAlert]);

  const handleReset = () => {
    switch (sessionType) {
      case "focus":
        setTimeRemaining(10);
        break;
      case "shortBreak":
        setTimeRemaining(5 * 60);
        break;
      case "longBreak":
        setTimeRemaining(15 * 60);
        break;
      default:
        setTimeRemaining(25 * 60);
    }
    setIsRunning(false);
  }

  const handleSkip =() => {
    clearInterval(intervalRef.current as number)
    setIsRunning(false)
    if (sessionType === "focus") {
      setPomodoroCount(prev => {
        const newCount = prev + 1

        if (newCount === 4) {
          setSessionType("longBreak")
          setTimeRemaining( 10 * 60)
          return 0
        }
        else {
          setSessionType("shortBreak")
          setTimeRemaining(5 * 60)
          return newCount
        }
      })
    }
     else if (sessionType === "shortBreak") {
    
    setSessionType("focus");
    setTimeRemaining(10 * 60); 
  } 

  else {
    setSessionType("focus")
    setPomodoroCount(0)
  }

  }
  const toggleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  return (
    <div>
      <MainTimerPage
        isRunning={isRunning}
        timeRemaining={timeRemaining}
        toggleStart={toggleStart}
        hasStarted={hasStarted}
        pomodoroCount={pomodoroCount}
        handleReset = {handleReset}
        handleSkip = {handleSkip}
      />
      {/* <Settings /> */}
      {/* <TaskManagement /> */}
    </div>
  );
};

export default App;
