import type { Mode } from "../types";

interface TimerTabsProps {
    mode: Mode;
    onSelectMode: (mode: Mode) => void;
}

const tabs: { key: Mode; label: string }[] = [
    { key: "focus", label: "Focus" },
    { key: "short", label: "Short Break" },
    { key: "long", label: "Long Break" },
];

export default function TimerTabs({ mode, onSelectMode }: TimerTabsProps) {
    return (
        <div className="flex gap-10 text-2xl mb-5 font-britanica">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onSelectMode(tab.key)}
                    className={`relative pb-2 transition-all ${mode === tab.key
                            ? "font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-green-900 after:rounded-full"
                            : "font-normal opacity-60"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
