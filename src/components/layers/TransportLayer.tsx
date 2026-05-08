import { motion } from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  ArrowRight,
  Gauge,
  ShieldAlert,
  Wifi,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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
  LayerCard,
} from "../ds/LayerCard";

import {
  PillButton,
} from "../ds/PillButton";

import {
  PillSwitch,
} from "../ds/PillSwitch";

import {
  SectionTitle,
} from "../ds/SectionTitle";

import {
  SliderField,
} from "../ds/SliderField";

import {
  DelayedTooltip,
} from "../DelayedTooltip";

import {
  DownstreamAlerts,
} from "../DownstreamAlerts";

import {
  ChartTooltipContent,
} from "../ds/ChartTooltipContent";

const L = 4;

const t =
  getLayerDesign(L);

type CellState =
  | "ok"
  | "lost"
  | "wait"
  | "rtx";

const COLORS:
  Record<
    CellState,
    string
  > = {

  ok:
    "bg-green-400",

  lost:
    "bg-red-400",

  wait:
    "bg-yellow-400",

  rtx:
    "bg-cyan-400",
};

export function TransportLayer() {

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

  const setProto =
    useSimulatorStore(
      (s) =>
        s.setTransportProtocol
    );

  const setLoss =
    useSimulatorStore(
      (s) =>
        s.setTransportPacketLoss
    );

  const setLatency =
    useSimulatorStore(
      (s) =>
        s.setTransportLatency
    );

  const setWindow =
    useSimulatorStore(
      (s) =>
        s.setTransportWindow
    );

  const setOo =
    useSimulatorStore(
      (s) =>
        s.setTransportOutOfOrderUdp
    );

  const congest =
    useSimulatorStore(
      (s) =>
        s.simulateCongestion
    );

  const reset =
    useSimulatorStore(
      (s) =>
        s.resetTransportLayer
    );

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

  const [
    cells,
    setCells,
  ] = useState<
    CellState[]
  >(
    Array.from(
      { length: 64 },
      () => "ok"
    )
  );

  const [
    throughputSeries,
    setThroughputSeries,
  ] = useState<
    {
      t: number;
      v: number;
    }[]
  >([]);

  const [
    retransmissionSeries,
    setRetransmissionSeries,
  ] = useState<
    {
      t: number;
      r: number;
    }[]
  >([]);

  const loss =
    transport.packetLossPercent /
    100;

  const delivery =
    Math.round(
      metrics.deliveryRatio *
        1000
    ) / 10;

  useEffect(() => {

    const id =
      window.setInterval(
        () => {

          setCells(() => {

            const next:
              CellState[] = [];

            for (
              let i = 0;
              i < 64;
              i++
            ) {

              const r =
                Math.random();

              if (
                transport.protocol ===
                "tcp"
              ) {

                if (
                  r <
                  loss * 0.85
                ) {

                  next.push(
                    "lost"
                  );

                } else if (
                  r <
                  loss * 0.85 +
                    0.06
                ) {

                  next.push(
                    "wait"
                  );

                } else if (
                  r <
                  loss + 0.08
                ) {

                  next.push(
                    "rtx"
                  );

                } else {

                  next.push(
                    "ok"
                  );
                }

              } else {

                if (
                  r < loss
                ) {

                  next.push(
                    "lost"
                  );

                } else if (
                  transport.outOfOrderUdp &&
                  r <
                    loss + 0.12
                ) {

                  next.push(
                    "wait"
                  );

                } else {

                  next.push(
                    "ok"
                  );
                }
              }
            }

            return next;
          });

          const throughput =
            Math.max(
              0.1,

              metrics.throughputMbps *
                (
                  0.85 +
                  Math.random() *
                    0.3
                )
            );

          const rtx =
            transport.protocol ===
            "tcp"

              ? Math.min(
                  100,

                  loss * 80 +
                    Math.random() *
                      12
                )

              : 0;

          setThroughputSeries(
            (s) =>
              [
                ...s,

                {
                  t:
                    Date.now(),

                  v:
                    throughput,
                },
              ].slice(-40)
          );

          setRetransmissionSeries(
            (s) =>
              [
                ...s,

                {
                  t:
                    Date.now(),

                  r:
                    rtx,
                },
              ].slice(-40)
          );
        },

        900
      );

    return () =>
      window.clearInterval(
        id
      );

  }, [
    loss,
    metrics.throughputMbps,
    transport.protocol,
    transport.outOfOrderUdp,
  ]);

  const pieData = [

    {
      name:
        "Delivered",

      value:
        delivery,
    },

    {
      name:
        "Dropped",

      value:
        Math.max(
          0,
          100 - delivery
        ),
    },
  ];

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

        <div className="space-y-6">

          <div
            className="
              inline-flex
              items-center
              gap-3

              border
              border-red-400/20

              bg-red-400/[0.06]

              px-4
              py-2
            "
          >

            <Activity
              size={16}
              className="text-red-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-red-300
              "
            >
              Reliable Data Delivery
            </span>
          </div>

          <div>

            <h2
              className="
                text-5xl
                font-black
                tracking-tight

                text-white
              "
            >
              Transport Layer
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
              Simulates TCP and UDP transport
              behavior including packet delivery,
              retransmission, congestion,
              latency and throughput dynamics.
            </p>
          </div>

          {/* FLOW */}
          <div className="grid gap-4 md:grid-cols-5">

            {[
              "Segmentation",
              "Transmission",
              "Acknowledgement",
              "Recovery",
              "Delivery",
            ].map(
              (x) => (
                <div
                  key={x}

                  className="
                    border
                    border-white/10

                    bg-[#0f172a]/75

                    px-4
                    py-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-2 bg-red-400" />

                    <span
                      className="
                        text-sm
                        font-semibold

                        text-gray-200
                      "
                    >
                      {x}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </LayerCard>

      <DownstreamAlerts />

      {/* LIVE GRID */}
      <LayerCard layer={L}>

        <DelayedTooltip
          content="Live transport packet state visualization."
          delayMs={500}
        >

          <SectionTitle className="mb-6">
            Packet Activity Matrix
          </SectionTitle>

        </DelayedTooltip>

        <div className="mx-auto grid max-w-md grid-cols-8 gap-2">

          {cells.map(
            (
              c,
              i
            ) => (

              <motion.div
                key={i}

                layout

                whileHover={{
                  scale: 1.15,
                }}

                animate={{
                  opacity: [
                    0.85,
                    1,
                  ],
                }}

                transition={{
                  duration: 0.35,
                }}

                className={`
                  aspect-square

                  ${COLORS[c]}
                `}
              />
            )
          )}

        </div>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400">

          {[
            [
              "Delivered",
              "bg-green-400",
            ],

            [
              "Dropped",
              "bg-red-400",
            ],

            [
              "Queued",
              "bg-yellow-400",
            ],

            [
              "Retransmit",
              "bg-cyan-400",
            ],
          ].map(
            ([x, c]) => (

              <div
                key={x}

                className="flex items-center gap-2"
              >

                <span
                  className={`
                    h-3
                    w-3

                    ${c}
                  `}
                />

                {x}
              </div>
            )
          )}

        </div>
      </LayerCard>

      {/* CONTROLS */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

        {/* LEFT */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Transport Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            {/* PROTOCOL */}
            <div
              className="
                border
                border-white/10

                bg-[#0f172a]/75

                p-5
              "
            >

              <div className="mb-4 flex items-center gap-3">

                <Gauge
                  size={18}
                  className="text-red-300"
                />

                <span className="text-sm font-semibold text-white">
                  Protocol Mode
                </span>
              </div>

              <div className="flex flex-wrap gap-3">

                <PillButton
                  variant={
                    transport.protocol ===
                    "tcp"

                      ? "primary"

                      : "secondary"
                  }

                  accent={
                    t.accent
                  }

                  accentHover={
                    t.accentHover
                  }

                  onClick={() =>
                    setProto(
                      "tcp"
                    )
                  }
                >
                  TCP Reliable
                </PillButton>

                <PillButton
                  variant={
                    transport.protocol ===
                    "udp"

                      ? "primary"

                      : "secondary"
                  }

                  accent={
                    t.accent
                  }

                  accentHover={
                    t.accentHover
                  }

                  onClick={() =>
                    setProto(
                      "udp"
                    )
                  }
                >
                  UDP Fast
                </PillButton>
              </div>
            </div>

            {/* LOSS */}
            <SliderField
              layer={L}

              label="Packet Loss"

              tooltip="Simulated transport packet loss."

              valueDisplay={`${transport.packetLossPercent}%`}

              min={0}

              max={
                transport.protocol ===
                "tcp"

                  ? 30

                  : 70
              }

              value={
                transport.packetLossPercent
              }

              onChange={(e) =>
                setLoss(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* LATENCY */}
            <SliderField
              layer={L}

              label="Latency"

              tooltip="Transport latency."

              valueDisplay={`${transport.latencyMs} ms`}

              min={0}

              max={500}

              value={
                transport.latencyMs
              }

              onChange={(e) =>
                setLatency(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* WINDOW / UDP */}
            {transport.protocol ===
            "tcp" ? (

              <SliderField
                layer={L}

                label="TCP Window"

                tooltip="TCP window buffer size."

                valueDisplay={`${(
                  transport.windowSizeBytes /
                  1024
                ).toFixed(0)} KB`}

                min={64 * 1024}

                max={1024 * 1024}

                step={8192}

                value={
                  transport.windowSizeBytes
                }

                onChange={(e) =>
                  setWindow(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            ) : (

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-4

                  border
                  border-white/10

                  bg-[#0f172a]/75

                  p-5
                "
              >

                <div className="flex items-center gap-3">

                  <ArrowRight
                    size={18}
                    className="text-cyan-300"
                  />

                  <span className="font-semibold text-white">
                    Out-of-order UDP
                  </span>
                </div>

                <PillSwitch
                  checked={
                    transport.outOfOrderUdp
                  }

                  onChange={
                    setOo
                  }

                  accent={
                    t.accent
                  }

                  aria-label="UDP ordering"
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <PillButton
                variant="primary"

                accent="#f97316"

                accentHover="#ea580c"

                onClick={() =>
                  congest()
                }
              >
                Simulate Congestion
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

        {/* STATUS */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Delivery Status
          </SectionTitle>

          <div className="flex flex-col gap-6">

            {/* THROUGHPUT */}
            <div
              className="
                border
                border-cyan-400/15

                bg-cyan-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Wifi
                  size={18}
                  className="text-cyan-300"
                />

                <span className="text-sm font-semibold text-cyan-300">
                  Throughput
                </span>
              </div>

              <h3
                className="
                  mt-5

                  text-4xl
                  font-black

                  text-white
                "
              >
                {metrics.throughputMbps.toFixed(
                  1
                )} Mbps
              </h3>
            </div>

            {/* DELIVERY */}
            <div
              className="
                border
                border-green-400/15

                bg-green-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Activity
                  size={18}
                  className="text-green-300"
                />

                <span className="text-sm font-semibold text-green-300">
                  Delivery Ratio
                </span>
              </div>

              <h3
                className="
                  mt-5

                  text-4xl
                  font-black

                  text-white
                "
              >
                {delivery}%
              </h3>
            </div>

            {/* ALERT */}
            <div
              className="
                border
                border-orange-400/15

                bg-orange-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <ShieldAlert
                  size={18}
                  className="text-orange-300"
                />

                <span className="text-sm font-semibold text-orange-300">
                  Reliability Status
                </span>
              </div>

              <p className="mt-5 text-lg font-semibold text-white">

                {transport.packetLossPercent <
                10

                  ? "Stable"

                  : transport.packetLossPercent <
                    25

                  ? "Moderate Loss"

                  : "Critical Congestion"}
              </p>
            </div>
          </div>
        </LayerCard>
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* THROUGHPUT */}
        <LayerCard
          layer={L}
          className="lg:col-span-2"
        >

          <SectionTitle className="mb-6">
            Throughput Timeline
          </SectionTitle>

          <div className="h-[260px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={
                  throughputSeries
                }
              >

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="t"
                  hide
                />

                <YAxis
                  tick={{
                    fill:
                      "#94a3b8",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#06b6d4"
                  fill="rgba(6,182,212,0.25)"
                  strokeWidth={2}
                />

                <RTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </LayerCard>

        {/* PIE */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-6">
            Packet Delivery
          </SectionTitle>

          <div className="h-[260px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={
                    pieData
                  }

                  dataKey="value"

                  innerRadius={60}

                  outerRadius={90}
                >

                  {pieData.map(
                    (
                      _,
                      i
                    ) => (

                      <Cell
                        key={i}
                        fill={
                          i === 0
                            ? "#22c55e"
                            : "#ef4444"
                        }
                      />
                    )
                  )}
                </Pie>

                <RTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </LayerCard>

        {/* RTX */}
        {transport.protocol ===
        "tcp" ? (

          <LayerCard
            layer={L}
            className="lg:col-span-3"
          >

            <SectionTitle className="mb-6">
              Retransmission Activity
            </SectionTitle>

            <div className="h-[260px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={
                    retransmissionSeries
                  }
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="t"
                    hide
                  />

                  <YAxis
                    domain={[
                      0,
                      100,
                    ]}

                    tick={{
                      fill:
                        "#94a3b8",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="r"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={false}
                  />

                  <RTooltip
                    content={
                      <ChartTooltipContent />
                    }
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </LayerCard>

        ) : null}
      </div>
    </motion.div>
  );
}