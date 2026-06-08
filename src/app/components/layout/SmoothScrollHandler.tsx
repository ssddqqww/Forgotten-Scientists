"use client";

import { useEffect } from "react";
import {
  announceHomeSection,
  isHomeSectionId,
} from "../../lib/homeSections";
import { smoothScrollToId } from "../../lib/smoothScroll";

export default function SmoothScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      if (isHomeSectionId(hash)) {
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
