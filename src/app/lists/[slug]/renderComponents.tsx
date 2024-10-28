import { ComponentProps, ElementType } from "react";

export const renderComponents: Record<string, ElementType> = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="text-4xl font-bold" {...props} />
  ),
  h2: (props: ComponentProps<"h1">) => (
    <h2 className="text-3xl font-bold" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-2xl font-bold" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc ml-6" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal ml-6" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a
      className="hover:underline"
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => {
    const { children, ...rest } = props;
    return (
      <div className="overflow-x-auto">
        <table
          className="min-w-full border-collapse border bg-layer text-sm"
          {...rest}
        >
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  },
  th: (props: ComponentProps<"th">) => (
    <th className="border px-4 py-3" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border px-4 py-3" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="border-l-4 pl-4 italic" {...props} />
  ),
};
