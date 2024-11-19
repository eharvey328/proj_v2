import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import clsx from "clsx";
import { camelCase } from "lodash-es";
import { renderComponents } from "./renderComponents";

type HtmlRendererProps = {
  html: string;
  className?: string;
};

export function HtmlRenderer(props: HtmlRendererProps) {
  const { html, className } = props;
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode.type === "tag") {
        const CustomComponent = renderComponents[domNode.name];
        const reactProps = convertAttributes(domNode.attribs);
        if (CustomComponent) {
          return (
            <CustomComponent {...reactProps}>
              {domToReact(domNode.children as DOMNode[], options)}
            </CustomComponent>
          );
        }
      }
    },
  };

  return <div className={clsx(className)}>{parse(html, options)}</div>;
}

// Convert HTML attributes to React props
function convertAttributes(attribs: Record<string, string> = {}) {
  const converted: Record<string, string | boolean | object> = {};
  Object.entries(attribs).forEach(([key, value]) => {
    // Convert known HTML attributes to React props
    const reactKey = attributeMap[key.toLowerCase()] || key;

    if (value === "" || value === key) {
      // Handle boolean attributes
      converted[reactKey] = true;
    } else if (reactKey === "style") {
      converted[reactKey] = convertStyleToObject(value);
    } else {
      converted[reactKey] = value;
    }
  });

  return converted;
}

function convertStyleToObject(styleString: string) {
  const style: Record<string, string> = {};
  styleString.split(";").forEach((el) => {
    const [property, value] = el.split(":");
    if (!property) return;
    const formattedProperty = camelCase(property.trim());
    style[formattedProperty] = value.trim();
  });

  return style;
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
