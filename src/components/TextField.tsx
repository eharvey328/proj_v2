import clsx from "clsx";
import { ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  helperText?: string;
}

export function TextField(props: TextFieldProps) {
  const {
    label,
    helperText,
    id: propsId,
    className,
    type = "text",
    ...rest
  } = props;
  const id = propsId ?? `text--${label.replace("s+", "-")}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-[16px] mb-2">
        {label}
        {helperText && (
          <div className="text-zinc-500 text-[14px]">{helperText}</div>
        )}
      </label>

      <input
        id={id}
        type={type}
        className={clsx("border h-[40px] px-2 rounded", className)}
        {...rest}
      />
    </div>
  );
}
