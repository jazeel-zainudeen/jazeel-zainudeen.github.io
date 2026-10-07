"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playPop: () => void;
  playHover: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playPop: () => {},
  playHover: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem("sound-enabled");
    if (saved === "true") {
      setSoundEnabled(true);
    }
  }, []);

  const getAudioContext = () => {
    if (audioCtx) return audioCtx;
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    setAudioCtx(ctx);
    return ctx;
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("sound-enabled", String(nextState));
    if (nextState) {
      // Play a polite activation chime
      const ctx = getAudioContext();
      if (ctx.state === "suspended") ctx.resume();
      playTone(520, 0.08, "sine");
      setTimeout(() => playTone(680, 0.12, "sine"), 60);
    }
  };

  const playTone = (freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.04) => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext not allowed or failed
    }
  };

  const playHover = () => {
    if (!soundEnabled) return;
    playTone(440, 0.04, "triangle", 0.02);
  };

  const playPop = () => {
    if (!soundEnabled) return;
    playTone(580, 0.08, "sine", 0.05);
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playPop, playHover }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      data-cursor="sound"
      aria-label={soundEnabled ? "Mute audio effects" : "Enable tactile sound effects"}
      className="group relative flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all hover:border-foreground hover:text-foreground active:scale-95"
    >
      {soundEnabled ? (
        <>
          <span className="flex items-center gap-0.5 h-3">
            <span className="h-2 w-0.5 rounded-full bg-brand animate-pulse" />
            <span className="h-3 w-0.5 rounded-full bg-brand-glow animate-pulse delay-75" />
            <span className="h-1.5 w-0.5 rounded-full bg-brand animate-pulse delay-150" />
          </span>
          <span className="font-mono text-[0.65rem] tracking-wider uppercase text-foreground">SFX ON</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
          <span className="font-mono text-[0.65rem] tracking-wider uppercase">SFX OFF</span>
        </>
      )}
    </button>
  );
}
