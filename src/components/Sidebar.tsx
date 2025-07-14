// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { SIDENAV_ITEMS } from '@/constants';
// import { SideNavItem } from '@/types';
// import { Icon } from '@iconify/react';

// const SideNav = () => {
//   return (
//     <div
//       className="md:w-60 bg-[#F9FAFB] h-screen flex-1 fixed hidden md:flex border-r border-zinc-200 shadow-md hover:shadow-xl 
//         transition-shadow duration-300 ease-in-out"
//     >
//       <div className="flex flex-col justify-between w-full">
//         <div>
//           <Link
//             href="/"
//             className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-14 w-full"
//           >
//             <span className="font-bold text-xl text-green-700 hidden md:flex ml-4">SabaCRM</span>
//           </Link>

//           <div className="flex flex-col space-y-2 md:px-6">
//             {SIDENAV_ITEMS.map((item, idx: number) => (
//               <MenuItem key={idx} item={item} />
//             ))}
//           </div>
//         </div>

//         <div className="p-4">
//           <button className="flex items-center gap-3 w-full text-red-600 p-2 hover:bg-red-100 rounded-xl">
//             <Icon icon="lucide:log-out" width={22} height={22} />
//             <span className="text-sm font-medium">Sign Out</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideNav;

// const MenuItem = ({ item }: { item: SideNavItem }) => {
//   const pathname = usePathname();
//   const [subMenuOpen, setSubMenuOpen] = useState(false);

//   const toggleSubMenu = () => {
//     setSubMenuOpen(!subMenuOpen);
//   };

//   if (item.submenu) {
//     return (
//       <div>
//         <button
//           onClick={toggleSubMenu}
//           className={`flex flex-row items-center p-2 rounded-lg w-full justify-between hover:bg-green-100 transition ${
//             pathname.includes(item.path) ? 'bg-green-100' : ''
//           }`}
//           type="button"
//         >
//           <div className="flex flex-row space-x-4 items-center">
//             {item.icon}
//             <span className="font-semibold text-sm text-black flex">{item.title}</span>
//           </div>

//           <div className={`${subMenuOpen ? 'rotate-180' : ''} flex transition-transform`}>
//             <Icon icon="lucide:chevron-down" width={20} height={20} />
//           </div>
//         </button>

//         {subMenuOpen && (
//           <div className="my-2 ml-8 flex flex-col space-y-2">
//             {item.subMenuItems?.map((subItem, idx) => (
//               <Link
//                 key={idx}
//                 href={subItem.path}
//                 className={`text-sm text-gray-700 hover:text-green-700 transition ${
//                   subItem.path === pathname ? 'font-semibold text-green-700' : ''
//                 }`}
//               >
//                 {subItem.title}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <Link
//       href={item.path}
//       className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-green-100 transition ${
//         item.path === pathname ? 'bg-green-100' : ''
//       }`}
//     >
//       {item.icon}
//       <span className="font-semibold text-sm text-black flex">{item.title}</span>
//     </Link>
//   );
// };
