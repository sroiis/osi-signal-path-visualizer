import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Activity,
  ArrowRight,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { OSI_LAYERS } from "../data/layers";

import { ApplicationLayer } from "./ApplicationLayer";

import { PresentationLayer } from "./layers/PresentationLayer";
import { SessionLayer } from "./layers/SessionLayer";
import { TransportLayer } from "./layers/TransportLayer";
import { NetworkLayer } from "./layers/NetworkLayer";
import { DataLinkLayer } from "./layers/DataLinkLayer";
import { PhysicalLayer } from "./layers/PhysicalLayer";

const layerThemes: Record<
  number,
  {
    accent: string;
    glow: string;
    border: string;
  }
> = {

  7: {
    accent:
      "text-fuchsia-300",

    glow:
      "bg-fuchsia-500/10",

    border:
      "border-fuchsia-400/20",
  },

  6: {
    accent:
      "text-blue-300",

    glow:
      "bg-blue-500/10",

    border:
      "border-blue-400/20",
  },

  5: {
    accent:
      "text-green-300",

    glow:
      "bg-green-500/10",

    border:
      "border-green-400/20",
  },

  4: {
    accent:
      "text-orange-300",

    glow:
      "bg-orange-500/10",

    border:
      "border-orange-400/20",
  },

  3: {
    accent:
      "text-violet-300",

    glow:
      "bg-violet-500/10",

    border:
      "border-violet-400/20",
  },

  2: {
    accent:
      "text-yellow-300",

    glow:
      "bg-yellow-500/10",

    border:
      "border-yellow-400/20",
  },

  1: {
    accent:
      "text-cyan-300",

    glow:
      "bg-cyan-500/10",

    border:
      "border-cyan-400/20",
  },
};

