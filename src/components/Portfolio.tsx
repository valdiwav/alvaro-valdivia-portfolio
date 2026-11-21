"use client";

import { useEffect, useState, type ReactNode } from "react";
import { content, links, type Lang } from "@/content/profile";

const STORAGE_KEY = "lang";

function Icon({ name, className = "size-4" }: { name: "github" | "linkedin" | "mail" | "download" | "arrow" | "copy"; className?: string }) {
  const paths: Record<string, ReactNode> = {
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

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-16 sm:py-20">
      <div className="grid gap-8 md:grid-cols-[180px_1fr] md:gap-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:pt-1">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{children}</span>;
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("es");
  const [copied, setCopied] = useState(false);

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
    ["proyectos", t.nav.projects],
    ["habilidades", t.nav.skills],
    ["formacion", t.nav.education],
    ["contacto", t.nav.contact],
  ] as const;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const featured = t.projects.items.filter((p) => p.featured);
  const others = t.projects.items.filter((p) => !p.featured);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
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
            <div className="flex rounded-full border border-line p-0.5 font-mono text-xs" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={links.cv[lang]}
              download
              className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:text-bg sm:inline-flex"
            >
              <Icon name="download" className="size-3.5" />
              CV
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section className="reveal grid items-center gap-10 py-20 sm:py-28 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              {t.hero.badge}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{t.hero.hello}</h1>
            <p className="mt-4 text-lg font-medium text-accent sm:text-xl">{t.hero.title}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t.hero.summary}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={links.cv[lang]}
                download
                className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                <Icon name="download" />
                {t.hero.cv}
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg"
              >
                {t.hero.contact}
              </a>
              <div className="ml-1 flex items-center gap-1">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-muted transition-colors hover:text-fg">
                  <Icon name="linkedin" className="size-5" />
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-muted transition-colors hover:text-fg">
                  <Icon name="github" className="size-5" />
                </a>
                <a href={`mailto:${links.email}`} aria-label="Email" className="rounded-full p-2.5 text-muted transition-colors hover:text-fg">
                  <Icon name="mail" className="size-5" />
                </a>
              </div>
            </div>
          </div>
          {/* Hueco para la foto: sustituir por <Image src="/foto.jpg" ... /> cuando exista */}
          <div
            aria-hidden="true"
            className="hidden size-56 place-items-center rounded-full border border-line bg-surface font-mono text-5xl font-semibold text-accent shadow-sm md:grid"
          >
            AV
          </div>
        </section>

        <Section id="sobre-mi" title={t.about.heading}>
          <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {t.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="space-y-4 text-sm">
              {t.about.facts.map((f) => (
                <div key={f.label} className="border-l-2 border-accent pl-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                  <dd className="mt-0.5 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section id="experiencia" title={t.experience.heading}>
          <ol className="space-y-14">
            {t.experience.jobs.map((job) => (
              <li key={job.org + job.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {job.role} <span className="text-muted">·</span> <span className="text-accent">{job.org}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{job.place}</p>
                <p className="mt-4 leading-relaxed">{job.summary}</p>
                {job.points && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {job.bullets && (
                  <>
                    <p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted">{t.experience.built}</p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      {job.bullets.map((b) => (
                        <article key={b.title} className="flex flex-col rounded-xl border border-line bg-surface p-5">
                          <h4 className="font-semibold leading-snug">{b.title}</h4>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{b.text}</p>
                          <p className="mt-4 border-t border-line pt-3 font-mono text-xs text-accent">{b.stack}</p>
                        </article>
                      ))}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="proyectos" title={t.projects.heading}>
          <p className="mb-8 max-w-2xl text-muted">{t.projects.intro}</p>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((p) => (
              <article key={p.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-md">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span className="font-mono text-xs text-muted">{p.period}</span>
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <ProjectLinks code={p.code} demo={p.demo} labels={t.projects} />
              </article>
            ))}
          </div>
          <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {others.map((p) => (
              <li key={p.name} className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="font-mono text-xs text-muted">{p.period}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <ProjectLinks code={p.code} demo={p.demo} labels={t.projects} compact />
              </li>
            ))}
          </ul>
        </Section>

        <Section id="habilidades" title={t.skills.heading}>
          <div className="grid gap-8 sm:grid-cols-2">
            {t.skills.groups.map((g) => (
              <div key={g.name}>
                <h3 className="text-sm font-semibold">{g.name}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-md bg-accent-soft px-2.5 py-1 text-sm text-fg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="formacion" title={t.education.heading}>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.education.items.map((e) => (
              <li key={e.title}>
                <p className="font-mono text-xs text-muted">{e.period}</p>
                <h3 className="mt-1 font-semibold leading-snug">{e.title}</h3>
                <p className="text-sm text-accent">{e.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contacto" title={t.nav.contact}>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.contact.heading}</h3>
          <p className="mt-4 max-w-xl text-muted sm:text-lg">{t.contact.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              <Icon name="mail" />
              {links.email}
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-fg"
            >
              <Icon name="copy" />
              <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <Icon name="linkedin" /> LinkedIn <Icon name="arrow" className="size-3.5" />
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <Icon name="github" /> GitHub <Icon name="arrow" className="size-3.5" />
            </a>
            <a href={links.cv[lang]} download className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <Icon name="download" /> {t.hero.cv}
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-8 text-xs text-muted sm:px-6">
          <p>© 2026 Álvaro Valdivia Miranda</p>
          <p>{t.footer}</p>
        </div>
      </footer>
    </>
  );
}

function ProjectLinks({
  code,
  demo,
  labels,
  compact = false,
}: {
  code?: string;
  demo?: string;
  labels: { code: string; demo: string };
  compact?: boolean;
}) {
  const cls = "inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent";
  return (
    <div className={`flex gap-5 ${compact ? "" : "mt-6 border-t border-line pt-4"}`}>
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
