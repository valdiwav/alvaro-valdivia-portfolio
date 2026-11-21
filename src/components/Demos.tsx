"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import type { content } from "@/content/profile";

type Demos = (typeof content)["es"]["demos"];

function Window({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0d12] shadow-[0_0_80px_-30px_rgba(94,234,212,0.35)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{title}</span>
        {badge && (
          <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Temporizadores en cadena que se cancelan al desmontar. */
function useTimeline(active: boolean, script: (at: (ms: number, fn: () => void) => void, restart: () => void) => void) {
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms));
    const run = () => script(at, run);
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- el guion es estable para cada demo
  }, [active]);
}

/* ---------- Agente de IA para formulación de nómina ---------- */

// Coordenadas del diagrama (viewBox 600 × 300).
const NODE = {
  input: { x: 65, y: 150, w: 120, h: 40 },
  orch: { x: 210, y: 150, r: 32 },
  agents: [55, 150, 245].map((y) => ({ x: 382, y, w: 186, h: 40 })),
  output: { x: 536, y: 150, w: 96, h: 40 },
  kb: { x: 536, y: 257, w: 108, h: 36 },
};

// Pasos: 0 escribe · 1 orquestador · 2 subagentes trabajando · 3-5 terminan · 6 fórmula · 7 actualiza · 8 base al día.
const FINAL_STEP = 8;

type Pt = [number, number];

