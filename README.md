# Tuna de Jaén

Web de la Tuna Universitaria de Distrito de Jaén — [tunadejaen.es](https://www.tunadejaen.es/).

Hecha con [Astro](https://astro.build/) y Tailwind CSS. El contenido se edita en
el gestor de contenidos (Strapi), que está en el repo `tunadejaen-cms`.

```sh
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo en http://localhost:4321
pnpm build       # comprobar y generar la web en ./dist
pnpm preview     # ver la versión generada
```

## Puesta en marcha

1. Arranca el gestor (`pnpm dev` en `tunadejaen-cms`), en http://localhost:1337.
2. Copia `.env.example` a `.env` y revisa `STRAPI_URL`.
3. `pnpm dev` aquí.

La web es estática: el contenido y las fotos se leen de Strapi al compilar, así
que para `pnpm dev` y `pnpm build` el gestor tiene que estar arrancado. La web
publicada no depende de él.

## Cómo se edita el contenido

Todo se cambia desde el panel de Strapi (http://localhost:1337/admin en local):

| En el panel | Dónde se ve |
|---|---|
| Ajustes generales | Nombre, lema, menú, botón «Contrátanos» y modo «en construcción» |
| Contacto | Sección de contacto, pie, Ensayos y pantalla «en construcción» |
| Pie de página | Columnas de enlaces, botón y texto final del pie |
| Inicio | Portada y bloques de la página principal |
| Página | `/historia`, `/ensayos`, `/archivo`… y cualquier página nueva (`/<slug>`) |
| Evento anual + Crónica | `/lunes-santo`, `/lunes-santo/2026`… |
| Foto del archivo | `/archivo` (bloque «Listado» de tipo archivo) |
| Actuación (agenda) | `/agenda` (las fechas pasadas dejan de mostrarse) |
| Noticia de prensa | `/prensa` |
| Palmarés y Línea temporal | Bloques «Palmarés» y «Línea temporal» |

Las páginas se montan con bloques. Cada tipo de bloque tiene su componente en
`src/components/bloques/` y se reparten en `src/components/Bloques.astro`.

## Código

- `src/lib/strapi.ts`: peticiones a Strapi, tipos y utilidades de imágenes.
- `src/lib/rich-text.ts`: convierte el texto del editor de Strapi en HTML.
- `src/pages/[slug]/`: una sola ruta para las páginas y los eventos.
