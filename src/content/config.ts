import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Crónicas de los eventos anuales. Cada edición es una carpeta:
//   src/content/cronicas/<evento>/<año>/index.md   ← la crónica
//   src/content/cronicas/<evento>/<año>/*.jpg      ← las fotos de la galería
const cronicas = defineCollection({
  loader: glob({
    pattern: "*/*/index.md",
    base: "./src/content/cronicas",
    // "lunes-santo/2026/index.md" → "lunes-santo/2026"
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    resumen: z.string(),
    /** Nombre del archivo de la foto de portada (si no, se usa la primera) */
    portada: z.string().optional(),
    /** Pies de foto opcionales: { "foto-1.jpg": "Texto" } */
    pies: z.record(z.string()).optional(),
  }),
});

export const collections = { cronicas };
