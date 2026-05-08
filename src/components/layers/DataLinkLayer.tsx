import { motion } from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  Cpu,
  Shield,
  Wifi,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
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
  PillSwitch,
} from "../ds/PillSwitch";

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

const L = 2;

const t =
  getLayerDesign(L);

export function DataLinkLayer() {

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

  const crcPulse =
    useSimulatorStore(
      (s) =>
        s.dataLink
          .crcFailurePulse
    );

  const setBer =
    useSimulatorStore(
      (s) =>
        s.setDataLinkBer
    );

  const setMac =
    useSimulatorStore(
      (s) =>
        s.setDataLinkMac
    );

  const setCsma =
    useSimulatorStore(
      (s) =>
        s.setDataLinkCsma
    );

  const injectBit =
    useSimulatorStore(
      (s) =>
        s.injectBitError
    );

  const reset =
    useSimulatorStore(
      (s) =>
        s.resetDataLinkLayer
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
    ferSeries,
    setFerSeries,
  ] = useState<
    {
      t: number;
      fer: number;
    }[]
  >([]);

  const [
    crcFails,
    setCrcFails,
  ] = useState(0);

  useEffect(() => {

    const id =
      window.setInterval(
        () => {

          setFerSeries(
            (s) =>
              [
                ...s,

                {
                  t:
                    Date.now(),

                  fer:
                    Math.min(
                      100,

                      dataLink.berPercent *
                        9 +

                        Math.random() *
                          (
                            metrics.framesCorrupted %
                            8
                          )
                    ),
                },
              ].slice(-45)
          );
        },

        1100
      );

    return () =>
      window.clearInterval(
        id
      );

  }, [
    dataLink.berPercent,
    metrics.framesCorrupted,
  ]);

  useEffect(() => {

    if (
      crcPulse > 0
    ) {

      setCrcFails(
        (c) => c + 1
      );
    }

  }, [crcPulse]);

  const crcOk =
    crcFails % 2 === 0;

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
              border-yellow-400/20

              bg-yellow-400/[0.06]

              px-4
              py-2
            "
          >

            <Wifi
              size={16}
              className="text-yellow-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-yellow-300
              "
            >
              Frame & MAC Coordination
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
              Data Link Layer
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
              Simulates Ethernet and
              wireless frame transfer,
              MAC addressing,
              CRC validation,
              collision monitoring
              and frame-level
              integrity management.
            </p>
          </div>

          {/* FLOW */}
          <div className="flex flex-wrap items-center gap-3">

            {[
              "Preamble",
              "Destination",
              "Source",
              "Payload",
              "CRC",
            ].map(
              (
                x,
                i
              ) => (
                <div
                  key={x}
                  className="flex items-center gap-3"
                >

                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                    }}

                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay:
                        i * 0.1,
                    }}

                    className="
                      border
                      border-yellow-400/20

                      bg-yellow-400/[0.08]

                      px-4
                      py-3

                      font-mono
                      text-yellow-300
                    "
                  >
                    {x}
                  </motion.div>

                  {i < 4 ? (

                    <div className="text-yellow-400">
                      →
                    </div>

                  ) : null}
                </div>
              )
            )}
          </div>
        </div>
      </LayerCard>

      <DownstreamAlerts />

      {/* LIVE FRAME */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Ethernet Frame Structure
        </SectionTitle>

        <div className="flex flex-wrap gap-3">

          {[
            "PREAMBLE",
            "DEST",
            "SRC",
            "TYPE",
            "PAYLOAD",
            "CRC",
          ].map(
            (
              x,
              i
            ) => (

              <motion.div
                key={x}

                animate={{
                  y: [0, -3, 0],
                }}

                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay:
                    i * 0.12,
                }}

                className="
                  border
                  border-yellow-400/20

                  bg-yellow-400/[0.08]

                  px-5
                  py-4

                  font-semibold

                  text-yellow-300
                "
              >
                {x}
              </motion.div>
            )
          )}
        </div>
      </LayerCard>

      {/* MAIN */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

        {/* CONTROLS */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Link Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            {/* BER */}
            <SliderField
              layer={L}

              label="Bit Error Rate"

              tooltip="Frame corruption probability."

              valueDisplay={`${dataLink.berPercent}%`}

              min={0}

              max={10}

              step={0.1}

              value={
                dataLink.berPercent
              }

              onChange={(e) =>
                setBer(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* MAC */}
            <SelectField
              layer={L}

              label="MAC Protocol"

              tooltip="Medium access protocol."

              value={
                dataLink.macProtocol
              }

              onChange={(e) =>
                setMac(
                  e.target
                    .value as typeof dataLink.macProtocol
                )
              }
            >

              <option value="ethernet">
                Ethernet
              </option>

              <option value="wifi">
                Wi-Fi
              </option>

              <option value="tokenring">
                Token Ring
              </option>
            </SelectField>

            {/* CSMA */}
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-4

                border
                border-white/10

                bg-[#0f172a]/70

                p-5
              "
            >

              <div className="flex items-center gap-3">

                <Cpu
                  size={18}
                  className="text-yellow-300"
                />

                <span className="font-semibold text-white">
                  CSMA/CD Detection
                </span>
              </div>

              <PillSwitch
                checked={
                  dataLink.csmaCd
                }

                onChange={() =>
                  setCsma(
                    !dataLink.csmaCd
                  )
                }

                accent={
                  t.accent
                }

                aria-label="CSMA"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <PillButton
                variant="primary"

                accent="#ec4899"

                accentHover="#db2777"

                onClick={() =>
                  injectBit()
                }
              >
                Inject Bit Error
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

        {/* INSPECTOR */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Frame Inspector
          </SectionTitle>

          <div className="flex flex-col gap-5 font-mono text-sm">

            {/* ADDR */}
            <div
              className="
                border
                border-cyan-400/10

                bg-cyan-400/[0.04]

                p-5

                text-cyan-300
              "
            >

              <p>
                DEST :
                AA:BB:CC:DD:EE:FF
              </p>

              <p className="mt-3">
                SRC :
                00:11:22:33:44:55
              </p>
            </div>

            {/* CRC */}
            <div
              className="
                border
                border-pink-400/10

                bg-pink-400/[0.04]

                p-5
              "
            >

              <p className="text-pink-300">
                CRC :
                0x3F2A
              </p>

              <motion.div
                key={crcFails}

                animate={{
                  opacity: [0.6, 1],
                }}

                className={`mt-4 font-semibold ${
                  crcOk

                    ? "text-green-300"

                    : "text-red-300"
                }`}
              >

                {crcOk

                  ? "FRAME VALID"

                  : "CRC FAILURE"}
              </motion.div>
            </div>

            {/* COLLISION */}
            <div
              className="
                border
                border-yellow-400/10

                bg-yellow-400/[0.04]

                p-5

                text-yellow-300
              "
            >

              <p>
                COLLISION STATUS :
              </p>

              <p className="mt-3 font-semibold text-white">

                {dataLink.csmaCd

                  ? "MONITORING ACTIVE"

                  : "DISABLED"}
              </p>
            </div>
          </div>
        </LayerCard>
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* FER */}
        <LayerCard layer={L}>

          <DelayedTooltip
            content="Real-time frame error analysis."
            delayMs={500}
          >

            <SectionTitle className="mb-6">
              Frame Error Rate
            </SectionTitle>

          </DelayedTooltip>

          <div className="h-[260px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={ferSeries}
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
                  dataKey="fer"
                  stroke="#f59e0b"
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

        {/* CRC */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-6">
            CRC Failure Counter
          </SectionTitle>

          <div className="flex flex-col items-center justify-center py-12">

            <motion.div
              animate={{
                scale:
                  crcFails > 4

                    ? [1, 1.08, 1]

                    : 1,
              }}

              transition={{
                duration: 1,
                repeat:
                  crcFails > 4

                    ? Infinity

                    : 0,
              }}

              className={`
                text-7xl
                font-black

                ${
                  crcFails > 4

                    ? "text-pink-400"

                    : "text-yellow-300"
                }
              `}
            >

              {crcFails}

            </motion.div>

            <p
              className="
                mt-4

                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-gray-500
              "
            >
              CRC Failures Detected
            </p>
          </div>
        </LayerCard>
      </div>
    </motion.div>
  );
}