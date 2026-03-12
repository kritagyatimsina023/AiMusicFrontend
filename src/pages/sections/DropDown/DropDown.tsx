import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { Archive, Share } from "lucide-react";
import { Pencil } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DropDownProps {
  onRenameClick: () => void;
}

const DropDown = ({ onRenameClick }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none">
        <BsThreeDots className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-[#181818] mt-3 rounded-2xl">
        {/* <DropdownMenuLabel>
            <div className="flex items-center justify-evenly">
              <Share size={20} />
              <span>Share</span>
            </div>
          </DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Share size={20} />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRenameClick} className="cursor-pointer">
          {" "}
          <Pencil size={20} />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Archive size={20} />
          <span>Archive</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <RiDeleteBin6Line className="text-red-500" size={20} />
          <span className="text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
