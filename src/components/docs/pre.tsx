import React from "react";
import cn from "classnames";
import ClipboardDocumentIcon from "@/icons/ClipboardDocument";
import ClipboardDocumentCheckIcon from "@/icons/ClipboardDocumentCheck";

export default function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const onClick = () => {
    setCopied(true);
    const content = ref.current?.textContent;
    if (content) {
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <button
        className={cn(
          "absolute top-9 right-4 rounded-md border border-transparent p-2 hover:border-brand-500",
          !copied ? "bg-gray-200/90" : "bg-brand-100/90"
        )}
        onClick={onClick}
      >
        {!copied ? (
          <ClipboardDocumentIcon className="h-5 w-5 text-black" />
        ) : (
          <ClipboardDocumentCheckIcon className="h-5 w-5 text-brand-900" />
        )}
      </button>
      <pre ref={ref} {...props}>
        {children}
      </pre>
    </div>
  );
}
