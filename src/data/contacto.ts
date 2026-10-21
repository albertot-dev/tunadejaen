// Datos de contacto que aparecen en la sección de contacto y en el footer.
export const email = "tunadejaen@gmail.com";

export const contactos = [
  { name: 'Jorge "Carrueco"', phone: "640244374" },
  { name: 'Rafael "Caín"', phone: "677788406" },
  { name: 'José Manuel "Delito"', phone: "722457314" },
];

export const direccion = {
  lugar: "Universidad de Jaén",
  campus: "Campus de Las Lagunillas",
  despacho: "Edificio C-2, despacho 206",
  ciudad: "23071 Jaén, España",
};

export const formatPhone = (phone: string) =>
  phone.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
