# CV de Álvaro Valdivia Miranda

## Diseño y contenido

- Única fuente de datos profesionales: `docs/perfil.md`. Se condensó y tradujo el contenido sin añadir métricas, tecnologías ni fechas.
- Una página A4 por idioma, una columna y orden de lectura lineal. Márgenes internos: 15 mm laterales y 12 mm verticales; `@page` sin márgenes. Sin foto, teléfono ni WhatsApp.
- Segoe UI con alternativa Arial/sans-serif, cuerpo de 9,4 pt y un único acento azul petróleo (`#1d4c5b`). CSS integrado y sin dependencias externas.
- Se priorizan las tres herramientas de ADP, job-agent y PerfectRep. Cyberstyle ocupa una línea; LnKut y PC Forge se omiten para mantener una página legible. Las experiencias solapadas se ordenan por fecha de término.
- En inglés, el título universitario conserva su denominación española junto a la traducción solicitada. «Brigadier» se explica como una responsabilidad estudiantil. CCNA ITN se presenta como Introducción a Redes, sin atribuir una certificación CCNA completa.

## Verificación

- PDF generados desde los HTML mediante Google Chrome 157 en modo headless, sin encabezados ni pies de navegador y con etiquetado del documento.
- Ambos PDF tienen una página A4. Se revisaron las imágenes renderizadas: sin recortes, solapamientos, páginas vacías ni líneas huérfanas. Las fuentes están incrustadas y el texto extraído conserva las tildes y el orden de lectura. No se ha probado la importación en un ATS concreto.
- Cada PDF contiene siete enlaces: email, LinkedIn, GitHub, los tres repositorios y la demo. Sus destinos se cotejaron con el perfil. GitHub y la demo respondieron HTTP 200; el repositorio de PerfectRep redirige correctamente. Se conserva el enlace original de la fuente.
- LinkedIn devolvió HTTP 405 a HEAD y 999 a GET: no se pudo comprobar automáticamente la página pública. El enlace del PDF apunta a la URL exacta del perfil. El enlace de email usa `mailto:`; no se envió correo.

Para regenerar desde la raíz del proyecto en PowerShell:

```powershell
$cvRoot = (Get-Location).Path
foreach ($cvLanguage in @('es', 'en')) {
    $cvHtml = Join-Path $cvRoot "docs\cv\cv-$cvLanguage.html"
    $cvPdf = Join-Path $cvRoot ("public\cv\CV-Alvaro-Valdivia-" + $cvLanguage.ToUpper() + '.pdf')
    $cvUri = ([System.Uri]$cvHtml).AbsoluteUri
    & 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --no-pdf-header-footer --export-tagged-pdf "--print-to-pdf=$cvPdf" $cvUri
}
```

En esta ejecución se utilizó un perfil temporal separado y se añadieron `--no-sandbox --disable-gpu --disable-software-rasterizer` porque el proceso gráfico de Chrome fallaba en el entorno restringido. Se eliminaron los archivos temporales al terminar. Los saltos de línea dependen de las fuentes instaladas: comprobar la paginación al regenerar en otro equipo.

## Datos que convendría completar o confirmar

- Métricas verificables de las herramientas de ADP: tiempo ahorrado, volumen procesado o reducción de errores. No se añadieron estimaciones.
- Estado y fecha de finalización de PerfectRep: el perfil indica «actualidad», mientras que la formación universitaria termina en diciembre de 2024. Se conservaron ambas fechas tal como aparecen.
- Denominación oficial del grado en inglés y fecha de titulación, si existe documentación institucional que permita precisarlas.
- Nivel de inglés según el MCER o una certificación vigente, si se dispone de ella. Se mantuvo únicamente «inglés técnico».
