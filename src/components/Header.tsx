import timerIcon from "../assets/icons/timer.svg";

interface HeaderProps {
    onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
    return (
        <>
            <div className="absolute top-5 left-10 text-3xl font-britanica font-bold">
                LOCKIN
            </div>
            <button
                onClick={onOpenSettings}
                className="absolute top-5 right-10 bg-green-900 text-white pl-2 pr-3 py-2 rounded-full flex items-center gap-3 font-britanica text-lg"
            >
                <img src={timerIcon} alt="Timer" className="w-8 h-8" />

                <span className="font-semibold tracking-wide">
                    Custom Timers
                </span>
            </button>
        </>
    );
}
