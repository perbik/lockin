import { useEffect, useState, useRef } from "react";
import type { Mode, Settings } from "./types";
import Header from "./components/Header";
import TimerTabs from "./components/TimerTabs";
import TimerDisplay from "./components/TimerDisplay";
import TimerControls from "./components/TimerControls";
import SettingsModal from "./components/SettingsModal";
import countdownSound from "./assets/sounds/countdown.mp3";
import alarmSound from "./assets/sounds/alarm.mp3";

export default function App() {
    const [mode, setMode] = useState<Mode>("focus");
    const [time, setTime] = useState<number>(1500);
    const [running, setRunning] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);

    const countdownAudio = useRef<HTMLAudioElement | null>(null);
    const alarmAudio = useRef<HTMLAudioElement | null>(null);

    const countdownPlayed = useRef(false);
    const finishedPlayed = useRef(false);

    const [settings, setSettings] = useState<Settings>({
        focus_time: 25,
        short_break: 5,
        long_break: 15,
    });

    // 🔊 Initialize audio
    useEffect(() => {
        countdownAudio.current = new Audio(countdownSound);
        alarmAudio.current = new Audio(alarmSound);
    }, []);

    // 📦 Load settings
    useEffect(() => {
        const saved = localStorage.getItem("pomodoro_settings");
        if (saved) {
            const parsed: Settings = JSON.parse(saved);
            setSettings(parsed);
            setTime(parsed.focus_time * 60);
        }
    }, []);

    // ⏱️ Timer logic
    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev === 0) {
                    setTimeout(() => {
                        switchMode();
                    }, 500); // allow alarm to play
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    // 🔊 Sound effects
    useEffect(() => {
        // ⏳ Countdown (last 10 seconds)
        if (running && time <= 10 && time > 0 && !countdownPlayed.current) {
            if (countdownAudio.current) {
                countdownAudio.current.currentTime = 0;
                countdownAudio.current.volume = 0.6;
                countdownAudio.current.play().catch(() => { });
            }
            countdownPlayed.current = true;
        }

        if (time > 10) {
            countdownPlayed.current = false;
        }

        // 🚨 Alarm at end
        if (time === 0 && !finishedPlayed.current) {
            if (alarmAudio.current) {
                alarmAudio.current.currentTime = 0;
                alarmAudio.current.volume = 1;
                alarmAudio.current.play().catch(() => { });
            }
            finishedPlayed.current = true;
        }

        if (time > 0) {
            finishedPlayed.current = false;
        }
    }, [time, running]);

    // 🔄 Mode switching
    const switchMode = () => {
        if (mode === "focus") {
            const next = completedPomodoros + 1;
            setCompletedPomodoros(next);

            if (next >= 4) {
                setMode("long");
                setTime(settings.long_break * 60);
            } else {
                setMode("short");
                setTime(settings.short_break * 60);
            }
        } else {
            if (mode === "long") setCompletedPomodoros(0);
            setMode("focus");
            setTime(settings.focus_time * 60);
        }
    };

    // 🎯 Manual mode change
    const setTimer = (type: Mode) => {
        setMode(type);

        if (type === "focus") setTime(settings.focus_time * 60);
        if (type === "short") setTime(settings.short_break * 60);
        if (type === "long") setTime(settings.long_break * 60);

        setRunning(false);
    };

    // 💾 Save settings
    const saveSettings = () => {
        localStorage.setItem("pomodoro_settings", JSON.stringify(settings));
        setShowModal(false);
        setTimer("focus");
    };

    // 🔓 Unlock audio on first interaction
    const handleToggle = () => {
        if (countdownAudio.current) {
            countdownAudio.current.play()
                .then(() => {
                    countdownAudio.current?.pause();
                    countdownAudio.current.currentTime = 0;
                })
                .catch(() => { });
        }

        if (alarmAudio.current) {
            alarmAudio.current.play()
                .then(() => {
                    alarmAudio.current?.pause();
                    alarmAudio.current.currentTime = 0;
                })
                .catch(() => { });
        }

        setRunning(!running);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-green-900">
            <Header onOpenSettings={() => setShowModal(true)} />

            <TimerTabs mode={mode} onSelectMode={setTimer} />

            <TimerDisplay
                time={time}
                mode={mode}
                completedPomodoros={completedPomodoros}
            />

            <TimerControls
                running={running}
                onToggle={handleToggle} // ✅ important change
                onReset={() => {
                    if (mode === "focus") setTime(settings.focus_time * 60);
                    else if (mode === "short") setTime(settings.short_break * 60);
                    else setTime(settings.long_break * 60);

                    setRunning(false);
                }}
                onSkip={switchMode}
            />

            {showModal && (
                <SettingsModal
                    settings={settings}
                    onSettingsChange={setSettings}
                    onSave={saveSettings}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}