function Edge({ from, to, state, reduced }: { from: Pt; to: Pt; state: "idle" | "flow" | "done"; reduced: boolean }) {
  const lit = state !== "idle";
  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        strokeWidth={lit ? 1.6 : 1}
        className="transition-[stroke] duration-500"
        style={{ stroke: state === "flow" ? "var(--accent)" : lit ? "rgb(94 234 212 / 0.45)" : "rgb(255 255 255 / 0.12)" }}
      />
      {state === "flow" && !reduced && (
        <motion.circle
          r={3.5}
          fill="var(--accent)"
          filter="url(#pa-glow)"
          initial={{ cx: from[0], cy: from[1] }}
          animate={{ cx: [from[0], to[0]], cy: [from[1], to[1]] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </g>
  );
}

function Box({
  n,
  label,
  state,
  size = 13,
}: {
  n: { x: number; y: number; w: number; h: number };
  label: string;
  state: "idle" | "work" | "done";
  size?: number;
}) {
  const stroke = state === "done" ? "var(--accent)" : state === "work" ? "var(--accent-2)" : "rgb(255 255 255 / 0.14)";
  return (
    <g>
      {state !== "idle" && (
        <rect
          x={n.x - n.w / 2}
          y={n.y - n.h / 2}
          width={n.w}
          height={n.h}
          rx={10}
          fill="none"
          stroke={stroke}
          strokeWidth={3}
          opacity={0.5}
          filter="url(#pa-glow)"
        />
      )}
      <rect
        x={n.x - n.w / 2}
        y={n.y - n.h / 2}
        width={n.w}
        height={n.h}
        rx={10}
        fill="#0e1118"
        stroke={stroke}
        strokeWidth={1.2}
        className="transition-[stroke] duration-500"
      />
      <text
        x={n.x}
        y={n.y + size * 0.36}
        textAnchor="middle"
        fontSize={size}
        className="font-mono transition-[fill] duration-500"
        style={{ fill: state === "idle" ? "var(--muted)" : "var(--fg)" }}
      >
        {label}
      </text>
    </g>
  );
}

export function PayrollAgentDemo({ demo, sim }: { demo: Demos["payroll"]; sim: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const req = demo.request;

  useTimeline(inView && !reduced, (at, restart) => {
    setTyped(0);
    setStep(0);
    let t = 400;
    for (let i = 1; i <= req.length; i++) at((t += 24), () => setTyped(i));
    const steps = [500, 700, 1300, 650, 650, 700, 1300, 900];
    steps.forEach((d, i) => at((t += d), () => setStep(i + 1)));
    at(t + 5200, restart);
  });

  const s = reduced ? FINAL_STEP : step;
  const shownReq = reduced ? req : req.slice(0, typed);
  const typing = !reduced && typed < req.length;
  const agentDone = (i: number) => s >= 3 + i;
  const agentState = (i: number) => (agentDone(i) ? "done" : s >= 2 ? "work" : "idle");
  const orchActive = s >= 1;

  const { input, orch, agents, output, kb } = NODE;

  return (
    <div ref={ref}>
      <Window title={`~/${demo.title}`} badge={sim}>
        <div className="grid gap-6 p-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:p-7">
          {/* Diagrama */}
          <div className="flex items-center">
            <svg viewBox="0 0 600 300" className="h-auto w-full" role="img" aria-label={demo.caption}>
              <defs>
                <filter id="pa-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" />
                </filter>
                <radialGradient id="pa-orch" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </radialGradient>
              </defs>

              <Edge from={[input.x + input.w / 2, input.y]} to={[orch.x - orch.r, orch.y]} reduced={reduced} state={s === 1 ? "flow" : s >= 2 ? "done" : "idle"} />
              {agents.map((a, i) => (
                <Edge
                  key={`in${i}`}
                  from={[orch.x + orch.r, orch.y]}
                  to={[a.x - a.w / 2, a.y]}
                  reduced={reduced}
                  state={agentDone(i) ? "done" : s >= 2 ? "flow" : "idle"}
                />
              ))}
              {agents.map((a, i) => (
                <Edge
                  key={`out${i}`}
                  from={[a.x + a.w / 2, a.y]}
                  to={[output.x - output.w / 2, output.y]}
                  reduced={reduced}
                  state={s >= 6 ? "done" : agentDone(i) ? "flow" : "idle"}
                />
              ))}
              <Edge
                from={[output.x, output.y + output.h / 2]}
                to={[kb.x, kb.y - kb.h / 2]}
                reduced={reduced}
                state={s === 7 ? "flow" : s >= FINAL_STEP ? "done" : "idle"}
              />

              <Box n={input} label={demo.nodes.input} state={typed > 0 || reduced ? "done" : "idle"} size={12} />

              {/* Orquestador */}
              <circle cx={orch.x} cy={orch.y} r={orch.r * 2} fill="url(#pa-orch)" opacity={orchActive ? 1 : 0} className="transition-opacity duration-700" />
              {orchActive && s < 6 && !reduced && (
                <motion.circle
                  cx={orch.x}
                  cy={orch.y}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={1}
                  initial={{ r: orch.r, opacity: 0.7 }}
                  animate={{ r: orch.r + 22, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle
                cx={orch.x}
                cy={orch.y}
                r={orch.r}
                fill="#0e1118"
                strokeWidth={1.5}
                className="transition-[stroke] duration-500"
                style={{ stroke: orchActive ? "var(--accent)" : "rgb(255 255 255 / 0.14)" }}
              />
              <circle cx={orch.x} cy={orch.y} r={9} style={{ fill: orchActive ? "var(--accent)" : "rgb(255 255 255 / 0.18)" }} className="transition-[fill] duration-500" />
              {[0, 1, 2].map((k) => {
                const ang = (-90 + k * 120) * (Math.PI / 180);
                return (
                  <circle
                    key={k}
                    cx={orch.x + Math.cos(ang) * 19}
                    cy={orch.y + Math.sin(ang) * 19}
                    r={3}
                    style={{ fill: orchActive ? "var(--accent-2)" : "rgb(255 255 255 / 0.18)" }}
                  />
                );
              })}
              <text x={orch.x} y={orch.y + orch.r + 20} textAnchor="middle" fontSize={12} className="font-mono" style={{ fill: orchActive ? "var(--fg)" : "var(--muted)" }}>
                {demo.nodes.orchestrator}
              </text>

              {agents.map((a, i) => (
                <Box key={i} n={a} label={demo.agents[i].name} state={agentState(i)} size={12} />
              ))}
              <Box n={output} label={demo.nodes.output} state={s >= 6 ? "done" : "idle"} />
              <Box n={kb} label={demo.nodes.knowledge} state={s >= FINAL_STEP ? "done" : s === 7 ? "work" : "idle"} size={12} />
            </svg>
          </div>

          {/* Panel de texto */}
          <div className="flex min-w-0 flex-col gap-4 font-mono text-[12px] sm:text-[13px]">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted">{demo.requestLabel}</p>
              <p className="mt-1.5 min-h-[3.2em] rounded-lg border border-line bg-surface px-3 py-2 leading-relaxed text-fg">
                {shownReq}
                {typing && <span className="caret ml-0.5" />}
              </p>
            </div>

            <ul className="space-y-2">
              {demo.agents.map((a, i) => {
                const st = agentState(i);
                return (
                  <li key={a.name} className="flex gap-2.5">
                    <span
                      className={`mt-[0.45em] size-2 shrink-0 rounded-full transition-colors duration-500 ${
                        st === "done" ? "bg-accent shadow-[0_0_8px_var(--accent)]" : st === "work" ? "animate-pulse bg-accent-2" : "bg-white/15"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className={st === "idle" ? "text-muted" : "text-fg"}>{a.name}</span>
                      <span className="block truncate text-[11px] text-muted/80">
                        {st === "done" ? <span className="text-accent">✓ {a.result}</span> : st === "work" ? demo.working : a.task}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <motion.div
              initial={false}
              animate={{ opacity: s >= 6 ? 1 : 0.15, y: s >= 6 || reduced ? 0 : 6 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-accent/30 bg-accent/[0.06] px-3 py-2.5"
            >
              <p className="text-[10px] uppercase tracking-wider text-accent">{demo.formulaLabel}</p>
              <p className="mt-1 break-words font-semibold text-fg">{demo.formula}</p>
              <p className="mt-1.5 font-sans text-[13px] leading-snug text-muted">{demo.explanation}</p>
            </motion.div>

            <motion.p
              initial={false}
              animate={{ opacity: s >= FINAL_STEP ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-x-2 text-[#86efac]"
              aria-hidden={s < FINAL_STEP}
            >
              <span>↻ {demo.knowledge}</span>
              <span className="text-[11px] text-muted">{demo.knowledgeDetail}</span>
            </motion.p>
          </div>
        </div>
      </Window>
      <p className="mt-4 text-sm text-muted">
        <span className="font-medium text-fg">{demo.heading}.</span> {demo.caption}
      </p>
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
