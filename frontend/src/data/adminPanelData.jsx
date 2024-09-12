import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { PiStepsFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

const adminPanelList = [
  {
    label: "Dashboard",
    icon: <IoMdAnalytics />, 
    path: "dashboard",
  },
  {
    label: "Product Catalog",
    icon: <AiFillProduct />,
    path: "all-products",
  },
  {
    label: "User Accounts",
    icon: <FaUser />,
    path: "users",
  },
  {
    label: "Orders",
    icon: <BsCartCheckFill />,
    path: "orders",
  },
  {
    label: "Inventory",
    icon: <MdInventory />,
  },
  {
    label: "Reports",
    icon: <BiSolidReport />,
  },
  {
    label: "Promotions",
    icon: <PiStepsFill />,
  },
  {
    label: "Support",
    icon: <BiSupport />,
  },
  {
    label: "Settings",
    icon: <IoMdSettings />,
  },
  {
    label: "Security",
    icon: <MdOutlineSecurity />,
  },
  {
    label: "Notification",
    icon: <IoIosNotifications />,
  },
];

export default adminPanelList;
