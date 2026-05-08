import { motion } from "framer-motion";

const layers = [
  {
    number: 7,
    name: "Application",
    status: "Operational",
    color: "bg-pink-400",
    text: "text-pink-300",
  },

  {
    number: 6,
    name: "Presentation",
    status: "Encrypted",
    color: "bg-sky-400",
    text: "text-sky-300",
  },

  {
    number: 5,
    name: "Session",
    status: "Connected",
    color: "bg-emerald-400",
    text: "text-emerald-300",
  },

  {
    number: 4,
    name: "Transport",
    status: "TCP Active",
    color: "bg-cyan-400",
    text: "text-cyan-300",
  },

  {
    number: 3,
    name: "Network",
    status: "Routing",
    color: "bg-blue-400",
    text: "text-blue-300",
  },

  {
    number: 2,
    name: "Data Link",
    status: "Frames Stable",
    color: "bg-slate-300",
    text: "text-slate-200",
  },

  {
    number: 1,
    name: "Physical",
    status: "Signal Active",
    color: "bg-cyan-300",
    text: "text-cyan-200",
  },
];

export function LayerStatusMatrix() {

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

      className="
        relative
        overflow-hidden

        border
        border-white/10

        bg-[#10161d]/80

        shadow-[0_10px_35px_rgba(0,0,0,0.35)]

        backdrop-blur-xl
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4

          border-b
          border-white/10

          px-6
          py-5
        "
      >

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
            "
          >

            <div
              className="
                h-[3px]
                w-6

                bg-cyan-300
              "
            />
          </div>

          <div>

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-cyan-300
              "
            >
              Runtime Monitor
            </p>

            <h2
              className="
                mt-1

                text-2xl
                font-black

                text-[#f8fafc]
              "
            >
              Layer Status Matrix
            </h2>
          </div>
        </div>

        {/* STATUS */}
        <div
          className="
            flex
            items-center
            gap-3

            border
            border-emerald-400/20

            bg-emerald-400/[0.05]

            px-4
            py-2
          "
        >

          <div className="h-[3px] w-5 bg-emerald-400 animate-pulse" />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]

              text-emerald-300
            "
          >
            All Systems Stable
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        <div className="space-y-4">

          {layers.map(
            (
              layer,
              i
            ) => (

              <motion.div
                key={layer.number}

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
                    i * 0.05,
                }}

                whileHover={{
                  x: 4,
                }}

                className="
                  relative
                  overflow-hidden

                  border
                  border-white/10

                  bg-white/[0.03]

                  p-5

                  transition-all
                  duration-200

                  hover:border-cyan-400/15
                  hover:bg-cyan-400/[0.03]
                "
              >

                {/* BG */}
                <div
                  className="
                    pointer-events-none

                    absolute
                    right-0
                    top-0

                    h-24
                    w-24

                    bg-cyan-400/[0.03]

                    blur-[60px]
                  "
                />

                <div className="relative z-10 flex items-center justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex items-center gap-5">

                    {/* NUMBER */}
                    <div
                      className="
                        flex
                        h-14
                        w-14

                        items-center
                        justify-center

                        border
                        border-white/10

                        bg-[#0f1720]
                      "
                    >

                      <span
                        className={`
                          text-2xl
                          font-black

                          ${layer.text}
                        `}
                      >
                        {layer.number}
                      </span>
                    </div>

                    {/* TEXT */}
                    <div>

                      <p
                        className="
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.18em]

                          text-[#94a3b8]
                        "
                      >
                        OSI Layer
                      </p>

                      <h3
                        className="
                          mt-2

                          text-lg
                          font-bold

                          text-[#f8fafc]
                        "
                      >
                        {layer.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-3">

                        <div
                          className={`
                            h-[3px]
                            w-5

                            ${layer.color}
                          `}
                        />

                        <span
                          className={`
                            text-sm
                            font-semibold

                            ${layer.text}
                          `}
                        >
                          {layer.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-5">

                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}

                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}

                      className="
                        flex
                        items-center
                        gap-3

                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]

                        text-emerald-300
                      "
                    >

                      <div className="h-[3px] w-5 bg-emerald-400" />

                      Active
                    </motion.div>

                    <div
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        bg-emerald-400/[0.08]
                      "
                    >

                      <div
                        className="
                          h-[3px]
                          w-5

                          bg-emerald-300
                        "
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}

        </div>

        {/* FOOTER */}
        <div
          className="
            mt-6

            border-t
            border-white/10

            pt-5
          "
        >

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div
                className="
                  h-[3px]
                  w-5

                  bg-cyan-300
                "
              />

              <span
                className="
                  text-sm

                  text-[#94a3b8]
                "
              >
                Telemetry synchronization stable across all OSI layers.
              </span>
            </div>

            <div
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-cyan-300
              "
            >
              Runtime Integrity Verified
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}