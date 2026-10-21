/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_CLAVE_VISTA_PREVIA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
