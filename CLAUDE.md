# Portafolios de Álvaro Valdivia

Web personal para enlazar desde LinkedIn. Sustituye a la antigua https://valdidevweb.netlify.app/ (copiada de un tutorial; no reutilizar su diseño).

@AGENTS.md

## Estado
- Fase: publicado en https://alvaro-valdivia.vercel.app (proyecto Vercel `alvaro-valdivia`). Repo: https://github.com/valdiwav/alvaro-valdivia-portfolio
- Despliegue: por ahora manual (`npx.cmd vercel@latest deploy --prod`). El auto-deploy al hacer push está pendiente: hay que dar acceso al repo a la app de Vercel en GitHub y luego `npx.cmd vercel@latest git connect`.
- Pendiente: foto de perfil y datos que pide `docs/cv/NOTAS.md` (métricas de ADP, nivel de inglés). El repo antiguo `valdiwav/Portfolio` (Astro) sigue intacto.

## Stack y comandos
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Hosting: Vercel.
- `npm run dev` (puerto 3000) · `npm run build` · `npm run lint`

## Estructura
- `docs/perfil.md`: **fuente de verdad** de los datos (LinkedIn, 2026-11-20). Si cambia un dato, cámbialo aquí y después en la web y en el CV.
- `src/content/profile.ts`: textos de la web en ES y EN.
- `src/components/Portfolio.tsx`: la página entera (cliente). El idioma se guarda en `localStorage`.
- `docs/cv/`: encargo a Codex y HTML del CV · `public/cv/`: PDF descargables.

## Convenciones
- Diseño «llamativo pero elegante»: tema oscuro único con acentos luminosos (`--accent` turquesa, `--accent-2` índigo), Geist y Geist Mono, variables en `globals.css`.
- Movimiento con Motion (`motion/react`, dentro de `MotionConfig reducedMotion="user"`) y scroll suave con Lenis. Todo debe funcionar con «reducir movimiento»: usa `usePrefersReducedMotion` (no `useReducedMotion`, que rompe la hidratación).
- Piezas: `AgentNetwork` (canvas del hero), `Demos.tsx` (terminal de job-agent y validador; datos ficticios, marcados como simulación), `Spotlight` y `Reveal` en `Portfolio.tsx`.
- No publicar teléfono ni WhatsApp.
- Foto: el hueco con las iniciales «AV» está en el hero; cámbialo por `next/image` con `public/foto.jpg`.
- No inventar logros ni cifras: solo lo que está en `docs/perfil.md`.
