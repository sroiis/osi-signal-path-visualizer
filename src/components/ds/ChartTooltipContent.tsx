import {
  motion,
  AnimatePresence,
} from "framer-motion";

/*
  SignalPath OSI
  Rectangular telemetry tooltip
*/

export function ChartTooltipContent(props: {
  active?: boolean;

  payload?: ReadonlyArray<{
    name?: string;
    value?: number | string;
    color?: string;
    dataKey?: string;
  }>;

  label?: string | number;
}) {

  const {
    active,
    payload,
    label,
  } = props;

  if (
    !active ||
    !payload?.length
  ) {

    return null;
  }

  return (
    <AnimatePresence>

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
          scale: 0.97,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        exit={{
          opacity: 0,
          y: 6,
        }}

        transition={{
          duration: 0.18,
        }}

        className="
          relative
          overflow-hidden

          border
          border-cyan-400/15

          bg-[#081121]/96

          px-5
          py-4

          shadow-[0_0_35px_rgba(34,211,238,0.10)]

          backdrop-blur-xl
        "
      >

        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div
            className="
              absolute
              left-0
              top-0

              h-24
              w-24

              bg-cyan-400/10

              blur-[60px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0

              h-24
              w-24

              bg-violet-500/10

              blur-[60px]
            "
          />
        </div>

        {/* LABEL */}
        {label !== undefined ? (

          <div
            className="
              relative
              z-10

              mb-4

              flex
              items-center
              gap-3
            "
          >

            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent" />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.2em]

                text-cyan-300
              "
            >
              {label}
            </span>

            <div className="h-px flex-1 bg-gradient-to-l from-cyan-400/40 to-transparent" />
          </div>

        ) : null}

        {/* VALUES */}
        <div
          className="
            relative
            z-10

            flex
            flex-col
            gap-3
          "
        >

          {payload.map(
            (
              p,
              i
            ) => {

              const title =
                p.name ??
                p.dataKey ??
                "Value";

              return (
                <motion.div
                  key={`${title}-${i}`}

                  initial={{
                    opacity: 0,
                    x: -6,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    delay:
                      i * 0.04,
                  }}

                  className="
                    flex
                    items-center
                    justify-between
                    gap-6

                    border
                    border-white/6

                    bg-white/[0.03]

                    px-4
                    py-3

                    transition-all
                    duration-300

                    hover:border-cyan-400/12
                    hover:bg-cyan-400/[0.03]
                  "
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-3">

                    {/* COLOR */}
                    <motion.div
                      animate={{
                        opacity: [
                          0.6,
                          1,
                          0.6,
                        ],
                      }}

                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}

                      className="
                        h-3
                        w-3

                        shadow-[0_0_12px_rgba(34,211,238,0.7)]
                      "

                      style={{
                        background:
                          p.color ??
                          "#22d3ee",
                      }}
                    />

                    <span
                      className="
                        text-sm
                        font-semibold

                        text-gray-300
                      "
                    >
                      {title}
                    </span>
                  </div>

                  {/* VALUE */}
                  <span
                    className="
                      font-mono
                      text-[15px]
                      font-black

                      tracking-tight

                      text-cyan-300
                    "
                  >
                    {p.value}
                  </span>
                </motion.div>
              );
            }
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            relative
            z-10

            mt-4

            flex
            items-center
            justify-between

            border-t
            border-white/10

            pt-3
          "
        >

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]

              text-gray-500
            "
          >
            Live Telemetry
          </span>

          <motion.div
            animate={{
              opacity: [
                0.5,
                1,
                0.5,
              ],
            }}

            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}

            className="
              flex
              items-center
              gap-2

              text-[10px]
              uppercase
              tracking-[0.15em]

              text-green-300
            "
          >

            <div
              className="
                h-2
                w-2

                bg-green-400

                shadow-[0_0_10px_rgba(74,222,128,0.9)]
              "
            />

            Active
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}