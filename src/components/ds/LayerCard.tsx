import type {
  ReactNode,
} from "react";

import { motion } from "framer-motion";

import { getLayerDesign } from "../../lib/layerDesign";

type Props = {
  layer: number;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function LayerCard({
  layer,
  children,
  className = "",
  contentClassName = "p-7",
}: Props) {

  const t =
    getLayerDesign(layer);

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}

      transition={{
        duration: 0.22,
      }}

      className={`
        relative
        overflow-hidden

        border
        border-white/10

        bg-[#101827]/92

        shadow-[0_8px_26px_rgba(0,0,0,0.22)]

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-white/20

        hover:shadow-[0_12px_34px_rgba(0,0,0,0.26)]

        ${className}
      `}
    >

      {/* TOP LINE */}
      <div
        className="h-[4px] w-full"
        style={{
          background: `linear-gradient(90deg, ${t.accent}, ${t.soft})`,
        }}
      />

      {/* GRID OVERLAY */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -right-10
            top-0

            h-40
            w-40

            opacity-20

            blur-[90px]
          "
          style={{
            background:
              t.accent,
          }}
        />
      </div>

      {/* HEADER BAR */}
      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-between

          border-b
          border-white/10

          px-6
          py-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="h-3 w-3"
            style={{
              background:
                t.accent,
            }}
          />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]

              text-gray-400
            "
          >
            Layer Module
          </span>
        </div>

        <div
          className="
            text-xs
            font-semibold

            text-gray-500
          "
        >
          SIGNALPATH
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`
          relative
          z-10

          ${contentClassName}
        `}
      >
        {children}
      </div>
    </motion.div>
  );
}