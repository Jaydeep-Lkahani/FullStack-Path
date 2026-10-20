"use client";

import { useRef, useState } from "react";

/** `<pre>` replacement for MDX code blocks: adds a copy button. */
export function CodePre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (insecure context / denied): leave button unchanged.
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="border-border bg-background/80 text-muted hover:text-foreground absolute top-2 right-2 z-10 rounded-md border px-2 py-1 text-xs opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}
