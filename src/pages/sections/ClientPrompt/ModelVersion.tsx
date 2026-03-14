import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useModelStore } from "@/store/useModelStore";

const ModelVersion = () => {
  const { versionSelection, setVersion } = useModelStore();
  return (
    <div className=" bg-gradient-to-br from-black  to-yellow-700/40 p-8 rounded-md border-none">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 tracking-wide">
          Model Version
        </label>
        <Select
          value={versionSelection}
          onValueChange={(value) => setVersion(value)}
        >
          <SelectTrigger className="w-full max-w-64 bg-black border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 rounded-xl px-4 py-6 text-slate-200 shadow-lg shadow-black/50 backdrop-blur-sm group">
            <SelectValue placeholder="Select model version" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </SelectTrigger>

          <SelectContent className="bg-slate-900 border-slate-800 text-slate-200 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel className="text-indigo-400/30 text-xs font-semibold tracking-wider px-3 py-2">
                AVAILABLE VERSIONS
              </SelectLabel>

              <SelectItem
                value="version_1"
                className="focus:bg-indigo-500/20 focus:text-indigo-300 data-[highlighted]:bg-indigo-500/20 data-[highlighted]:text-indigo-300 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 hover:pl-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div>
                    <div className="font-medium">Version 1</div>
                    <div className="text-xs text-slate-500">Stable release</div>
                  </div>
                </div>
              </SelectItem>

              <SelectItem
                value="version_2"
                className="focus:bg-indigo-500/20 focus:text-indigo-300 data-[highlighted]:bg-indigo-500/20 data-[highlighted]:text-indigo-300 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 hover:pl-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <div className="font-medium">Version 2</div>
                    <div className="text-xs text-slate-500">
                      Latest features
                    </div>
                  </div>
                </div>
              </SelectItem>

              <SelectItem
                value="version_3"
                className="focus:bg-indigo-500/20 focus:text-indigo-300 data-[highlighted]:bg-indigo-500/20 data-[highlighted]:text-indigo-300 rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 hover:pl-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div>
                    <div className="font-medium">Version 3</div>
                    <div className="text-xs text-slate-500">Beta preview</div>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>

            <SelectSeparator className="bg-slate-800 my-2" />

            <div className="px-3 py-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>Select a version to continue</span>
              </div>
            </div>
          </SelectContent>
        </Select>

        <p className="text-xs text-slate-600 mt-2">
          Choose the model version for your inference
        </p>
      </div>
    </div>
  );
};

export default ModelVersion;
