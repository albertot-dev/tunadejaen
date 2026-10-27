// Cliente del gestor de contenidos (Strapi). La web se genera de forma estática:
// todo esto se ejecuta al compilar, nunca en el navegador del visitante.
import type { BloqueTexto } from "@/lib/rich-text";

export const STRAPI_URL = (import.meta.env.STRAPI_URL ?? "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

// ---------- Tipos ----------

export interface Media {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  mime: string;
}

export interface Enlace {
  texto: string;
  url: string;
  nuevaPestana?: boolean;
}

export interface Seo {
  metaTitulo?: string | null;
  metaDescripcion?: string | null;
}

export interface Ajustes {
  nombreCorto: string;
  nombreCompleto: string;
  lema?: string | null;
  menu: Enlace[];
  botonMenu?: Enlace | null;
  enConstruccion: boolean;
  seo?: Seo | null;
}

export interface PersonaContacto {
  nombre: string;
  telefono: string;
  whatsapp: boolean;
}

export interface Contacto {
  email: string;
  personas: PersonaContacto[];
  direccion?: { lugar?: string; campus?: string; despacho?: string; ciudad?: string; enlaceMapa?: string } | null;
  redes: { red: string; url: string }[];
}

export interface PiePagina {
  columnas: { titulo: string; enlaces: Enlace[] }[];
  boton?: Enlace | null;
  textoFinal?: string | null;
}

export interface Palmares {
  fundacion: number;
  cifras: { etiqueta: string; cantidad: number }[];
}

export interface Hito {
  anio: string;
  titulo: string;
  texto?: string | null;
}

interface ConCabecera {
  antetitulo?: string | null;
  titulo?: string | null;
}

export type Bloque =
  | ({ __component: "bloques.texto"; contenido?: BloqueTexto[]; letraCapital: boolean } & ConCabecera)
  | { __component: "bloques.frase-destacada"; frase: string; estilo: "claro" | "verde"; botones: Enlace[] }
  | ({
      __component: "bloques.imagen-texto";
      contenido?: BloqueTexto[];
      imagen?: Media | null;
      pieDeFoto?: string | null;
      imagenALaDerecha: boolean;
      enlace?: Enlace | null;
    } & ConCabecera)
  | ({
      __component: "bloques.tarjetas";
      numeradas: boolean;
      tarjetas: { antetitulo?: string | null; titulo: string; texto?: string | null }[];
    } & ConCabecera)
  | ({
      __component: "bloques.pasos";
      pasos: { titulo: string; texto?: string | null }[];
      mostrarDireccion: boolean;
    } & ConCabecera)
  | { __component: "bloques.llamada-accion"; titulo: string; texto?: string | null; botones: Enlace[] }
  | { __component: "bloques.galeria"; titulo?: string | null; fotos?: Media[] | null }
  | { __component: "bloques.imagen"; imagen: Media; pieDeFoto?: string | null }
  | { __component: "bloques.video"; titulo?: string | null; url: string }
  | { __component: "bloques.marquesina"; elementos: string; contorno: boolean; invertida: boolean }
  | ({ __component: "bloques.palmares" } & ConCabecera)
  | { __component: "bloques.linea-temporal"; mostrarEnlace: boolean }
  | ({ __component: "bloques.citas-anuales" } & ConCabecera)
  | ({ __component: "bloques.contacto"; texto?: string | null } & ConCabecera)
  | { __component: "bloques.listado"; tipo: "agenda" | "prensa" | "archivo" };

export interface Inicio {
  portada?: {
    lineaSuperior?: string | null;
    lineaMedia?: string | null;
    titulo: string;
    texto?: string | null;
    imagen?: Media | null;
    botones: Enlace[];
  } | null;
  bloques: Bloque[];
  seo?: Seo | null;
}

export interface Pagina {
  titulo: string;
  slug: string;
  cabecera?: {
    antetitulo?: string | null;
    titulo: string;
    subtitulo?: string | null;
    imagen?: Media | null;
  } | null;
  bloques: Bloque[];
  seo?: Seo | null;
}

export interface Evento {
  documentId: string;
  nombre: string;
  slug: string;
  lema?: string | null;
  descripcion?: string | null;
  etiqueta?: string | null;
}

export interface Cronica {
  documentId: string;
  titulo: string;
  /** AAAA-MM-DD */
  fecha: string;
  resumen: string;
  contenido?: BloqueTexto[] | null;
  portada?: Media | null;
  galeria?: Media[] | null;
  evento?: { slug: string } | null;
}

export interface FotoArchivo {
  imagen: Media;
  pieDeFoto: string;
  credito?: string | null;
}

export interface Actuacion {
  titulo: string;
  /** AAAA-MM-DD */
  fecha: string;
  /** HH:mm:ss.SSS */
  hora?: string | null;
  lugar: string;
  descripcion?: string | null;
  enlace?: string | null;
}

export interface Noticia {
  titulo: string;
  medio: string;
  fecha: string;
  url: string;
}

// ---------- Peticiones ----------

const cache = new Map<string, Promise<unknown>>();

/** GET a la API de Strapi. Devuelve `null` si un tipo único aún está vacío. */
function pedir<T>(ruta: string, query = ""): Promise<T> {
  const url = `${STRAPI_URL}/api/${ruta}${query ? `?${query}` : ""}`;
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {} }).then(
        async (res) => {
          if (res.status === 404) return null;
          if (!res.ok) throw new Error(`Strapi respondió ${res.status} en ${url}: ${await res.text()}`);
          return (await res.json()).data;
        },
        (error) => {
          throw new Error(`No se puede conectar con Strapi en ${STRAPI_URL}. ¿Está arrancado?`, { cause: error });
        }
      )
    );
  }
  return cache.get(url) as Promise<T>;
}

