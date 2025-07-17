'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';

const SideNav = () => {
  return (
    <div
      className="md:w-60 bg-[#F9FAFB] h-screen flex-1 fixed hidden md:flex border-r border-zinc-200 shadow-md hover:shadow-xl
        transition-shadow duration-300 ease-in-out"
    >
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex flex-col space-y-2 md:px-6  mt-5">
            {SIDENAV_ITEMS.map((item, idx: number) => (
              <MenuItem key={idx} item={item} />
            ))}
          </div>
        </div>

        <div className="p-4">
          <button className="flex items-center gap-3 w-full text-red-600 p-2 hover:bg-red-100 rounded-xl ">
            <Icon icon="lucide:log-out" width={22} height={22} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const isActive = pathname === item.path || pathname.includes(item.path);

  if (item.submenu) {
    return (
      <div>
        <button
          onClick={toggleSubMenu}
          type="button"
          className={`flex flex-row items-center p-2 rounded-lg w-full justify-between transition
            ${
              isActive
                ? 'bg-gray-200 text-[#0a1f44]'
                : 'text-black hover:bg-gray-100 hover:text-[#0a1f44]'
            }`}
        >
          <div className="flex flex-row space-x-4 items-center">
            {item.icon && <Icon icon={item.icon} width={20} height={20} className="text-[#0a1f44]" />}
            <span className="font-semibold text-sm flex">{item.title}</span>
          </div>

          <div className={`${subMenuOpen ? 'rotate-180' : ''} flex transition-transform`}>
            <Icon icon="lucide:chevron-down" width={20} height={20} />
          </div>
        </button>

        {subMenuOpen && (
          <div className="my-2 ml-8 flex flex-col space-y-2 ">
            {item.subMenuItems?.map((subItem, idx) => {
              const isSubActive = subItem.path === pathname;
              return (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`text-sm px-2 py-1 rounded transition ${
                    isSubActive
                      ? 'font-semibold text-white bg-[#0a1f44]'
                      : 'text-[#0a1f44] hover:text-white hover:bg-[#12284c]'
                  }`}
                >
                  {subItem.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.path}
      className={`flex flex-row space-x-4 items-center p-2 rounded-lg  transition
        ${
          isActive
            ? 'bg-gray-200 text-[#0a1f44]'
            : 'text-black hover:bg-gray-100 hover:text-[#0a1f44]'
        }`}
    >
      {item.icon && <Icon icon={item.icon} width={20} height={20} className="text-[#0a1f44]" />}
      <span className="text-ml flex">{item.title}</span>
    </Link>
  );
};
