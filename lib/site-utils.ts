import type { ComponentType, SVGProps } from "react";
import {
  Anchor, BriefcaseBusiness, Cable, Cog, Droplets, Factory, Flame, Fuel,
  HardHat, Heart, Handshake, Layers3, MonitorCog, Package, Pickaxe, Printer,
  Scale, ShieldCheck, Ship, Sparkles, Wrench, Zap,
} from "lucide-react";

export const navIds = ["home", "about", "services", "sectors", "partners", "contact"] as const;
export type NavId = (typeof navIds)[number];
export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export const serviceIcons: Icon[] = [
  BriefcaseBusiness, Zap, HardHat, Printer, Flame, Anchor,
  Droplets, Layers3, Package, Cog, MonitorCog, Wrench,
];

export const valueIcons: Icon[] = [ShieldCheck, Handshake, Sparkles, Heart, Scale];

export const sectorIcons: Icon[] = [Pickaxe, Fuel, Ship, Zap, Factory];

export const partners = [
  ["Vale Moçambique", "Cabos eléctricos, peças industriais, motores, hidráulica e segurança"],
  ["Jindal", "Material eléctrico"],
  ["Van Oord", "Elevação e limpeza"],
  ["Porto de Maputo · MPDC", "Materiais hidráulicos, eléctricos e mecânicos"],
  ["DP World", "Pneus para gruas, lubrificantes e EPI"],
  ["HCB", "Material químico e tintas de protecção"],
  ["Tongaat Hulett", "Válvulas, cabos e painéis industriais"],
  ["Grindrod", "Cabos eléctricos"],
  ["Sasol", "Material eléctrico, de escritório e válvulas"],
  ["Gigawatt Moçambique", "Material mecânico e de soldadura"],
  ["CTRG", "Material eléctrico, mecânico e gases"],
  ["Bakhresa Group", "Material hidráulico"],
  ["Cornelder", "Pneus industriais e elevação"],
  ["Fura Gems", "Material eléctrico, ferramentas e hidráulica"],
  ["Montepuez Ruby Mining", "Saúde e segurança ocupacional"],
] as const;

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}