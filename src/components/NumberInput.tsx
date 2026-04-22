interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export default function NumberInput({ label, value, onChange }: NumberInputProps) {
    return (
        <div className="mb-7">
            {/* Label */}
            <label className="block text-lg mb-2 leading-none">
                {label}
            </label>

            {/* Input Row */}
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="flex-1 px-4 py-3 rounded-xl bg-[#F0F5F1] text-green-900 text-lg outline-none appearance-none"
                />

                <span className="text-lg whitespace-nowrap leading-none">
                    minutes
                </span>
            </div>
        </div>
    );
}