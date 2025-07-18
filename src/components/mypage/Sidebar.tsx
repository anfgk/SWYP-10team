import { Button } from "@/components/ui/button";

interface SidebarProps {
  menus: string[];
  onMenuClick?: (menu: string) => void;
  activeMenu?: string;
}

const Sidebar = ({ menus, onMenuClick, activeMenu }: SidebarProps) => {
  return (
    <aside className="w-[150px] h-[1113px] flex flex-col gap-6 py-12 px-4 text-lg font-medium">
      {menus.map((menu) => (
        <Button
          key={menu}
          variant="ghost"
          className={`justify-start ${
            activeMenu === menu
              ? "bg-[var(--background)] text-[var(--foreground)]"
              : "hover:bg-gray-200"
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
