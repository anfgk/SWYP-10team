import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const ModalSelectBox = ({ options, value, onChange }: Props) => {
  return (
    <div className="flex-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[442px] !h-full px-[16px] py-[12px] text-[14px] text-[var(--search-element-text)] font-semibold bg-[var(--sem-fill-norm)] rounded-[8px] !shadow-none border-[1px] border-[var(--search-element-border)] cursor-pointer">
          <SelectValue placeholder={"선택해주세요"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, i) => (
              <SelectItem key={i} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModalSelectBox;
