import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Icon icon="lucide:layout-dashboard" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: <Icon icon="lucide:building-2" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Contacts',
    path: '/contacts',
    icon: <Icon icon="lucide:users" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Leads',
    path: '/leads',
    icon: <Icon icon="lucide:users-round" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Reminders',
    path: '/reminders',
    icon: <Icon icon="lucide:alarm-clock" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Contact Us',
    path: '/contactus',
    icon: <Icon icon="lucide:message-circle" width="24" height="24" color="#3F3F46" />,
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" color="#3F3F46" />,
  },
];
