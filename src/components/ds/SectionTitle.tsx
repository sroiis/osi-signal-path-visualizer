import type {
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({
  children,
  className = "",
}: Props) {

  return (
    <div
      className={`
        flex
        items-center
        gap-4

        ${className}
      `}
    >

      {/* LEFT BAR */}
      <div
        className="
          relative

          h-7
          w-[5px]

          overflow-hidden

          bg-orange-400
        "
      >

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-orange-300
            to-blue-400
          "
        />
      </div>

      {/* TITLE */}
      <div className="flex items-center gap-4">

        <h3
          className="
            text-[24px]
            font-black

            uppercase
            tracking-[0.04em]

            text-white
          "
        >
          {children}
        </h3>

        {/* STATUS DOT */}
        <div
          className="
            h-2
            w-2

            bg-orange-400

            shadow-[0_0_10px_rgba(251,146,60,0.7)]

            animate-pulse
          "
        />
      </div>

      {/* LINE */}
      <div
        className="
          relative

          h-px
          flex-1

          overflow-hidden

          bg-white/10
        "
      >

        <div
          className="
            absolute
            left-0
            top-0

            h-full
            w-40

            bg-gradient-to-r
            from-orange-400/40
            to-transparent
          "
        />
      </div>
    </div>
  );
}