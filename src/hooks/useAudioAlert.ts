import { useCallback, useRef } from "react";

/**
 * Custom hook to play a clear and loud alert sound (~5 seconds)
 */
export const useAudioAlert = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playAlert = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      const audioContext = audioCtxRef.current;

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const duration = 5; // 5 seconds total
      const beepInterval = 0.8; // every 0.8s
      const now = audioContext.currentTime;

      for (let i = 0; i < duration / beepInterval; i++) {
        const startTime = now + i * beepInterval;

        // Create oscillator + gain for each beep
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine"; // smooth, clean tone
        oscillator.frequency.setValueAtTime(880, startTime); // A5 tone

        gain.gain.setValueAtTime(0.4, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      }

      console.log("Alert sound started");

    } catch (error) {
      console.error("Error playing alert:", error);
    }
  }, []);

  return { playAlert };
}