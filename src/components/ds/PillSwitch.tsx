import type {
  CSSProperties,
} from "react";

type Props = {
  checked: boolean;
  onChange: (
    v: boolean
  ) => void;

  accent: string;

  id?: string;

  "aria-label"?: string;
};

export function PillSwitch({
  checked,
  onChange,
  accent,
  id,
  "aria-label": ariaLabel,
}: Props) {

  const style:
    CSSProperties & {
      "--accent"?: string;
    } = {

    backgroundColor:
      checked
        ? `${accent}18`
        : "rgba(255,255,255,0.04)",

    borderColor:
      checked
        ? `${accent}55`
        : "rgba(255,255,255,0.08)",

    "--accent":
      accent,
  };

  return (
    <button
      id={id}

      type="button"

      role="switch"

      aria-checked={
        checked
      }

      aria-label={
        ariaLabel
      }

      onClick={() =>
        onChange(!checked)
      }

      className="
        group
        relative

        h-8
        w-[64px]

        shrink-0

        border

        transition-all
        duration-200

        shadow-[0_6px_18px_rgba(0,0,0,0.18)]

        focus-visible:outline-none

        focus-visible:ring-[3px]

        focus-visible:ring-[color:var(--accent)]

        focus-visible:ring-offset-2

        focus-visible:ring-offset-[#0a0f1c]
      "

      style={style}
    >

      {/* ACTIVE GLOW */}
      <div
        className={`
          absolute
          inset-0

          transition-opacity
          duration-200

          ${
            checked
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        style={{
          background: `linear-gradient(90deg, ${accent}25, transparent)`,
        }}
      />

      {/* TRACK LINES */}
      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.04]

          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)]

          bg-[size:10px_10px]
        "
      />

      {/* KNOB */}
      <span
        className={`
          absolute
          top-1

          flex
          h-6
          w-6

          items-center
          justify-center

          bg-white

          shadow-[0_2px_10px_rgba(0,0,0,0.22)]

          transition-all
          duration-200

          ${
            checked
              ? "right-1"
              : "left-1"
          }
        `}
      >

        {/* CENTER */}
        <span
          className={`
            h-2
            w-2

            transition-all
            duration-200

            ${
              checked
                ? "opacity-100"
                : "opacity-40"
            }
          `}
          style={{
            background:
              checked
                ? accent
                : "#64748b",
          }}
        />
      </span>
    </button>
  );
}