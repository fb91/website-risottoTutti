import type { SiteConfig, SiteContent } from "./types";

// ============================================================
// CONFIGURACIÓN DEL SITIO — Modificar por cada cliente
// ============================================================

export const siteConfig: SiteConfig = {
  // Datos del negocio
  businessName: "Nombre del Negocio",
  businessType: "restaurant", // restaurant | clinic | legal | generic

  // Colores (se usan en CSS variables)
  primaryColor: "#DC2626",
  secondaryColor: "#1A1A2E",

  // Google Maps embed URL
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-60.65!3d-32.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",

  // WhatsApp
  whatsappNumber: "5493415551234",
  whatsappMessage: "Hola! Vi su página web y quiero hacer una consulta",

  // SEO
  metaTitle: "Nombre del Negocio | Rubro en Ciudad",
  metaDescription: "Descripción breve del negocio para Google.",

  // Créditos
  madeBy: "Tu Marca Web",
  madeByUrl: "https://tu-portfolio.com",
};

// ============================================================
// CONTENIDO POR DEFECTO — Se usa si Vercel KV está vacío
// El cliente puede editarlo desde /admin
// ============================================================

export const defaultContent: SiteContent = {
  heroTitle: siteConfig.businessName,
  heroSubtitle: "Tu frase principal va acá",
  heroCta: "Contactanos",
  aboutText:
    "Contá la historia de tu negocio acá. Quiénes son, qué hacen, por qué son diferentes.",
  services: [
    {
      name: "Servicio 1",
      description: "Descripción del servicio",
      price: "$1000",
    },
    {
      name: "Servicio 2",
      description: "Descripción del servicio",
      price: "$2000",
    },
    {
      name: "Servicio 3",
      description: "Descripción del servicio",
      price: "$3000",
    },
  ],
  reviews: [
    {
      text: "Excelente atención y calidad. 100% recomendado.",
      author: "Juan P.",
      stars: 5,
    },
    {
      text: "Muy buen servicio, volveré sin dudas.",
      author: "María G.",
      stars: 5,
    },
    {
      text: "Lo mejor de la zona, no se arrepienten.",
      author: "Carlos R.",
      stars: 4,
    },
  ],
  hours: {
    "Lunes a Viernes": "9:00 - 18:00",
    Sábados: "10:00 - 14:00",
    Domingos: "Cerrado",
  },
  phone: `+${siteConfig.whatsappNumber}`,
  address: "Dirección del negocio, Ciudad",
  socialInstagram: "",
  socialFacebook: "",
};
