import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { tracks } from "@/data/soundtrack";

const VOLUME_KEY = "mud-radio-volume";
const MUTE_KEY = "mud-radio-muted";

type RadioApi = {
  index: number;
  playing: boolean;
  volume: number;
  muted: boolean;
  time: number;
  duration: number;
  open: boolean;
  setOpen: (value: boolean | ((value: boolean) => boolean)) => void;
  play: () => void;
  pause: () => void;
  choose: (next: number) => void;
  seek: (next: number) => void;
  setLevel: (next: number) => void;
  toggleMute: () => void;
};

const RadioContext = createContext<RadioApi | null>(null);

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[0].src;
    const storedVolume = sessionStorage.getItem(VOLUME_KEY);
    const storedMute = sessionStorage.getItem(MUTE_KEY);
    if (storedVolume != null) {
      const next = Number(storedVolume);
      if (!Number.isNaN(next)) {
        audio.volume = next;
        setVolume(next);
      }
    } else {
      audio.volume = 0.8;
    }
    if (storedMute === "1") {
      audio.muted = true;
      setMuted(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setTime(audio.currentTime || 0);
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onEnded = () => {
      const next = (indexRef.current + 1) % tracks.length;
      indexRef.current = next;
      setIndex(next);
      setTime(0);
      audio.src = tracks[next].src;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const choose = (next: number) => {
    const audio = audioRef.current;
    if (!audio || next === indexRef.current) {
      setOpen(false);
      return;
    }
    const keep = playing;
    audio.pause();
    indexRef.current = next;
    setIndex(next);
    setTime(0);
    setDuration(0);
    audio.src = tracks[next].src;
    setOpen(false);
    if (keep) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const seek = (next: number) => {
    if (audioRef.current) audioRef.current.currentTime = next;
    setTime(next);
  };

  const setLevel = (next: number) => {
    const audio = audioRef.current;
    setVolume(next);
    setMuted(false);
    if (audio) {
      audio.muted = false;
      audio.volume = next;
    }
    sessionStorage.setItem(VOLUME_KEY, String(next));
    sessionStorage.setItem(MUTE_KEY, "0");
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
    sessionStorage.setItem(MUTE_KEY, next ? "1" : "0");
  };

  return (
    <RadioContext.Provider value={{ index, playing, volume, muted, time, duration, open, setOpen, play, pause, choose, seek, setLevel, toggleMute }}>
      <audio ref={audioRef} preload="none" />
      {children}
    </RadioContext.Provider>
  );
}

export function Radio() {
  const radio = useContext(RadioContext);
  if (!radio) return null;
  const { index, playing, volume, muted, time, duration, open, setOpen, play, pause, choose, seek, setLevel, toggleMute } = radio;
  const track = tracks[index];
  const clock = (value: number) => {
    if (!Number.isFinite(value) || value < 0) return "0:00";
    const total = Math.floor(value);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  };

  return (
    <section className="archive-radio" aria-label="Archive radio">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={playing ? pause : play}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-gold font-mono text-xs tracking-widest text-gold"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "II" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-widest text-gold">ARCHIVE RADIO</p>
          <p className="truncate font-mono text-xs text-parchment">{track.title}</p>
          {track.artist ? <p className="truncate font-mono text-[10px] tracking-widest text-muted">{track.artist}</p> : null}
        </div>
        <div className={`radio-bars ${playing ? "is-on" : ""}`} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Track progress</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          aria-label="Track progress"
          onChange={(event) => seek(Number(event.target.value))}
        />
      </label>
      <div className="mt-1 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted">
        <span>{clock(time)}</span>
        <span>{clock(duration)}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-muted">VOL</span>
          <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} aria-label="Volume" onChange={(event) => setLevel(Number(event.target.value))} />
        </label>
        <button type="button" onClick={toggleMute} className="inline-flex h-11 items-center px-2 font-mono text-[10px] tracking-widest text-gold" aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? "MUTED" : "MUTE"}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 items-center px-2 font-mono text-[10px] tracking-widest text-parchment" aria-expanded={open}>
          TRACKS
        </button>
      </div>
      {open ? (
        <ul className="mt-2 border-t border-forest">
          {tracks.map((item, itemIndex) => (
            <li key={item.src}>
              <button type="button" onClick={() => choose(itemIndex)} className="flex min-h-11 w-full items-baseline justify-between gap-3 text-left" aria-current={itemIndex === index ? "true" : undefined}>
                <span className={`font-mono text-xs ${itemIndex === index ? "text-gold" : "text-parchment"}`}>{item.title}</span>
                {item.artist ? <span className="font-mono text-[10px] tracking-widest text-muted">{item.artist}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
