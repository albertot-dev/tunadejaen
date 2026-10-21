// Eventos que la Tuna celebra cada año. La carpeta de sus crónicas
// es src/content/cronicas/<slug>/ y su página, /<slug>.
export interface EventoAnual {
  slug: string;
  nombre: string;
  /** Frase corta para tarjetas y cabeceras */
  lema: string;
  descripcion: string;
}

export const eventos: EventoAnual[] = [
  {
    slug: "lunes-santo",
    nombre: "Lunes Santo",
    lema: "El día más importante de nuestra Tuna",
    descripcion:
      "Cada Lunes Santo cantamos a la salida de la Virgen. Es la cita más especial del año para todos los que hemos vestido la beca verde.",
  },
  {
    slug: "aguinaldo",
    nombre: "Aguinaldo",
    lema: "La Navidad se canta en la calle",
    descripcion:
      "Por Navidad salimos a cantar villancicos y a pedir el aguinaldo, como manda la tradición tunantesca.",
  },
];

export const getEvento = (slug: string) =>
  eventos.find((evento) => evento.slug === slug);
