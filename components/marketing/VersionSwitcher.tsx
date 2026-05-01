"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { label: "V1", href: "/", desc: "Current" },
  { label: "V2", href: "/v2", desc: "Broadcast" },
  { label: "V3", href: "/v3", desc: "Editorial" },
];

export function VersionSwitcher() {
  const pathname = usePathname();

  const active =
    pathname === "/" ? "V1" : pathname === "/v2" ? "V2" : pathname === "/v3" ? "V3" : null;

  if (!active) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-[#0a0a0a]/95 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <span className="pl-2 pr-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">
          Preview
        </span>
        {versions.map(({ label, href, desc }) => {
          const isActive = active === label;
          return (
            <Link
              key={label}
              href={href}
              className={[
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all",
                isActive
                  ? "bg-[#ff6600] text-white shadow-[0_0_14px_rgba(255,102,0,0.5)]"
                  : "text-white/55 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {label}
              <span
                className={[
                  "hidden text-[10px] font-normal sm:inline",
                  isActive ? "text-white/75" : "text-white/35",
                ].join(" ")}
              >
                {desc}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
