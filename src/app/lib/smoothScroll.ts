"use client";

const NAV_OFFSET = 96;
const SCROLL_DURATION = 1100;

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function smoothScrollToId(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  smoothScrollToElement(element);
}

export function smoothScrollToDesktopSection(id: string) {
  const element = document.querySelector<HTMLElement>(
    `#desktop-home-sections #${id}`,
  );

  if (!element) return;

  smoothScrollToElement(element);
}

function smoothScrollToElement(element: HTMLElement) {
  const startY = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}
