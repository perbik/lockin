interface TimerDisplayProps {
    time: number;
    mode: string;
    completedPomodoros: number;
}

const modeLabels: Record<string, string> = {
    focus: "Focus",
    short: "Short Break",
    long: "Long Break",
};

export default function TimerDisplay({ time, mode, completedPomodoros }: TimerDisplayProps) {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");

    return (
        <>
            <div className="text-[240px] font-britanica font-bold">
                {m}:{s}
            </div>
            <div className="mb-3 capitalize font-britanica text-2xl">{modeLabels[mode]}</div>

            {/* Pomodoro progress dots */}
            <div className="flex gap-3 mb-5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-4 h-7 rounded-full transition-all"
                        style={{
                            backgroundColor: i < completedPomodoros ? "#1E4129" : "#D1D5DB",
                        }}
                    />
                ))}
            </div>
        </>
    );
}
