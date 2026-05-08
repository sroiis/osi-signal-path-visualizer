import type {
  ChangeEvent,
} from "react";

import { DelayedTooltip } from "../DelayedTooltip";

type Props = {
  layer: number;
  label: string;
  tooltip?: string;
  valueDisplay?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
};

export function SliderField({
  label,
  tooltip,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
}: Props) {

  const progress =
    ((value - min) /
      (max - min)) *
    100;

  return (
    <div className="flex flex-col gap-4">

      {/* TOP */}
      <div className="flex items-center justify-between gap-5">

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

        {valueDisplay ? (
          <div
            className="
              border
              border-orange-400/20

              bg-orange-400/[0.06]

              px-3
              py-1.5

              text-sm
              font-semibold

              text-orange-300
            "
          >
            {valueDisplay}
          </div>
        ) : null}
      </div>

      {/* SLIDER */}
      <div className="relative">

        {/* TRACK */}
        <div
          className="
            absolute
            left-0
            top-1/2

            h-[6px]
            w-full

            -translate-y-1/2

            bg-white/10
          "
        />

        {/* ACTIVE TRACK */}
        <div
          className="
            absolute
            left-0
            top-1/2

            h-[6px]

            -translate-y-1/2

            bg-gradient-to-r
            from-orange-400
            to-blue-400
          "
          style={{
            width: `${progress}%`,
          }}
        />

        {/* INPUT */}
        <input
          type="range"

          min={min}
          max={max}
          step={step}

          value={value}

          onChange={onChange}

          className="
            relative
            z-10

            h-6
            w-full

            cursor-pointer
            appearance-none

            bg-transparent

            [&::-webkit-slider-thumb]:appearance-none

            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5

            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-white/20

            [&::-webkit-slider-thumb]:bg-white

            [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(255,255,255,0.35)]

            [&::-webkit-slider-thumb]:transition-all

            hover:[&::-webkit-slider-thumb]:scale-105

            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:w-5

            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-white/20

            [&::-moz-range-thumb]:bg-white
          "
        />
      </div>
    </div>
  );
}