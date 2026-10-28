"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { EventVideo } from "@/lib/events/types";

/**
 * Silent background video for a banner.
 *
 * The banner's pictures are always rendered underneath, so the page never waits
 * on the video and never jumps. The video only starts when it is welcome: not
 * with "reduce motion", not on data saver, and (for YouTube / Vimeo, which are
 * heavy) not on phones. A pause button is always offered once it plays, because
 * moving content that runs for more than a few seconds must be stoppable. It
 * sits above the strip of cards that overlaps the banner's lower edge.
 */
export default function HeroVideo({ video }: { video: EventVideo }) {
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const phone = window.matchMedia("(max-width: 767px)").matches;
    const ok = !reduce && !saveData && !(video.kind !== "file" && phone);
    // Deferred a frame: the first paint is the picture.
    const id = window.requestAnimationFrame(() => setAllowed(ok));
    return () => window.cancelAnimationFrame(id);
  }, [video]);

  if (!allowed) return null;

  const id = video.src.split("/").pop() ?? "";
  const embed =
    video.kind === "youtube"
      ? `${video.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1&rel=0&disablekb=1`
      : `${video.src}?background=1&autoplay=1&muted=1&loop=1`;

  return (
    <>
      {playing &&
        (video.kind === "file" ? (
          <video
            ref={ref}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
        ) : (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <iframe
              src={embed}
              title="Background video"
              tabIndex={-1}
              allow="autoplay; encrypted-media"
              className="absolute left-1/2 top-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        ))}

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-pressed={!playing}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-16 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-ink/60 text-white backdrop-blur transition-colors hover:bg-ink/80"
      >
        {playing ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
      </button>
    </>
  );
}
