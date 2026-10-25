"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export interface FloatRect {
  x: number;
  y: number;
  w: number;
}

export type Corner = "nw" | "ne" | "sw" | "se";
type Gesture = "move" | Corner;

/** Height of the floating window's title bar (px); the video below keeps 16:9. */
export const BAR = 40;
const ASPECT = 9 / 16;
const MIN_W = 240;
const EDGE = 8;
const HEADER = 64;
/** Height the empty slot collapses to while the video floats (px). */
const GHOST_H = 136;
const KEY = "fs-learn-video-float-v1";

const heightOf = (w: number) => BAR + w * ASPECT;

function clamp(r: FloatRect): FloatRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxW = Math.max(
    MIN_W,
    Math.min(vw - EDGE * 2, (vh - HEADER - EDGE - BAR) / ASPECT),
  );
  const w = Math.round(Math.min(Math.max(r.w, MIN_W), maxW));
  const h = heightOf(w);
  return {
    w,
    x: Math.round(Math.min(Math.max(r.x, EDGE), Math.max(EDGE, vw - w - EDGE))),
    y: Math.round(Math.min(Math.max(r.y, HEADER), Math.max(HEADER, vh - h - EDGE))),
  };
}

function defaultRect(): FloatRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(420, vw - EDGE * 2);
  // On narrow screens the contents button sits bottom-right, so leave room for it.
  const bottomGap = vw < 1280 ? 84 : 16;
  return clamp({ w, x: vw - w - 16, y: vh - heightOf(w) - bottomGap });
}

function loadRect(): FloatRect {
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(KEY) ?? "null",
    ) as FloatRect | null;
    if (saved && [saved.x, saved.y, saved.w].every(Number.isFinite)) return clamp(saved);
  } catch {
    // Storage unavailable or corrupt: use the default.
  }
  return defaultRect();
}

function saveRect(r: FloatRect) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // Private mode / quota: the position just won't be remembered.
  }
}

/**
 * Lets an element pop out into a draggable, resizable window. The element is only restyled
 * (never moved in the DOM), so an embedded iframe keeps playing while it floats.
 */
export function useFloatingVideo() {
  const [floating, setFloating] = useState(false);
  const [entering, setEntering] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [rect, setRect] = useState<FloatRect>({ x: 0, y: 0, w: 420 });
  const [slotHeight, setSlotHeight] = useState(0);
  const rectRef = useRef(rect);
  const gesture = useRef<{
    kind: Gesture;
    px: number;
    py: number;
    start: FloatRect;
  } | null>(null);

  const apply = useCallback((next: FloatRect) => {
    rectRef.current = next;
    setRect(next);
  }, []);

  const popOut = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      const box = el.getBoundingClientRect();
      setSlotHeight(box.height);
      // Start exactly where the player sits, then glide to the saved/default spot.
      apply({ x: box.left, y: box.top, w: box.width });
      setFloating(true);
      setEntering(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          apply(loadRect());
          setSlotHeight(GHOST_H);
          window.setTimeout(() => setEntering(false), 450);
        }),
      );
    },
    [apply],
  );

  const dock = useCallback(() => {
    setFloating(false);
    setEntering(false);
    setInteracting(false);
    gesture.current = null;
  }, []);

  useEffect(() => {
    if (!floating) return;
    const onResize = () => apply(clamp(rectRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [floating, apply]);

  function onGestureDown(e: PointerEvent<HTMLElement>) {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture is best-effort: moves still arrive while the pointer stays over the window.
    }
    gesture.current = {
      kind: e.currentTarget.dataset.gesture as Gesture,
      px: e.clientX,
      py: e.clientY,
      start: rectRef.current,
    };
    setInteracting(true);
  }

  function onGestureMove(e: PointerEvent<HTMLElement>) {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.px;
    const dy = e.clientY - g.py;
    if (g.kind === "move") {
      apply(clamp({ ...g.start, x: g.start.x + dx, y: g.start.y + dy }));
      return;
    }
    const east = g.kind.endsWith("e") ? 1 : -1;
    const south = g.kind.startsWith("s") ? 1 : -1;
    const fromX = east * dx;
    const fromY = (south * dy) / ASPECT;
    const grow = Math.abs(fromX) >= Math.abs(fromY) ? fromX : fromY;
    const w = clamp({ ...g.start, w: g.start.w + grow }).w;
    const startH = heightOf(g.start.w);
    apply(
      clamp({
        w,
        x: east === 1 ? g.start.x : g.start.x + (g.start.w - w),
        y: south === 1 ? g.start.y : g.start.y + (startH - heightOf(w)),
      }),
    );
  }

  function onGestureUp() {
    if (!gesture.current) return;
    gesture.current = null;
    setInteracting(false);
    saveRect(rectRef.current);
  }

  function onGestureCancel() {
    gesture.current = null;
    setInteracting(false);
  }

  /** Keyboard access: arrows move, +/- resize, Escape docks. */
  function onBarKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return;
    const step = e.shiftKey ? 96 : 24;
    const r = rectRef.current;
    let next: FloatRect | null = null;
    if (e.key === "ArrowLeft") next = { ...r, x: r.x - step };
    else if (e.key === "ArrowRight") next = { ...r, x: r.x + step };
    else if (e.key === "ArrowUp") next = { ...r, y: r.y - step };
    else if (e.key === "ArrowDown") next = { ...r, y: r.y + step };
    else if (e.key === "+" || e.key === "=") next = { ...r, w: r.w + 48 };
    else if (e.key === "-") next = { ...r, w: r.w - 48 };
    else if (e.key === "Escape") {
      dock();
      return;
    }
    if (!next) return;
    e.preventDefault();
    apply(clamp(next));
    saveRect(rectRef.current);
  }

  /** Grow or shrink by a fixed step, keeping the window's centre fixed. */
  function resizeBy(delta: number) {
    const r = rectRef.current;
    const w = clamp({ ...r, w: r.w + delta }).w;
    apply(
      clamp({ w, x: r.x - (w - r.w) / 2, y: r.y - (heightOf(w) - heightOf(r.w)) / 2 }),
    );
    saveRect(rectRef.current);
  }

  return {
    floating,
    entering,
    interacting,
    rect,
    slotHeight,
    popOut,
    dock,
    gestureProps: {
      onPointerDown: onGestureDown,
      onPointerMove: onGestureMove,
      onPointerUp: onGestureUp,
      onPointerCancel: onGestureCancel,
    },
    onBarKeyDown,
    resizeBy,
  };
}
