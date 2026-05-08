import { motion } from "framer-motion";
import { useMemo } from "react";

import {
  Activity,
  Globe,
  Terminal,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import {
  compressedSizeBytes,
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
  SectionTitle,
} from "../ds/SectionTitle";

import {
  SelectField,
} from "../ds/SelectField";

import {
  SliderField,
} from "../ds/SliderField";

import {
  PillButton,
} from "../ds/PillButton";

import {
  DownstreamAlerts,
} from "../DownstreamAlerts";

const L = 6;

const t =
  getLayerDesign(L);

function preview(
  enc: string
): string {

  if (
    enc === "none"
  ) {

    return "4E 65 74 77 6F 72 6B";
  }

  return "A1 F3 9C D2 7A 8B";
}

export function PresentationLayer() {

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

  const setEnc =
    useSimulatorStore(
      (s) =>
        s.setPresentationEncryption
    );

  const setComp =
    useSimulatorStore(
      (s) =>
        s.setPresentationCompression
    );

  const setEncoding =
    useSimulatorStore(
      (s) =>
        s.setPresentationEncoding
    );

  const setHex =
    useSimulatorStore(
      (s) =>
        s.setPresentationShowHexDump
    );

  const reset =
    useSimulatorStore(
      (s) =>
        s.resetPresentationLayer
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

  const barData =
    useMemo(
      () => [
        {
          name:
            "Original",

          bytes:
            application.dataSizeBytes,
        },

        {
          name:
            "Compressed",

          bytes:
            compressedSizeBytes(
              application.dataSizeBytes,
              presentation.compressionRatioPercent
            ),
        },
      ],

      [
        application.dataSizeBytes,
        presentation.compressionRatioPercent,
      ]
    );

  const gaugeData =
    useMemo(
      () => [
        {
          name: "cpu",

          value:
            metrics.encryptionCpuPercent,

          fill:
            t.accent,
        },
      ],

      [
        metrics.encryptionCpuPercent,
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

        <div className="space-y-6">

          <div
            className="
              inline-flex
              items-center
              gap-3

              border
              border-sky-400/20

              bg-sky-400/[0.06]

              px-4
              py-2
            "
          >

            <Shield
              size={16}
              className="text-sky-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-sky-300
              "
            >
              Secure Data Processing
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
              Presentation Layer
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
              Handles encryption,
              compression,
              encoding and binary
              formatting before
              data enters the
              session layer.
            </p>
          </div>

          {/* FLOW */}
          <div className="grid gap-4 md:grid-cols-4">

            {[
              "Payload Input",
              "Encryption",
              "Compression",
              "Encoding",
            ].map(
              (x) => (
                <div
                  key={x}

                  className="
                    border
                    border-white/10

                    bg-[#0f172a]/70

                    px-4
                    py-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="h-[2px] w-4 bg-sky-400" />

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
      <div className="grid gap-6 lg:grid-cols-2">

        {/* LEFT */}
        <LayerCard layer={L}>

          <SectionTitle className="mb-7">
            Transformation Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            <SelectField
              layer={L}
              label="Encryption"
              tooltip="Encryption algorithm selection."

              value={
                presentation.encryption
              }

              onChange={(e) =>
                setEnc(
                  e.target
                    .value as typeof presentation.encryption
                )
              }
            >

              <option value="none">
                None
              </option>

              <option value="aes128">
                AES-128
              </option>

              <option value="aes256">
                AES-256
              </option>
            </SelectField>

            <SliderField
              layer={L}

              label="Compression Ratio"

              tooltip="Compression efficiency."

              valueDisplay={`${presentation.compressionRatioPercent}%`}

              min={0}
              max={90}

              value={
                presentation.compressionRatioPercent
              }

              onChange={(e) =>
                setComp(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <SelectField
              layer={L}

              label="Character Encoding"

              tooltip="Data encoding standard."

              value={
                presentation.encoding
              }

              onChange={(e) =>
                setEncoding(
                  e.target
                    .value as typeof presentation.encoding
                )
              }
            >

              <option value="ascii">
                ASCII
              </option>

              <option value="utf8">
                UTF-8
              </option>

              <option value="utf16">
                UTF-16
              </option>
            </SelectField>

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
                  setHex(
                    !presentation.showHexDump
                  )
                }
              >
                Toggle Hex Stream
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
        <div className="flex flex-col gap-6">

          {/* BAR */}
          <LayerCard layer={L}>

            <SectionTitle className="mb-6">
              Compression Analysis
            </SectionTitle>

            <div className="h-[250px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={barData}
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="name"
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
                    dataKey="bytes"
                    fill={t.chart}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </LayerCard>

          {/* CPU */}
          <LayerCard layer={L}>

            <SectionTitle className="mb-6">
              Encryption Load
            </SectionTitle>

            <div className="relative mx-auto h-56 w-56">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="100%"
                  data={gaugeData}
                  startAngle={90}
                  endAngle={-270}
                >

                  <PolarAngleAxis
                    type="number"
                    domain={[
                      0,
                      100,
                    ]}
                    tick={false}
                  />

                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{
                      fill:
                        "#1e293b",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

                <div className="text-center">

                  <p className="text-5xl font-black text-sky-300">
                    {
                      metrics.encryptionCpuPercent
                    }
                    %
                  </p>

                  <p
                    className="
                      mt-2

                      text-xs
                      uppercase
                      tracking-[0.18em]

                      text-gray-500
                    "
                  >
                    CPU LOAD
                  </p>
                </div>
              </div>
            </div>
          </LayerCard>
        </div>
      </div>
    </motion.div>
  );
}