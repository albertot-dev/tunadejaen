// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// Las imágenes vienen de Strapi: Astro las descarga y optimiza al compilar.
// En el hosting STRAPI_URL llega como variable de entorno; en local, del .env.
const { process } = /** @type {any} */ (globalThis);
try {
  process.loadEnvFile();
} catch {}
const strapi = new URL(process.env.STRAPI_URL ?? "http://localhost:1337");

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  redirects: {
    "/nosotros": "/historia",
  },
  image: {
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", ""),
        hostname: strapi.hostname,
        ...(strapi.port && { port: strapi.port }),
      },
    ],
  },
});
