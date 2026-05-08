import { motion } from "framer-motion";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  RefreshCw,
  Timer,
  Wifi,
} from "lucide-react";

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
  SectionTitle,
} from "../ds/SectionTitle";

import {
  DownstreamAlerts,
} from "../DownstreamAlerts";

const L = 5;

const t =
  getLayerDesign(L);

export function SessionLayer() {

  const session =
    useSimulatorStore(
      (s) => s.session
    );

  const faultPulse =
    useSimulatorStore(
      (s) =>
        s.session.faultPulse
    );

  const application =
    useSimulatorStore(
      (s) => s.application
    );

  const presentation =
    useSimulatorStore(
      (s) => s.presentation
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

  const [
    bytesTransferred,
    setBytesTransferred,
  ] = useState(0);

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

  useEffect(() => {

    const id =
      window.setInterval(
        () => {

          setBytesTransferred(
            (b) => {

              const next =
                b +
                Math.round(
                  metrics.goodputMbps *
                    22 +
                    Math.random() *
                      30
                );

              return (
                next %
                (5 *
                  1024 *
                  1024)
              );
            }
          );
        },

        1000
      );

    return () =>
      window.clearInterval(
        id
      );

  }, [
    metrics.goodputMbps,
  ]);

  useEffect(() => {

    if (
      faultPulse > 0
    ) {

      setBytesTransferred(
        (b) =>
          Math.floor(
            b * 0.3
          )
      );
    }

  }, [faultPulse]);

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
              border-green-400/20

              bg-green-400/[0.06]

              px-4
              py-2
            "
          >

            <Activity
              size={16}
              className="text-green-300"
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]

                text-green-300
              "
            >
              Stateful Communication Control
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
              Session Layer
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
              Maintains communication
              continuity, checkpoint recovery,
              synchronization and persistent
              session orchestration between
              connected systems.
            </p>
          </div>

          {/* PIPELINE */}
          <div className="grid gap-4 md:grid-cols-5">

            {[
              "Session Open",
              "Authentication",
              "Sync Control",
              "Data Stream",
              "Recovery",
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

                    <div className="h-2 w-2 bg-green-400" />

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

      {/* STATUS */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Session Lifecycle
        </SectionTitle>

        {/* FLOW */}
        <div className="flex flex-wrap items-center gap-3">

          {[
            "OPEN",
            "AUTH",
            "ACTIVE",
            "STREAM",
            "RECOVERY",
            "CLOSE",
          ].map(
            (
              step,
              i
            ) => (

              <div
                key={step}

                className="flex items-center gap-3"
              >

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
                    delay:
                      i * 0.06,
                  }}

                  whileHover={{
                    y: -2,
                  }}

                  className="
                    border
                    border-green-400/20

                    bg-green-400/[0.08]

                    px-5
                    py-3

                    text-sm
                    font-semibold

                    tracking-[0.08em]

                    text-green-300
                  "
                >

                  {step}

                </motion.div>

                {i < 5 ? (

                  <div
                    className="
                      h-[2px]
                      w-10

                      bg-gradient-to-r
                      from-green-400
                      to-blue-400
                    "
                  />

                ) : null}
              </div>
            )
          )}

        </div>

        {/* METRICS */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {/* DATA */}
          <motion.div
            whileHover={{
              y: -2,
            }}

            className="
              border
              border-green-400/15

              bg-green-400/[0.04]

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <DatabaseIcon />

              <p
                className="
                  text-sm
                  font-semibold

                  text-green-300
                "
              >
                Data Transferred
              </p>
            </div>

            <h3
              className="
                mt-5

                text-3xl
                font-black

                text-white
              "
            >
              {(
                bytesTransferred /
                1024
              ).toFixed(1)} KB
            </h3>
          </motion.div>

          {/* THROUGHPUT */}
          <motion.div
            whileHover={{
              y: -2,
            }}

            className="
              border
              border-blue-400/15

              bg-blue-400/[0.04]

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <Wifi
                size={18}
                className="text-blue-300"
              />

              <p
                className="
                  text-sm
                  font-semibold

                  text-blue-300
                "
              >
                Throughput
              </p>
            </div>

            <h3
              className="
                mt-5

                text-3xl
                font-black

                text-white
              "
            >
              {metrics.goodputMbps.toFixed(
                1
              )} Mbps
            </h3>
          </motion.div>

          {/* TIMEOUT */}
          <motion.div
            whileHover={{
              y: -2,
            }}

            className="
              border
              border-orange-400/15

              bg-orange-400/[0.04]

              p-5
            "
          >

            <div className="flex items-center gap-3">

              <Timer
                size={18}
                className="text-orange-300"
              />

              <p
                className="
                  text-sm
                  font-semibold

                  text-orange-300
                "
              >
                Session Timeout
              </p>
            </div>

            <h3
              className="
                mt-5

                text-3xl
                font-black

                text-white
              "
            >
              {
                session.sessionTimeoutSec
              }
              s
            </h3>
          </motion.div>
        </div>
      </LayerCard>

      {/* RECOVERY PANEL */}
      <LayerCard layer={L}>

        <SectionTitle className="mb-7">
          Recovery Monitoring
        </SectionTitle>

        <div className="grid gap-5 md:grid-cols-2">

          {/* RECOVERY */}
          <div
            className="
              border
              border-white/10

              bg-[#0f172a]/75

              p-6
            "
          >

            <div className="flex items-center gap-4">

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

                <RefreshCw
                  size={22}
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Recovery State
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  {
                    faultPulse > 0

                      ? "Recovery Triggered"

                      : "Stable"
                  }
                </h3>
              </div>
            </div>

            <div className="mt-6 h-2 bg-white/10">

              <motion.div
                initial={{
                  width: 0,
                }}

                animate={{
                  width:
                    faultPulse > 0

                      ? "65%"

                      : "100%",
                }}

                transition={{
                  duration: 0.5,
                }}

                className="
                  h-full

                  bg-gradient-to-r
                  from-orange-400
                  to-green-400
                "
              />
            </div>
          </div>

          {/* ACTIVE */}
          <div
            className="
              border
              border-white/10

              bg-[#0f172a]/75

              p-6
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  bg-green-400/[0.08]

                  text-green-300
                "
              >

                <Activity
                  size={22}
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Session Health
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  ACTIVE
                </h3>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">

              <div className="h-3 w-3 bg-green-400 animate-pulse" />

              <span className="text-sm text-gray-300">
                Persistent communication channel operational
              </span>
            </div>
          </div>
        </div>
      </LayerCard>
    </motion.div>
  );
}

function DatabaseIcon() {

  return (
    <div
      className="
        flex
        h-10
        w-10

        items-center
        justify-center

        bg-green-400/[0.08]

        text-green-300
      "
    >

      <Activity size={18} />

    </div>
  );
}