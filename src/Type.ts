export type SessionType = "focus" | "longBreak" | "shortBreak"
export interface PersistPomodoroProps {
  isRunning: boolean;
  timeRemaining: number;
  sessionType: string;
  pomodoroCount: number;
  hasStarted: boolean;
}