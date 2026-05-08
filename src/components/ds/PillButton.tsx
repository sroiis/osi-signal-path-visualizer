import type {
  CSSProperties,
  ReactNode,
} from "react";

import { motion } from "framer-motion";

type Variant =
  | "primary"
  | "secondary"
  | "danger";

type Props = {
  variant?: Variant;
  accent: string;
  accentHover: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function PillButton({
  variant = "primary",
  accent,
  accentHover,
  children,
  className = "",
  disabled,
  onClick,
}: Props) {

  const base = `
    inline-flex

    min-h-[48px]
    h-12

    items-center
    justify-center

    border

    px-6

    text-[14px]
    font-semibold
    uppercase
    tracking-[0.08em]

    transition-all
    duration-200

    focus-visible:outline-none
    focus-visible:ring-[3px]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#0a0f1c]

    disabled:cursor-not-allowed
    disabled:opacity-40
  `;

  /* DANGER */

  if (variant === "danger") {

    return (
      <motion.button
        type="button"

        whileHover={{
          y:
            disabled ? 0 : -2,
        }}

        whileTap={{
          scale:
            disabled ? 1 : 0.98,
        }}

        disabled={disabled}

        onClick={onClick}

        className={`
          ${base}

          border-red-400/20

          bg-red-500/[0.08]

          text-red-300

          hover:border-red-400/35
          hover:bg-red-500/[0.14]

          shadow-[0_8px_24px_rgba(239,68,68,0.08)]

          ${className}
        `}
      >
        {children}
      </motion.button>
    );
  }

  /* SECONDARY */

  if (variant === "secondary") {

    return (
      <motion.button
        type="button"

        whileHover={{
          y:
            disabled ? 0 : -2,
        }}

        whileTap={{
          scale:
            disabled ? 1 : 0.98,
        }}

        disabled={disabled}

        onClick={onClick}

        className={`
          ${base}

          bg-white/[0.03]

          hover:bg-white/[0.06]

          shadow-[0_8px_22px_rgba(0,0,0,0.14)]

          ${className}
        `}

        style={
          {
            borderColor: `${accent}30`,

            color: accent,

            "--tw-ring-color":
              accent,
          } as CSSProperties
        }
      >
        {children}
      </motion.button>
    );
  }

  /* PRIMARY */

  return (
    <motion.button
      type="button"

      whileHover={{
        y:
          disabled ? 0 : -2,
      }}

      whileTap={{
        scale:
          disabled ? 1 : 0.98,
      }}

      disabled={disabled}

      onClick={onClick}

      className={`
        ${base}

        border-transparent

        text-white

        shadow-[0_10px_28px_rgba(0,0,0,0.2)]

        ${className}
      `}

      style={{
        backgroundColor:
          accent,
      }}

      onMouseEnter={(e) => {

        if (!disabled) {

          (
            e.currentTarget as HTMLButtonElement
          ).style.backgroundColor =
            accentHover;
        }
      }}

      onMouseLeave={(e) => {

        if (!disabled) {

          (
            e.currentTarget as HTMLButtonElement
          ).style.backgroundColor =
            accent;
        }
      }}
    >
      {children}
    </motion.button>
  );
}