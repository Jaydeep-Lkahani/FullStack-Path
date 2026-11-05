"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  GripIcon,
  MinimizeIcon,
  MinusIcon,
  PictureInPictureIcon,
  PlayIcon,
  PlusIcon,
} from "@/components/course/icons";
import type { Video } from "@/lib/content";
import { youtubeId, youtubeStart } from "@/lib/youtube";
import { type Corner, useFloatingVideo } from "./useFloatingVideo";

const CORNERS: Corner[] = ["nw", "ne", "sw", "se"];

/**
 * Compact list of a lesson's videos (UI-UX.md §8.6). Clicking a row expands the player
 * inline; nothing loads from YouTube until then. Once playing, scrolling past the player
 * floats it in a corner window that can be dragged and resized, and docked back.
 */
export function VideoShowcase({ videos }: { videos: Video[] }) {
  const items = videos.flatMap((v) => {
    const id = youtubeId(v.url);
    return id ? [{ video: v, id }] : [];
  });
  const [index, setIndex] = useState<number | null>(null);
  const [userDocked, setUserDocked] = useState(false);
  const fw = useFloatingVideo();
  const stageRef = useRef<HTMLElement>(null);
  const open = index !== null;

  // Float the player when it scrolls out of view while playing (until the learner docks it).
  const { floating, popOut } = fw;
  useEffect(() => {
    const el = stageRef.current;
    if (!open || floating || userDocked || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) popOut(el);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [open, floating, userDocked, popOut, index]);

  if (items.length === 0) return null;
  const current = index !== null ? items[index] : null;

  function dock() {
    setUserDocked(true);
    fw.dock();
  }

  function close() {
    if (fw.floating) fw.dock();
    setIndex(null);
  }

  return (
    <div>
      <ul
        className="card divide-border divide-y p-1.5"
        aria-label="Videos in this lesson"
      >
        {items.map((item, i) => {
          const on = i === index;
          return (
            <li key={item.id} className="pt-1.5 first:pt-0 [&+li]:mt-0">
              <button
                type="button"
                aria-pressed={on}
                aria-expanded={on}
                aria-controls="lesson-player"
                onClick={() => {
                  setUserDocked(false);
                  setIndex(on ? null : i);
                }}
                className="video-row group"
              >
                <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black sm:w-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                    alt=""
                    width={160}
                    height={90}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/25 opacity-90">
                    <span className="grid size-8 place-items-center rounded-full bg-white/95 text-zinc-900 shadow-lg transition-transform duration-200 ease-out group-hover:scale-110">
                      <PlayIcon className="size-3.5 translate-x-px fill-current" />
                    </span>
                  </span>
                  <span className="absolute right-1 bottom-1 rounded bg-black/75 px-1 text-[0.6875rem] font-medium text-white tabular-nums">
                    {item.video.duration}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-[0.9375rem] leading-snug font-semibold">
                    {item.video.title}
                  </span>
                  <span className="text-muted mt-0.5 block text-[0.8125rem]">
                    {item.video.channel} · {item.video.duration}
                  </span>
                </span>
                <ChevronDownIcon
                  className={`text-subtle mr-1 size-4 shrink-0 transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="video-expand" data-open={open} id="lesson-player">
        <div>
          {current && (
            <div
              className="video-slot relative mt-3"
              style={fw.floating ? { height: fw.slotHeight } : undefined}
            >
              {fw.floating && (
                <div className="video-ghost" role="status">
                  <PictureInPictureIcon className="text-accent size-6" />
                  <p className="text-sm font-semibold">Video is floating</p>
                  <p className="text-muted text-xs">
                    Drag it anywhere, resize it from any corner.
                  </p>
                  <button
                    type="button"
                    onClick={dock}
                    className="video-btn video-btn-solid mt-1"
                  >
                    <MinimizeIcon className="size-3.5" />
                    Dock back here
                  </button>
                </div>
              )}
              <figure
                ref={stageRef}
                className={`video-stage not-prose ${fw.floating ? "is-floating" : ""} ${
                  fw.entering ? "is-entering" : ""
                } ${fw.interacting ? "is-interacting" : ""}`}
                style={
                  fw.floating
                    ? { left: fw.rect.x, top: fw.rect.y, width: fw.rect.w }
                    : undefined
                }
              >
                {fw.floating && (
                  <div
                    role="group"
                    tabIndex={0}
                    aria-label="Floating video. Arrow keys move it, plus and minus resize it, Escape docks it."
                    onKeyDown={fw.onBarKeyDown}
                    className="video-bar"
                    data-gesture="move"
                    {...fw.gestureProps}
                  >
                    <GripIcon className="text-muted size-4 shrink-0" />
                    <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                      {current.video.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => fw.resizeBy(-60)}
                      aria-label="Make video smaller"
                      className="video-btn"
                    >
                      <MinusIcon className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fw.resizeBy(60)}
                      aria-label="Make video larger"
                      className="video-btn"
                    >
                      <PlusIcon className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={dock}
                      aria-label="Dock video back into the page"
                      className="video-btn"
                    >
                      <MinimizeIcon className="size-3.5" />
                    </button>
                  </div>
                )}
                <div className="relative aspect-video bg-black">
                  <iframe
                    key={current.id}
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0${
                      youtubeStart(current.video.url)
                        ? `&start=${youtubeStart(current.video.url)}`
                        : ""
                    }`}
                    title={current.video.title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                </div>
                {!fw.floating && (
                  <figcaption className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="text-muted min-w-0 truncate text-xs">
                      Scroll on and the video follows you in a corner.
                    </span>
                    <span className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => fw.popOut(stageRef.current)}
                        className="video-btn video-btn-solid"
                      >
                        <PictureInPictureIcon className="size-3.5" />
                        Pop out
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        aria-label="Close video"
                        className="video-btn"
                      >
                        <CloseIcon className="size-3.5" />
                      </button>
                    </span>
                  </figcaption>
                )}
                {fw.floating &&
                  CORNERS.map((c) => (
                    <span
                      key={c}
                      aria-hidden
                      className={`video-handle video-handle-${c}`}
                      data-gesture={c}
                      {...fw.gestureProps}
                    />
                  ))}
              </figure>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
