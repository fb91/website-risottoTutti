import type { SiteConfig, SiteContent } from "./types";

// ============================================================
// CONFIGURACIÓN DEL SITIO — Modificar por cada cliente
// ============================================================

export const siteConfig: SiteConfig = {
  // Datos del negocio
  businessName: "Risotto Tutti",
  businessType: "restaurant",

  // Colores (se usan en CSS variables)
  primaryColor: "#1561f9",
  secondaryColor: "#ffc9b3",

  // Google Maps embed URL
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Gatti+8832,+Ibarlucea,+Santa+Fe&output=embed",

  // WhatsApp
  whatsappNumber: "5493416211045",
  whatsappMessage: "Hola! Vi su página y quiero más información",

  // SEO
  metaTitle: "Risotto Tutti | Pastas caseras en Ibarlucea",
  metaDescription:
    "Risotto Tutti, pastas caseras en Ibarlucea desde 1998. Capelettis, sorrentinos, fideos cinta y salsas. Delivery y local. Hacé tu pedido por WhatsApp.",

  // Créditos
  madeBy: "Fabri Web",
  madeByUrl: "https://fabri.dev",
};

// ============================================================
// CONTENIDO POR DEFECTO — Se usa si Vercel KV está vacío
// El cliente puede editarlo desde /admin
// ============================================================

export const defaultContent: SiteContent = {
  heroTitle: siteConfig.businessName,
  heroSubtitle: "Pastas caseras todo el año",
  heroCta: "Hacé tu pedido",
  aboutText:
    "Somos una empresa familiar dedicada a vender pastas desde 1998. Hacemos delivery y también atendemos en nuestro local. Pastas congeladas o frescas listas para cocinar!",
  services: [
    {
      name: "Capelettis",
      description: "x 20 unidades",
      price: "$7.000",
    },
    {
      name: "Sorrentinos",
      description: "x 20 unidades",
      price: "$13.000",
    },
    {
      name: "Fideos cinta",
      description: "x 500g",
      price: "$3.600",
    },
    {
      name: "Salsa bolognesa",
      description: "Lista para servir, x 250g",
      price: "$4.500",
    },
    {
      name: "Salsa de crema",
      description: "x 250g",
      price: "$3.800",
    },
  ],
  reviews: [
    {
      text: "Excelente atención y buena onda",
      author: "Mariano",
      stars: 5,
    },
    {
      text: "Las pastas más ricas de Ibarlucea, unos genios",
      author: "Luciana",
      stars: 5,
    },
  ],
  hours: {
    "Lunes a Viernes": "09:00 - 20:00",
    Sábados: "09:00 - 12:00",
    Domingos: "Cerrado",
  },
  phone: `+${siteConfig.whatsappNumber}`,
  address: "Gatti 8832, Ibarlucea",
  socialInstagram: "risotto",
  socialFacebook: "",
};
