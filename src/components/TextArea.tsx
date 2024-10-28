import clsx from "clsx";
import { ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

export function TextArea(props: TextAreaProps) {
  const { label, id: propsId, className, rows = 5, ...rest } = props;
  const id = propsId ?? `text--${label.replace("s+", "-")}`;

  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={id} className="leading-tight mb-1">
        {label}
      </label>

      <textarea
        id={id}
        className={clsx("border p-2 bg-layer", className)}
        rows={rows}
        {...rest}
      />
    </div>
  );
}
