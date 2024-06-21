import {
  IconApps,
  IconHexagonNumber1,
  IconLayoutDashboard,
  IconMessages,
  IconUserShield
} from "@tabler/icons-react";

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
    title: "Dashboard",
    label: "",
    href: "/admin/dashboard",
    icon: <IconLayoutDashboard size={18} />
  },
  {
    title: "Chats",
    label: "9",
    href: "/chats",
    icon: <IconMessages size={18} />
  },
  {
    title: "Apps",
    label: "",
    href: "/apps",
    icon: <IconApps size={18} />
  },
  {
    title: "Master Data",
    label: "",
    href: "",
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: "Master User",
        label: "",
        href: "/admin/master-user"
      }
    ]
  },
  {
    title: "Multi Level",
    label: "",
    href: "",
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: "Level 1",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
        sub: [
          {
            title: "Level 2",
            label: "",
            href: "/sign-in"
          },
          {
            title: "Level 3",
            label: "",
            href: "/sign-in"
          }
        ]
      },
      {
        title: "Level 2",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />
      },
      {
        title: "Level 3",
        label: "",
        href: "/sign-in",
        icon: <IconHexagonNumber1 size={18} />,
        sub: [
          {
            title: "Level 3.1",
            label: "",
            href: "/sign-in"
          },
          {
            title: "Level 3.2",
            label: "",
            href: "/sign-in"
          }
        ]
      }
    ]
  }
];
