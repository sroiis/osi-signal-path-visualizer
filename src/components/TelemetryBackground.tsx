import { motion } from "framer-motion";

export function TelemetryBackground() {

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">

      {/* GRID */}
      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)]

          bg-[size:52px_52px]
        "
      />

      {/* TOP LEFT CYAN */}
      <motion.div
        animate={{
          opacity: [0.18, 0.32, 0.18],
          scale: [1, 1.05, 1],
        }}

        transition={{
          duration: 10,
          repeat: Infinity,
        }}

        className="
          absolute
          left-[-180px]
          top-[-180px]

          h-[680px]
          w-[680px]

          bg-cyan-400/6

          blur-[190px]
        "
      />

      {/* BOTTOM RIGHT AMBER */}
      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
          scale: [1, 1.08, 1],
        }}

        transition={{
          duration: 12,
          repeat: Infinity,
        }}

        className="
          absolute
          bottom-[-220px]
          right-[-220px]

          h-[720px]
          w-[720px]

          bg-amber-500/6

          blur-[220px]
        "
      />

      {/* CENTER TEAL GLOW */}
      <motion.div
        animate={{
          opacity: [0.06, 0.14, 0.06],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
        }}

        className="
          absolute
          left-1/2
          top-1/2

          h-[520px]
          w-[520px]

          -translate-x-1/2
          -translate-y-1/2

          bg-cyan-300/5

          blur-[180px]
        "
      />

      {/* SCANLINES */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.018]

          bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)]

          bg-[length:100%_8px]
        "
      />

      {/* FLOATING SIGNAL BLOCKS */}
      {Array.from({
        length: 16,
      }).map((_, i) => (

        <motion.div
          key={i}

          animate={{
            y: [0, -14, 0],
            opacity: [0.08, 0.22, 0.08],
          }}

          transition={{
            duration:
              4 + i * 0.4,

            repeat: Infinity,

            delay:
              i * 0.25,
          }}

          className="
            absolute

            h-[3px]
            w-[14px]

            bg-cyan-300/50
          "

          style={{
            left: `${6 + i * 5}%`,
            top: `${10 + (i % 5) * 18}%`,
          }}
        />
      ))}

      {/* SIGNAL LINES */}
      {Array.from({
        length: 5,
      }).map((_, i) => (

        <motion.div
          key={`line-${i}`}

          animate={{
            opacity: [0.015, 0.05, 0.015],
            scaleX: [0.96, 1, 0.96],
          }}

          transition={{
            duration:
              5 + i,

            repeat: Infinity,
          }}

          className="
            absolute
            left-0

            h-px
            w-full

            bg-gradient-to-r
            from-transparent
            via-cyan-400/30
            to-transparent
          "

          style={{
            top: `${14 + i * 18}%`,
          }}
        />
      ))}

      {/* MOVING TELEMETRY */}
      <motion.div
        animate={{
          x: ["-20%", "120%"],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
          absolute
          top-0

          h-full
          w-[280px]

          bg-gradient-to-r
          from-transparent
          via-cyan-400/[0.03]
          to-transparent

          blur-2xl
        "
      />
    </div>
  );
}