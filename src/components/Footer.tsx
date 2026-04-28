import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-gray-900 text-gray-400 text-center text-sm">
      <p>
        &copy; {year} {siteConfig.businessName}. Todos los derechos reservados.
      </p>
      {siteConfig.madeBy && (
        <p className="mt-2">
          Sitio creado por{" "}
          <a
            href={siteConfig.madeByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            {siteConfig.madeBy}
          </a>
        </p>
      )}
    </footer>
  );
}
