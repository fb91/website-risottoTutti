import type { SiteContent } from "@/lib/types";
import { siteConfig } from "@/lib/config";

export default function Services({ content }: { content: SiteContent }) {
  const isRestaurant = siteConfig.businessType === "restaurant";
  const title = isRestaurant ? "Nuestro Menú" : "Nuestros Servicios";

  return (
    <section id="servicios" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.name}
                  </h3>
                  {item.price && (
                    <span
                      className="font-bold text-lg"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-600">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
