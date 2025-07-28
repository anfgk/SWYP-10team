import type { ReactNode } from "react";

interface MypageContainerProps {
  children: ReactNode;
}

const MypageContainer = ({ children }: MypageContainerProps) => {
  return <div className="flex min-h-screen bg-white">{children}</div>;
};

export default MypageContainer;
