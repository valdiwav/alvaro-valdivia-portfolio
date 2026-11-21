"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import type { content } from "@/content/profile";

type Demos = (typeof content)["es"]["demos"];

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0d12] shadow-[0_0_80px_-30px_rgba(94,234,212,0.35)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- Terminal de job-agent ---------- */

const icons = { cmd: "$", info: "›", skip: "⊘", score: "★", ok: "✓" } as const;
const tone = {
  cmd: "text-fg",
  info: "text-muted",
  skip: "text-muted",
  score: "text-accent",
  ok: "text-[#86efac]",
} as const;

export function JobAgentTerminal({ demo }: { demo: Demos["agent"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);
  const [typed, setTyped] = useState(0);
  const cmd = demo.lines[0].text;

  useEffect(() => {
    if (reduced || !inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms));

    const run = () => {
      setShown(0);
      setTyped(0);
      let t = 300;
      for (let i = 1; i <= cmd.length; i++) at((t += 45), () => setTyped(i));
      t += 250;
      for (let i = 1; i <= demo.lines.length; i++) at((t += i === 1 ? 0 : i >= 5 && i <= 7 ? 420 : 700), () => setShown(i));
      at(t + 4200, run);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced, cmd.length, demo.lines.length]);

  const visibleLines = reduced ? demo.lines.length : shown;
  const typedText = reduced ? cmd : cmd.slice(0, typed);

  return (
    <div ref={ref}>
      <Window title={`~/${demo.title}`}>
        <div className="h-[340px] overflow-hidden p-5 font-mono text-[12px] leading-6 sm:text-sm">
          <p>
            <span className="text-accent">$</span> <span>{typedText}</span>
            {visibleLines === 0 && <span className="caret ml-0.5" />}
          </p>
          {demo.lines.slice(1, visibleLines).map((l, i) => (
            <motion.p
              key={l.text + i}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-wrap gap-x-2 ${tone[l.kind]}`}
            >
              <span className="w-3 shrink-0 text-center">{icons[l.kind]}</span>
              <span className={l.kind === "score" ? "font-semibold" : ""}>{l.text}</span>
              {l.detail && <span className="hidden text-muted/70 sm:inline">— {l.detail}</span>}
            </motion.p>
          ))}
          {visibleLines > 0 && visibleLines < demo.lines.length && <span className="caret mt-1" />}
        </div>
      </Window>
      <p className="mt-4 text-sm text-muted">{demo.caption}</p>
    </div>
  );
}

/* ---------- Validador de archivos bancarios ---------- */

// Registro de ancho fijo (ficticio). El error está en «Cuenta»: una «O» en lugar de un 0.
const SEGMENTS = ["02", "193456O82014", "PEN", "000001250000", "TORRES V ANA"];
const RECORD = SEGMENTS.join("");
const ERROR_AT = RECORD.indexOf("O");
const SEG_START = SEGMENTS.map((_, i) => SEGMENTS.slice(0, i).join("").length);
const segOf = (i: number) => SEG_START.findLastIndex((s) => i >= s);
const SEG_COLORS = ["#8b9cff", "#5eead4", "#fbbf24", "#f0abfc", "#93c5fd"];

export function ValidatorDemo({ demo }: { demo: Demos["validator"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [cursor, setCursor] = useState(-1);
  const [phase, setPhase] = useState<"scan" | "error" | "done">("scan");

  useEffect(() => {
    if (reduced || !inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms));

    const run = () => {
      setCursor(-1);
      setPhase("scan");
      let t = 400;
      for (let i = 0; i <= ERROR_AT; i++) at((t += 70), () => setCursor(i));
      at(t + 60, () => setPhase("error"));
      t += 2200;
      for (let i = ERROR_AT + 1; i < RECORD.length; i++) at((t += 40), () => setCursor(i));
      at(t + 200, () => setPhase("done"));
      at(t + 4200, run);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduced]);

  const pos = reduced ? RECORD.length - 1 : cursor;
  const state = reduced ? "done" : phase;
  const scanning = state === "scan";
  const activeSeg = pos >= 0 ? segOf(pos) : -1;

  return (
    <div ref={ref}>
      <Window title="validador_bancario.exe">
        <div className="flex h-[340px] flex-col p-5">
          <p className="font-mono text-xs text-muted">{demo.scanning}</p>

          <div className="mt-5 overflow-x-auto pb-1">
            <div className="inline-flex font-mono text-[10px] sm:text-[14px]">
              {RECORD.split("").map((ch, i) => {
                const isErr = i === ERROR_AT && (state !== "scan" || pos >= ERROR_AT);
                const checked = i <= pos;
                const isCursor = i === pos && state !== "done";
                return (
                  <span
                    key={i}
                    className={`relative grid w-[0.7em] place-items-center sm:w-[0.78em] py-1 transition-colors duration-150 ${
                      isErr ? "rounded bg-danger/20 text-danger" : checked ? "text-fg" : "text-muted/40"
                    } ${isCursor && !isErr ? "rounded bg-accent/25" : ""}`}
                    style={{ borderBottom: `2px solid ${checked ? SEG_COLORS[segOf(i)] : "transparent"}` }}
                  >
                    {ch === " " ? "·" : ch}
                    {isErr && state === "error" && <span className="absolute inset-0 animate-ping rounded bg-danger/30" />}
                  </span>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {SEGMENTS.map((_, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 transition-colors ${activeSeg === i && state !== "done" ? "text-fg" : ""}`}>
                  <span className="size-2 rounded-sm" style={{ background: SEG_COLORS[i] }} />
                  {demo.fields[i]}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto min-h-[76px]">
            <AnimatePresence mode="wait">
              {!scanning && (
                <motion.div
                  key={state}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    state === "error" ? "border-danger/40 bg-danger/10" : "border-[#86efac]/30 bg-[#86efac]/10"
                  }`}
                >
                  {state === "error" ? (
                    <>
                      <p className="font-semibold text-danger">✕ {demo.error}</p>
                      <p className="mt-0.5 text-muted">{demo.errorDetail}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-[#86efac]">✓ {demo.ok}</p>
                      <p className="mt-0.5 text-muted">
                        {demo.error} · {demo.errorDetail}
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Window>
      <p className="mt-4 text-sm text-muted">{demo.caption}</p>
    </div>
  );
}
