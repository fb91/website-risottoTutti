# Template Landing — Agencia Web Local

Template base para crear landings profesionales con mini CMS integrado.

## Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- Vercel KV (datos del CMS)
- Vercel Blob (imágenes del CMS)

## Setup rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Editar config del cliente
# Modificar src/lib/config.ts con los datos del negocio

# 4. Desarrollo local
npm run dev
```

## Customizar por cliente

1. **`src/lib/config.ts`** — Nombre, colores, WhatsApp, Maps, SEO
2. **`src/app/globals.css`** — Los colores se setean via CSS variables en layout.tsx
3. **`public/images/`** — Imágenes estáticas del cliente

## Deploy en Vercel

1. Crear proyecto en Vercel y linkear el repo
2. En Vercel dashboard: Storage > Create > KV Store > Link al proyecto
3. En Vercel dashboard: Storage > Create > Blob Store > Link al proyecto
4. Agregar variable de entorno: `ADMIN_PIN` = el PIN del cliente
5. Deploy automático al pushear

## CMS

- El cliente accede a `/admin` con su PIN
- Puede editar: textos, fotos, servicios/menú, reseñas, horarios, contacto
- Los datos se guardan en Vercel KV
- Las imágenes se suben a Vercel Blob

## Penalización por impago

La key `cms_active` en KV controla el acceso al admin:
- `true` (o no existe) = CMS activo
- `false` = CMS bloqueado, muestra mensaje de suscripción vencida
- El sitio público SIEMPRE sigue funcionando
