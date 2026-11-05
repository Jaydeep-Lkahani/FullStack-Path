"use client";

/** A button that opens the ⌘K search palette. */
export function OpenSearchButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("fs:open-search"))}
      className={className}
    >
      {children}
    </button>
  );
}
