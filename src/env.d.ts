/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_CLAVE_VISTA_PREVIA?: string;
  readonly STRAPI_URL?: string;
  readonly STRAPI_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
