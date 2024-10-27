import clsx from "clsx";
import { ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

export function TextArea(props: TextAreaProps) {
  const { label, id: propsId, className, rows = 5, ...rest } = props;
  const id = propsId ?? `text--${label.replace("s+", "-")}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[14px] leading-tight mb-1">
        {label}
      </label>

      <textarea
        id={id}
        className={clsx("border p-2 rounded", className)}
        rows={rows}
        {...rest}
      />
    </div>
  );
}
