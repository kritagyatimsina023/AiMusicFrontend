"use client";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { ArrowBigRight } from "lucide-react";

import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import DropDown from "@/pages/sections/DropDown/DropDown";
import BottomUser from "@/pages/sections/PromptSlide/BottomUser";

// interface typeToggle {
//   onToggle: () => void;
// }
interface sideBarType {
  sideBarOpenbtn: boolean;
  setsideBarOpenbtn: (value: boolean) => void;
}
const SideBarPrompt = ({ sideBarOpenbtn, setsideBarOpenbtn }: sideBarType) => {
  // const [sideBarOpenbtn, setsideBarOpenbtn] = useState<boolean>(false);
  const [arrowState, setArrowState] = useState<boolean>(true);
  const [promptNameState, setPromptNameState] = useState<string>(
    "THis is music prompt 1",
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [renameClicked, setRenameClicked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  function SideBarClose() {
    gsap.to(".sideBar", {
      x: "-100%",
    });
  }
  function SideBarOpen() {
    gsap.to(".sideBar", {
      x: 0,
    });
  }
  useGSAP(() => {
    if (sideBarOpenbtn) {
      SideBarOpen();
    } else {
      SideBarClose();
    }
  }, [sideBarOpenbtn]);

  function handleRenameClick() {
    setRenameClicked(true);
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }, 0);
  }
  function handleBlur() {
    if (renameClicked) {
      setRenameClicked(false);
      return;
    }
    setIsEditing(false);
  }

  return (
    <>
      <div className="sideBar p-5 relative bg-linear-to-br from-white/15 border-r border-white/10 to-black/40 h-screen backdrop-blur-2xl flex flex-col">
        <div className="flex justify-between">
          <div>Logo</div>
          <div className="cursor-pointer">
            <IoClose
              onClick={() => {
                setsideBarOpenbtn(!sideBarOpenbtn);
              }}
            />
          </div>
        </div>
        <div
          onClick={() => setArrowState(!arrowState)}
          className=" mt-10 cursor-pointer"
        >
          <h2 className="flex items-center gap-2 group ">
            Chats
            <span className="hidden group-hover:block">
              {arrowState ? (
                <IoIosArrowRoundForward size={20} />
              ) : (
                <IoIosArrowRoundDown size={20} />
              )}
            </span>
          </h2>
        </div>
        <div className="sidebar-scroll mt-5 overflow-y-auto flex-1 pr-2 pb-32">
          {!arrowState && (
            <div className="mt-4 rounded-full bg-[#242424]/50">
              <div className="px-2 py-1.5 flex items-center justify-between">
                <input
                  ref={inputRef}
                  className={`border-none bg-transparent outline-none ${
                    !isEditing
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-white"
                  }`}
                  disabled={!isEditing}
                  onBlur={handleBlur}
                  onChange={(e) => setPromptNameState(e.target.value)}
                  value={promptNameState}
                />
                <DropDown onRenameClick={handleRenameClick} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-auto pb-3">
          <BottomUser />
        </div>
      </div>
    </>
  );
};

export default SideBarPrompt;
