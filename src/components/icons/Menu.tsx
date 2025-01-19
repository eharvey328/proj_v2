import { ComponentProps } from "react";
import { SvgIcon } from "./SvgIcon";

export function Menu(props: ComponentProps<"svg">) {
  return (
    <SvgIcon {...props}>
      <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" fill="currentColor" />
    </SvgIcon>
  );
}
