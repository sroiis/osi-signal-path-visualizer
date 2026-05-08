import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import {
  computeDownstreamWarnings,
} from "../store/simulatorStore";

import {
  useSimulatorStore,
} from "../store/simulatorStore";

import {
  DelayedTooltip,
} from "./DelayedTooltip";

type Props = {
  filterLayer?: number;
};

export function DownstreamAlerts({
  filterLayer,
}: Props) {

  const application =
    useSimulatorStore(
      (s) => s.application
    );

  const all =
    computeDownstreamWarnings(
      application
    );

  const warnings =
    filterLayer

      ? all.filter(
          (w) =>
            w.targetLayer ===
            filterLayer
        )

      : all;

  if (
    warnings.length === 0
  ) {

    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        relative
        overflow-hidden

        border
        border-orange-400/15

        bg-[#15110a]/92

        shadow-[0_10px_30px_rgba(0,0,0,0.28)]

        backdrop-blur-xl
      "
    >

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-48 w-48 bg-orange-500/10 blur-[110px]" />

        <div className="absolute bottom-0 right-0 h-48 w-48 bg-red-500/10 blur-[110px]" />
      </div>

      {/* HEADER */}
      <div
        className="
          relative
          z-10

          flex
          flex-wrap
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-6
          py-5
        "
      >

        <div className="flex items-center gap-4">

          {/* ICON */}
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}

            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}

            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              border
              border-orange-400/20

              bg-orange-400/[0.08]

              text-orange-300
            "
          >

            <AlertTriangle
              size={22}
            />

          </motion.div>

          {/* TEXT */}
          <div>

            <DelayedTooltip
              content="Application layer decisions propagate into transport behavior, routing performance and lower-layer transmission characteristics."
              delayMs={500}
            >

              <h3
                className="
                  cursor-default

                  text-2xl
                  font-black

                  tracking-tight

                  text-white
                "
              >
                Downstream Impact Analysis
              </h3>

            </DelayedTooltip>

            <p
              className="
                mt-1

                text-sm

                text-orange-200/60
              "
            >
              Real-time dependency monitoring across the OSI stack
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div
          className="
            flex
            items-center
            gap-3

            border
            border-green-400/15

            bg-green-400/[0.05]

            px-4
            py-2
          "
        >

          <div className="h-2 w-2 bg-green-400 animate-pulse" />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]

              text-green-300
            "
          >
            Monitoring Active
          </span>
        </div>
      </div>

      {/* WARNINGS */}
      <div
        className="
          relative
          z-10

          flex
          flex-col
          gap-4

          p-6
        "
      >

        <AnimatePresence>

          {warnings.map(
            (
              w,
              i
            ) => (

              <motion.div
                key={w.message}

                initial={{
                  opacity: 0,
                  x: -10,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                exit={{
                  opacity: 0,
                  x: 10,
                }}

                transition={{
                  delay:
                    i * 0.05,
                }}

                whileHover={{
                  y: -2,
                }}

                className="
                  relative
                  overflow-hidden

                  border
                  border-white/10

                  bg-[#0f172a]/75

                  p-5

                  transition-all
                  duration-300

                  hover:border-orange-400/20
                "
              >

                {/* INNER GLOW */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">

                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/[0.03] to-red-400/[0.03]" />

                </div>

                <div className="relative z-10 flex items-start gap-5">

                  {/* BADGE */}
                  <div
                    className="
                      flex
                      h-14
                      min-w-[56px]

                      items-center
                      justify-center

                      border
                      border-orange-400/20

                      bg-orange-400/[0.08]

                      text-lg
                      font-black

                      text-orange-300
                    "
                  >

                    L{
                      w.targetLayer
                    }

                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">

                    {/* TOP */}
                    <div className="mb-3 flex items-center gap-3">

                      <span
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.18em]

                          text-orange-300
                        "
                      >
                        Dependency Triggered
                      </span>

                      <ArrowRight
                        size={14}
                        className="text-orange-400"
                      />

                      <div className="h-px flex-1 bg-gradient-to-r from-orange-400/30 to-transparent" />
                    </div>

                    {/* MESSAGE */}
                    <p
                      className="
                        text-[15px]
                        leading-relaxed

                        text-gray-300
                      "
                    >
                      {w.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <div
        className="
          relative
          z-10

          border-t
          border-white/10

          px-6
          py-4
        "
      >

        <div className="flex flex-wrap items-center justify-between gap-4">

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]

              text-orange-300/70
            "
          >
            SignalPath Dependency Engine
          </span>

          <div className="flex items-center gap-3 text-sm text-gray-400">

            <div className="h-2 w-2 bg-blue-400 animate-pulse" />

            Real-time Cross Layer Telemetry
          </div>
        </div>
      </div>
    </motion.div>
  );
}