import type { SiteContent } from "@/lib/types";

export default function About({ content }: { content: SiteContent }) {
  return (
    <section id="nosotros" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          Sobre Nosotros
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          {content.aboutImage && (
            <div className="md:w-1/2">
              <img
                src={content.aboutImage}
                alt="Sobre nosotros"
                className="rounded-2xl shadow-lg w-full object-cover max-h-80"
              />
            </div>
          )}
          <div className={content.aboutImage ? "md:w-1/2" : "w-full"}>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {content.aboutText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
