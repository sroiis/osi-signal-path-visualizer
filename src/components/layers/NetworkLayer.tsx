import { motion } from "framer-motion";

import {
  useMemo,
  useState,
} from "react";

import {
  Activity,
  Globe,
  Router,
  Shield,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  computePipelineMetrics,
} from "../../lib/pipelineMetrics";

import {
  getLayerDesign,
} from "../../lib/layerDesign";

import {
  useSimulatorStore,
} from "../../store/simulatorStore";

import {
  ChartTooltipContent,
} from "../ds/ChartTooltipContent";

import {
  LayerCard,
} from "../ds/LayerCard";

import {
  PillButton,
} from "../ds/PillButton";

import {
  SectionTitle,
} from "../ds/SectionTitle";

import {
  SelectField,
} from "../ds/SelectField";

import {
  SliderField,
} from "../ds/SliderField";

import {
  DelayedTooltip,
} from "../DelayedTooltip";

import {
  DownstreamAlerts,
} from "../DownstreamAlerts";

const L = 3;

const t =
  getLayerDesign(L);

export function NetworkLayer() {

  const application =
    useSimulatorStore(
      (s) => s.application
    );

  const presentation =
    useSimulatorStore(
      (s) => s.presentation
    );

  const session =
    useSimulatorStore(
      (s) => s.session
    );

  const transport =
    useSimulatorStore(
      (s) => s.transport
    );

  const network =
    useSimulatorStore(
      (s) => s.network
    );

  const dataLink =
    useSimulatorStore(
      (s) => s.dataLink
    );

  const physical =
    useSimulatorStore(
      (s) => s.physical
    );

  const setHops =
    useSimulatorStore(
      (s) =>
        s.setNetworkHopCount
    );

  const setRoute =
    useSimulatorStore(
      (s) =>
        s.setNetworkRouting
    );

  const setMtu =
    useSimulatorStore(
      (s) =>
        s.setNetworkMtu
    );

  const setTtl =
    useSimulatorStore(
      (s) =>
        s.setNetworkTtl
    );

  const reset =
    useSimulatorStore(
      (s) =>
        s.resetNetworkLayer
    );

  const [
    traceOpen,
    setTraceOpen,
  ] = useState(false);

  const metrics =
    useMemo(
      () =>
        computePipelineMetrics({
          application,
          presentation,
          session,
          transport,
          network,
          dataLink,
          physical,
        }),

      [
        application,
        presentation,
        session,
        transport,
        network,
        dataLink,
        physical,
      ]
    );

  const hopBars =
    useMemo(
      () => {

        const base =
          network.routingProtocol ===
          "ospf"

            ? 9

            : network.routingProtocol ===
              "bgp"

            ? 15

            : 11;

        return Array.from(
          {
            length:
              network.hopCount,
          },

          (_, i) => ({
            hop:
              `R${i + 1}`,

            ms:
              Math.round(
                base +
                  i * 2 +
                  (
                    network.mtu <
                    1200

                      ? 5

                      : 0
                  )
              ),
          })
        );
      },

      [
        network.hopCount,
        network.routingProtocol,
        network.mtu,
      ]
    );

  const ttlSteps =
    useMemo(
      () => {

        const hops =
          Math.min(
            network.hopCount,
            8
          );

        return Array.from(
          {
            length:
              hops + 1,
          },

          (_, i) =>
            network.ttlStart -
            i
        );
      },

      [
        network.hopCount,
        network.ttlStart,
      ]
    );

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

      transition={{
        duration: 0.3,
      }}

      className="flex flex-col gap-6"
    >

      {/* HERO */}
      <LayerCard layer={L}>

        <div className="space-y-7">

          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-3

              border
              border-violet-400/20

              bg-violet-400/[0.06]

              px-4
              py-2
            "
          >

            <Router
              size={16}
              className="text-violet-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-violet-300
              "
            >
              Intelligent Routing Engine
            </span>
          </div>

          {/* TITLE */}
          <div>

            <h2
              className="
                text-5xl
                font-black
                tracking-tight

                text-white
              "
            >
              Network Layer
            </h2>

            <p
              className="
                mt-5

                max-w-4xl

                text-[15px]
                leading-relaxed

                text-gray-400
              "
            >
              Simulates IP routing,
              hop traversal,
              datagram fragmentation,
              MTU handling,
              TTL decay and
              dynamic route selection
              across interconnected
              network paths.
            </p>
          </div>

          {/* FLOW */}
          <div className="flex flex-wrap items-center gap-3 overflow-x-auto">

            <div
              className="
                border
                border-cyan-400/20

                bg-cyan-400/[0.08]

                px-5
                py-3

                font-mono
                text-cyan-300
              "
            >
              CLIENT
            </div>

            {Array.from({
              length: Math.min(
                network.hopCount,
                5
              ),
            }).map(
              (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                >

                  <div
                    className="
                      h-[2px]
                      w-10

                      bg-gradient-to-r
                      from-cyan-400
                      to-violet-400
                    "
                  />

                  <motion.div
                    whileHover={{
                      y: -3,
                    }}

                    className="
                      border
                      border-violet-400/20

                      bg-violet-400/[0.08]

                      px-4
                      py-3

                      font-mono
                      text-violet-300
                    "
                  >
                    R{i + 1}
                  </motion.div>
                </div>
              )
            )}

            <div
              className="
                h-[2px]
                w-10

                bg-gradient-to-r
                from-violet-400
                to-pink-400
              "
            />

            <div
              className="
                border
                border-pink-400/20

                bg-pink-400/[0.08]

                px-5
                py-3

                font-mono
                text-pink-300
              "
            >
              SERVER
            </div>
          </div>
        </div>
      </LayerCard>

      <DownstreamAlerts />

      {/* TOPOLOGY */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Transit Topology
        </SectionTitle>

        <div className="grid gap-5 md:grid-cols-3">

          {/* HOPS */}
          <div
            className="
              border
              border-white/10

              bg-[#0f172a]/75

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <Activity
                size={18}
                className="text-violet-300"
              />

              <span className="text-sm font-semibold text-violet-300">
                Active Hop Count
              </span>
            </div>

            <h3
              className="
                mt-5

                text-5xl
                font-black

                text-white
              "
            >
              {
                network.hopCount
              }
            </h3>
          </div>

          {/* MTU */}
          <div
            className="
              border
              border-white/10

              bg-[#0f172a]/75

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <Shield
                size={18}
                className="text-cyan-300"
              />

              <span className="text-sm font-semibold text-cyan-300">
                MTU Size
              </span>
            </div>

            <h3
              className="
                mt-5

                text-5xl
                font-black

                text-white
              "
            >
              {network.mtu}
            </h3>
          </div>

          {/* TTL */}
          <div
            className="
              border
              border-white/10

              bg-[#0f172a]/75

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <Globe
                size={18}
                className="text-pink-300"
              />

              <span className="text-sm font-semibold text-pink-300">
                TTL Start
              </span>
            </div>

            <h3
              className="
                mt-5

                text-5xl
                font-black

                text-white
              "
            >
              {
                network.ttlStart
              }
            </h3>
          </div>
        </div>
      </LayerCard>

      {/* CONTROLS */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

        {/* LEFT */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Routing Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            <SliderField
              layer={L}

              label="Hop Count"

              tooltip="Number of routers between source and destination."

              valueDisplay={`${network.hopCount}`}

              min={1}

              max={15}

              value={
                network.hopCount
              }

              onChange={(e) =>
                setHops(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <SelectField
              layer={L}

              label="Routing Protocol"

              tooltip="Controls routing behavior."

              value={
                network.routingProtocol
              }

              onChange={(e) =>
                setRoute(
                  e.target
                    .value as typeof network.routingProtocol
                )
              }
            >

              <option value="static">
                Static
              </option>

              <option value="ospf">
                OSPF
              </option>

              <option value="bgp">
                BGP
              </option>
            </SelectField>

            <SliderField
              layer={L}

              label="MTU Size"

              tooltip="Smaller MTU increases fragmentation."

              valueDisplay={`${network.mtu} B`}

              min={500}

              max={1500}

              step={10}

              value={
                network.mtu
              }

              onChange={(e) =>
                setMtu(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <SliderField
              layer={L}

              label="TTL Start"

              tooltip="Packet expiration counter."

              valueDisplay={`${network.ttlStart}`}

              min={16}

              max={255}

              value={
                network.ttlStart
              }

              onChange={(e) =>
                setTtl(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <div className="flex flex-wrap gap-4">

              <PillButton
                variant="primary"

                accent={
                  t.accent
                }

                accentHover={
                  t.accentHover
                }

                onClick={() =>
                  setTraceOpen(
                    (v) => !v
                  )
                }
              >
                Route Discovery
              </PillButton>

              <PillButton
                variant="secondary"

                accent={
                  t.accent
                }

                accentHover={
                  t.accentHover
                }

                onClick={() =>
                  reset()
                }
              >
                Reset
              </PillButton>
            </div>
          </div>
        </LayerCard>

        {/* RIGHT */}
        <LayerCard layer={L}>

          <DelayedTooltip
            content="Illustrative routing metadata and TTL progression."
            delayMs={500}
          >

            <SectionTitle className="mb-6">
              Route Metadata
            </SectionTitle>

          </DelayedTooltip>

          <pre
            className="
              overflow-auto

              border
              border-white/10

              bg-[#081121]

              p-5

              font-mono
              text-[13px]
              leading-relaxed

              text-cyan-300
            "
          >
{`SOURCE IP : 192.168.1.100
DESTINATION : 8.8.8.8

TTL PATH:
${ttlSteps.join(" → ")}

CHECKSUM:
0x7A3F

ROUTING:
${network.routingProtocol.toUpperCase()}

MTU:
${network.mtu} Bytes`}
          </pre>
        </LayerCard>
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* DELAY */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-6">
            Hop Delay Matrix
          </SectionTitle>

          <div className="h-[260px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={hopBars}
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="hop"

                  tick={{
                    fill:
                      "#94a3b8",
                  }}
                />

                <YAxis
                  tick={{
                    fill:
                      "#94a3b8",
                  }}
                />

                <Bar
                  dataKey="ms"
                  fill="#8b5cf6"
                />

                <RTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </LayerCard>

        {/* FRAGMENTS */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-6">
            Fragment Activity
          </SectionTitle>

          <div className="flex flex-col items-center justify-center py-10">

            <motion.div
              key={
                metrics.fragmentationCount
              }

              initial={{
                scale: 0.92,
                opacity: 0.7,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              className="
                text-[76px]
                font-black

                text-pink-300
              "
            >
              {
                metrics.fragmentationCount
              }
            </motion.div>

            <p
              className="
                mt-3

                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-gray-500
              "
            >
              Active Datagram Fragments
            </p>
          </div>
        </LayerCard>
      </div>

      {/* TRACE */}
      {traceOpen ? (

        <LayerCard layer={L}>

          <SectionTitle className="mb-6">
            Route Discovery Timeline
          </SectionTitle>

          <div className="flex flex-col gap-4">

            {hopBars.map(
              (
                h,
                i
              ) => (

                <motion.div
                  key={h.hop}

                  whileHover={{
                    x: 5,
                  }}

                  className="
                    flex
                    items-center
                    justify-between

                    border
                    border-white/10

                    bg-[#0f172a]/70

                    px-5
                    py-4
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

                        bg-violet-400/[0.08]

                        text-violet-300
                      "
                    >
                      {i + 1}
                    </div>

                    <span className="font-mono text-gray-300">
                      {h.hop}
                    </span>
                  </div>

                  <span className="font-mono text-cyan-300">
                    {h.ms} ms
                  </span>
                </motion.div>
              )
            )}
          </div>
        </LayerCard>

      ) : null}
    </motion.div>
  );
}