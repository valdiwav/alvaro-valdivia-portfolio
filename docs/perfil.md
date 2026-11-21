# Perfil profesional: fuente de datos

Fuente: perfil de LinkedIn y portafolios anterior, leídos el 2026-11-20. La web (`src/content/`) y el CV (`docs/cv/`) salen de aquí. No inventes datos que no estén en este archivo.

## Identidad
- Nombre: Álvaro Valdivia Miranda
- Titular: Implementación de Software | Automatización de Procesos e IA Aplicada | Agentes LLM, Claude Code, Python, SQL | Ingeniero de Ejecución en Informática
- Ubicación: Gran Santiago, Región Metropolitana, Chile
- Busca puestos de: Ingeniero de IA, Consultor de IA, Ingeniero de automatización, Ingeniero de implementación, Ingeniero de integración
- Email: valdivialvaro.8@gmail.com
- LinkedIn: https://www.linkedin.com/in/alvaro-valdivia-miranda-a5065b178/
- GitHub: https://github.com/valdiwav
- WhatsApp: no se publica.
- Foto: ninguna por ahora (dejar el hueco preparado).

## Resumen
Pasó de técnico en electrónica de aeronaves en la Fuerza Aérea de Chile a ingeniero en informática. Hoy implementa software de nómina en ADP y crea herramientas internas que automatizan trabajo del equipo: un validador de archivos bancarios, una carga masiva de conceptos y un agente de IA para formular nómina. Trabaja con agentes LLM, Claude Code, Python y SQL.

