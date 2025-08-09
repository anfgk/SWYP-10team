import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

const PopularToolTip = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <img
          src="/assets/icons/tooltip_icon.png"
          alt="tooltip icon"
          className="w-[24px] h-[24px]"
        />
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-[#262626] ">
        <p className="text-[14px] text-[var(--tooltip-text)]">
          지난 24시간 동안 가장 조회수가 높았어요!
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PopularToolTip;
