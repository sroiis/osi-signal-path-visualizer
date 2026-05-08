import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DelayedTooltipProps = {
  content: ReactNode;
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export function DelayedTooltip({
  content,
  children,
  delayMs = 500,
  className = "inline-flex",
}: DelayedTooltipProps) {

  const [open, setOpen] =
    useState(false);

  const timerRef =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  const clearTimer =
    useCallback(() => {

      if (
        timerRef.current
      ) {

        clearTimeout(
          timerRef.current
        );

        timerRef.current =
          null;
      }

    }, []);

  const show =
    useCallback(() => {

      clearTimer();

      timerRef.current =
        setTimeout(
          () =>
            setOpen(true),

          delayMs
        );

    }, [
      clearTimer,
      delayMs,
    ]);

  const hide =
    useCallback(() => {

      clearTimer();

      setOpen(false);

    }, [clearTimer]);

  useEffect(
    () => () => clearTimer(),
    [clearTimer]
  );

  return (
    <div
      className={`
        relative
        ${className}
      `}

      onMouseEnter={show}
      onMouseLeave={hide}

      onFocus={show}
      onBlur={hide}
    >

      {children}

      {open ? (
        <div
          role="tooltip"

          className="
            pointer-events-none

            absolute
            bottom-full
            left-1/2
            z-50

            mb-3

            -translate-x-1/2
          "
        >

          {/* TOOLTIP */}
          <div
            className="
              relative

              max-w-[280px]

              border
              border-orange-400/15

              bg-[#0d1422]/96

              px-4
              py-3

              text-left

              text-[12px]
              font-medium
              leading-relaxed

              text-gray-200

              shadow-[0_12px_30px_rgba(0,0,0,0.35)]

              backdrop-blur-xl
            "
          >

            {/* GRID */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:18px_18px]" />

            {/* GLOW */}
            <div
              className="
                absolute
                right-0
                top-0

                h-20
                w-20

                opacity-20

                blur-[55px]
              "
              style={{
                background:
                  "#fb923c",
              }}
            />

            {/* CONTENT */}
            <div className="relative z-10">
              {content}
            </div>

            {/* ARROW */}
            <div
              className="
                absolute

                left-1/2
                top-full

                h-3
                w-3

                -translate-x-1/2
                rotate-45

                border-r
                border-b

                border-orange-400/15

                bg-[#0d1422]
              "
              aria-hidden
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}