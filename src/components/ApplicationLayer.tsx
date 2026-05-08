import { motion } from "framer-motion";

import {
  useMemo,
} from "react";

import {
  Activity,
  Globe,
  Shield,
  Terminal,
} from "lucide-react";

import {
  type ApplicationDataType,
  logBytesFromSliderPosition,
  sliderPositionFromBytes,
  useSimulatorStore,
} from "../store/simulatorStore";

import { getLayerDesign } from "../lib/layerDesign";

import { LayerCard } from "./ds/LayerCard";
import { PillButton } from "./ds/PillButton";
import { PillSwitch } from "./ds/PillSwitch";
import { SectionTitle } from "./ds/SectionTitle";
import { SelectField } from "./ds/SelectField";
import { SliderField } from "./ds/SliderField";

import { DownstreamAlerts } from "./DownstreamAlerts";

const LAYER = 7;

const t =
  getLayerDesign(LAYER);

const MIN_B = 1024;

const MAX_B =
  10 * 1024 * 1024;

function formatBytes(
  n: number
): string {

  if (
    n >=
    1024 * 1024
  ) {

    return `${(
      n /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  }

  if (n >= 1024) {

    return `${(
      n / 1024
    ).toFixed(1)} KB`;
  }

  return `${n} B`;
}

function buildProtocolPreview(
  dataType: ApplicationDataType,
  dataSizeBytes: number,
  rps: number,
  secureTransport: boolean
): string {

  const secure =
    secureTransport
      ? "ENABLED"
      : "DISABLED";

  if (
    dataType ===
    "http"
  ) {

    return [
      "GET /network/telemetry HTTP/1.1",
      "HOST: signalpath.net",
      `TLS_SECURITY: ${secure}`,
      `PAYLOAD_BYTES: ${dataSizeBytes}`,
      `REQUEST_RATE: ${rps}`,
      "",
      "STATUS: TRANSMISSION READY",
    ].join("\n");
  }

  if (
    dataType ===
    "smtp"
  ) {

    return [
      "MAIL TRANSPORT SESSION",
      `TLS_MODE: ${secure}`,
      `DATA_SIZE: ${formatBytes(dataSizeBytes)}`,
      `REQUEST_RATE: ${rps}`,
      "",
      "MAIL QUEUE ACTIVE",
    ].join("\n");
  }

  return [
    "FTP TRANSFER SESSION",
    `SECURE_CHANNEL: ${secure}`,
    `TRANSFER_SIZE: ${formatBytes(dataSizeBytes)}`,
    `TRANSFER_RATE: ${rps}`,
    "",
    "REMOTE DATA CHANNEL READY",
  ].join("\n");
}

function consoleTitle(
  type: ApplicationDataType
): string {

  if (
    type === "http"
  ) {

    return "HTTP TRAFFIC CONSOLE";
  }

  if (
    type === "smtp"
  ) {

    return "MAIL RELAY TERMINAL";
  }

  return "FTP TRANSFER TERMINAL";
}

export function ApplicationLayer() {

  const application =
    useSimulatorStore(
      (s) =>
        s.application
    );

  const setDataType =
    useSimulatorStore(
      (s) =>
        s.setApplicationDataType
    );

  const setDataSizeBytes =
    useSimulatorStore(
      (s) =>
        s.setApplicationDataSizeBytes
    );

  const setRps =
    useSimulatorStore(
      (s) =>
        s.setApplicationRequestCadenceRps
    );

  const setSecure =
    useSimulatorStore(
      (s) =>
        s.setApplicationSecureTransport
    );

  const resetApplicationLayer =
    useSimulatorStore(
      (s) =>
        s.resetApplicationLayer
    );

  const generateSample =
    useSimulatorStore(
      (s) =>
        s.generateSampleApplicationData
    );

  const sliderPct =
    sliderPositionFromBytes(
      application.dataSizeBytes,
      MIN_B,
      MAX_B
    );

  const preview =
    useMemo(
      () =>
        buildProtocolPreview(
          application.dataType,
          application.dataSizeBytes,
          application.requestCadenceRps,
          application.secureTransport
        ),

      [
        application.dataType,
        application.dataSizeBytes,
        application.requestCadenceRps,
        application.secureTransport,
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
      <LayerCard
        layer={LAYER}
      >

        <div className="space-y-7">

          {/* TOP */}
          <div className="flex flex-wrap items-start justify-between gap-6">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-3

                  border
                  border-orange-400/20

                  bg-orange-400/[0.06]

                  px-4
                  py-2
                "
              >

                <Activity
                  size={16}
                  className="text-orange-300"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]

                    text-orange-300
                  "
                >
                  User Traffic Interface
                </span>
              </div>

              <h1
                className="
                  mt-6

                  text-5xl
                  font-black
                  tracking-tight

                  text-white
                "
              >
                Application Layer
              </h1>

              <p
                className="
                  mt-5

                  max-w-4xl

                  text-[15px]
                  leading-relaxed

                  text-gray-400
                "
              >
                Simulates user-level communication
                services including web requests,
                mail delivery and file transfer
                operations across application
                protocols and secure channels.
              </p>
            </div>

            {/* STATUS */}
            <div
              className="
                min-w-[220px]

                border
                border-white/10

                bg-[#0f172a]/80

                p-5
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]

                  text-orange-300
                "
              >
                Session Status
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12

                    items-center
                    justify-center

                    bg-orange-400/[0.08]

                    text-orange-300
                  "
                >

                  <Globe size={22} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Active Protocol
                  </p>

                  <h3 className="mt-1 text-xl font-bold uppercase text-white">
                    {application.dataType}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* FLOW */}
          <div className="grid gap-4 md:grid-cols-4">

            {[
              "Client Request",
              "Protocol Formatting",
              "Payload Assembly",
              "Network Dispatch",
            ].map(
              (step) => (
                <div
                  key={step}

                  className="
                    border
                    border-white/10

                    bg-[#0f172a]/75

                    px-4
                    py-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="h-[2px] w-4 bg-orange-400" />

                    <span
                      className="
                        text-sm
                        font-semibold

                        text-gray-200
                      "
                    >
                      {step}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </LayerCard>

      <DownstreamAlerts />

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">

        {/* LEFT */}
        <LayerCard
          layer={LAYER}
        >

          <SectionTitle className="mb-7">
            Traffic Generation Controls
          </SectionTitle>

          <div className="flex flex-col gap-7">

            {/* PROTOCOL */}
            <SelectField
              layer={LAYER}
              label="Application Protocol"
              tooltip="Protocol used for traffic generation."

              value={
                application.dataType
              }

              onChange={(e) =>
                setDataType(
                  e.target
                    .value as ApplicationDataType
                )
              }
            >

              <option value="http">
                HTTP Web Traffic
              </option>

              <option value="smtp">
                SMTP Mail Relay
              </option>

              <option value="ftp">
                FTP Data Transfer
              </option>
            </SelectField>

            {/* TLS */}
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

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    bg-orange-400/[0.08]

                    text-orange-300
                  "
                >

                  <Shield size={20} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Encryption
                  </p>

                  <h3 className="mt-1 font-semibold text-white">
                    TLS Secure Channel
                  </h3>
                </div>
              </div>

              <PillSwitch
                checked={
                  application.secureTransport
                }

                onChange={
                  setSecure
                }

                accent={
                  t.accent
                }

                aria-label="TLS"
              />
            </div>

            {/* PAYLOAD */}
            <SliderField
              layer={LAYER}

              label="Payload Volume"

              tooltip="Controls generated payload size."

              valueDisplay={formatBytes(
                application.dataSizeBytes
              )}

              min={0}
              max={100}

              step={0.5}

              value={sliderPct}

              onChange={(
                e
              ) => {

                const v =
                  logBytesFromSliderPosition(
                    Number(
                      e.target.value
                    ),
                    MIN_B,
                    MAX_B
                  );

                setDataSizeBytes(
                  v
                );
              }}
            />

            {/* RPS */}
            <SliderField
              layer={LAYER}

              label="Request Frequency"

              tooltip="Requests generated per second."

              valueDisplay={`${application.requestCadenceRps} req/s`}

              min={1}
              max={1000}

              value={
                application.requestCadenceRps
              }

              onChange={(e) =>
                setRps(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <PillButton
                variant="secondary"

                accent={
                  t.accent
                }

                accentHover={
                  t.accentHover
                }

                onClick={() =>
                  resetApplicationLayer()
                }
              >
                Reset Layer
              </PillButton>

              <PillButton
                variant="primary"

                accent={
                  t.accent
                }

                accentHover={
                  t.accentHover
                }

                onClick={() =>
                  generateSample()
                }
              >
                Generate Traffic
              </PillButton>
            </div>
          </div>
        </LayerCard>

        {/* RIGHT */}
        <LayerCard
          layer={LAYER}
        >

          {/* TERMINAL HEADER */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">

            <div className="flex items-center gap-2">

              <span className="h-[3px] w-5 bg-red-400" />

              <span className="h-[3px] w-5 bg-yellow-400" />

              <span className="h-[3px] w-5 bg-green-400" />
            </div>

            <div className="flex items-center gap-3 text-gray-400">

              <Terminal size={16} />

              <span className="text-sm font-medium uppercase tracking-[0.08em]">
                {consoleTitle(
                  application.dataType
                )}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6">

            {/* PAYLOAD */}
            <div>

              <label
                className="
                  mb-3
                  block

                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]

                  text-gray-500
                "
              >
                Generated Request Payload
              </label>

              <textarea
                readOnly

                value={
                  application.dataType ===
                  "http"

                    ? `GET https://signalpath.net/api/telemetry`

                    : application.dataType ===
                      "smtp"

                    ? `MAIL FROM: telemetry@signalpath.net`

                    : `ftp://mirror.signalpath.net/releases/data.bin`
                }

                className="
                  min-h-[130px]
                  w-full

                  resize-none

                  border
                  border-white/10

                  bg-[#0b1220]

                  p-4

                  font-mono
                  text-sm
                  leading-relaxed

                  text-orange-300

                  outline-none
                "
              />
            </div>

            {/* PREVIEW */}
            <div
              className="
                border
                border-orange-400/15

                bg-orange-400/[0.04]

                p-5
              "
            >

              <div
                className="
                  mb-4

                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]

                  text-orange-300
                "
              >
                Transmission Preview
              </div>

              <pre
                className="
                  overflow-auto

                  whitespace-pre-wrap
                  break-all

                  font-mono
                  text-sm
                  leading-relaxed

                  text-orange-200
                "
              >
                {preview}
              </pre>
            </div>
          </div>
        </LayerCard>
      </div>
    </motion.div>
  );
}