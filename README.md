# Tuna de Jaén

Web de la Tuna Universitaria de Distrito de Jaén — [tunadejaen.es](https://www.tunadejaen.es/).

Hecha con [Astro](https://astro.build/) y Tailwind CSS.

```sh
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo en http://localhost:4321
pnpm build       # comprobar y generar la web en ./dist
pnpm preview     # ver la versión generada
```

## Cómo actualizar el contenido

Todo el contenido que cambia a menudo está en archivos de texto; no hace falta
tocar el diseño. Después de cualquier cambio, `pnpm build` comprueba que todo
está bien.

### Crónicas del Lunes Santo y del Aguinaldo

Cada edición es una carpeta con su crónica y sus fotos:

```text
src/content/cronicas/
├── lunes-santo/
│   ├── 2026/
│   │   ├── index.md        ← la crónica
│   │   ├── 01.jpg          ← fotos de la galería (en orden de nombre)
│   │   └── 02.jpg
│   └── 2025/
│       └── index.md
└── aguinaldo/
    └── 2025/
        └── index.md
```

Para añadir una edición nueva (por ejemplo, el Lunes Santo de 2027):

1. Copia la carpeta de otro año y renómbrala a `2027`.
2. Edita `index.md`: la cabecera entre `---` y el texto de la crónica debajo.

   ```md
   ---
   titulo: "Cantando a la salida de la Virgen"
   fecha: 2027-03-22
   resumen: "Una frase que resuma el día."
   portada: 03.jpg            # opcional: foto de cabecera (si no, la primera)
   pies:                      # opcional: textos de las fotos
     03.jpg: "La salida de la Virgen"
   ---

   Aquí va la crónica. Se pueden usar **negritas**, [enlaces](https://...) y
   citas empezando la línea con `>`.
   ```

3. Mete las fotos (`.jpg`, `.png` o `.webp`) en la misma carpeta. Se optimizan
   solas, no hace falta reducirlas.

Las páginas se crean automáticamente:

- `/lunes-santo` y `/aguinaldo` muestran siempre la edición más reciente.
- `/lunes-santo/2027`, `/aguinaldo/2025`… muestran cada año.

Para añadir otro evento anual, añádelo en `src/data/eventos.ts` y crea su
carpeta en `src/content/cronicas/`.

### Palmarés

`src/data/palmares.ts`: cambia los números de `cantidad`. Los años de historia
se calculan solos a partir del año de fundación.

### Prensa

`src/data/prensa.ts`: añade una entrada por noticia (fecha, medio, título y
enlace). Se ordenan solas de la más nueva a la más antigua.

### Agenda pública

`src/data/agenda.ts`: añade una entrada por actuación. Las fechas pasadas dejan
de mostrarse en la siguiente publicación.

### Archivo de fotos

Guarda la foto en `src/assets/` y añádela a la lista de `src/data/archivo.ts`.

### Historia (timeline)

Los hitos están en `src/data/historia.ts` y se usan en la portada y en
`/historia`.
