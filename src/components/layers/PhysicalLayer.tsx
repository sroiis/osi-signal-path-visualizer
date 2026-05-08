import { motion } from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  Antenna,
  Binary,
  Radio,
  Signal,
  Zap,
} from "lucide-react";

import {
  Area,
  AreaChart,
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
  DownstreamAlerts,
} from "../DownstreamAlerts";

const L = 1;

const t =
  getLayerDesign(L);

export function PhysicalLayer() {

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

  const setMedium =
    useSimulatorStore(
      (s) =>
        s.setPhysicalMedium
    );

  const setSig =
    useSimulatorStore(
      (s) =>
        s.setPhysicalSignal
    );

  const setSnr =
    useSimulatorStore(
      (s) =>
        s.setPhysicalSnr
    );

  const setIf =
    useSimulatorStore(
      (s) =>
        s.setPhysicalInterference
    );

  const setDist =
    useSimulatorStore(
      (s) =>
        s.setPhysicalDistance
    );

  const addRep =
    useSimulatorStore(
      (s) =>
        s.addRepeater
    );

  const reset =
    useSimulatorStore(
      (s) =>
        s.resetPhysicalLayer
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

  const attenuation =
    useMemo(() => {

      const lossPer100 =
        physical.medium ===
        "fiber"

          ? 0.2

          : physical.medium ===
            "wifi6"

          ? 3

          : 1.2;

      return (
        (physical.distanceM /
          100) *
          lossPer100 +

        (
          physical.repeaterCount >
          0

            ? -physical.repeaterCount *
              2

            : 0
        )
      );

    }, [
      physical.medium,
      physical.distanceM,
      physical.repeaterCount,
    ]);

  const [
    waveform,
    setWaveform,
  ] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);

  useEffect(() => {

    const id =
      window.setInterval(
        () => {

          const amp =
            Math.max(
              0.3,

              physical.snrDb /
                30
            );

          const noise =
            physical.interference ===
            "severe"

              ? 0.9

              : physical.interference ===
                "mild"

              ? 0.45

              : 0.15;

          const next =
            Array.from(
              {
                length: 40,
              },

              (_, i) => ({
                x: i,

                y:
                  Math.sin(
                    i / 3
                  ) *
                    amp +

                  (
                    Math.random() -
                    0.5
                  ) *
                    noise,
              })
            );

          setWaveform(
            next
          );
        },

        700
      );

    return () =>
      window.clearInterval(
        id
      );

  }, [
    physical.snrDb,
    physical.interference,
  ]);

  const signalQuality =
    Math.max(
      0,

      Math.min(
        100,

        physical.snrDb * 3 -
          attenuation * 2
      )
    );

  const bitStream =
    "10110100110101101010011010110101";

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
              border-cyan-400/20

              bg-cyan-400/[0.06]

              px-4
              py-2
            "
          >

            <Signal
              size={16}
              className="text-cyan-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-cyan-300
              "
            >
              Signal Propagation Engine
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
              Physical Layer
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
              Simulates electrical,
              optical and wireless
              signal transmission,
              attenuation,
              propagation noise,
              repeaters and
              binary signal movement
              across communication media.
            </p>
          </div>

          {/* FLOW */}
          <div className="grid gap-4 md:grid-cols-5">

            {[
              "Binary Input",
              "Signal Encoding",
              "Medium Transfer",
              "Noise Injection",
              "Receiver Decode",
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

                    <div className="h-2 w-2 bg-cyan-400" />

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

      {/* MAIN */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

        {/* CONTROLS */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Transmission Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            {/* MEDIUM */}
            <SelectField
              layer={L}

              label="Transmission Medium"

              tooltip="Physical transport channel."

              value={
                physical.medium
              }

              onChange={(e) =>
                setMedium(
                  e.target
                    .value as typeof physical.medium
                )
              }
            >

              <option value="copper">
                Copper Ethernet
              </option>

              <option value="fiber">
                Fiber Optic
              </option>

              <option value="wifi6">
                Wi-Fi 6
              </option>
            </SelectField>

            {/* SIGNAL */}
            <SliderField
              layer={L}

              label="Signal Strength"

              tooltip="Signal power level."

              valueDisplay={`${physical.signalDbm} dBm`}

              min={-30}

              max={10}

              value={
                physical.signalDbm
              }

              onChange={(e) =>
                setSig(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* SNR */}
            <SliderField
              layer={L}

              label="Signal Noise Ratio"

              tooltip="Transmission clarity level."

              valueDisplay={`${physical.snrDb} dB`}

              min={0}

              max={30}

              value={
                physical.snrDb
              }

              onChange={(e) =>
                setSnr(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* INTERFERENCE */}
            <SelectField
              layer={L}

              label="Environmental Interference"

              tooltip="External transmission disruption."

              value={
                physical.interference
              }

              onChange={(e) =>
                setIf(
                  e.target
                    .value as typeof physical.interference
                )
              }
            >

              <option value="none">
                Stable
              </option>

              <option value="mild">
                Moderate
              </option>

              <option value="severe">
                Severe
              </option>
            </SelectField>

            {/* DIST */}
            <SliderField
              layer={L}

              label="Cable Distance"

              tooltip="Longer distances increase attenuation."

              valueDisplay={`${physical.distanceM} m`}

              min={1}

              max={500}

              value={
                physical.distanceM
              }

              onChange={(e) =>
                setDist(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* BUTTONS */}
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
                  addRep()
                }
              >
                Add Repeater (
                {
                  physical.repeaterCount
                }
                )
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
            Signal Status
          </SectionTitle>

          <div className="flex flex-col gap-5">

            {/* QUALITY */}
            <div
              className="
                border
                border-cyan-400/15

                bg-cyan-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Radio
                  size={18}
                  className="text-cyan-300"
                />

                <span className="text-sm font-semibold text-cyan-300">
                  Signal Quality
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
                {signalQuality.toFixed(
                  0
                )}%
              </h3>
            </div>

            {/* ERRORS */}
            <div
              className="
                border
                border-red-400/15

                bg-red-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Zap
                  size={18}
                  className="text-red-300"
                />

                <span className="text-sm font-semibold text-red-300">
                  Bit Errors
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
                  metrics.bitErrors
                }
              </h3>
            </div>

            {/* MEDIUM */}
            <div
              className="
                border
                border-violet-400/15

                bg-violet-400/[0.04]

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Antenna
                  size={18}
                  className="text-violet-300"
                />

                <span className="text-sm font-semibold text-violet-300">
                  Active Medium
                </span>
              </div>

              <h3
                className="
                  mt-5

                  text-2xl
                  font-black
                  uppercase

                  text-white
                "
              >
                {
                  physical.medium
                }
              </h3>
            </div>
          </div>
        </LayerCard>
      </div>

      {/* WAVEFORM */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Signal Waveform Analysis
        </SectionTitle>

        <div className="h-[280px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={waveform}
            >

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="x"
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
                dataKey="y"
                stroke="#06b6d4"
                fill="rgba(6,182,212,0.18)"
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

      {/* BIT STREAM */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Binary Signal Stream
        </SectionTitle>

        <div
          className="
            overflow-auto

            border
            border-cyan-400/10

            bg-[#081121]

            p-6

            font-mono
            text-[20px]
            font-bold
            tracking-[0.2em]

            text-cyan-300
          "
        >

          {bitStream.split("").map(
            (
              bit,
              i
            ) => {

              const flip =
                i % 11 === 0 &&
                metrics.bitErrors >
                  15;

              return (
                <motion.span
                  key={i}

                  animate={{
                    opacity: [
                      0.6,
                      1,
                    ],

                    color:
                      flip

                        ? "#ef4444"

                        : "#67e8f9",
                  }}

                  transition={{
                    duration: 0.5,
                  }}

                  className="inline-block min-w-[18px]"
                >

                  {flip

                    ? bit === "1"
                      ? "0"
                      : "1"

                    : bit}
                </motion.span>
              );
            }
          )}

        </div>
      </LayerCard>

      {/* TELEMETRY */}
      <div className="grid gap-6 lg:grid-cols-3">

        {[
          {
            label:
              "Attenuation",

            value:
              `${attenuation.toFixed(2)} dB`,

            icon:
              <Signal size={18} />,

            color:
              "text-cyan-300",
          },

          {
            label:
              "Repeater Nodes",

            value:
              `${physical.repeaterCount}`,

            icon:
              <Activity size={18} />,

            color:
              "text-green-300",
          },

          {
            label:
              "Noise Integrity",

            value:
              `${physical.snrDb} dB`,

            icon:
              <Binary size={18} />,

            color:
              "text-yellow-300",
          },
        ].map(
          (x) => (
            <LayerCard
              key={x.label}
              layer={L}
            >

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      bg-white/[0.04]
                    "
                  >
                    <div className={x.color}>
                      {x.icon}
                    </div>
                  </div>

                  <h3
                    className="
                      text-lg
                      font-bold

                      text-white
                    "
                  >
                    {x.label}
                  </h3>
                </div>

                <div
                  className={`
                    text-4xl
                    font-black

                    ${x.color}
                  `}
                >
                  {x.value}
                </div>
              </div>
            </LayerCard>
          )
        )}

      </div>
    </motion.div>
  );
}