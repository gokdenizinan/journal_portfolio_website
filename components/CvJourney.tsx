"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "@/app/cv/cv.module.css";
import windowStyles from "@/app/cv/window.module.css";

export function CvJourney({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const page = useRef<HTMLElement>(null);

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
          <button
            type="button"
            className={windowStyles["airplane-window"]}
            role="switch"
            aria-checked={dark}
            aria-label="Night view"
            onClick={() => setDark((value) => !value)}
          >
            <span className={windowStyles["window-outer"]}>
              <span className={windowStyles["window-inner"]}>
                <span className={windowStyles["window-view"]}>
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
                    style={{ height: dark ? "78%" : undefined }}
                  >
                    <span className={windowStyles["shade-handle"]} />
                  </span>
                  <span className={windowStyles["glass-reflection"]} />
                </span>
              </span>
            </span>
          </button>
          <span className={windowStyles["window-caption"]}>
            {dark ? "A QUIETER POINT OF VIEW." : "A DIFFERENT POINT OF VIEW."}
          </span>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
