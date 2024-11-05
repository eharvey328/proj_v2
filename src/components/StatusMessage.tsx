import { ReactNode } from "react";
import clsx from "clsx";
import { CircleCheck } from "./icons/CheckCircle";
import { Error } from "./icons/Error";

type NotificationProps = {
  type?: "success" | "error";
  children: ReactNode;
};

export function StatusMessage(props: NotificationProps) {
  const { type = "success", children } = props;

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div className="flex items-center gap-2">
      {isSuccess && <CircleCheck className="text-green-400 h-5 w-5" />}
      {isError && <Error className="text-red-400 h-5 w-5" />}
      <p
        className={clsx("text-sm", {
          "text-green-200": isSuccess,
          "text-red-200": isError,
        })}
      >
        {children}
      </p>
    </div>
  );
}
