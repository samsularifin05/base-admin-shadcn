import {
  IconUserShield,
  IconPackage,
  IconCube,
  IconUsers,
  IconFileChart,
  IconSettings,
  IconFile,
  IconLock,
  IconHelpCircle,
  IconChartBar
} from '@tabler/icons-react';

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
    href: 'dashboard',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Overview',
        href: 'dashboard/overview',
        icon: <IconFile size={18} />
      },
      {
        title: 'Stats',
        href: 'dashboard/stats',
        icon: <IconChartBar size={18} />
      }
    ]
  },
  {
    title: 'Orders',
    label: '',
    href: 'orders',
    icon: <IconPackage size={18} />,
    sub: [
      {
        title: 'All Orders',
        href: 'orders/all',
        icon: <IconFile size={18} />
      },
      {
        title: 'Pending Orders',
        href: 'orders/pending',
        icon: <IconLock size={18} />
      }
    ]
  },
  {
    title: 'Products',
    label: '',
    href: 'products',
    icon: <IconCube size={18} />,
    sub: [
      {
        title: 'Add Product',
        href: 'products/add',
        icon: <IconPackage size={18} />
      },
      {
        title: 'Manage Products',
        href: 'products/manage',
        icon: <IconPackage size={18} />
      }
    ]
  },
  {
    title: 'Users',
    label: '',
    href: 'users',
    icon: <IconUsers size={18} />,
    sub: [
      {
        title: 'Active Users',
        href: 'users/active',
        icon: <IconUsers size={18} />
      },
      {
        title: 'Inactive Users',
        href: 'users/inactive',
        icon: <IconLock size={18} />
      }
    ]
  },
  {
    title: 'Reports',
    label: '',
    href: 'reports',
    icon: <IconFileChart size={18} />,
    sub: [
      {
        title: 'Sales Report',
        href: 'reports/sales',
        icon: <IconFile size={18} />
      },
      {
        title: 'User Activity',
        href: 'reports/activity',
        icon: <IconUsers size={18} />
      }
    ]
  },
  {
    title: 'Settings',
    label: '',
    href: 'settings',
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: 'General',
        href: 'settings/general',
        icon: <IconSettings size={18} />
      },
      {
        title: 'Security',
        href: 'settings/security',
        icon: <IconLock size={18} />
      }
    ]
  },
  {
    title: 'Messages',
    label: '',
    href: 'messages',
    icon: <IconUsers size={18} />
  },
  {
    title: 'Invoices',
    label: '',
    href: 'invoices',
    icon: <IconPackage size={18} />
  },
  {
    title: 'Analytics',
    label: '',
    href: 'analytics',
    icon: <IconFileChart size={18} />
  },
  {
    title: 'Support',
    label: '',
    href: 'support',
    icon: <IconHelpCircle size={18} />,
    sub: [
      {
        title: 'General',
        href: 'settings/general',
        icon: <IconSettings size={18} />
      },
      {
        title: 'Security',
        href: 'settings/security',
        icon: <IconLock size={18} />
      },
      {
        title: 'Security',
        href: 'settings/security',
        icon: <IconLock size={18} />
      },
      {
        title: 'HAS',
        href: 'settings/security',
        icon: <IconLock size={18} />
      }
    ]
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
