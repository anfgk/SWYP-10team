import { Link } from "react-router-dom";

interface Props {
  isActive: boolean;
  inner: string;
  href: string;
}

const SideBarButton = ({ isActive, inner, href }: Props) => {
  return (
    <Link
      to={href}
      className={`w-full h-[48px] text-[14px] font-semibold px-[24px] py-[12px] rounded-[10px] flex items-center hover:brightness-95 ${isActive ? "bg-[var(--sidebar-active)]/15 text-[var(--main-color)]" : "bg-white text-[var(--search-element-text)]"}`}
    >
      {inner}
    </Link>
  );
};

export default SideBarButton;
