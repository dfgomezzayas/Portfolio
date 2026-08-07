import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiJavascript,
} from "react-icons/si";
import { BsDatabaseFill } from "react-icons/bs";
import { FiCode, FiLayers, FiZap } from "react-icons/fi";
import type { CoreTech, Pillar } from "@/types";

export const coreTech: CoreTech[] = [
  { icon: SiReact, label: "React", color: "text-sky-400" },
  { icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-teal-400" },
  { icon: SiPython, label: "Python", color: "text-blue-400" },
  { icon: SiFastapi, label: "FastAPI", color: "text-emerald-400" },
  { icon: BsDatabaseFill, label: "SQL Server", color: "text-green-400" },
];

export const pillars: Pillar[] = [
  { icon: FiCode, key: "clean" },
  { icon: FiLayers, key: "ownership" },
  { icon: FiZap, key: "perf" },
];
