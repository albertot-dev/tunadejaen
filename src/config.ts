// Mientras sea `true`, quien entre a la web verá la pantalla "en construcción".
// Para ver la web completa: https://www.tunadejaen.es/?vista=<clave>
// (queda recordado en ese navegador; ?vista=salir lo vuelve a bloquear).
// Cuando estéis conformes, pon `false` y publica.
export const enConstruccion = true;

// La clave se define en la variable de entorno PUBLIC_CLAVE_VISTA_PREVIA
// (archivo .env en local y en la configuración del hosting al publicar).
// Si no está definida, la web se queda bloqueada para todos.
export const claveVistaPrevia: string = import.meta.env.PUBLIC_CLAVE_VISTA_PREVIA ?? "";
