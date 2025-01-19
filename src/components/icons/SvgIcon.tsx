import clsx from "clsx";
import { ComponentProps } from "react";

export type SvgIconProps = ComponentProps<"svg"> & {
  defaultSize?: number;
};

export function SvgIcon(props: SvgIconProps) {
  const { defaultSize = 24, className, children, ...rest } = props;
  return (
    <svg
      className={clsx(className)}
      width={defaultSize}
      height={defaultSize}
      viewBox={`0 0 ${defaultSize} ${defaultSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
      <path
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
