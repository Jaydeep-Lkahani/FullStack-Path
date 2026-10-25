"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./course/icons";

/** `<pre>` replacement for MDX code blocks: window bar with language label and copy button. */
export function CodePre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = (props as Record<string, unknown>)["data-language"];

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
    <div className="codeblock">
      <div className="codeblock-bar">
        <span className="codeblock-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        {typeof language === "string" && language && (
          <span className="codeblock-lang">{language}</span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          data-copied={copied}
          className="codeblock-copy focus-visible:outline-accent focus-visible:outline-2"
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
          <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre ref={ref} {...props} />
    </div>
  );
}
