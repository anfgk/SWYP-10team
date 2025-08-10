import type { ReactNode } from "react";
import MyPageContainerFixed from "../layout/MyPageContainerFixed";
import SideBarFixed from "../realMypage/SideBarFixed";

interface Props {
  title: string;
  children: ReactNode;
}
const MyPageScaffold = ({ title, children }: Props) => {
  return (
    <MyPageContainerFixed>
      <title>어다가냥?같이가개! | 마이페이지</title>
      <h1 className="absolute left-0 top-0 w-fit h-[38px] font-semibold flex items-center text-[24px]">
        {title}
      </h1>
      <div className="w-full h-fit flex gap-[106px]">
        <SideBarFixed />
        <main className="w-[939px] h-fit flex flex-col gap-[44px]">
          {children}
        </main>
      </div>
    </MyPageContainerFixed>
  );
};

export default MyPageScaffold;
