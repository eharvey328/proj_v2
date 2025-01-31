import { ComponentProps } from "react";
import { SvgIcon } from "./SvgIcon";

export function Error(props: ComponentProps<"svg">) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
