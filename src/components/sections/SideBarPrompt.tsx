"use client";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoIosArrowRoundForward, IoIosArrowRoundDown } from "react-icons/io";
import DropDown from "@/pages/sections/DropDown/DropDown";
import BottomUser from "@/pages/sections/PromptSlide/BottomUser";
import { useModelStore } from "@/store/useModelStore";
import { useNavigate } from "react-router-dom";
interface SideBarType {
  sideBarOpenbtn: boolean;
  setsideBarOpenbtn: (value: boolean) => void;
}

const versions = [
  { value: "version_1", label: "Version 1", tag: "legacy" },
  { value: "version_2", label: "Version 2", tag: "stable" },
  { value: "version_3", label: "Version 3", tag: "beta" },
];

const SideBarPrompt = ({ sideBarOpenbtn, setsideBarOpenbtn }: SideBarType) => {
  const { versionSelection, setVersion } = useModelStore();
  const [versionOpen, setVersionOpen] = useState(false);
  const [arrowState, setArrowState] = useState(true);
  const [promptNameState, setPromptNameState] = useState(
    "This is music prompt 1",
  );
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [renameClicked, setRenameClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const selectedVersion =
    versions.find((v) => v.value === versionSelection) ?? versions[1];

  useGSAP(() => {
    gsap.to(".sideBar", { x: sideBarOpenbtn ? 0 : "-100%" });
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
    <div
      className="sideBar relative flex flex-col h-screen w-[260px]
        bg-[#111214] border-r border-[#1e2028]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] mt-5 pt-[18px]">
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className="w-30 h-10 cursor-pointer bg-[#1DB954]/2  rounded-[8px] flex items-center justify-start"
          >
            <img
              src="/photos/Logo_3.png"
              alt="logo"
              className="w-25 h-25 object-center mt-2"
            />
          </div>
          {/* <span className="text-sm font-semibold text-white tracking-tight">
            Sonix AI
          </span> */}
        </div>
        <button
          onClick={() => setsideBarOpenbtn(!sideBarOpenbtn)}
          className="w-7 h-7 rounded-lg bg-[#1e2028] hover:bg-[#2a2d38]
            flex items-center justify-center transition-colors"
        >
          <IoClose size={14} className="text-[#888]" />
        </button>
      </div>

      {/* Version Card */}
      <div className="mx-[18px] mt-[28px] bg-[#161719] border border-[#1e2028] rounded-xl p-[14px_16px]">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#444] font-medium mb-2.5">
          Active Model
        </p>
        <div className="relative">
          <button
            onClick={() => setVersionOpen((o) => !o)}
            className={`w-full bg-[#111214] rounded-[9px] px-3 py-2.5 flex items-center
              justify-between transition-colors border
              ${versionOpen ? "border-[#1DB954]" : "border-[#252830] hover:border-[#1DB954]"}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1DB954] flex-shrink-0" />
              <span className="text-[13px] font-medium text-[#e8e8e8] tracking-tight">
                {selectedVersion.label}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-[#555] transition-transform ${versionOpen ? "rotate-180" : ""}`}
            />
          </button>

          {versionOpen && (
            <div
              className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#1a1c22]
              border border-[#252830] rounded-xl overflow-hidden z-50"
            >
              {versions.map((v) => (
                <button
                  key={v.value}
                  onClick={() => {
                    setVersion(v.value);
                    setVersionOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left
                    transition-colors
                    ${
                      versionSelection === v.value
                        ? "bg-[#0a2016]"
                        : "hover:bg-[#222530]"
                    }`}
                >
                  <span
                    className={`w-[7px] h-[7px] rounded-full flex-shrink-0 transition-colors ${
                      versionSelection === v.value
                        ? "bg-[#1DB954]"
                        : "bg-[#252830]"
                    }`}
                  />
                  <span
                    className={`text-[13px] ${
                      versionSelection === v.value
                        ? "text-[#1DB954]"
                        : "text-[#aaa]"
                    }`}
                  >
                    {v.label}
                  </span>
                  <span
                    className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full
                    bg-[#0a2016] text-[#1DB954] border border-[#1a4a2a] font-medium"
                  >
                    {v.tag}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active badge */}
        <div
          className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1
          bg-[#0a2016] border border-[#1a4a2a] rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
          <span className="text-[11px] text-[#1DB954] font-medium">
            {selectedVersion.label} — active
          </span>
        </div>
      </div>

      {/* Chats section */}
      <div
        onClick={() => setArrowState(!arrowState)}
        className="flex items-center justify-between px-[18px] pt-[18px] pb-2 cursor-pointer"
      >
        <span className="text-[11px] uppercase tracking-[0.1em] text-[#444] font-medium">
          Chats
        </span>
        <span className="text-[#555] hover:text-[#1DB954] transition-colors text-xs">
          {arrowState ? (
            <IoIosArrowRoundForward size={16} />
          ) : (
            <IoIosArrowRoundDown size={16} />
          )}
        </span>
      </div>

      {/* Chat list */}
      <div className="sidebar-scroll flex-1 overflow-y-auto px-2.5 pb-2">
        {!arrowState && (
          <div className="mt-1 rounded-[9px] bg-[#161719] border border-[#1e2028]">
            <div className="px-2.5 py-2 flex items-center justify-between">
              <input
                ref={inputRef}
                className={`border-none bg-transparent outline-none text-[13px] flex-1 font-medium
                  ${!isEditing ? "text-[#666] cursor-not-allowed" : "text-white"}`}
                disabled={!isEditing}
                onBlur={handleBlur}
                onChange={(e) => setPromptNameState(e.target.value)}
                value={promptNameState}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <DropDown onRenameClick={handleRenameClick} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom user */}
      <div className="mt-auto border-t border-[#1a1c22]">
        <BottomUser />
      </div>
    </div>
  );
};

export default SideBarPrompt;
