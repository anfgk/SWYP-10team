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
        <SelectTrigger className="w-full !h-[48px] !px-[16px] font-semibold bg-[var(--search-element-bg)] !outline-none focus-visible:ring-[1px] focus-visible:ring-[var(--main-color)] !border-[1px] border-[var(--search-element-border)] text-[var(--place-neutral)] !text-[14px] rounded-[26px] cursor-pointer data-[placeholder]:text-[var(--place-neutral)]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"전체"} value="전체">
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
