import { motion } from "framer-motion";

type Props = {
  compact?: boolean;
};

export function SignalPathLogo({
  compact = false,
}: Props) {

  if (compact) {

    return (
      <motion.div
        whileHover={{
          y: -2,
        }}

        className="
          flex
          items-center
          gap-4
        "
      >

        {/* ICON */}
        <div
          className="
            relative

            flex
            h-11
            w-11

            items-center
            justify-center

            overflow-hidden

            border
            border-cyan-400/20

            bg-[#0f1720]

            shadow-[0_0_25px_rgba(34,211,238,0.10)]
          "
        >

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-br
              from-cyan-400/10
              to-blue-500/10
            "
          />

          <div
            className="
              relative
              z-10

              h-4
              w-4

              bg-cyan-300
            "
          />
        </div>

        {/* TEXT */}
        <div>

          <h1
            className="
              text-lg
              font-black
              tracking-tight

              text-[#f8fafc]
            "
          >
            SignalPath
          </h1>

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]

              text-cyan-300
            "
          >
            OSI Simulator
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        relative

        overflow-hidden

        border
        border-cyan-400/20

        bg-[#10161d]/80

        p-8

        shadow-[0_0_45px_rgba(34,211,238,0.08)]

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

            h-44
            w-44

            bg-cyan-400/10

            blur-[100px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0

            h-44
            w-44

            bg-blue-500/10

            blur-[100px]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TOP */}
        <div className="flex items-center gap-6">

          {/* ICON */}
          <motion.div
            animate={{
              rotate: [0, 2, -2, 0],
            }}

            transition={{
              duration: 7,
              repeat: Infinity,
            }}

            className="
              relative

              flex
              h-20
              w-20

              items-center
              justify-center

              border
              border-cyan-400/20

              bg-[#0f1720]
            "
          >

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-br
                from-cyan-400/10
                to-blue-500/10
              "
            />

            <div
              className="
                relative
                z-10

                h-8
                w-8

                bg-cyan-300
              "
            />
          </motion.div>

          {/* TITLE */}
          <div>

            <div
              className="
                inline-flex
                items-center
                gap-3

                border
                border-cyan-400/20

                bg-cyan-400/[0.06]

                px-4
                py-1
              "
            >

              <div
                className="
                  h-[2px]
                  w-4

                  bg-cyan-300
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]

                  text-cyan-300
                "
              >
                Advanced Network Telemetry
              </span>
            </div>

            <h1
              className="
                mt-4

                text-5xl
                font-black
                tracking-tight

                text-[#f8fafc]
              "
            >
              SignalPath
            </h1>

            <p
              className="
                mt-2

                text-lg

                text-[#94a3b8]
              "
            >
              Interactive OSI Layer Simulator
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {[
            "Routing Analysis",
            "Binary Telemetry",
            "Protocol Monitoring",
          ].map(
            (x) => (

              <motion.div
                key={x}

                whileHover={{
                  y: -2,
                }}

                className="
                  border
                  border-white/10

                  bg-white/[0.03]

                  p-4
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      bg-cyan-400/[0.08]
                    "
                  >

                    <div
                      className="
                        h-[3px]
                        w-5

                        bg-cyan-300
                      "
                    />
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold

                      text-[#dbe7f0]
                    "
                  >
                    {x}
                  </span>
                </div>
              </motion.div>
            )
          )}

        </div>
      </div>
    </motion.div>
  );
}