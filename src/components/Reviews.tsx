import type { SiteContent } from "@/lib/types";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-5 h-5 ${n <= count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ content }: { content: SiteContent }) {
  if (!content.reviews.length) return null;

  return (
    <section id="resenas" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: "var(--color-secondary)" }}
        >
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.reviews.map((review, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl">
              <Stars count={review.stars} />
              <p className="text-gray-700 mb-4 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-semibold text-gray-800">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