export function LayerByIndex({
  index,
}: {
  index: number;
}) {

  const layer =
    OSI_LAYERS[index];

  const theme =
    layerThemes[
      layer.number
    ];

  const renderLayer =
    () => {

      switch (
        layer.number
      ) {

        case 7:
          return (
            <ApplicationLayer />
          );

        case 6:
          return (
            <PresentationLayer />
          );

        case 5:
          return (
            <SessionLayer />
          );

        case 4:
          return (
            <TransportLayer />
          );

        case 3:
          return (
            <NetworkLayer />
          );

        case 2:
          return (
            <DataLinkLayer />
          );

        case 1:
          return (
            <PhysicalLayer />
          );

        default:
          return null;
      }
    };

  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={
          layer.number
        }

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
          y: -18,
        }}

        transition={{
          duration: 0.35,
        }}

        className="relative"
      >

        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className={`
              absolute
              left-[-80px]
              top-[-80px]

              h-[320px]
              w-[320px]

              blur-[120px]

              ${theme.glow}
            `}
          />

          <div
            className={`
              absolute
              bottom-[-100px]
              right-[-100px]

              h-[320px]
              w-[320px]

              blur-[120px]

              ${theme.glow}
            `}
          />
        </div>

        {/* PANEL */}
        <div
          className="
            relative

            overflow-hidden

            border
            border-white/10

            bg-[#0b1220]/94

            shadow-[0_10px_40px_rgba(0,0,0,0.28)]

            backdrop-blur-xl
          "
        >

          {/* TOP STRIP */}
          <div
            className={`
              relative

              h-[4px]
              w-full

              overflow-hidden
            `}
          >

            <div
              className={`
                absolute
                inset-0

                ${theme.glow}
              `}
            />

            <motion.div
              animate={{
                x: [
                  "-100%",
                  "120%",
                ],
              }}

              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}

              className="
                absolute
                top-0

                h-full
                w-[140px]

                bg-white/20

                blur-md
              "
            />
          </div>

          {/* HEADER */}
          <div className="border-b border-white/10 p-8">

            <div className="flex flex-wrap items-start justify-between gap-8">

              {/* LEFT */}
              <div className="max-w-5xl">

                {/* STATUS */}
                <div
                  className={`
                    inline-flex
                    items-center
                    gap-3

                    border

                    px-4
                    py-2

                    ${theme.border}
                    ${theme.glow}
                  `}
                >

                  <Activity
                    size={15}
                    className={
                      theme.accent
                    }
                  />

                  <span
                    className={`
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]

                      ${theme.accent}
                    `}
                  >
                    Layer Runtime Active
                  </span>
                </div>

                {/* TITLE */}
                <div className="mt-7 flex items-center gap-5">

                  <div
                    className={`
                      flex
                      h-16
                      w-16

                      items-center
                      justify-center

                      border

                      bg-white/[0.03]

                      ${theme.border}
                    `}
                  >

                    <Layers3
                      size={28}
                      className={
                        theme.accent
                      }
                    />

                  </div>

                  <div>

                    <h1
                      className="
                        text-5xl
                        font-black
                        tracking-tight

                        text-white
                      "
                    >
                      {layer.name}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-3">

                      <span
                        className={`
                          text-sm
                          font-semibold
                          uppercase
                          tracking-[0.14em]

                          ${theme.accent}
                        `}
                      >
                        Layer {
                          layer.number
                        }
                      </span>

                      <div className="h-[2px] w-4 bg-white/20" />

                      <span className="text-sm text-gray-400">
                        Protocol Simulation
                      </span>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-7

                    max-w-4xl

                    text-[15px]
                    leading-relaxed

                    text-gray-400
                  "
                >
                  Real-time visualization of{" "}
                  {layer.name} layer
                  behavior including
                  telemetry generation,
                  protocol analysis,
                  packet interaction
                  and layered communication
                  flow inside the
                  OSI architecture.
                </p>

                {/* PIPELINE */}
                <div className="mt-8 flex flex-wrap items-center gap-3">

                  {[
                    "Telemetry",
                    "Protocol Logic",
                    "Signal Flow",
                    "Diagnostics",
                  ].map(
                    (
                      x,
                      i
                    ) => (

                      <div
                        key={x}
                        className="flex items-center gap-3"
                      >

                        <motion.div
                          whileHover={{
                            y: -2,
                          }}

                          className={`
                            border

                            bg-white/[0.03]

                            px-4
                            py-3

                            text-sm
                            font-semibold

                            text-gray-200

                            ${theme.border}
                          `}
                        >

                          {x}

                        </motion.div>

                        {i < 3 ? (

                          <ArrowRight
                            size={15}
                            className="text-gray-600"
                          />

                        ) : null}
                      </div>
                    )
                  )}

                </div>
              </div>

              {/* RIGHT PANEL */}
              <div
                className="
                  min-w-[250px]

                  overflow-hidden

                  border
                  border-white/10

                  bg-[#111827]/70
                "
              >

                {/* TOP */}
                <div className="border-b border-white/10 p-6">

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]

                      text-gray-500
                    "
                  >
                    Active Layer
                  </p>

                  <h2
                    className="
                      mt-4

                      text-7xl
                      font-black

                      text-white
                    "
                  >
                    L{
                      layer.number
                    }
                  </h2>
                </div>

                {/* STATUS */}
                <div className="space-y-5 p-6">

                  <div className="flex items-center gap-3">

                    <ShieldCheck
                      size={18}
                      className={
                        theme.accent
                      }
                    />

                    <span className="text-sm text-gray-300">
                      Layer integrity validated
                    </span>
                  </div>

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        h-3
                        w-3

                        animate-pulse

                        border
                        border-white/10

                        ${theme.glow}
                      `}
                    />

                    <span className="text-sm text-gray-300">
                      Telemetry synchronized
                    </span>
                  </div>

                  <div
                    className="
                      border-t
                      border-white/10
                      pt-5
                    "
                  >

                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Stack Position
                    </p>

                    <div className="mt-4 flex items-center gap-2">

                      {Array.from({
                        length: 7,
                      }).map(
                        (
                          _,
                          i
                        ) => {

                          const active =
                            7 - i ===
                            layer.number;

                          return (
                            <div
                              key={i}

                              className={`
                                h-2
                                flex-1

                                ${
                                  active

                                    ? "bg-white"

                                    : "bg-white/10"
                                }
                              `}
                            />
                          );
                        }
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-6">

            {renderLayer()}

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}