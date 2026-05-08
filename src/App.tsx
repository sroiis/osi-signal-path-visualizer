import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

import { OSI_LAYERS } from "./data/layers";

import { useSimulatorStore } from "./store/simulatorStore";

import { LayerByIndex } from "./components/LayerByIndex";

import { BootSequence } from "./components/BootSequence";

import { PacketInspector } from "./components/PacketInspector";

import { SignalPathLogo } from "./components/SignalPathLogo";

import { TelemetryBackground } from "./components/TelemetryBackground";

import { LayerStatusMatrix } from "./components/LayerStatusMatrix";

export default function App() {

  const [
    booting,
    setBooting,
  ] = useState(true);

  useEffect(() => {

    const timer =
      setTimeout(
        () =>
          setBooting(false),

        2800
      );

    return () =>
      clearTimeout(timer);

  }, []);

  const currentLayerIndex =
    useSimulatorStore(
      (s) =>
        s.currentLayerIndex
    );

  const setCurrentLayerIndex =
    useSimulatorStore(
      (s) =>
        s.setCurrentLayerIndex
    );

  const layer =
    OSI_LAYERS[
      currentLayerIndex
    ];

  return (
    <>
      <BootSequence
        visible={booting}
      />

      <div
        className="
          min-h-screen
          overflow-hidden

          bg-[#0b1117]

          text-[#f8fafc]
        "
      >

        <TelemetryBackground />

        <div className="relative z-10">

          {/* HERO */}
          <section className="border-b border-white/10">

            <div className="mx-auto max-w-[1750px] px-6 py-8">

              <SignalPathLogo />

            </div>
          </section>

          {/* MAIN */}
          <section>

            <div
              className="
                mx-auto
                grid
                max-w-[1750px]
                gap-6

                px-6
                py-6

                lg:grid-cols-[330px_1fr]
              "
            >

              {/* SIDEBAR */}
              <motion.aside
                initial={{
                  opacity: 0,
                  x: -18,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  duration: 0.4,
                }}
              >

                <div
                  className="
                    sticky
                    top-6

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
                      border-b
                      border-white/10

                      px-6
                      py-6
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]

                        text-cyan-300
                      "
                    >
                      Navigation Matrix
                    </p>

                    <h2
                      className="
                        mt-3

                        text-3xl
                        font-black

                        text-[#f8fafc]
                      "
                    >
                      OSI Layers
                    </h2>
                  </div>

                  {/* ITEMS */}
                  <div className="p-4">

                    <div className="space-y-3">

                      {OSI_LAYERS.map(
                        (
                          l,
                          i
                        ) => {

                          const active =
                            i ===
                            currentLayerIndex;

                          return (
                            <motion.button
                              key={
                                l.number
                              }

                              whileHover={{
                                x: 4,
                              }}

                              onClick={() =>
                                setCurrentLayerIndex(
                                  i
                                )
                              }

                              className={`
                                relative

                                w-full
                                overflow-hidden

                                border

                                px-5
                                py-5

                                text-left

                                transition-all
                                duration-200

                                ${
                                  active

                                    ? `
                                      border-cyan-400/25
                                      bg-cyan-400/[0.08]
                                    `

                                    : `
                                      border-white/10
                                      bg-white/[0.02]

                                      hover:border-white/20
                                      hover:bg-white/[0.04]
                                    `
                                }
                              `}
                            >

                              {active ? (

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.05] to-transparent" />

                              ) : null}

                              <div className="relative z-10 flex items-center justify-between gap-4">

                                <div>

                                  <p
                                    className={`
                                      text-xs
                                      font-semibold
                                      uppercase
                                      tracking-[0.18em]

                                      ${
                                        active

                                          ? "text-cyan-300"

                                          : "text-[#7f8b96]"
                                      }
                                    `}
                                  >
                                    Layer {l.number}
                                  </p>

                                  <h3
                                    className={`
                                      mt-2

                                      text-lg
                                      font-bold

                                      ${
                                        active

                                          ? "text-[#f8fafc]"

                                          : "text-[#d6dee6]"
                                      }
                                    `}
                                  >
                                    {l.name}
                                  </h3>
                                </div>

                                <ArrowRight
                                  size={18}
                                  className={
                                    active

                                      ? "text-cyan-300"

                                      : "text-[#5d6a75]"
                                  }
                                />
                              </div>
                            </motion.button>
                          );
                        }
                      )}

                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* MAIN */}
              <motion.main
                initial={{
                  opacity: 0,
                  y: 18,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.45,
                }}

                className="min-w-0"
              >

                {/* ACTIVE LAYER */}
                <div
                  className="
                    overflow-hidden

                    border
                    border-white/10

                    bg-[#10161d]/80

                    shadow-[0_10px_35px_rgba(0,0,0,0.35)]

                    backdrop-blur-xl
                  "
                >

                  <div className="grid gap-6 lg:grid-cols-[1fr_auto]">

                    {/* LEFT */}
                    <div className="p-8">

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-3

                          border
                          border-cyan-400/20

                          bg-cyan-400/[0.06]

                          px-4
                          py-2
                        "
                      >

                        <div className="h-[3px] w-5 bg-cyan-400 animate-pulse" />

                        <span
                          className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.18em]

                            text-cyan-300
                          "
                        >
                          Active Simulation Layer
                        </span>
                      </div>

                      <h1
                        className="
                          mt-6

                          text-5xl
                          font-black
                          tracking-tight

                          text-[#f8fafc]
                        "
                      >
                        {layer.name}
                      </h1>

                      <p
                        className="
                          mt-5

                          max-w-5xl

                          text-lg
                          leading-relaxed

                          text-[#a8b4bf]
                        "
                      >
                        {
                          layer.shortDescription
                        }
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div
                      className="
                        flex
                        min-w-[220px]
                        flex-col
                        justify-between

                        border-l
                        border-white/10

                        bg-white/[0.02]

                        p-8
                      "
                    >

                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.18em]

                            text-amber-300
                          "
                        >
                          Current Layer
                        </p>

                        <h2
                          className="
                            mt-4

                            text-7xl
                            font-black

                            text-[#f8fafc]
                          "
                        >
                          L{
                            layer.number
                          }
                        </h2>
                      </div>

                      <div className="mt-8 flex items-center gap-3">

                        <div
                          className="
                            h-[3px]
                            w-5

                            bg-cyan-300
                          "
                        />

                        <span className="text-sm text-[#a8b4bf]">
                          Layer telemetry synchronized
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STATUS MATRIX */}
                <div className="mt-6">

                  <LayerStatusMatrix />

                </div>

                {/* CONTENT */}
                <div
                  className="
                    mt-6

                    overflow-hidden

                    border
                    border-white/10

                    bg-[#10161d]/80

                    p-6

                    shadow-[0_10px_35px_rgba(0,0,0,0.35)]

                    backdrop-blur-xl
                  "
                >

                  <LayerByIndex
                    index={
                      currentLayerIndex
                    }
                  />
                </div>

                {/* PACKET */}
                <div className="mt-6">

                  <PacketInspector />

                </div>
              </motion.main>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}