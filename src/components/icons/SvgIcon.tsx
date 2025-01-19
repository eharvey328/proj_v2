import clsx from "clsx";
import { ComponentProps } from "react";

interface SvgIconProps extends ComponentProps<"svg"> {
  defaultSize?: number;
}

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
    </svg>
  );
}
