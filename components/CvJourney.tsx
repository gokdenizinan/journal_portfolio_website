"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import styles from "@/app/cv/cv.module.css";
import windowStyles from "@/app/cv/window.module.css";

export function CvJourney({ children }: { children: ReactNode }) {
  const [shade, setShade] = useState(0);
  const [dragging, setDragging] = useState(false);
  const shadeValue = useRef(0);
  const view = useRef<HTMLSpanElement>(null);
  const hintId = useId();
  const gesture = useRef<{
    pointerId: number;
    startY: number;
    startValue: number;
    travel: number;
    moved: boolean;
  } | null>(null);
  const dark = shade >= 0.5;
  const page = useRef<HTMLElement>(null);

  function updateShade(value: number) {
    const next = Math.max(0, Math.min(1, value));
    shadeValue.current = next;
    setShade(next);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startValue: shadeValue.current,
      travel: Math.max(1, (view.current?.clientHeight ?? 180) * 0.82),
      moved: false,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    const distance = event.clientY - active.startY;
    if (!active.moved && Math.abs(distance) < 4) return;
    active.moved = true;
    setDragging(true);
    updateShade(active.startValue + distance / active.travel);
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const active = gesture.current;
    if (!active || active.pointerId !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    updateShade(
      cancelled
        ? active.startValue
        : active.moved
          ? shadeValue.current >= 0.5
            ? 1
            : 0
          : active.startValue >= 0.5
            ? 0
            : 1,
    );
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    let next: number;
    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight":
        next = shadeValue.current - 0.1;
        break;
      case "ArrowDown":
      case "ArrowLeft":
        next = shadeValue.current + 0.1;
        break;
      case "PageUp":
        next = shadeValue.current - 0.25;
        break;
      case "PageDown":
        next = shadeValue.current + 0.25;
        break;
      case "Home":
        next = 1;
        break;
      case "End":
        next = 0;
        break;
      case " ":
      case "Enter":
        next = shadeValue.current >= 0.5 ? 0 : 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    updateShade(next);
  }

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const timeline = root.querySelector<HTMLElement>("[data-cv-timeline]");
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.65 - rect.top) / rect.height),
      );
      timeline.style.setProperty("--cv-progress", `${progress * 100}%`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main
      ref={page}
      className={`${styles.page}${dark ? ` ${styles.dark}` : ""}`}
    >
      <div className={styles.windowPosition}>
        <div
          className={`${windowStyles["window-scene"]}${dark ? ` ${windowStyles.night}` : ""}`}
        >
          <div
            className={`${windowStyles["airplane-window"]}${dragging ? ` ${windowStyles.dragging}` : ""}`}
            role="slider"
            tabIndex={0}
            aria-label="Window shade"
            aria-describedby={hintId}
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((1 - shade) * 100)}
            aria-valuetext={
              shade === 0
                ? "Open"
                : shade === 1
                  ? "Closed"
                  : `${Math.round((1 - shade) * 100)}% open`
            }
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={(event) => finishDrag(event)}
            onPointerCancel={(event) => finishDrag(event, true)}
            onLostPointerCapture={(event) => finishDrag(event, true)}
            onKeyDown={handleKey}
          >
            <span className={windowStyles["window-outer"]}>
              <span className={windowStyles["window-inner"]}>
                <span ref={view} className={windowStyles["window-view"]}>
                  <span className={windowStyles.sky} />
                  <span className={windowStyles.stars} />
                  <span className={windowStyles.sun} />
                  <span
                    className={`${windowStyles.cloud} ${windowStyles["cloud-one"]}`}
                  />
                  <span
                    className={`${windowStyles.cloud} ${windowStyles["cloud-two"]}`}
                  />
                  <span
                    className={`${windowStyles.cloud} ${windowStyles["cloud-three"]}`}
                  />
                  <span className={windowStyles.wing} />
                  <span
                    className={windowStyles["window-shade"]}
                    style={{ transform: `translateY(${(shade - 1) * 82}%)` }}
                  >
                    <span className={windowStyles["shade-handle"]} />
                  </span>
                  <span className={windowStyles["glass-reflection"]} />
                </span>
              </span>
            </span>
          </div>
          <span className={windowStyles["window-caption"]}>
            {dark ? "A QUIETER POINT OF VIEW." : "A DIFFERENT POINT OF VIEW."}
          </span>
          <span id={hintId} className={windowStyles.windowHint}>
            Drag up or down · Click to toggle
          </span>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
