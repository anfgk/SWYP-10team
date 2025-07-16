import { useNavigate } from "react-router-dom";

interface Props {
  value?: string;
  link?: string;
}

const TagLabel = ({ value = "내용", link = "/" }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-fit h-[full] rounded-[40px] border-[1px] border-[var(--main-color)] py-[8px] px-[16px]"
      onClick={() => navigate(link)}
    >
      <p className="text-[14px] text-[var(--main-color)] ">#{value}</p>
    </div>
  );
};

export default TagLabel;
