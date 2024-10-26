import { ElementType } from "react";
import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import { renderComponents } from "./renderComponents";
import clsx from "clsx";

type Components = Record<string, ElementType>;

type HtmlRendererProps = {
  html: string;
  className?: string;
};

export function HtmlRenderer(props: HtmlRendererProps) {
  const { html, className } = props;
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        const CustomComponent = renderComponents[domNode.name];
        if (CustomComponent) {
          const reactProps = convertAttributes(domNode.attribs);
          return (
            <CustomComponent {...reactProps}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CustomComponent>
          );
        }
      }
    },
  };

  return (
    <div className={clsx("prose max-w-none", className)}>
      {parse(html, options)}
    </div>
  );
}

// Convert HTML attributes to React props
function convertAttributes(attribs: Record<string, string> = {}) {
  const converted: Record<string, string | boolean> = {};

  Object.entries(attribs).forEach(([key, value]) => {
    // Convert known HTML attributes to React props
    const reactKey = attributeMap[key.toLowerCase()] || key;

    // Handle boolean attributes
    if (value === "" || value === key) {
      converted[reactKey] = true;
    } else {
      converted[reactKey] = value;
    }
  });

  return converted;
}

const attributeMap: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  colspan: "colSpan",
  rowspan: "rowSpan",
  tabindex: "tabIndex",
  crossorigin: "crossOrigin",
  frameborder: "frameBorder",
  allowfullscreen: "allowFullScreen",
  maxlength: "maxLength",
  minlength: "minLength",
  readonly: "readOnly",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  spellcheck: "spellCheck",
  contenteditable: "contentEditable",
};
