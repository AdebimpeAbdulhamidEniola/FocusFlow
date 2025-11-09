import NavigationComponent from "./NavigationComponent";
import { RotateCcw, SkipForward } from "lucide-react";

const MainTimerPage = ({
  isRunning,
  timeRemaining,
  toggleStart,
  hasStarted,
}: {
  isRunning: boolean;
  timeRemaining: number;
  toggleStart: () => void;
  hasStarted: boolean;
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="bg-[#121c21] max-w-screen min-h-screen py-5 font-[Inter,sans-serif] text-white">
      <NavigationComponent />

      <div className="bg-[#1A2B33] flex justify-between lg:w-[50%] w-[80%] mx-auto rounded-lg mt-10 px-4 py-1">
        <button className={`p-4 basis-[33%]`} id="focus">
          Focus
        </button>

        <button className={`p-4  basis-[33%]`} id="short_break">
          Short Break
        </button>

        <button className={`p-4  basis-[33%]`} id="long_break">
          Long Break
        </button>
      </div>

      <div className="w-50 h-50  border-12 border-[#12a3ed] mx-auto my-10 rounded-full text-5xl text-white font-bold flex place-content-center">
        <p className="m-auto text-center p-4 ">{formattedTime}</p>
      </div>

      <div className="control-buttons flex gap-5 justify-center">
        <div className="reset">
          <button className="bg-[#243d47] p-2 rounded-full hover:bg-[#335466] focus:bg-[#335466] transition-all cursor-pointer">
            <RotateCcw size={22} />
          </button>
        </div>
       
        <button
          className="bg-[#12a3ed] px-9 py-2 rounded-md hover:bg-[#1bb7ff] focus:bg-[#1bb7ff] transition-all cursor-pointer"
          onClick={toggleStart}
        >
           {!hasStarted ? "Start" : isRunning ? "Pause" : "Resume"}
        </button>

        <div className="skip">
          <button className="bg-[#243d47] p-2 rounded-full hover:bg-[#335466] focus:bg-[#335466] transition-all cursor-pointer">
            <SkipForward size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainTimerPage;
