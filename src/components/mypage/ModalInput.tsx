interface ModalInputProps {
  label: string;
  type: "text" | "select" | "radio";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  radioOptions?: {
    value: string;
    label: string;
    icon: string;
    color: string;
  }[];
}

const ModalInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  options = [],
  radioOptions = [],
}: ModalInputProps) => {
  if (type === "radio") {
    return (
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-4">
          {radioOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={label}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  value === option.value
                    ? `border-${option.color}-500 bg-${option.color}-500`
                    : "border-gray-300"
                }`}
              >
                {value === option.value && (
                  <span className="text-white text-xs">{option.icon}</span>
                )}
              </div>
              <span className={`text-${option.color}-500`}>{option.icon}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-[442px] h-[48px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none bg-white ${
            value ? "text-[var(--text-color)]" : "text-gray-400"
          }`}
        >
          <option value="" className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-[var(--text-color)]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-[442px] h-[48px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default ModalInput;
