"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Scroll suave en toda la página. Se desactiva con «reducir movimiento». */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.1 });
    return () => lenis.destroy();
  }, []);
  return null;
}
