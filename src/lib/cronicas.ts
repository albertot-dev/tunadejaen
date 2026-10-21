import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export type Cronica = CollectionEntry<"cronicas">;

export interface FotoCronica {
  src: ImageMetadata;
  file: string;
  caption?: string;
}

// Todas las fotos que haya dentro de las carpetas de crónicas
const imagenes = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/cronicas/*/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

export const getEventoSlug = (cronica: Cronica) => cronica.id.split("/")[0];
export const getYear = (cronica: Cronica) => cronica.id.split("/")[1];

/** Crónicas de un evento, de la más reciente a la más antigua */
export async function getCronicas(evento: string) {
  const cronicas = await getCollection(
    "cronicas",
    (cronica) => getEventoSlug(cronica) === evento
  );
  return cronicas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

/** Fotos de la carpeta de una crónica, ordenadas por nombre de archivo */
export function getFotos(cronica: Cronica): FotoCronica[] {
  const prefix = `/src/content/cronicas/${cronica.id}/`;
  return Object.entries(imagenes)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, "es", { numeric: true }))
    .map(([path, module]) => {
      const file = path.slice(prefix.length);
      return { src: module.default, file, caption: cronica.data.pies?.[file] };
    });
}

export function getPortada(cronica: Cronica) {
  const fotos = getFotos(cronica);
  return fotos.find((foto) => foto.file === cronica.data.portada) ?? fotos[0];
}
