// Tipos del editor de texto de Strapi (campo "blocks")

export interface NodoTexto {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface NodoEnlace {
  type: "link";
  url: string;
  children: NodoTexto[];
}

export type NodoEnLinea = NodoTexto | NodoEnlace;

export type BloqueTexto =
  | { type: "paragraph"; children: NodoEnLinea[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: NodoEnLinea[] }
  | { type: "quote"; children: NodoEnLinea[] }
  | { type: "code"; children: NodoTexto[] }
  | { type: "list"; format: "ordered" | "unordered"; children: ElementoLista[] }
  | { type: "image"; image: { url: string; alternativeText?: string | null; width: number; height: number } };

export type ElementoLista =
  | { type: "list-item"; children: NodoEnLinea[] }
  | { type: "list"; format: "ordered" | "unordered"; children: ElementoLista[] };

// ---------- Conversión a HTML ----------

const escapar = (texto: string) => texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const esExterno = (url: string) => /^https?:\/\//.test(url);

function texto(nodo: NodoTexto) {
  let html = escapar(nodo.text).replace(/\n/g, "<br />");
  if (nodo.code) html = `<code>${html}</code>`;
  if (nodo.bold) html = `<strong>${html}</strong>`;
  if (nodo.italic) html = `<em>${html}</em>`;
  if (nodo.underline) html = `<u>${html}</u>`;
  if (nodo.strikethrough) html = `<s>${html}</s>`;
  return html;
}

const enLinea = (nodos: NodoEnLinea[]): string =>
  nodos
    .map((nodo) =>
      nodo.type === "link"
        ? `<a href="${escapar(nodo.url)}"${esExterno(nodo.url) ? ' target="_blank" rel="noopener"' : ""}>${enLinea(nodo.children)}</a>`
        : texto(nodo)
    )
    .join("");

function lista(format: "ordered" | "unordered", elementos: ElementoLista[]): string {
  const tag = format === "ordered" ? "ol" : "ul";
  const items = elementos
    .map((el) => (el.type === "list" ? lista(el.format, el.children) : `<li>${enLinea(el.children)}</li>`))
    .join("");
  return `<${tag}>${items}</${tag}>`;
}

/** Texto del editor de Strapi → HTML (escapado, listo para set:html) */
export function richTextHtml(bloques?: BloqueTexto[] | null, baseMedia = "") {
  return (bloques ?? [])
    .map((bloque) => {
      switch (bloque.type) {
        case "paragraph":
          return `<p>${enLinea(bloque.children)}</p>`;
        case "heading":
          return `<h${bloque.level}>${enLinea(bloque.children)}</h${bloque.level}>`;
        case "quote":
          return `<blockquote><p>${enLinea(bloque.children)}</p></blockquote>`;
        case "code":
          return `<pre><code>${bloque.children.map(texto).join("")}</code></pre>`;
        case "list":
          return lista(bloque.format, bloque.children);
        case "image": {
          const src = bloque.image.url.startsWith("http") ? bloque.image.url : `${baseMedia}${bloque.image.url}`;
          return `<img src="${escapar(src)}" alt="${escapar(bloque.image.alternativeText ?? "")}" width="${bloque.image.width}" height="${bloque.image.height}" loading="lazy" />`;
        }
        default:
          return "";
      }
    })
    .join("");
}
