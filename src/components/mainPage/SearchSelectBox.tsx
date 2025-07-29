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
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  isDisabled?: boolean;
}

const SearchSelectBox = ({
  options,
  placeholder,
  value,
  onChange,
  isDisabled = false,
}: Props) => {
  return (
    <div className="flex-1">
      <Select value={value} onValueChange={onChange} disabled={isDisabled}>
        <SelectTrigger className="w-full !h-[48px] !px-[16px] bg-[var(--search-element-bg)] !text-[14px] rounded-[26px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"all"} value="전체">
              전체
            </SelectItem>
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

export default SearchSelectBox;
