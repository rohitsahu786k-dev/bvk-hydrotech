"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { EventImage } from "@/lib/events/types";
import styles from "./Events.module.css";

/** Photo grid; each photo opens in a viewer with arrows, arrow keys and a counter. */
export default function EventGallery({ images, title }: { images: EventImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const count = images.length;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  if (count === 0) return null;
  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, i) => (
          <li key={`${image.url}-${i}`}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Open photo ${i + 1} of ${count}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-ink"
            >
              <Image
                src={image.url}
                alt={image.alt || `${title} photo ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 outline-none"
            aria-describedby={undefined}
            onCloseAutoFocus={(e) => {
              // Radix only restores focus to a Dialog.Trigger; this opens from state.
              e.preventDefault();
              opener.current?.focus();
            }}
          >
            <Dialog.Title className="sr-only">
              {title} gallery, photo {index === null ? 0 : index + 1} of {count}
            </Dialog.Title>

            {current && (
              <div className="relative h-[80dvh] w-full max-w-5xl">
                <Image
                  src={current.url}
                  alt={current.alt || `${title} photo ${(index ?? 0) + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}

            <Dialog.Close
              aria-label="Close gallery"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <X aria-hidden className="h-5 w-5" />
            </Dialog.Close>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:left-6"
                >
                  <ChevronLeft aria-hidden className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:right-6"
                >
                  <ChevronRight aria-hidden className="h-6 w-6" />
                </button>
                <p aria-hidden className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-xs text-white">
                  {(index ?? 0) + 1} / {count}
                </p>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
