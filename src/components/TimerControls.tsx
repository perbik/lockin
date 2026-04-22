import resetIcon from "../assets/icons/reset.svg";
import skipIcon from "../assets/icons/skip.svg";

interface TimerControlsProps {
    running: boolean;
    onToggle: () => void;
    onReset: () => void;
    onSkip: () => void;
}

export default function TimerControls({ running, onToggle, onReset, onSkip }: TimerControlsProps) {
    return (
        <div className="flex gap-5 items-center">
            <button onClick={onReset}>
                <img src={resetIcon} alt="Reset" className="w-12 h-12" />
            </button>

            <button
                onClick={onToggle}
                className="bg-green-900 text-white px-10 py-3 rounded-full font-britanica font-bold text-xl"
            >
                {running ? "Pause" : "Play"}
            </button>

            <button onClick={onSkip}>
                <img src={skipIcon} alt="Skip" className="w-12 h-12" />
            </button>
        </div>
    );
}
