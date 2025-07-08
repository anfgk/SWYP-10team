import * as React from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  menus: string[];
  onMenuClick?: (menu: string) => void;
  activeMenu?: string;
}

const Sidebar = ({ menus, onMenuClick, activeMenu }: SidebarProps) => {
  return (
    <aside className="w-[299px] h-[1113px] bg-[var(--sidebar-ring)] flex flex-col gap-6 py-12 px-4 text-lg font-medium">
      {menus.map((menu) => (
        <Button
          key={menu}
          variant="ghost"
          className={`justify-start ${
            activeMenu === menu
              ? "bg-blue-500 text-white hover:bg-blue-600"
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
