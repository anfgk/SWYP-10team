interface Props {
  value?: string;
}

const TagLabel = ({ value = "내용" }: Props) => {
  return (
    <div className="w-fit h-[full] flex rounded-[40px] border-[1px] border-[var(--main-color)] items-center px-[16px]">
      <p className="text-[14px] text-[var(--main-color)] font-pretendard">
        #{value}
      </p>
    </div>
  );
};

export default TagLabel;
