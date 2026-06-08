"use client";

import { useEffect } from "react";
import {
  announceHomeSection,
  isHomeSectionId,
} from "../../lib/homeSections";
import {
  smoothScrollToDesktopSection,
  smoothScrollToId,
} from "../../lib/smoothScroll";

export default function SmoothScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      if (isHomeSectionId(hash)) {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          window.setTimeout(() => {
            smoothScrollToDesktopSection(hash);
          }, 100);
          return;
        }

        announceHomeSection(hash);
      }

      window.setTimeout(() => {
        smoothScrollToId(isHomeSectionId(hash) ? "explore-workspace" : hash);
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("popstate", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("popstate", scrollToHash);
    };
  }, []);

  return null;
}
