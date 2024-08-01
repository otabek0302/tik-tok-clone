import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { RiLiveLine, RiUserLine, RiUserReceived2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";

export const topics = [
  {
    name: "development",
    icon: <BsCode />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const company = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
];
export const program = [
  "TikTik for Good",
  "Advertise",
  "TikTok LIVE Creator Networks",
  "Developers",
  "TikTik Rewards",
  "TikTok Embeds",
  "TikTok Music"
];
export const terms_polices = [
  "Help",
  "Safety",
  "Terms and Conditions",
  "Privacy Policy",
  "Creator Academy",
  "Community Guidelines",
];

export const sidebarNav = [
  {
    link: "/",
    icon: <AiFillHome className="text-lg" />,
    name: "For you"
  },
  {
    link: "/following",
    icon: <RiUserReceived2Line className="text-lg" />,
    name: "Following"
  },
  {
    link: "/friends",
    icon: <FiUsers className="text-lg" />,
    name: "Friends"
  },
  {
    link: "/explore",
    icon: <MdOutlineExplore className="text-lg" />,
    name: "Explore"
  },
  {
    link: "/profile",
    icon: <RiUserLine className="text-lg" />,
    name: "Profile"
  },
]