const TODO = "pagination[pageSize]=200";
const BLOQUES = "populate[bloques][populate]=*&populate[seo]=true";

export const getAjustes = () => pedir<Ajustes | null>("ajuste", "populate=*");
export const getContacto = () => pedir<Contacto | null>("contacto", "populate=*");
export const getPiePagina = () =>
  pedir<PiePagina | null>("pie-pagina", "populate[columnas][populate]=enlaces&populate[boton]=true");
export const getPalmares = () => pedir<Palmares | null>("palmares", "populate=cifras");
export const getHitos = async () =>
  (await pedir<{ hitos: Hito[] } | null>("linea-temporal", "populate=hitos"))?.hitos ?? [];

export const getInicio = () =>
  pedir<Inicio | null>("inicio", `populate[portada][populate]=*&${BLOQUES}`);
export const getPaginas = () =>
  pedir<Pagina[]>("paginas", `populate[cabecera][populate]=imagen&${BLOQUES}&${TODO}`);

export const getEventos = () => pedir<Evento[]>("eventos", `sort=orden&${TODO}`);

/** Crónicas de todos los eventos, de la más reciente a la más antigua */
export const getTodasLasCronicas = () =>
  pedir<Cronica[]>(
    "cronicas",
    `sort=fecha:desc&populate[evento][fields][0]=slug&populate[portada]=true&populate[galeria]=true&${TODO}`
  );

export const getCronicas = async (evento: string) =>
  (await getTodasLasCronicas()).filter((cronica) => cronica.evento?.slug === evento);

export const getFotosArchivo = () => pedir<FotoArchivo[]>("fotos", `sort=orden&populate=imagen&${TODO}`);
export const getActuaciones = () => pedir<Actuacion[]>("actuaciones", `sort=fecha&${TODO}`);
export const getNoticias = () => pedir<Noticia[]>("noticias", `sort=fecha:desc&${TODO}`);

// ---------- Utilidades ----------

export const getYear = (cronica: Cronica) => cronica.fecha.slice(0, 4);
export const getPortada = (cronica: Cronica) => cronica.portada ?? cronica.galeria?.[0];

/** URL absoluta de un archivo subido (Strapi local las da relativas: /uploads/...) */
export const mediaUrl = (media: Media) =>
  media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;

/** Props para <Image> de astro:assets a partir de una imagen de Strapi */
export const imagen = (media: Media) => ({
  src: mediaUrl(media),
  width: media.width,
  height: media.height,
});

/** Tamaño reducido (manteniendo proporción) para getImage */
export const imagenAncho = (media: Media, ancho: number) => {
  const width = Math.min(ancho, media.width);
  return { src: mediaUrl(media), width, height: Math.round((media.height * width) / media.width) };
};

export const formatPhone = (phone: string) =>
  phone.replace(/\s/g, "").replace(/(\d{3})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4");

/** Enlace de WhatsApp: si el número no lleva prefijo internacional se asume España */
export const whatsappUrl = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 9 ? `34${digits}` : digits}`;
};

const escapar = (texto: string) =>
  texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Texto plano con **negritas** → HTML seguro */
export const conNegritas = (texto: string, clase = "") =>
  escapar(texto).replace(/\*\*(.+?)\*\*/g, `<strong class="${clase}">$1</strong>`);
