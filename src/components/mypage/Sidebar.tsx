import { Button } from "@/components/ui/button";

interface SidebarProps {
  menus: string[];
  onMenuClick?: (menu: string) => void;
  activeMenu?: string;
}

const Sidebar = ({ menus, onMenuClick, activeMenu }: SidebarProps) => {
  return (
    <aside className="w-[150px] h-[1113px] flex flex-col gap-6 py-12 px-4 text-lg font-medium">
      <h5>마이페이지</h5>

      {menus.map((menu) => (
        <Button
          key={menu}
          variant="ghost"
          className={`justify-start transition-colors duration-200 hover:!bg-[var(--sidebar)]/10 hover:!text-[var(--sidebar-text)] rounded-[10px] text-[var(--sidebar-text)] ${
            activeMenu === menu
              ? "w-[155px] h-[48px] bg-[var(--sidebar)]/10"
              : "w-[155px] h-[48px]"
          }`}
          onClick={() => onMenuClick && onMenuClick(menu)}
        >
          {menu}
        </Button>
      ))}
    </aside>
  );
};

export default Sidebar;
