import type { ReactNode } from "react";

type LaptopFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function LaptopFrame({ children, className = "" }: LaptopFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[1100px] ${className}`}>
      {/* Lid */}
      <div className="relative rounded-[12px] bg-[#1c1c1e] p-[9px] shadow-[0_40px_80px_-28px_rgba(0,0,0,0.45)] sm:rounded-[16px] sm:p-[11px] md:rounded-[20px] md:p-[13px]">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[4px] z-10 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#0c0c0e] ring-[1.5px] ring-[#2a2a2e] sm:top-[5px] sm:h-[4px] sm:w-[4px] md:top-[6px]"
        />

        <div className="relative aspect-video overflow-hidden rounded-[3px] bg-black sm:rounded-[5px] md:rounded-[7px]">
          {children}
        </div>
      </div>

      {/* Chin / hinge strip */}
      <div className="relative mx-auto -mt-px">
        <div className="h-[9px] bg-gradient-to-b from-[#2a2a2e] via-[#232326] to-[#1a1a1c] sm:h-[11px] md:h-[13px]" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[5px] w-[15%] -translate-x-1/2 rounded-b-[4px] bg-gradient-to-b from-[#141416] to-[#0e0e10] sm:h-[6px] md:h-[7px]"
        />
      </div>

      {/* Base plate — slightly wider than lid */}
      <div className="relative -mx-[1.2%] h-[10px] rounded-b-[6px] bg-gradient-to-b from-[#2e2e32] via-[#242428] to-[#18181a] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] sm:-mx-[1.4%] sm:h-[12px] sm:rounded-b-[8px] md:-mx-[1.6%] md:h-[14px]" />
    </div>
  );
}
