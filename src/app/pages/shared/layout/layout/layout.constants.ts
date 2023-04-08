import { SideNavigation } from "@ga/navigation";

export const adminNavConfig: SideNavigation[] = [
  {
    name: "Dashboard",
    url: "admin-dashboard",
    iconUrl: "../../../../assets/icons/sprite.svg#dashboard",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "My Merchants",
    url: "/merchants",
    iconUrl: "../../../../assets/icons/sprite.svg#merchant",
    permission: 'CAN_VIEW_MERCHANT'
  },
  {
    name: "Entities",
    url: "/entities",
    iconUrl: "../../../../assets/icons/sprite.svg#entities",
    permission: 'CAN_VIEW_SUBSCRIPTION'
  },
  {
    name: "Banks",
    url: "/banks",
    iconUrl: "../../../../assets/icons/sprite.svg#banks",
    permission: 'CAN_VIEW_MERCHANT'
  },
  {
    name: "Subscriptions",
    url: "/subscriptions",
    iconUrl: "../../../../assets/icons/sprite.svg#pay",
    permission: 'CAN_VIEW_SUBSCRIPTION'
  },
  {
    name: "Devices",
    url: "/devices",
    iconUrl: "../../../../assets/icons/sprite.svg#device",
    permission: 'CAN_VIEW_ALL_DEVICES'
  },
  {
    name: "Reports",
    url: "/reports",
    iconUrl: "../../../../assets/icons/sprite.svg#report",
    permission: 'CAN_VIEW_ADMIN_REPORT'
  },
  {
    name: "Users",
    url: "/staff",
    iconUrl: "../../../../assets/icons/sprite.svg#user",
    permission: 'CAN_VIEW_ALL_USER'
  },
];

export const adminNavConfigMinor: SideNavigation[] = [
  {
    name: "Audit Logs",
    url: "/audits",
    iconUrl: "../../../../assets/icons/sprite.svg#audit",
    permission: 'CAN_VIEW_MERCHANT'
  },
  {
    name: "Support",
    url: "/support",
    iconUrl: "../../../../assets/icons/sprite.svg#dispute",
  },
];

export const clientNavConfig: SideNavigation[] = [
  {
    name: "Dashboard",
    url: "/dashboard/client",
    iconUrl: "../../../../../assets/icons/sprite.svg#dashboard",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Beneficiaries",
    url: "/x",
    iconUrl: "../../../../../assets/icons/sprite.svg#user",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Cards",
    url: "/x",
    iconUrl: "../../../../assets/icons/sprite.svg#pay",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Vendors",
    url: "/x",
    iconUrl: "../../../../../assets/icons/sprite.svg#merchant",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Reports",
    url: "/x",
    iconUrl: "../../../../assets/icons/sprite.svg#report",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Pay Now",
    url: "/x",
    iconUrl: "../../../../assets/icons/sprite.svg#pay",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
  {
    name: "Audit Trails",
    url: "/x",
    iconUrl: "../../../../assets/icons/sprite.svg#audit",
    permission: 'CAN_VIEW_MERCHANT_DASHBOARD'
  },
];

export const clientNavConfigMinor: SideNavigation[] = [
  {
    name: "Support",
    url: "/support",
    iconUrl: "../../../../assets/icons/sprite.svg#dispute",
  },
];
