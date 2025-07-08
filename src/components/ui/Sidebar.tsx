import * as React from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  menus: string[];
  onMenuClick?: (menu: string) => void;
}

const Sidebar = ({ menus, onMenuClick }: SidebarProps) => {
  return (
    <aside className="w-[299px] h-[1113px] bg-gray-300 flex flex-col gap-6 py-12 px-4 text-lg font-medium">
      {menus.map((menu) => (
        <Button
          key={menu}
          variant="ghost"
          className="justify-start"
          onClick={() => onMenuClick && onMenuClick(menu)}
        >
          {menu}
        </Button>
      ))}
    </aside>
  );
};

export default Sidebar; 