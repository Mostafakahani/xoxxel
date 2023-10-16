import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  IconActiveBlogs,
  IconActiveLearns,
  IconActiveProducts,
  IconBlogs,
  IconBtnChat,
  IconChats,
  IconDashboard,
  IconDashboardDisable,
  IconLearns,
  IconProducts,
  IconTitleUsers,
  IconUsers,
} from "Icons/icons";

export const dataSidebar = [
  {
    href: "/panel/admin",
    text: "محصول",
    icon: <IconDashboardDisable />,
    iconActive: <IconDashboard size="22" />,
  },
  {
    href: "/panel/admin/users",
    text: "اعلامیه قیمت",
    icon: <IconUsers size="22" />,
    iconActive: <IconTitleUsers size="22" />,
  },
  {
    href: "/panel/admin/blogs",
    text: "دسترسی",
    icon: <IconBlogs size="22" />,
    iconActive: <IconActiveBlogs size="22" />,
  },
  {
    href: "/panel/admin/learns",
    text: "سفارشات",
    icon: <IconLearns size="22" />,
    iconActive: <IconActiveLearns size="22" />,
  },
  {
    href: "/panel/admin/products",
    text: "تیکت ها",
    icon: <IconProducts size="22" />,
    iconActive: <IconActiveProducts size="22" />,
  },
  {
    href: "/panel/admin/chats",
    text: "مشتری",
    icon: <IconChats size="22" />,
    iconActive: <IconBtnChat size="22" />,
  },
  {
    href: "/panel/admin/chats",
    text: "Xp",
    icon: <IconChats size="22" />,
    iconActive: <IconBtnChat size="22" />,
  },
  {
    href: "/panel/admin/chats",
    text: "تنظیمات",
    icon: <IconChats size="22" />,
    iconActive: <IconBtnChat size="22" />,
  },
];
