# Contexto del Proyecto

Este es un template base para una agencia web local. Se usa para crear landing pages profesionales para negocios pequeños (restaurantes, consultorios, estudios legales, comercios) con un mini CMS integrado que corre en Vercel.

## Modelo de Negocio

- El cliente paga un setup único ($80-100 USD) por la landing estática.
- Opcionalmente paga una mensualidad ($15-20 USD/mes) por el panel de edición (CMS).
- El hosting es GRATIS para el cliente (Vercel hobby tier en su propia cuenta).
- Nuestro único costo es Claude Pro (~$20 USD/mes).
- El cobro recurrente se gestiona con MercadoPago + webhooks a un droplet en DigitalOcean.

## Stack

- Next.js 15 (App Router) + Tailwind CSS 4
- Vercel KV (datos del CMS — textos, horarios, servicios)
- Vercel Blob (imágenes subidas por el cliente)
- Todo corre en el Vercel del cliente. No tenemos infraestructura propia para sitios.

## Cómo se Usa este Template

Este repo es un GitHub Template Repository. Para cada cliente nuevo:

1. Se crea un repo nuevo desde este template ("Use this template" en GitHub).
2. Se customiza `src/lib/config.ts` con los datos del cliente.
3. Se ajustan los colores CSS en `config.ts` (primaryColor, secondaryColor).
4. Se pushea, se linkea a Vercel del cliente, se crean KV + Blob stores.
5. Se setea la variable de entorno ADMIN_PIN en Vercel.
6. Deploy automático.

## Qué Hacer Cuando Me Pidan un Nuevo Sitio

Cuando el usuario diga algo como "armá el sitio para [nombre del negocio]" con datos del cliente:

### 1. Modificar `src/lib/config.ts`
Actualizar el objeto `siteConfig` con:
- `businessName`: nombre del negocio
- `businessType`: "restaurant" | "clinic" | "legal" | "generic"
- `primaryColor` y `secondaryColor`: colores del negocio (pedir al usuario o sugerir según rubro)
- `mapsEmbedUrl`: buscar en Google Maps → Compartir → Insertar mapa → copiar el src del iframe
- `whatsappNumber`: número con código de país, sin + ni espacios (ej: "5493415551234")
- `whatsappMessage`: mensaje predeterminado de WhatsApp
- `metaTitle` y `metaDescription`: optimizados para SEO local
- `madeBy` y `madeByUrl`: créditos del desarrollador

Actualizar el objeto `defaultContent` con:
- Textos del hero, about, servicios/menú según el rubro
- Reseñas reales si el usuario las proporciona
- Horarios del negocio
- Datos de contacto y redes sociales

### 2. Ajustar Componentes si es Necesario
- Para restaurantes: `Services.tsx` muestra "Nuestro Menú" (ya se adapta automáticamente según businessType)
- Para consultorios: podría necesitar sección de "Equipo médico" o "Especialidades"
- Para estudios legales: podría necesitar sección de "Áreas de práctica"
- Si el cliente necesita algo custom, crear componentes nuevos en `src/components/`

### 3. Generar Contenido SEO
Basándose en el rubro y la zona, generar:
- `metaTitle`: "[Nombre] | [Rubro] en [Ciudad]" (ej: "La Esquina del Sabor | Pizzería en Rosario")
- `metaDescription`: frase de 150-160 caracteres con keywords locales

### 4. Dar los Pasos Finales al Usuario
Después de customizar el código, recordarle al usuario los pasos manuales:
1. Subir el repo a GitHub (o pushear cambios si ya existe)
2. Crear proyecto en Vercel y linkear el repo
3. En Vercel: Storage → Create → KV Store → Link al proyecto
4. En Vercel: Storage → Create → Blob Store → Link al proyecto
5. Environment Variables → Agregar ADMIN_PIN (sugerir un PIN aleatorio de 4-6 dígitos)
6. Deploy

## Arquitectura del CMS

### Flujo Público (/)
`page.tsx` llama a `getContent()` que lee de Vercel KV. Si KV está vacío o no configurado, usa los valores de `defaultContent` en `config.ts`. El sitio NUNCA se rompe.

### Flujo Admin (/admin)
1. Cliente entra a `/admin`
2. Ingresa PIN → POST `/api/auth` → verifica PIN + verifica `cms_active` en KV
3. Si `cms_active === false` → muestra pantalla de "suscripción vencida"
4. Si PIN correcto y CMS activo → carga panel de edición
5. Cliente edita → PUT `/api/content` → guarda en KV
6. Imágenes → POST `/api/upload` → sube a Vercel Blob

### Penalización por Impago
La key `cms_active` en KV controla el acceso:
- `true` o no existe → CMS funciona normal
- `false` → CMS bloqueado (lo setea el droplet de DigitalOcean via webhook de MercadoPago)
- El sitio público SIEMPRE sigue funcionando, solo se bloquea /admin

## Estructura de Archivos Clave

```
src/lib/config.ts     ← LO PRINCIPAL QUE SE MODIFICA POR CLIENTE
src/lib/types.ts      ← Tipos TypeScript (no tocar salvo que se agreguen campos)
src/lib/kv.ts         ← Wrapper de Vercel KV (no tocar)
src/lib/blob.ts       ← Wrapper de Vercel Blob (no tocar)
src/app/page.tsx      ← Landing pública (no tocar salvo que se agreguen secciones)
src/app/admin/page.tsx ← Panel CMS (no tocar salvo que se agreguen campos editables)
src/components/       ← Componentes visuales (customizar diseño si es necesario)
```

## Rubros Soportados

| Tipo | businessType | Sección principal | Particularidades |
|------|-------------|-------------------|-----------------|
| Restaurante/bar/café | "restaurant" | "Nuestro Menú" | Items con precio + foto |
| Consultorio/dentista | "clinic" | "Nuestros Servicios" | Servicios con descripción |
| Estudio legal/contable | "legal" | "Nuestros Servicios" | Áreas de práctica |
| Otros | "generic" | "Nuestros Servicios" | Genérico |

## Colores Sugeridos por Rubro

- **Restaurantes**: primario rojo/naranja (#DC2626, #EA580C), secundario oscuro (#1A1A2E)
- **Consultorios**: primario azul/celeste (#2563EB, #0891B2), secundario oscuro (#1E293B)
- **Estudios legales**: primario azul oscuro/dorado (#1E40AF, #B45309), secundario (#0F172A)
- **Genérico**: primario verde/azul (#059669, #2563EB), secundario (#1A1A2E)
