import type { Settings } from "../types";
import NumberInput from "./NumberInput";

interface SettingsModalProps {
    settings: Settings;
    onSettingsChange: (settings: Settings) => void;
    onSave: () => void;
    onClose: () => void;
}

export default function SettingsModal({
    settings,
    onSettingsChange,
    onSave,
    onClose,
}: SettingsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <div className="bg-[#1f4d2b] text-white px-8 py-8 rounded-[30px] w-[420px] font-britanica">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold leading-none">
                        Custom Timers
                    </h2>

                    <button
                        onClick={onClose}
                        className="bg-[#F0F5F1] text-green-900 w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-105 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Inputs */}
                <NumberInput
                    label="Focus Timer"
                    value={settings.focus_time}
                    onChange={(v) => onSettingsChange({ ...settings, focus_time: v })}
                />

                <NumberInput
                    label="Short Break Timer"
                    value={settings.short_break}
                    onChange={(v) => onSettingsChange({ ...settings, short_break: v })}
                />

                <NumberInput
                    label="Long Break Timer"
                    value={settings.long_break}
                    onChange={(v) => onSettingsChange({ ...settings, long_break: v })}
                />

                {/* Save Button */}
                <button
                    onClick={onSave}
                    className="mt-2 w-full bg-[#F0F5F1] text-green-900 py-3 rounded-2xl text-2xl font-bold hover:brightness-95 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
