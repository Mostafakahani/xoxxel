import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  IconAccess,
  IconOrders,
  IconTickets,
  IconAccessDisable,
  IconCustomer,
  IconSetting,
  IconSettingDisable,
  IconXpDisable,
  IconProduct,
  IconProductDisable,
  IconOrdersDisable,
  IconTicketsDisable,
  IconPrice,
  IconPriceDisable,
  IconCustomerDisable,
  IconXp,
} from "Icons/icons";

export const dataSidebar = [
  {
    href: "/panel/admin/products",
    text: "محصول",
    icon: <IconProductDisable />,
    iconActive: <IconProduct size="22" />,
  },
  {
    href: "/panel/admin/Categories",
    text: "دسته بندی ها",
    icon: <IconProductDisable />,
    iconActive: <IconProduct size="22" />,
  },
  {
    href: "/panel/admin/Regons",
    text: "منطقه ها",
    icon: <IconProductDisable />,
    iconActive: <IconProduct size="22" />,
  },
  {
    href: "/panel/admin/UpdatePrices",
    text: "اعلامیه قیمت",
    icon: <IconPriceDisable size="22" />,
    iconActive: <IconPrice size="22" />,
  },
  {
    href: "/panel/admin/Access",
    text: "دسترسی",
    icon: <IconAccessDisable size="22" />,
    iconActive: <IconAccess size="22" />,
  },
  {
    href: "/panel/admin/Orders",
    text: "سفارشات",
    icon: <IconOrdersDisable size="22" />,
    iconActive: <IconOrders size="22" />,
  },
  {
    href: "/panel/admin/Payment",
    text: "پرداخت ها",
    icon: <IconOrdersDisable size="22" />,
    iconActive: <IconOrders size="22" />,
  },
  {
    href: "/panel/admin/Tickets",
    text: "تیکت ها",
    icon: <IconTicketsDisable size="22" />,
    iconActive: <IconTickets size="22" />,
  },
  {
    href: "/panel/admin/Departments",
    text: "دپارتمان ها",
    icon: <IconTicketsDisable size="22" />,
    iconActive: <IconTickets size="22" />,
  },
  {
    href: "/panel/admin/Customer",
    text: "مشتری",
    icon: <IconCustomerDisable size="22" />,
    iconActive: <IconCustomer size="22" />,
  },
  {
    href: "/panel/admin/Option",
    text: "ویژگی",
    icon: <IconXpDisable size="22" />,
    iconActive: <IconXp size="22" />,
  },
  {
    href: "/panel/admin/Xp",
    text: "Xp",
    icon: <IconXpDisable size="22" />,
    iconActive: <IconXp size="22" />,
  },
  {
    href: "/panel/admin/Setting",
    text: "تنظیمات",
    icon: <IconSettingDisable size="22" />,
    iconActive: <IconSetting size="22" />,
  },
];
