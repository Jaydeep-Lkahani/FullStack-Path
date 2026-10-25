"use client";

import { useRef, useState } from "react";
import {
  ClockIcon,
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

/** Best available poster: try the HD thumbnail, fall back when YouTube serves its tiny placeholder. */
function Poster({ id, className }: { id: string; className: string }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      className={className}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth < 400)
          setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
      }}
      onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
    />
  );
}

/**
 * Big in-page player. Nothing loads from YouTube until play (privacy-friendly), and
 * extra videos are switchable below the player so learners never leave the lesson.
 * "Pop out" turns it into a window you can drag and resize anywhere on the page.
 */
export function VideoShowcase({ videos }: { videos: Video[] }) {
  const items = videos.flatMap((v) => {
    const id = youtubeId(v.url);
    return id ? [{ video: v, id }] : [];
  });
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const fw = useFloatingVideo();
  const stageRef = useRef<HTMLElement>(null);
  if (items.length === 0) return null;

  const { video, id } = items[index];
  const start = youtubeStart(video.url);

  return (
    <div>
      <div
        className="video-slot relative"
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
              onClick={fw.dock}
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
                {video.title}
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
                onClick={fw.dock}
                aria-label="Dock video back into the page"
                className="video-btn"
              >
                <MinimizeIcon className="size-3.5" />
              </button>
            </div>
          )}
          <div className="relative aspect-video bg-black">
            {playing ? (
              <iframe
                key={id}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ""}`}
                title={video.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${video.title}`}
                className="focus-visible:outline-accent group absolute inset-0 h-full w-full cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-4"
              >
                <Poster
                  key={id}
                  id={id}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent"
                />
                <span className="video-play absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-2xl transition duration-300 group-hover:scale-110 group-active:scale-95 sm:size-24">
                  <span
                    aria-hidden
                    className="ping-dot absolute inset-0 rounded-full bg-white/60"
                  />
                  <PlayIcon className="relative size-8 translate-x-0.5 fill-current sm:size-10" />
                </span>
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-md bg-black/65 px-2 py-0.5 text-xs font-medium text-white backdrop-blur sm:right-4 sm:bottom-4">
                  <ClockIcon className="size-3" />
                  {video.duration}
                </span>
              </button>
            )}
          </div>
          {!fw.floating && (
            <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-5">
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{video.title}</span>
                <span className="text-muted text-xs">
                  {video.channel} · {video.duration}
                </span>
              </span>
              <button
                type="button"
                onClick={() => fw.popOut(stageRef.current)}
                className="video-btn video-btn-solid"
              >
                <PictureInPictureIcon className="size-3.5" />
                Pop out
              </button>
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

      {items.length > 1 && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2" aria-label="Videos in this lesson">
          {items.map((item, i) => {
            const on = i === index;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    if (!on) {
                      setIndex(i);
                      setPlaying(false);
                    }
                  }}
                  className={`video-pick focus-visible:outline-accent flex w-full cursor-pointer items-center gap-3 rounded-xl border p-2.5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    on
                      ? "border-accent/60 bg-accent/8"
                      : "border-border bg-surface hover:border-accent/40 hover:bg-surface-hover"
                  }`}
                >
                  <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-black sm:w-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute right-1 bottom-1 rounded bg-black/70 px-1 py-px text-[0.65rem] font-medium text-white">
                      {item.video.duration}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[0.7rem] font-semibold tracking-wider uppercase ${on ? "text-accent" : "text-muted"}`}
                    >
                      {on ? "Now selected" : `Video ${i + 1}`}
                    </span>
                    <span className="line-clamp-2 text-sm leading-snug font-medium">
                      {item.video.title}
                    </span>
                    <span className="text-muted mt-0.5 block text-xs">
                      {item.video.channel}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
