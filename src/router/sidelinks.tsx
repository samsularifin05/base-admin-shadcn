import { IconUserShield } from '@tabler/icons-react';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon?: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin/dashboard',
    icon: <IconUserShield size={18} />
  },
  {
    title: 'Master Data',
    label: '',
    href: '#',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Master Bank',
        label: '',
        href: 'master-bank'
      }
    ]
  }
];
