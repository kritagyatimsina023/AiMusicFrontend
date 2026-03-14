import { Share2Icon } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { CloudCog } from "lucide-react";
import { LockIcon } from "lucide-react";
import { Trash2 } from "lucide-react";

interface DataSafety {
  logo: LucideIcon;
  heading: string;
  paragraph?: string;
  verified?: boolean;
}
const DataSafetyInfo: DataSafety[] = [
  {
    logo: Share2Icon,
    heading: "No data shared with third parties",
    paragraph: "Learn more about how developers declare sharing",
  },
  {
    logo: CloudCog,
    heading: "This app may collect these data types",
    paragraph: "Personal info and 6 others",
    verified: true,
  },
  {
    logo: LockIcon,
    heading: "Data is encrypted in transit",
    verified: true,
  },
  {
    logo: Trash2,
    heading: "You can request that data be deleted",
    verified: true,
  },
];
export default DataSafetyInfo;
