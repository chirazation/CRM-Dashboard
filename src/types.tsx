export interface SideNavItem {
  title: string;
  path: string;
  icon?: string; 
  subMenuItems?: SideNavItem[];
   submenu?: boolean; 
}