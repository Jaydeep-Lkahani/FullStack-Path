import { ViewTransition } from "react";

const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Wraps a page's content so links tagged `transitionTypes={["nav-forward"|"nav-back"]}`
 * slide it in the matching direction (UI-UX.md §11.1). Put it in each page, not a layout.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      {children}
    </ViewTransition>
  );
}

/** Shared-element morph: the same `name` on two pages morphs one into the other. */
export function Morph({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
