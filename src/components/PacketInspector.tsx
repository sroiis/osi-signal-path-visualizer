import { motion } from "framer-motion";

const packetRows = [
  {
    layer: "Application",
    value:
      "HTTP GET /dashboard",
    color:
      "text-pink-300",
  },

  {
    layer: "Presentation",
    value:
      "TLS Encryption Enabled",
    color:
      "text-sky-300",
  },

  {
    layer: "Session",
    value:
      "Session Token Active",
    color:
      "text-emerald-300",
  },

  {
    layer: "Transport",
    value:
      "TCP :443",
    color:
      "text-cyan-300",
  },

  {
    layer: "Network",
    value:
      "IPv4 192.168.1.10",
    color:
      "text-blue-300",
  },

  {
    layer: "Data Link",
    value:
      "MAC A4:6F:22:91",
    color:
      "text-slate-200",
  },

  {
    layer: "Physical",
    value:
      "Binary Transmission",
    color:
      "text-cyan-200",
  },
];

const binaryData =
  "010101101010010101001101010100101010101010010101001010101001010101010100101010101001010";

export function PacketInspector() {

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
        border-white/10

        bg-[#10161d]/80

        shadow-[0_10px_35px_rgba(0,0,0,0.35)]

        backdrop-blur-xl
      "
    >

      {/* TOP */}
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
              Packet Analyzer
            </p>

            <h2
              className="
                mt-1

                text-2xl
                font-black

                text-[#f8fafc]
              "
            >
              Live Packet Inspector
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
            Packet Stream Active
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_1fr]">

        {/* LEFT */}
        <div className="space-y-4">

          {packetRows.map(
            (
              row,
              i
            ) => (

              <motion.div
                key={row.layer}

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

                <div className="flex items-center justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        bg-[#0f1720]
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
                        {row.layer}
                      </p>

                      <h3
                        className={`
                          mt-2

                          text-sm
                          font-bold

                          ${row.color}
                        `}
                      >
                        {row.value}
                      </h3>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]

                      text-[#94a3b8]
                    "
                  >
                    ACTIVE
                  </div>
                </div>
              </motion.div>
            )
          )}

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* BINARY */}
          <div
            className="
              overflow-hidden

              border
              border-cyan-400/15

              bg-[#0f1720]

              p-5
            "
          >

            <div className="flex items-center justify-between">

              <h3
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.16em]

                  text-cyan-300
                "
              >
                Binary Payload
              </h3>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]

                  text-emerald-300
                "
              >

                <div className="h-[3px] w-5 bg-emerald-400" />

                LIVE
              </div>
            </div>

            <div
              className="
                mt-5

                overflow-auto

                font-mono
                text-[13px]
                leading-loose

                text-cyan-300
              "
            >

              {binaryData}

            </div>
          </div>

          {/* METRICS */}
          <div className="grid gap-4 md:grid-cols-2">

            {[
              {
                label:
                  "Packets",

                value:
                  "1,284",
              },

              {
                label:
                  "Latency",

                value:
                  "12ms",
              },

              {
                label:
                  "Errors",

                value:
                  "0.02%",
              },

              {
                label:
                  "Bandwidth",

                value:
                  "1 Gbps",
              },
            ].map(
              (x) => (

                <motion.div
                  key={x.label}

                  whileHover={{
                    y: -2,
                  }}

                  className="
                    border
                    border-white/10

                    bg-white/[0.03]

                    p-5
                  "
                >

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]

                      text-[#94a3b8]
                    "
                  >
                    {x.label}
                  </p>

                  <h3
                    className="
                      mt-4

                      text-3xl
                      font-black

                      text-[#f8fafc]
                    "
                  >
                    {x.value}
                  </h3>
                </motion.div>
              )
            )}

          </div>
        </div>
      </div>
    </motion.div>
  );
}