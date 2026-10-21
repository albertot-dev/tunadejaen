import type { ImageMetadata } from "astro";
import claustro from "@/assets/header-3.jpg";
import claustroBanda from "@/assets/claustro-banda.jpg";
import fotoFamilia from "@/assets/foto-familia-jaen.jpg";
import lima from "@/assets/tuna-jaen-en-lima.jpg";
import tunosAntiguos from "@/assets/tunos-antiguos.png";

// Fotos del archivo. Para añadir una, guárdala en src/assets e impórtala aquí.
export interface Foto {
  src: ImageMetadata;
  alt: string;
  caption: string;
  credit?: string;
}

export const archivo: Foto[] = [
  {
    src: fotoFamilia,
    alt: "Foto de familia de la Tuna de Jaén en una terraza con la ciudad y el cerro de fondo",
    caption: "Foto de familia en Jaén",
    credit: "J. Salvador Vivo",
  },
  {
    src: claustro,
    alt: "La Tuna de Jaén al completo vista desde arriba en el patio de un claustro",
    caption: "Encuentro de generaciones en el claustro",
  },
  {
    src: lima,
    alt: "Tunos de Jaén junto a las letras de Lima en la Plaza Mayor",
    caption: "Plaza Mayor de Lima, Perú",
  },
  {
    src: claustroBanda,
    alt: "La Tuna en un patio junto a una banda de música",
    caption: "Compartiendo patio con la banda",
  },
  {
    src: tunosAntiguos,
    alt: "Ilustración de dos tunos tocando ante el escudo de la Universidad",
    caption: "Ilustración de nuestros tunos",
  },
];
