# Portafolios de Álvaro Valdivia

Web personal para enlazar desde LinkedIn. Sustituye a la antigua https://valdidevweb.netlify.app/ (copiada de un tutorial; no reutilizar su diseño).

@AGENTS.md

## Estado
- Fase: primera versión construida y verificada en local (ES/EN, claro/oscuro, móvil y escritorio).
- Pendiente: CV de Codex (`docs/cv/`, PDF en `public/cv/`), foto de perfil, repo en GitHub y despliegue en Vercel.
- Siguiente paso: revisar el CV con el usuario, subir el repo y desplegar.

## Stack y comandos
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Hosting: Vercel.
- `npm run dev` (puerto 3000) · `npm run build` · `npm run lint`

## Estructura
- `docs/perfil.md`: **fuente de verdad** de los datos (LinkedIn, 2026-11-20). Si cambia un dato, cámbialo aquí y después en la web y en el CV.
- `src/content/profile.ts`: textos de la web en ES y EN.
- `src/components/Portfolio.tsx`: la página entera (cliente). El idioma se guarda en `localStorage`.
- `docs/cv/`: encargo a Codex y HTML del CV · `public/cv/`: PDF descargables.

## Convenciones
- Diseño minimalista y profesional: un solo acento (verde azulado, `--accent`), Geist y Geist Mono, modo claro y oscuro con variables en `globals.css`.
- No publicar teléfono ni WhatsApp.
- Foto: el hueco con las iniciales «AV» está en el hero; cámbialo por `next/image` con `public/foto.jpg`.
- No inventar logros ni cifras: solo lo que está en `docs/perfil.md`.
