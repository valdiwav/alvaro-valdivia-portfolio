# Encargo para Codex: CV profesional de Álvaro Valdivia (ES + EN)

## Objetivo
Crear un CV excelente, muy profesional y con un diseño cuidado, en **español y en inglés**, para postular a puestos de IA aplicada, automatización e implementación/integración de software. Se descarga desde su portafolios web y se adjunta en LinkedIn.

## Fuente de datos (única)
`docs/perfil.md` (en esta misma carpeta del proyecto: `../perfil.md`). **No inventes nada**: ni cifras, ni logros, ni fechas, ni tecnologías que no aparezcan ahí. Puedes redactar mejor y ordenar, pero sin añadir hechos. Si falta algo, déjalo fuera.

## Entregables (solo crea o modifica estos archivos)
1. `docs/cv/cv-es.html`: CV en español, HTML + CSS en un solo archivo, sin dependencias externas salvo Google Fonts si hace falta.
2. `docs/cv/cv-en.html`: el mismo CV en inglés. Traducción profesional y natural, no literal (por ejemplo "Implementation Analyst", "B.Eng. in Computer Engineering (Ingeniería de Ejecución en Informática)").
3. `public/cv/CV-Alvaro-Valdivia-ES.pdf` y `public/cv/CV-Alvaro-Valdivia-EN.pdf`: generados desde los HTML con Edge o Chrome en modo headless. Ejemplo:
   `& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer --print-to-pdf="<ruta absoluta del pdf>" "file:///<ruta absoluta del html>"`
   Revisa el PDF resultante (número de páginas, cortes, márgenes) y corrige el HTML hasta que quede bien.
4. `docs/cv/NOTAS.md`: decisiones de diseño breves y cualquier dato que creas que falta en el perfil.

No toques nada fuera de `docs/cv/` y `public/cv/`. No hagas commits.

## Requisitos de diseño
- Tamaño A4, `@page { size: A4; margin: 0 }` con márgenes internos propios. **Una página** si es posible; dos como máximo y sin cortes feos (usa `break-inside: avoid` en cada puesto o proyecto).
- Estilo minimalista y ejecutivo: tipografía sans moderna (por ejemplo Inter, o la del sistema como alternativa), jerarquía clara, **un solo color de acento** sobrio (azul petróleo o índigo oscuro), mucho aire y alineación precisa. Nada de barras de nivel de habilidades, iconos recargados ni gráficos.
- **Compatible con ATS**: texto real y seleccionable, orden de lectura lógico, encabezados de sección estándar (Experiencia/Experience, Proyectos/Projects, Educación/Education, Habilidades/Skills). Puede haber dos columnas solo si el orden en el DOM sigue siendo lógico.
- Sin foto.
- Encabezado: nombre, titular corto (algo como "Implementación de Software · Automatización de Procesos · IA Aplicada"), ubicación, email, LinkedIn y GitHub como enlaces clicables en el PDF (muestra la URL corta, sin "https://"). **No incluyas teléfono ni WhatsApp.**

## Requisitos de contenido
- Resumen de 2 o 3 líneas orientado a resultados. Debe dejar claro el perfil híbrido: implementación de software corporativo, más automatización e IA (agentes LLM), con una base técnica y disciplina de su paso por la Fuerza Aérea.
- Experiencia en orden cronológico inverso. En ADP, destaca las tres herramientas que creó con viñetas que digan acción, tecnología e impacto ("lo usa todo el equipo de implementación", "hasta 500 conceptos"...).
- Proyectos: job-agent y PerfectRep, con detalle. Cyberstyle en una línea. LnKut y PC Forge solo si caben sin pasar de una página.
- Educación y formación: PUCV, Cisco CCNA ITN, inglés técnico (primer lugar) y el título técnico de la FACh (brigadier).
- Habilidades agrupadas en 3 o 4 líneas por categoría.
- Idiomas: español nativo; inglés técnico.
- Ortografía impecable en los dos idiomas, con tildes.

## Criterio de terminado
Los cuatro archivos existen, los dos PDF ocupan 1 página (o 2 bien maquetadas), se ven profesionales, los enlaces funcionan y todo el contenido sale de `docs/perfil.md`.
