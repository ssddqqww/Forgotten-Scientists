"use client";

import { useEffect } from "react";
import { smoothScrollToId } from "../../lib/smoothScroll";

export default function SmoothScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      window.setTimeout(() => {
        smoothScrollToId(hash);
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
