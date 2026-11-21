"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { content, links, type Lang } from "@/content/profile";
import AgentNetwork from "./AgentNetwork";
import SmoothScroll from "./SmoothScroll";
import { JobAgentTerminal, ValidatorDemo } from "./Demos";

const STORAGE_KEY = "lang";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- piezas pequeñas ---------- */

type IconName = "github" | "linkedin" | "mail" | "download" | "arrow" | "copy";

function Icon({ name, className = "size-4" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    github: (
      <path
        fill="currentColor"
        stroke="none"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    ),
    linkedin: (
      <path
        fill="currentColor"
        stroke="none"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    download: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />,
    arrow: <path d="M7 17 17 7M8 7h9v9" />,
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V6a2 2 0 0 1 2-2h9" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/** Aparece al entrar en pantalla. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Tarjeta con brillo que sigue al cursor e inclinación 3D suave. */
function Spotlight({ children, className = "", tilt = false }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt && !reduced) {
      const rx = ((y / r.height) - 0.5) * -5;
      const ry = ((x / r.width) - 0.5) * 5;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`spotlight rounded-2xl transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted">{children}</span>;
}

/* ---------- hero ---------- */

function Hero({ t, lang }: { t: (typeof content)["es"]; lang: Lang }) {
  const words = t.hero.hello.split(" ");
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg absolute inset-0 -z-20 opacity-60" />
      <div className="absolute -left-40 top-10 -z-20 size-[520px] rounded-full bg-accent/15 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 -z-20 size-[520px] rounded-full bg-accent-2/15 blur-[120px]" />
      <AgentNetwork className="absolute inset-0 -z-10 size-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1 text-xs text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {t.hero.badge}
        </motion.p>

        <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              className="inline-block pr-[0.22em]"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gradient mt-6 text-lg font-medium sm:text-2xl"
            >
              {t.hero.title}
            </motion.p>
          </AnimatePresence>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t.hero.summary}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={links.cv[lang]}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-6px_var(--accent)]"
            >
              <Icon name="download" />
              {t.hero.cv}
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-fg/40"
            >
              {t.hero.contact}
            </a>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: links.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
                { href: links.github, icon: "github" as const, label: "GitHub" },
                { href: `mailto:${links.email}`, icon: "mail" as const, label: "Email" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="rounded-full p-2.5 text-muted transition hover:bg-surface-strong hover:text-fg"
                >
                  <Icon name={l.icon} className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid max-w-3xl grid-cols-3 gap-4 border-t border-line pt-8"
        >
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* ---------- experiencia en timeline ---------- */

function Timeline({ t }: { t: (typeof content)["es"] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-14 pl-8 sm:pl-12">
      <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[11px]" />
      <motion.span
        style={{ scaleY }}
        className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 shadow-[0_0_12px_var(--accent)] sm:left-[11px]"
      />
      {t.experience.jobs.map((job, idx) => (
        <li key={job.org + job.role} className="relative">
          <span className="absolute -left-8 top-1.5 grid size-[15px] place-items-center rounded-full border border-accent/60 bg-bg sm:-left-12 sm:size-[23px]">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] sm:size-2" />
          </span>
          <Reveal delay={idx === 0 ? 0 : 0.05}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold">
                {job.role} <span className="text-muted">·</span> <span className="text-accent">{job.org}</span>
              </h3>
              <p className="font-mono text-xs text-muted">{job.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{job.place}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-fg/85">{job.summary}</p>
            {job.points && (
              <ul className="mt-3 space-y-1.5 text-muted">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          {job.bullets && (
            <>
              <Reveal>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">{t.experience.built}</p>
              </Reveal>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {job.bullets.map((b, i) => (
                  <Reveal key={b.title} delay={i * 0.1} className="h-full">
                    <Spotlight tilt className="flex h-full flex-col p-5">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h4 className="mt-2 font-semibold leading-snug">{b.title}</h4>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{b.text}</p>
                      <p className="mt-4 border-t border-line pt-3 font-mono text-xs text-accent-2">{b.stack}</p>
                    </Spotlight>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ---------- página ---------- */

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("es");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") initial = saved;
    } catch {}
    if (!initial && !navigator.language.toLowerCase().startsWith("es")) initial = "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- el idioma guardado solo existe en el navegador
    if (initial) setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const t = content[lang];
  const nav = [
    ["experiencia", t.nav.experience],
    ["en-accion", t.demos.kicker],
    ["proyectos", t.nav.projects],
    ["habilidades", t.nav.skills],
    ["contacto", t.nav.contact],
  ] as const;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const [main, ...rest] = t.projects.items;

  return (
    <>
      <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2" />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto mt-3 flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-line bg-bg/60 px-4 backdrop-blur-xl sm:mx-4 sm:px-5 lg:mx-auto">
          <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
            álvaro<span className="text-accent">.</span>valdivia
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-fg">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="relative flex rounded-full border border-line p-0.5 font-mono text-xs" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`relative rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "text-bg" : "text-muted hover:text-fg"}`}
                >
                  {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" />}
                  <span className="relative">{l}</span>
                </button>
              ))}
            </div>
            <a
              href={links.cv[lang]}
              download
              className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-bg transition hover:shadow-[0_0_24px_-4px_var(--accent)] sm:inline-flex"
            >
              <Icon name="download" className="size-3.5" />
              CV
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <Hero t={t} lang={lang} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Sobre mí */}
          <section id="sobre-mi" className="py-24">
            <SectionHeading kicker={t.about.heading} title={lang === "es" ? "Ingeniería con disciplina de campo" : "Engineering with field discipline"} />
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              <Reveal className="space-y-5 text-lg leading-relaxed text-muted sm:text-xl">
                {t.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>
              <div className="grid gap-3">
                {t.about.facts.map((f, i) => (
                  <Reveal key={f.label} delay={i * 0.08}>
                    <Spotlight className="px-4 py-3">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{f.label}</p>
                      <p className="mt-0.5 font-medium">{f.value}</p>
                    </Spotlight>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Experiencia */}
          <section id="experiencia" className="py-24">
            <SectionHeading kicker={t.experience.heading} title={lang === "es" ? "De los helicópteros a los agentes de IA" : "From helicopters to AI agents"} />
            <Timeline t={t} />
          </section>

          {/* Demos */}
          <section id="en-accion" className="py-24">
            <SectionHeading kicker={t.demos.kicker} title={t.demos.heading} intro={t.demos.intro} />
            <div className="grid gap-8 lg:grid-cols-2">
              <Reveal>
                <JobAgentTerminal demo={t.demos.agent} />
              </Reveal>
              <Reveal delay={0.1}>
                <ValidatorDemo demo={t.demos.validator} />
              </Reveal>
            </div>
            <p className="mt-6 font-mono text-[11px] text-muted/70">* {t.demos.note}</p>
          </section>

          {/* Proyectos (bento) */}
          <section id="proyectos" className="py-24">
            <SectionHeading kicker={t.projects.heading} title={lang === "es" ? "Proyectos" : "Projects"} intro={t.projects.intro} />
            <div className="grid gap-4 md:grid-cols-6">
              <Reveal className="md:col-span-4 md:row-span-2">
                <Spotlight tilt className="relative flex h-full flex-col overflow-hidden p-7">
                  <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-semibold sm:text-3xl">{main.name}</h3>
                    <span className="font-mono text-xs text-muted">{main.period}</span>
                  </div>
                  <p className="mt-4 max-w-2xl flex-1 leading-relaxed text-muted sm:text-lg">{main.description}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {main.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  <ProjectLinks code={main.code} demo={main.demo} labels={t.projects} />
                </Spotlight>
              </Reveal>
              {rest.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.06} className={i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2"}>
                  <Spotlight tilt className="flex h-full flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <span className="font-mono text-[11px] text-muted">{p.period}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                    <ProjectLinks code={p.code} demo={p.demo} labels={t.projects} />
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Habilidades */}
          <section id="habilidades" className="py-24">
            <SectionHeading kicker={t.skills.heading} title={lang === "es" ? "Con qué trabajo" : "What I work with"} />
            <div className="grid gap-4 sm:grid-cols-2">
              {t.skills.groups.map((g, i) => (
                <Reveal key={g.name} delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full p-6">
                    <h3 className="font-semibold">{g.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg border border-line bg-surface-strong px-2.5 py-1 text-sm transition hover:border-accent/50 hover:text-accent hover:shadow-[0_0_18px_-6px_var(--accent)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Formación */}
          <section id="formacion" className="py-24">
            <SectionHeading kicker={t.education.heading} title={lang === "es" ? "Formación" : "Education"} />
            <div className="grid gap-4 sm:grid-cols-2">
              {t.education.items.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full p-6">
                    <p className="font-mono text-xs text-accent">{e.period}</p>
                    <h3 className="mt-2 font-semibold leading-snug">{e.title}</h3>
                    <p className="text-sm text-accent-2">{e.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{e.note}</p>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Contacto */}
          <section id="contacto" className="py-24">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
                <div className="absolute left-1/2 top-0 -z-10 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[110px]" />
                <div className="grid-bg absolute inset-0 -z-20 opacity-40" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.nav.contact}</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.contact.heading}</h2>
                <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">{t.contact.text}</p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${links.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-6px_var(--accent)]"
                  >
                    <Icon name="mail" />
                    {links.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition hover:border-fg/40"
                  >
                    <Icon name="copy" />
                    <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-fg">
                    <Icon name="linkedin" /> LinkedIn <Icon name="arrow" className="size-3.5" />
                  </a>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-fg">
                    <Icon name="github" /> GitHub <Icon name="arrow" className="size-3.5" />
                  </a>
                  <a href={links.cv[lang]} download className="inline-flex items-center gap-1.5 text-muted transition hover:text-fg">
                    <Icon name="download" /> {t.hero.cv}
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 text-xs text-muted sm:px-6">
          <p>© 2026 Álvaro Valdivia Miranda</p>
          <p>{t.footer}</p>
        </div>
      </footer>
      </MotionConfig>
    </>
  );
}

function ProjectLinks({ code, demo, labels }: { code?: string; demo?: string; labels: { code: string; demo: string } }) {
  const cls = "inline-flex items-center gap-1.5 text-sm font-medium text-fg/90 transition-colors hover:text-accent";
  return (
    <div className="mt-6 flex gap-5 border-t border-line pt-4">
      {code && (
        <a href={code} target="_blank" rel="noopener noreferrer" className={cls}>
          <Icon name="github" /> {labels.code}
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={cls}>
          {labels.demo} <Icon name="arrow" className="size-3.5" />
        </a>
      )}
    </div>
  );
}
