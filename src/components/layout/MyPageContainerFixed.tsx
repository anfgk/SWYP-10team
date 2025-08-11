const MyPageContainerFixed = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[1200px] mx-auto flex flex-col pt-[96px] relative">
      {children}
    </div>
  );
};

export default MyPageContainerFixed;
