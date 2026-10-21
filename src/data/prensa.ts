// Apariciones en prensa. Para añadir una, agrega un objeto a la lista:
// { fecha: "2023-05-12", medio: "Diario Jaén", titulo: "La Tuna celebra su 40 aniversario", url: "https://..." }
export interface Noticia {
  /** Formato AAAA-MM-DD */
  fecha: string;
  medio: string;
  titulo: string;
  url: string;
}

export const prensa: Noticia[] = [];
