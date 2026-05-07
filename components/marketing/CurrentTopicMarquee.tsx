"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const TOPIC_TEXT = "text-sm font-bold text-orange-400 sm:text-base";

/** Mobile (&lt; md): one-line marquee when text overflows. Desktop: wraps. */
export function CurrentTopicMarquee({ value }: { value: string }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const outerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef(14);
  const [overflow, setOverflow] = useState(false);
  const [runMarquee, setRunMarquee] = useState(false);

  const display = value || "-";

  useLayoutEffect(() => {
    if (!isMobile) {
      setOverflow(false);
      setRunMarquee(false);
      return;
    }

    let cancelled = false;

    const check = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          const outer = outerRef.current;
          const measure = measureRef.current;
          if (!outer || !measure) return;

          const o = measure.scrollWidth > outer.clientWidth + 1;
          setOverflow(o);
          setRunMarquee(o && !prefersReducedMotion);
          if (o) {
            const ratio = measure.scrollWidth / Math.max(1, outer.clientWidth);
            durationRef.current = Math.min(42, Math.max(11, ratio * 7));
          }
        });
      });
    };

    check();
    const el = outerRef.current;
    if (!el) return () => {};

    const ro = new ResizeObserver(check);
    ro.observe(el);

    window.addEventListener("orientationchange", check);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("orientationchange", check);
    };
  }, [isMobile, value, prefersReducedMotion]);

  if (!isMobile) {
    return (
      <span className={`break-words [overflow-wrap:anywhere] ${TOPIC_TEXT}`}>{display}</span>
    );
  }

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden md:flex-none md:overflow-visible">
      <span className="sr-only">Current topic: {display}</span>
      {/* Invisible ruler: same typography as visible line */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={`pointer-events-none invisible absolute left-0 top-0 z-[-1] inline-block whitespace-nowrap ${TOPIC_TEXT}`}
      >
        {display}
      </span>

      <div ref={outerRef} className="relative overflow-hidden">
        {runMarquee ? (
          <div
            className={`nav-topic-marquee-track inline-block whitespace-nowrap ${TOPIC_TEXT}`}
            style={{ "--nav-marquee-duration": `${durationRef.current}s` } as React.CSSProperties}
            aria-hidden="true"
          >
            <span>{display}</span>
            <span className="mx-12 inline-block w-px shrink-0 select-none opacity-40 sm:mx-16" aria-hidden>
              │
            </span>
            <span>{display}</span>
            <span className="mx-12 inline-block w-px shrink-0 select-none opacity-40 sm:mx-16" aria-hidden>
              │
            </span>
          </div>
        ) : (
          <span
            className={`inline-block max-w-full whitespace-nowrap ${TOPIC_TEXT} ${overflow && prefersReducedMotion ? "min-w-0 truncate" : ""}`}
          >
            {display}
          </span>
        )}
      </div>
    </div>
  );
}
