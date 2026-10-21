// Cifras del palmarés que se muestran en la portada.
// Para actualizarlas, cambia el número de "cantidad" (o añade una fila nueva).
export interface CifraPalmares {
  etiqueta: string;
  cantidad: number;
}

export const palmares: CifraPalmares[] = [
  { etiqueta: "Primeros premios", cantidad: 31 },
  { etiqueta: "Premios a mejor tuna", cantidad: 12 },
  { etiqueta: "Premios a mejor pandereta", cantidad: 6 },
];

/** Año de fundación: los "años de historia" se calculan solos a partir de él */
export const fundacion = 1983;
