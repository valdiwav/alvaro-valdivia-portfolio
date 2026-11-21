"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK = 140; // distancia máxima para dibujar una conexión
const MOUSE_R = 180;

/**
 * Fondo del hero: nodos (agentes) que se conectan entre sí, reaccionan al cursor
 * y se envían «mensajes» (pulsos) por las conexiones.
 * Se pausa fuera de pantalla y queda estático con «reducir movimiento».
 */
export default function AgentNetwork({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      const count = Math.min(90, Math.max(28, Math.round((w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.8,
        hub: Math.random() < 0.12,
      }));
      pulses = [];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    };

    const spawnPulse = () => {
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (d < LINK && d < bestD && Math.random() > 0.3) {
          best = i;
          bestD = d;
        }
      }
      if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.012 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // conexiones
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d > LINK) continue;
          const near = Math.max(0, 1 - Math.hypot((n.x + m.x) / 2 - mouse.x, (n.y + m.y) / 2 - mouse.y) / MOUSE_R);
          const alpha = (1 - d / LINK) * (0.14 + near * 0.5);
          ctx.strokeStyle = near > 0.05 ? `rgba(94,234,212,${alpha})` : `rgba(160,170,190,${alpha})`;
          ctx.lineWidth = 0.6 + near * 0.6;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }

      // pulsos (mensajes entre agentes)
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, "rgba(165,243,252,0.95)");
        g.addColorStop(1, "rgba(94,234,212,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodos
      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / MOUSE_R);
        if (n.hub) {
          ctx.fillStyle = `rgba(139,156,255,${0.18 + near * 0.3})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.hub ? "rgba(190,200,255,0.95)" : `rgba(${near > 0.05 ? "94,234,212" : "200,208,222"},${0.55 + near * 0.45})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        // el cursor atrae suavemente a los nodos cercanos
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R && d > 1) {
          n.vx += (dx / d) * 0.012;
          n.vy += (dy / d) * 0.012;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        const speed = Math.hypot(n.vx, n.vy);
        if (speed < 0.08) {
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }
      pulses = pulses.filter((p) => (p.t += p.speed) < 1);
      if (pulses.length < 10 && Math.random() < 0.06) spawnPulse();
    };

    const loop = () => {
      if (visible && !document.hidden) {
        step();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (!reduced) {
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    }
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
