import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Activity,
  Binary,
  Cpu,
  Network,
  ShieldCheck,
} from "lucide-react";

type Props = {
  visible: boolean;
};

const steps = [
  "Initializing SignalPath Core",
  "Loading OSI Runtime Engine",
  "Starting Telemetry Services",
  "Establishing Layer Synchronization",
  "Verifying Packet Diagnostics",
  "Activating Protocol Stack",
];

export function BootSequence({
  visible,
}: Props) {

  return (
    <AnimatePresence>

      {visible ? (

        <motion.div
          initial={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 0.6,
          }}

          className="
            fixed
            inset-0
            z-[999]

            overflow-hidden

            bg-[#050816]
          "
        >

          {/* GRID */}
          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]

              bg-[size:42px_42px]
            "
          />

          {/* GLOWS */}
          <div
            className="
              absolute
              left-[-120px]
              top-[-120px]

              h-[520px]
              w-[520px]

              bg-cyan-500/10

              blur-[140px]
            "
          />

          <div
            className="
              absolute
              bottom-[-120px]
              right-[-120px]

              h-[520px]
              w-[520px]

              bg-violet-500/10

              blur-[140px]
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10

              flex
              min-h-screen
              flex-col
              items-center
              justify-center

              px-6
            "
          >

            {/* TOP */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              className="text-center"
            >

              {/* ICON */}
              <motion.div
                animate={{
                  rotate: [0, 4, -4, 0],
                }}

                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}

                className="
                  relative
                  mx-auto

                  flex
                  h-28
                  w-28

                  items-center
                  justify-center

                  overflow-hidden

                  border
                  border-cyan-400/20

                  bg-[#0f172a]

                  shadow-[0_0_60px_rgba(34,211,238,0.14)]
                "
              >

                {/* BG */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-br
                    from-cyan-400/10
                    to-violet-500/10
                  "
                />

                <Network
                  size={52}
                  className="
                    relative
                    z-10

                    text-cyan-300
                  "
                />
              </motion.div>

              {/* TITLE */}
              <h1
                className="
                  mt-10

                  text-6xl
                  font-black
                  tracking-tight

                  text-white
                "
              >
                SignalPath
              </h1>

              <p
                className="
                  mt-4

                  text-lg

                  text-gray-400
                "
              >
                Advanced OSI Layer Simulation Environment
              </p>
            </motion.div>

            {/* STEPS */}
            <div className="mt-14 w-full max-w-3xl">

              <div className="space-y-4">

                {steps.map(
                  (
                    step,
                    i
                  ) => (

                    <motion.div
                      key={step}

                      initial={{
                        opacity: 0,
                        x: -10,
                      }}

                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      transition={{
                        delay:
                          i * 0.45,
                      }}

                      className="
                        overflow-hidden

                        border
                        border-white/10

                        bg-[#0f172a]/80

                        p-5

                        backdrop-blur-xl
                      "
                    >

                      <div className="flex items-center justify-between gap-6">

                        {/* LEFT */}
                        <div className="flex items-center gap-4">

                          <div
                            className="
                              flex
                              h-12
                              w-12

                              items-center
                              justify-center

                              border
                              border-cyan-400/20

                              bg-cyan-400/[0.06]

                              text-cyan-300
                            "
                          >

                            {i % 5 === 0 ? (
                              <Cpu size={18} />
                            ) : i % 5 === 1 ? (
                              <Binary size={18} />
                            ) : i % 5 === 2 ? (
                              <Activity size={18} />
                            ) : i % 5 === 3 ? (
                              <ShieldCheck size={18} />
                            ) : (
                              <Network size={18} />
                            )}

                          </div>

                          <span
                            className="
                              text-sm
                              font-semibold

                              text-gray-200
                            "
                          >
                            {step}
                          </span>
                        </div>

                        {/* STATUS */}
                        <motion.div
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}

                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}

                          className="
                            flex
                            items-center
                            gap-2

                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.18em]

                            text-green-300
                          "
                        >

                          <div className="h-2 w-2 bg-green-400" />

                          OK
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                )}

              </div>
            </div>

            {/* BOTTOM */}
            <motion.div
              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              transition={{
                delay: 1,
              }}

              className="
                mt-12

                flex
                items-center
                gap-3

                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-cyan-300
              "
            >

              <div className="h-2 w-2 bg-cyan-400 animate-pulse" />

              Runtime Environment Ready
            </motion.div>
          </div>
        </motion.div>

      ) : null}

    </AnimatePresence>
  );
}