export interface SiteConfig {
  businessName: string;
  businessType: "restaurant" | "clinic" | "legal" | "generic";
  primaryColor: string;
  secondaryColor: string;
  mapsEmbedUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  metaTitle: string;
  metaDescription: string;
  madeBy: string;
  madeByUrl: string;
}

export interface ServiceItem {
  name: string;
  description?: string;
  price?: string;
  image?: string;
}

export interface ReviewItem {
  text: string;
  author: string;
  stars: number;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroImage?: string;
  aboutText: string;
  aboutImage?: string;
  services: ServiceItem[];
  reviews: ReviewItem[];
  hours: Record<string, string>;
  phone: string;
  address: string;
  email?: string;
  socialInstagram?: string;
  socialFacebook?: string;
}
