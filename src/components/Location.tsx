import { siteConfig } from "@/lib/config";
import type { SiteContent } from "@/lib/types";

export default function Location({ content }: { content: SiteContent }) {
  return (
    <section id="ubicacion" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          Dónde Encontrarnos
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          {content.address}
        </p>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={siteConfig.mapsEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación en Google Maps"
          />
        </div>
      </div>
    </section>
  );
}
