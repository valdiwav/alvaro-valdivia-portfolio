// Contenido del portafolios. Fuente de verdad: docs/perfil.md.
export type Lang = "es" | "en";

export const links = {
  email: "valdivialvaro.8@gmail.com",
  linkedin: "https://www.linkedin.com/in/alvaro-valdivia-miranda-a5065b178/",
  github: "https://github.com/valdiwav",
  cv: { es: "/cv/CV-Alvaro-Valdivia-ES.pdf", en: "/cv/CV-Alvaro-Valdivia-EN.pdf" },
};

type Job = {
  role: string;
  org: string;
  period: string;
  place: string;
  summary: string;
  bullets?: { title: string; text: string; stack: string }[];
  points?: string[];
};

export type Project = {
  name: string;
  period: string;
  description: string;
  stack: string[];
  code?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
};

type Content = {
  nav: { experience: string; projects: string; skills: string; education: string; contact: string };
  hero: {
    badge: string;
    hello: string;
    title: string;
    summary: string;
    cv: string;
    contact: string;
    stats: { value: string; label: string }[];
  };
  demos: {
    kicker: string;
    heading: string;
    intro: string;
    note: string;
    sim: string;
    payroll: {
      title: string;
      heading: string;
      caption: string;
      nodes: { input: string; orchestrator: string; output: string; knowledge: string };
      requestLabel: string;
      request: string;
      agents: { name: string; task: string; result: string }[];
      working: string;
      formulaLabel: string;
      formula: string;
      explanation: string;
      knowledge: string;
      knowledgeDetail: string;
    };
    agent: { title: string; caption: string; lines: { kind: "cmd" | "info" | "ok" | "skip" | "score"; text: string; detail?: string }[] };
    validator: {
      title: string;
      caption: string;
      fields: string[];
      scanning: string;
      error: string;
      errorDetail: string;
      ok: string;
    };
  };
  about: { heading: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  experience: { heading: string; built: string; jobs: Job[] };
  projects: { heading: string; intro: string; code: string; demo: string; items: Project[] };
  skills: { heading: string; groups: { name: string; items: string[] }[] };
  education: { heading: string; items: { title: string; org: string; period: string; note: string }[] };
  contact: { heading: string; text: string; copy: string; copied: string };
  footer: string;
};

const projectsStack = {
  jobAgent: ["Python", "Gemini API", "Pydantic", "GitHub Actions", "Telegram Bot API"],
  perfectRep: ["Kotlin", "MoveNet", "TensorFlow Lite", "CameraX", "Firebase"],
  cyberstyle: ["GameMaker", "CSS", "HTML", "Análisis de datos"],
  lnkut: ["Next.js", "React", "Prisma", "PostgreSQL", "Tailwind CSS"],
  pcForge: ["React", "TypeScript", "Sass", "MySQL"],
};

const urls = {
  jobAgent: "https://github.com/valdiwav/job-agent",
  perfectRep: { code: "https://github.com/valdiwav/PerfectRep", demo: "https://perfectrep.vercel.app/" },
  cyberstyle: "https://github.com/valdiwav/CyberStyle",
  lnkut: { code: "https://github.com/valdiwav/url-shortener", demo: "https://lnkut.vercel.app" },
  pcForge: "https://github.com/valdiwav/PcForgeReact",
};

export const content: Record<Lang, Content> = {
  es: {
    nav: { experience: "Experiencia", projects: "Proyectos", skills: "Habilidades", education: "Formación", contact: "Contacto" },
    hero: {
      badge: "Abierto a nuevas oportunidades",
      hello: "Álvaro Valdivia Miranda",
      title: "Implementación de Software · Automatización de Procesos · IA Aplicada",
      summary:
        "Implemento software de nómina en ADP y construyo las herramientas que le ahorran trabajo al equipo: un agente de IA que propone fórmulas de nómina, un validador de archivos bancarios y cargas masivas. Trabajo con agentes LLM, Claude Code, Python y SQL.",
      cv: "Descargar CV",
      contact: "Contactar",
      stats: [
        { value: "3", label: "herramientas internas en uso en ADP" },
        { value: "500", label: "conceptos por carga automatizada" },
        { value: "28", label: "tests en mi agente de empleo" },
      ],
    },
    demos: {
      kicker: "En acción",
      heading: "Así se ve lo que construyo",
      intro: "Tres de mis herramientas, recreadas para que veas cómo funcionan.",
      note: "Simulaciones ilustrativas con datos ficticios. No muestran código, datos ni clientes reales.",
      sim: "Simulación",
      payroll: {
        title: "agente-formulacion-nomina",
        heading: "Agente de IA para formulación de nómina",
        caption:
          "Un orquestador reparte el requerimiento entre subagentes y skills, propone la fórmula con su explicación y actualiza su propia base de conocimiento.",
        nodes: { input: "Requerimiento", orchestrator: "Orquestador", output: "Fórmula", knowledge: "Conocimiento" },
        requestLabel: "Requerimiento en lenguaje simple",
        request: "Bono de asistencia: 5 % del sueldo base si no tiene ausencias en el mes.",
        agents: [
          { name: "Tablas y conceptos", task: "tablas de fórmulas · conceptos de pago · manual", result: "SUELDO_BASE y DIAS_AUSENCIA encontrados" },
          { name: "Normativa y seguridad", task: "reglas de la empresa · país", result: "Regla permitida, sin datos sensibles" },
          { name: "Validación", task: "sintaxis · casos de prueba", result: "3 de 3 casos correctos" },
        ],
        working: "trabajando…",
        formulaLabel: "Fórmula propuesta",
        formula: "SI(DIAS_AUSENCIA = 0; SUELDO_BASE × 0,05; 0)",
        explanation: "Paga el 5 % del sueldo base solo si el trabajador no registra ausencias en el período.",
        knowledge: "Base de conocimiento actualizada",
        knowledgeDetail: "+1 patrón: bono condicionado a asistencia",
      },
      agent: {
        title: "job-agent",
        caption: "Busca, filtra y puntúa ofertas cada mañana, y envía las mejores.",
        lines: [
          { kind: "cmd", text: "python -m job_agent run" },
          { kind: "info", text: "Buscando en 5 portales", detail: "Get on Board · Remotive · Himalayas · Remote OK · WWR" },
          { kind: "skip", text: "Filtros propios", detail: "seniority · ubicación · modalidad · sueldo · duplicados" },
          { kind: "info", text: "Puntuando con LLM según mi perfil" },
          { kind: "score", text: "9.2  AI Automation Engineer", detail: "agentes LLM + Python + SQL" },
          { kind: "score", text: "8.6  Implementation Engineer", detail: "implementación + integraciones" },
          { kind: "score", text: "8.1  AI Solutions Consultant", detail: "IA aplicada a procesos" },
          { kind: "ok", text: "Enviado a Telegram y correo" },
        ],
      },
      validator: {
        title: "Validador de archivos bancarios",
        caption: "Recorre cada registro carácter por carácter contra el formato del banco.",
        fields: ["Tipo", "Cuenta", "Moneda", "Monto", "Beneficiario"],
        scanning: "Validando registro 0142…",
        error: "Error en «Cuenta», posición 9",
        errorDetail: "Se esperaba un dígito y llegó «O».",
        ok: "Lote validado: 1 error localizado",
      },
    },
    about: {
      heading: "Sobre mí",
      paragraphs: [
        "Empecé reparando sistemas eléctricos y electrónicos de helicópteros en la Fuerza Aérea de Chile. Ahí aprendí a diagnosticar con método, a trabajar bajo presión y a no dar nada por terminado hasta que funciona.",
        "Después estudié Ingeniería de Ejecución en Informática en la PUCV. Hoy implemento software corporativo y, cuando veo una tarea repetitiva o propensa a errores, la convierto en una herramienta, cada vez más a menudo con IA.",
      ],
      facts: [
        { label: "Ubicación", value: "Santiago, Chile" },
        { label: "Actualmente", value: "Analista de Implementación en ADP" },
        { label: "Busco", value: "IA aplicada, automatización, implementación e integración" },
        { label: "Idiomas", value: "Español nativo · Inglés profesional básico" },
      ],
    },
    experience: {
      heading: "Experiencia",
      built: "Herramientas que diseñé y desarrollé",
      jobs: [
        {
          role: "Analista de Implementación",
          org: "ADP",
          period: "Abr 2025 — Actualidad",
          place: "Las Condes, Santiago · Híbrido",
          summary:
            "Implementación de software de nómina para clientes con operación en Perú: configuración de la plataforma, bases de datos SQL, pruebas funcionales (QA), documentación y soporte después de la salida en vivo.",
          bullets: [
            {
              title: "Agente de IA para formulación de nómina",
              text: "Recibe un requerimiento en lenguaje simple, o el documento firmado por el cliente y el país, y propone la fórmula de nómina con su explicación. Un arnés con subagentes y skills consulta las tablas de fórmulas, los conceptos de pago y el manual de la plataforma, siguiendo la normativa y la seguridad de la empresa. Una herramienta propia mantiene al día su base de conocimiento. Lo usa el equipo de implementación y pronto se extenderá a Chile, Perú y Argentina.",
              stack: "Diseñado en Claude · desplegado en Microsoft Copilot",
            },
            {
              title: "Validador de archivos de transferencias bancarias",
              text: "Compara cada archivo de pago de ancho fijo, carácter por carácter, con el formato de cada banco y cliente. Detecta el formato solo, explica qué campo falla, por qué y dónde, valida lotes y compara dos archivos. Lo usa todo el equipo de implementación.",
              stack: "Construido con IA en C# / .NET, el stack del entorno corporativo",
            },
            {
              title: "Carga masiva de conceptos de pago",
              text: "Valida la planilla del cliente contra la base de destino (duplicados, afectaciones, códigos) y genera el script que inserta hasta 500 conceptos con sus reglas. Lo usa el backoffice de implementación de Perú.",
              stack: "Excel VBA · SQL",
            },
          ],
        },
        {
          role: "Práctica profesional",
          org: "BELAT",
          period: "Dic 2023 — Feb 2024",
          place: "Providencia, Santiago",
          summary: "Procesos, desarrollo web y datos para el área comercial.",
          points: [
            "Modelado de procesos con BPMN y planificación de tareas en Odoo.",
            "Desarrollo web con JavaScript y Prisma sobre PostgreSQL.",
            "Depuración y actualización de la base de clientes en Jotform.",
          ],
        },
        {
          role: "Ayudante de Estructura de Datos",
          org: "Pontificia Universidad Católica de Valparaíso",
          period: "Mar 2023 — Jul 2024",
          place: "Valparaíso",
          summary:
            "Apoyo a estudiantes en listas enlazadas, pilas, colas, árboles y grafos en C. Diseño de ejercicios prácticos, evaluación de trabajos y guía en la optimización de algoritmos.",
        },
        {
          role: "Técnico en Electricidad y Electrónica de Aeronaves",
          org: "Fuerza Aérea de Chile",
          period: "Dic 2018 — Dic 2020",
          place: "Santiago",
          summary:
            "Diagnóstico y reparación de sistemas eléctricos y electrónicos de helicópteros en un entorno exigente y de alta responsabilidad.",
        },
      ],
    },
    projects: {
      heading: "Proyectos",
      intro: "Proyectos personales y académicos, del agente que busca empleo por mí a la visión por computadora.",
      code: "Código",
      demo: "Demo",
      items: [
        {
          name: "job-agent",
          period: "2026",
          description:
            "Agente de IA que cada mañana busca ofertas remotas en cinco portales, descarta las que no encajan con filtros propios, puntúa el resto con un LLM según mi perfil y me envía las mejores, con el motivo de cada nota, por Telegram y correo. Corre solo en GitHub Actions, con reintentos y modelos de respaldo, salida validada con Pydantic y 28 tests automatizados.",
          stack: projectsStack.jobAgent,
          code: urls.jobAgent,
          featured: true,
        },
        {
          name: "PerfectRep",
          period: "2024 — Actualidad",
          description:
            "Mi proyecto de título: una app Android que usa la cámara como entrenador. Con visión por computadora en el propio teléfono (MoveNet y TensorFlow Lite, sin enviar vídeo a ningún servidor) cuenta las repeticiones de sentadilla, peso muerto, press de hombros y curl de bíceps, avisa en tiempo real cuando la postura es incorrecta y estima el esfuerzo (RIR) de cada serie.",
          stack: projectsStack.perfectRep,
          code: urls.perfectRep.code,
          demo: urls.perfectRep.demo,
          demoLabel: "Web de la alfa",
          featured: true,
        },
        {
          name: "Cyberstyle: SYNAPSE",
          period: "2024",
          description:
            "Videojuego educativo para aprender CSS. Compara dos sistemas de retroalimentación (KCR y MTF) y mide retención, motivación, interés y utilidad percibida.",
          stack: projectsStack.cyberstyle,
          code: urls.cyberstyle,
        },
        {
          name: "LnKut",
          period: "Proyecto personal",
          description: "Acortador de URLs con códigos QR, registro de usuarios y gestión de enlaces.",
          stack: projectsStack.lnkut,
          code: urls.lnkut.code,
          demo: urls.lnkut.demo,
        },
        {
          name: "PC Forge",
          period: "Proyecto universitario",
          description:
            "Plataforma educativa que guía paso a paso para armar un PC: componentes, compatibilidad y ensamblaje, y guarda el progreso.",
          stack: projectsStack.pcForge,
          code: urls.pcForge,
        },
      ],
    },
    skills: {
      heading: "Habilidades",
      groups: [
        {
          name: "IA y automatización",
          items: ["Agentes LLM", "Sistemas multiagente", "Subagentes, skills y hooks", "Claude Code", "Codex", "Microsoft Copilot Studio", "Gemini API", "Prompt engineering", "TensorFlow Lite"],
        },
        { name: "Lenguajes", items: ["Python", "SQL", "JavaScript", "C", "Kotlin", "VBA"] },
        { name: "Web y datos", items: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "MySQL", "Firebase", "Tailwind CSS"] },
        { name: "Herramientas y procesos", items: ["Git / GitHub", "GitHub Actions", "Pydantic", "QA funcional", "BPMN", "Odoo", "Excel avanzado"] },
      ],
    },
    education: {
      heading: "Formación",
      items: [
        {
          title: "Ingeniería de Ejecución en Informática",
          org: "Pontificia Universidad Católica de Valparaíso",
          period: "2021 — 2024 · titulado en 2025",
          note: "Desarrollo de software, bases de datos, IA aplicada y desarrollo web y móvil. Egresé en diciembre de 2024 y me titulé en enero de 2025.",
        },
        {
          title: "Introducción a Redes (CCNA ITN)",
          org: "Cisco Networking Academy",
          period: "2023",
          note: "Direccionamiento IP, Ethernet y conectividad entre switches, routers y dispositivos.",
        },
        {
          title: "Curso intensivo de inglés técnico",
          org: "Academia Politécnica Aeronáutica, FACh",
          period: "2019",
          note: "Primer lugar del curso.",
        },
        {
          title: "Título en Electricidad y Electrónica de Aeronaves",
          org: "Escuela de Especialidades Sgto. Menadier, FACh",
          period: "2017 — 2018",
          note: "Brigadier en segundo año: a cargo de una sección de alumnos.",
        },
      ],
    },
    contact: {
      heading: "Hablemos",
      text: "Si buscas a alguien para automatizar procesos, implementar software o llevar IA a tareas reales, escríbeme.",
      copy: "Copiar email",
      copied: "Copiado",
    },
    footer: "Diseñado y desarrollado por Álvaro Valdivia con Next.js.",
  },
  en: {
    nav: { experience: "Experience", projects: "Projects", skills: "Skills", education: "Education", contact: "Contact" },
    hero: {
      badge: "Open to new opportunities",
      hello: "Álvaro Valdivia Miranda",
      title: "Software Implementation · Process Automation · Applied AI",
      summary:
        "I implement payroll software at ADP and build the tools that save my team time: validators, bulk loaders and AI agents. I work with LLM agents, Claude Code, Python and SQL.",
      cv: "Download CV",
      contact: "Get in touch",
      stats: [
        { value: "3", label: "internal tools in use at ADP" },
        { value: "500", label: "payroll items per automated load" },
        { value: "28", label: "tests in my job-search agent" },
      ],
    },
    demos: {
      kicker: "In action",
      heading: "What my work looks like",
      intro: "Three of my tools, recreated so you can see how they work.",
      note: "Illustrative simulations with fictional data. No real code, data or clients are shown.",
      sim: "Simulation",
      payroll: {
        title: "payroll-formula-agent",
        heading: "AI agent for payroll formulas",
        caption:
          "An orchestrator splits the requirement across subagents and skills, proposes the formula with an explanation and updates its own knowledge base.",
        nodes: { input: "Request", orchestrator: "Orchestrator", output: "Formula", knowledge: "Knowledge" },
        requestLabel: "Plain-language requirement",
        request: "Attendance bonus: 5% of base salary if there are no absences in the month.",
        agents: [
          { name: "Tables & concepts", task: "formula tables · pay concepts · manual", result: "BASE_SALARY and ABSENCE_DAYS found" },
          { name: "Policy & security", task: "company rules · country", result: "Rule allowed, no sensitive data" },
          { name: "Validation", task: "syntax · test cases", result: "3 of 3 cases pass" },
        ],
        working: "working…",
        formulaLabel: "Proposed formula",
        formula: "IF(ABSENCE_DAYS = 0, BASE_SALARY × 0.05, 0)",
        explanation: "Pays 5% of the base salary only if the employee has no absences in the period.",
        knowledge: "Knowledge base updated",
        knowledgeDetail: "+1 pattern: attendance-based bonus",
      },
      agent: {
        title: "job-agent",
        caption: "Searches, filters and scores job posts every morning, then sends the best ones.",
        lines: [
          { kind: "cmd", text: "python -m job_agent run" },
          { kind: "info", text: "Searching 5 job boards", detail: "Get on Board · Remotive · Himalayas · Remote OK · WWR" },
          { kind: "skip", text: "Custom filters", detail: "seniority · location · work mode · salary · duplicates" },
          { kind: "info", text: "Scoring with an LLM against my profile" },
          { kind: "score", text: "9.2  AI Automation Engineer", detail: "LLM agents + Python + SQL" },
          { kind: "score", text: "8.6  Implementation Engineer", detail: "implementation + integrations" },
          { kind: "score", text: "8.1  AI Solutions Consultant", detail: "AI applied to processes" },
          { kind: "ok", text: "Sent to Telegram and email" },
        ],
      },
      validator: {
        title: "Bank file validator",
        caption: "Checks every record character by character against the bank's format.",
        fields: ["Type", "Account", "Currency", "Amount", "Payee"],
        scanning: "Validating record 0142…",
        error: "Error in “Account”, position 9",
        errorDetail: "Expected a digit, got “O”.",
        ok: "Batch validated: 1 error found",
      },
    },
    about: {
      heading: "About",
      paragraphs: [
        "I started out repairing electrical and electronic systems on helicopters in the Chilean Air Force. That taught me to troubleshoot methodically, work under pressure and not call anything done until it works.",
        "I went on to earn a degree in Computer Engineering at PUCV. Today I implement enterprise software, and whenever I spot a repetitive or error-prone task, I turn it into a tool, more and more often with AI.",
      ],
      facts: [
        { label: "Location", value: "Santiago, Chile" },
        { label: "Currently", value: "Implementation Analyst at ADP" },
        { label: "Looking for", value: "Applied AI, automation, implementation and integration" },
        { label: "Languages", value: "Spanish (native) · English (limited working proficiency)" },
      ],
    },
    experience: {
      heading: "Experience",
      built: "Tools I designed and built",
      jobs: [
        {
          role: "Implementation Analyst",
          org: "ADP",
          period: "Apr 2025 — Present",
          place: "Las Condes, Santiago · Hybrid",
          summary:
            "Payroll software implementation for clients operating in Peru: platform configuration, SQL databases, functional testing (QA), documentation and post-go-live support.",
          bullets: [
            {
              title: "AI agent for payroll formulas",
              text: "Takes a plain-language requirement, or the client's signed document plus the country, and proposes the payroll formula with an explanation. A harness of subagents and skills checks the formula tables, pay concepts and platform manual, following company policy and security rules. A custom tool keeps its knowledge base up to date. Used by the implementation team and soon rolling out to Chile, Peru and Argentina.",
              stack: "Designed in Claude · deployed on Microsoft Copilot",
            },
            {
              title: "Bank transfer file validator",
              text: "Checks each fixed-width payment file character by character against each bank's and client's format. Detects the format automatically, explains which field fails, why and where, validates batches and compares two files. Used by the entire implementation team.",
              stack: "Built with AI in C# / .NET, the corporate stack",
            },
            {
              title: "Bulk payroll concept loader",
              text: "Validates the client's spreadsheet against the target database (duplicates, dependencies, codes) and generates the script that inserts up to 500 concepts with their rules. Used by the Peru implementation back office.",
              stack: "Excel VBA · SQL",
            },
          ],
        },
        {
          role: "Intern",
          org: "BELAT",
          period: "Dec 2023 — Feb 2024",
          place: "Providencia, Santiago",
          summary: "Processes, web development and data for the sales team.",
          points: [
            "Process modeling with BPMN and task planning in Odoo.",
            "Web development with JavaScript and Prisma on PostgreSQL.",
            "Cleaned up and updated the customer database in Jotform.",
          ],
        },
        {
          role: "Teaching Assistant, Data Structures",
          org: "Pontificia Universidad Católica de Valparaíso",
          period: "Mar 2023 — Jul 2024",
          place: "Valparaíso",
          summary:
            "Supported students on linked lists, stacks, queues, trees and graphs in C. Designed practice exercises, graded assignments and helped students optimize their algorithms.",
        },
        {
          role: "Aircraft Electrical & Electronics Technician",
          org: "Chilean Air Force",
          period: "Dec 2018 — Dec 2020",
          place: "Santiago",
          summary:
            "Troubleshooting and repair of helicopter electrical and electronic systems in a demanding, high-responsibility environment.",
        },
      ],
    },
    projects: {
      heading: "Projects",
      intro: "Personal and academic projects, from an agent that job-hunts for me to computer vision.",
      code: "Code",
      demo: "Demo",
      items: [
        {
          name: "job-agent",
          period: "2026",
          description:
            "AI agent that every morning searches five job boards for remote roles, filters out poor fits with custom rules, scores the rest with an LLM against my profile and sends me the best ones, with the reason for each score, via Telegram and email. Runs unattended on GitHub Actions, with retries and fallback models, Pydantic-validated output and 28 automated tests.",
          stack: projectsStack.jobAgent,
          code: urls.jobAgent,
          featured: true,
        },
        {
          name: "PerfectRep",
          period: "2024 — Present",
          description:
            "My degree project: an Android app that turns the phone camera into a coach. With on-device computer vision (MoveNet and TensorFlow Lite, no video ever leaves the phone) it counts reps for squats, deadlifts, shoulder presses and biceps curls, warns in real time when form is off and estimates the effort (RIR) of each set.",
          stack: projectsStack.perfectRep,
          code: urls.perfectRep.code,
          demo: urls.perfectRep.demo,
          demoLabel: "Alpha site",
          featured: true,
        },
        {
          name: "Cyberstyle: SYNAPSE",
          period: "2024",
          description:
            "Educational game for learning CSS. Compares two feedback systems (KCR and MTF) and measures retention, motivation, interest and perceived usefulness.",
          stack: ["GameMaker", "CSS", "HTML", "Data analysis"],
          code: urls.cyberstyle,
        },
        {
          name: "LnKut",
          period: "Personal project",
          description: "URL shortener with QR codes, user accounts and link management.",
          stack: projectsStack.lnkut,
          code: urls.lnkut.code,
          demo: urls.lnkut.demo,
        },
        {
          name: "PC Forge",
          period: "University project",
          description:
            "Educational platform that walks users step by step through building a PC: components, compatibility and assembly, with saved progress.",
          stack: projectsStack.pcForge,
          code: urls.pcForge,
        },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        {
          name: "AI & automation",
          items: ["LLM agents", "Multi-agent systems", "Subagents, skills & hooks", "Claude Code", "Codex", "Microsoft Copilot Studio", "Gemini API", "Prompt engineering", "TensorFlow Lite"],
        },
        { name: "Languages", items: ["Python", "SQL", "JavaScript", "C", "Kotlin", "VBA"] },
        { name: "Web & data", items: ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "MySQL", "Firebase", "Tailwind CSS"] },
        { name: "Tools & process", items: ["Git / GitHub", "GitHub Actions", "Pydantic", "Functional QA", "BPMN", "Odoo", "Advanced Excel"] },
      ],
    },
    education: {
      heading: "Education",
      items: [
        {
          title: "B.Eng. in Computer Engineering",
          org: "Pontificia Universidad Católica de Valparaíso",
          period: "2021 — 2024 · degree conferred 2025",
          note: "Software development, databases, applied AI, and web and mobile development. Completed coursework in December 2024; degree conferred in January 2025.",
        },
        {
          title: "Introduction to Networks (CCNA ITN)",
          org: "Cisco Networking Academy",
          period: "2023",
          note: "IP addressing, Ethernet and connectivity between switches, routers and end devices.",
        },
        {
          title: "Intensive Technical English Course",
          org: "Aeronautical Polytechnic Academy, Chilean Air Force",
          period: "2019",
          note: "Ranked first in the course.",
        },
        {
          title: "Aircraft Electrical & Electronics Specialist",
          org: "Sgt. Menadier School of Specialties, Chilean Air Force",
          period: "2017 — 2018",
          note: "Cadet leader in second year, responsible for a section of students.",
        },
      ],
    },
    contact: {
      heading: "Let's talk",
      text: "If you need someone to automate processes, implement software or bring AI to real work, get in touch.",
      copy: "Copy email",
      copied: "Copied",
    },
    footer: "Designed and built by Álvaro Valdivia with Next.js.",
  },
};
