import React from 'react';

interface SidebarProps {
  menus: string[];
  onMenuClick?: (menu: string) => void;
}

const Sidebar = ({ menus, onMenuClick }: SidebarProps) => {
  return (
    <aside className="w-[299px] h-[1113px] bg-gray-300 flex flex-col gap-6 py-12 px-4 text-lg font-medium">
      {menus.map((menu) => (
        <div
          key={menu}
          className="cursor-pointer hover:font-bold"
          onClick={() => onMenuClick && onMenuClick(menu)}
        >
          {menu}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar; 