## Experiencia
### Analista de Implementación, ADP
Abr 2025 – actualidad · Jornada completa · Las Condes, Santiago · Híbrido
Implementa software de nómina para clientes con operación en Perú: configuración de la plataforma, bases de datos SQL, pruebas funcionales (QA), documentación y soporte después de la salida en vivo.
Herramientas que diseñó y desarrolló:
- **Validador de archivos de transferencias bancarias** (C#/.NET, desarrollado con asistencia de IA; el stack se eligió por compatibilidad y seguridad en el entorno corporativo). Compara los archivos de pago con el formato que exige cada banco y cliente, carácter por carácter, e informa qué campo falla, por qué y dónde. Valida lotes, compara archivos y admite formatos de varios países. Lo usa todo el equipo de implementación.
- **Carga masiva de conceptos de pago** (Excel VBA + SQL). Valida la planilla del cliente contra la base de destino (duplicados, afectaciones, códigos) y genera el script que inserta hasta 500 conceptos con sus reglas. Lo usa el backoffice de implementación de Perú.
- **Agente de IA para formulación de nómina** (diseñado con Claude, desplegado en Microsoft Copilot). Propone fórmulas a partir de un requerimiento escrito en lenguaje simple, siguiendo las reglas y la normativa de seguridad de la empresa. Incluye una herramienta que mantiene al día su base de conocimiento. Lo usa el equipo de implementación.

### Ayudante de Estructura de Datos, Pontificia Universidad Católica de Valparaíso (PUCV)
Mar 2023 – jul 2024 · Temporal · Valparaíso · Presencial
Apoyo académico en listas enlazadas, pilas, colas, árboles y grafos en C. Diseñó y resolvió ejercicios prácticos, evaluó trabajos y guio a los estudiantes en la optimización de algoritmos.

### Práctica profesional, BELAT
Dic 2023 – feb 2024 · Providencia, Santiago · Presencial
- Modelado de procesos con BPMN y planificación de tareas en Odoo.
- Desarrollo web con JavaScript y Prisma sobre PostgreSQL.
- Depuración y actualización de la base de clientes en Jotform para el área comercial.

### Técnico en Mantenimiento Aeronáutico, especialista en Electricidad y Electrónica de Aeronaves, Fuerza Aérea de Chile
Dic 2018 – dic 2020 · Jornada completa · Santiago · Presencial
Diagnóstico y reparación de sistemas eléctricos y electrónicos de helicópteros en un entorno exigente y de alta responsabilidad.

## Proyectos
- **job-agent: agente de búsqueda de empleo con IA** (nov 2026 – actualidad). Cada mañana busca ofertas remotas de IA y automatización en cinco portales (Get on Board, Remotive, Himalayas, Remote OK y We Work Remotely). Descarta las que no encajan con filtros propios (seniority, ubicación, modalidad, sueldo y duplicados), puntúa el resto con un LLM según el perfil y envía las mejores, con el motivo de cada nota, por Telegram y correo. Corre solo en GitHub Actions, con reintentos y modelos de respaldo cuando la API está saturada, salida estructurada validada con Pydantic y 28 tests automatizados. Stack: Python, Gemini API, Pydantic, GitHub Actions, Telegram Bot API. Código: https://github.com/valdiwav/job-agent
- **PerfectRep** (abr 2024 – actualidad, PUCV, proyecto de título). App móvil que analiza y corrige en tiempo real la técnica en ejercicios de hipertrofia (sentadilla, peso muerto, press de hombros, curl de bíceps) con IA y visión por computadora, dando retroalimentación inmediata. Stack: Kotlin, Android Studio, Firebase, TensorFlow (CNN), Python. Código: https://github.com/valdiwav/PerferctRep-public · Demo: https://perfectrep.vercel.app
- **Cyberstyle: SYNAPSE** (mar 2024 – dic 2024, PUCV, con Jesús). Videojuego educativo para aprender CSS que compara dos sistemas de retroalimentación (KCR y MTF) y mide retención, motivación, interés y utilidad percibida. Stack: GameMaker, CSS, HTML, análisis de datos. Código: https://github.com/valdiwav/CyberStyle
- **LnKut** (proyecto personal). Acortador de URLs con códigos QR, registro y gestión de enlaces. Stack: Next.js, React, Prisma, PostgreSQL, Tailwind CSS, Node.js. Código: https://github.com/valdiwav/url-shortener · Demo: https://lnkut.vercel.app
- **PC Forge** (proyecto universitario). Plataforma educativa que guía paso a paso al usuario para armar un PC: componentes, compatibilidad y ensamblaje, guardando el progreso. Stack: React, TypeScript, Sass, MySQL. Código: https://github.com/valdiwav/PcForgeReact

## Educación
- **Ingeniería de Ejecución en Informática**, Pontificia Universidad Católica de Valparaíso, mar 2021 – dic 2024. Desarrollo de software, bases de datos, IA aplicada, desarrollo web y móvil (C, Python, Kotlin, JavaScript).
- **Certificado: Introducción a Redes (CCNA ITN)**, Cisco Networking Academy, mar 2023 – jul 2023. Direccionamiento IP, Ethernet y conectividad entre switches, routers y dispositivos finales.
- **Curso intensivo de inglés técnico**, Academia Politécnica Aeronáutica (FACh), ene 2019 – jul 2019. **Primer lugar del curso.**
- **Título de especialidad en Electricidad y Electrónica de Aeronaves**, Escuela de Especialidades "Sargento Menadier" (FACh), ene 2017 – dic 2018. Brigadier en segundo año: estuvo a cargo de supervisar una sección de alumnos, cargo otorgado por rendimiento académico y conducta.

## Aptitudes
- IA y automatización: agentes LLM, sistemas multiagente, IA agéntica, prompt engineering, Claude Code, Codex, Copilot Agent Builder, Gemini API, automatización de procesos, TensorFlow/CNN.
- Lenguajes: Python, SQL, C#/.NET, JavaScript/TypeScript, Kotlin, C, VBA.
- Web y datos: Next.js, React, Node.js, Prisma, PostgreSQL, MySQL, Tailwind CSS, Firebase.
- Herramientas y procesos: Git/GitHub, GitHub Actions, Pydantic, QA funcional, BPMN, Odoo, Microsoft Excel avanzado.
- Habilidades personales: liderazgo, trabajo en equipo, resolución de problemas, docencia.
- Idiomas: español (nativo), inglés técnico (primer lugar del curso intensivo de la FACh).
