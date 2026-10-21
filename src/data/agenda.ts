// Actuaciones públicas. Para publicar una nueva, añade un objeto a la lista:
// { fecha: "2026-12-20", hora: "20:30", titulo: "Ronda de Navidad", lugar: "Plaza de Santa María, Jaén" }
export interface Evento {
  /** Formato AAAA-MM-DD */
  fecha: string;
  hora?: string;
  titulo: string;
  lugar: string;
  descripcion?: string;
  enlace?: string;
}

export const agenda: Evento[] = [];
