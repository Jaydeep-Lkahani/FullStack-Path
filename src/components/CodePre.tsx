"use client";

import { useRef, useState } from "react";
import { CheckIcon, CodeIcon, CopyIcon, TerminalIcon } from "./course/icons";

/** `<pre>` replacement for MDX code blocks: file name, language label and copy button. */
export function CodePre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const data = props as Record<string, unknown>;
  const language = typeof data["data-language"] === "string" ? data["data-language"] : "";
  const filename = typeof data["data-filename"] === "string" ? data["data-filename"] : "";
  const kind = typeof data["data-kind"] === "string" ? data["data-kind"] : "code";
  const isOutput = kind === "output";

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

  const label = filename || (isOutput ? "Output" : kind === "shell" ? "Terminal" : "");
  const Icon = isOutput || kind === "shell" ? TerminalIcon : CodeIcon;

  return (
    <div className="codeblock" data-kind={kind}>
      <div className="codeblock-bar">
        {label && (
          <span className="codeblock-file">
            <Icon className="text-subtle size-3.5 shrink-0" />
            <span>{label}</span>
          </span>
        )}
        {language && !["text", "txt", "plaintext"].includes(language) && (
          <span className="codeblock-lang">{language}</span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          data-copied={copied}
          className={`codeblock-copy ${language && !["text", "txt", "plaintext"].includes(language) ? "" : "ml-auto"}`}
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre ref={ref} {...props} />
    </div>
  );
}
