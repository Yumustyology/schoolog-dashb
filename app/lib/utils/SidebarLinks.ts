import { SidebarLink } from "../types/general.type";

export const SidebarLinks:SidebarLink[] = [
  
    {
      iconPaths: ['/assets/svgs/overview-active.svg', '/assets/svgs/overview.svg'],
      link: `/dashboard`,
      href: "/dashboard",
      text: "Overview",
      droppable: []
    },
    {
      iconPaths: ['/assets/svgs/platform.svg', '/assets/svgs/platform.svg'],
      link: `#`,
      href: "#",
      text: "Platform",
      droppable: [
        {
          iconPaths: ['/assets/svgs/assistant-icon-active.svg', '/assets/svgs/assistant-icon.svg'],
          href: "/dashboard/assistant",
          text: "Assistant"
        },
        {
          iconPaths: ['/assets/svgs/call-active.svg', '/assets/svgs/call.svg'],
          href: "/dashboard/phone-numbers",
          text: "Phone Numbers"
        },
        {
          iconPaths: ['/assets/svgs/whatsapp-active.svg', '/assets/svgs/whatsapp.svg'],
          href: "/dashboard/whatsapp",
          text: "Whatsapp"
        },
        {
          iconPaths: ['/assets/svgs/document-text-active.svg', '/assets/svgs/document-text.svg'],
          href: "/dashboard/files",
          text: "Files"
        },
        {
          iconPaths: ['/assets/svgs/color-swatch-active.svg', '/assets/svgs/color-swatch.svg'],
          href: "/dashboard/tools",
          text: "Tools"
        }
      ]
    }, 
  {
    iconPaths: ['/assets/svgs/call-logs.svg','/assets/svgs/call-logs.svg'],
    link: `/call-logs`,
    href: "/call-logs",
    text: "Call logs",
    droppable: []
  },
  {
    iconPaths: [
      "/assets/svgs/cards-icon-active.svg",
      "/assets/svgs/cards-icon.svg"
    ],
    link: `/dashboard/billing`,
    href: "/dashboard/billing",
    text: "Billing",
    droppable: []
  },
  {
    iconPaths: [
      "/assets/svgs/api-key.svg",
      "/assets/svgs/api-key.svg"
    ],
    link: `/api-keys`,
    href: "/api-keys",
    text: "Api Keys",
    droppable: []
  },
  {
    iconPaths: [
      "/assets/svgs/provider-cred.svg",
      "/assets/svgs/provider-cred.svg"
    ],
    link: `/provider-credentials`,
    href: "/provider-credentials",
    text: "Provider credentials",
    droppable: []
  },
  {
    iconPaths: [
      "/assets/svgs/setting-icon-active.svg",
      "/assets/svgs/setting-icon.svg"
    ],
    link: `/dashboard/settings`,
    href: "/dashboard/settings",
    text: "Settings",
    droppable: []
  },
];
