// import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { FaGithub, FaFacebook } from "react-icons/fa";

interface iconType {
  icons: IconType;
  iconsNames: string;
}
const icons: iconType[] = [
  {
    icons: FaGithub,
    iconsNames: "Github",
  },
  {
    icons: FaFacebook,
    iconsNames: "facebook",
  },
];
export default icons;
