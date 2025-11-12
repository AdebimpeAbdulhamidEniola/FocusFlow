import { useEffect } from "react";
import { setItem } from "../utils/localStorage";
import type { PersistPomodoroProps } from "../Type";



/**     
  Custom hook to persist Pomodoro state in localStorage
 */
export const usePersistPomodoroState = ({
  isRunning,
  timeRemaining,
  sessionType,
  pomodoroCount,
  hasStarted,
}: PersistPomodoroProps) => {
  useEffect(() => {
    setItem("isRunning", isRunning);
  }, [isRunning]);

  useEffect(() => {
    setItem("count", timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    setItem("session", sessionType);
  }, [sessionType]);

  useEffect(() => {
    setItem("pomodoroCount", pomodoroCount);
  }, [pomodoroCount]);

  useEffect(() => {
    setItem("hasStarted", hasStarted);
  }, [hasStarted]);
};
