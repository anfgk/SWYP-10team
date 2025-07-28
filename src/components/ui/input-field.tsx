interface InputFieldProps {
  width?: string;
  height?: string;
  placeholder?: string;
  className?: string;
}

const InputField = ({
  width = "w-[420px]",
  height = "h-[36px]",
  placeholder = "",
  className = "",
}: InputFieldProps) => {
  return (
    <div
      className={`${width} ${height} border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 ${className}`}
    >
      {placeholder}
    </div>
  );
};

export default InputField;
