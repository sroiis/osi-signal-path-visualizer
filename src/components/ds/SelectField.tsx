import type {
  ReactNode,
  ChangeEvent,
} from "react";

import {
  ChevronDown,
} from "lucide-react";

import { DelayedTooltip } from "../DelayedTooltip";

type Props = {
  layer: number;
  label: string;
  tooltip?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
  children: ReactNode;
};

export function SelectField({
  label,
  tooltip,
  value,
  onChange,
  children,
}: Props) {

  return (
    <div className="flex flex-col gap-4">

      {/* LABEL */}
      <DelayedTooltip
        content={
          tooltip ?? ""
        }
        delayMs={500}
      >

        <label
          className="
            cursor-help

            text-[14px]
            font-semibold
            uppercase
            tracking-[0.08em]

            text-gray-300
          "
        >
          {label}
        </label>

      </DelayedTooltip>

      {/* SELECT WRAPPER */}
      <div className="relative">

        {/* ICON */}
        <div
          className="
            pointer-events-none

            absolute
            right-4
            top-1/2
            z-10

            -translate-y-1/2

            text-orange-300
          "
        >

          <ChevronDown size={18} />

        </div>

        {/* SELECT */}
        <select
          value={value}
          onChange={onChange}

          className="
            h-12
            w-full

            appearance-none

            border
            border-white/10

            bg-[#0f172a]/95

            px-4
            pr-12

            text-[14px]
            font-medium

            text-white

            shadow-[0_8px_22px_rgba(0,0,0,0.18)]

            outline-none

            transition-all
            duration-200

            hover:border-white/20

            focus:border-orange-400/40
            focus:bg-[#132033]

            focus:shadow-[0_0_18px_rgba(251,146,60,0.08)]
          "
        >

          {children}

        </select>

        {/* BOTTOM LINE */}
        <div
          className="
            pointer-events-none

            absolute
            bottom-0
            left-0

            h-[2px]
            w-full

            bg-gradient-to-r
            from-orange-400/0
            via-orange-400/30
            to-blue-400/0
          "
        />
      </div>
    </div>
  );
}