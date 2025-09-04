interface Props {
  children: React.ReactNode;
}

const TabInfoLayout = ({ children }: Props) => {
  return <div className="w-full h-fit flex flex-col gap-[8px]">{children}</div>;
};

export default TabInfoLayout;
