# CryptoAyuda - Plataforma Masiva de Programmatic SEO

Este proyecto es una aplicación Next.js diseñada para generar **+10,000 páginas estáticas** sobre criptomonedas, seguridad y exchanges, optimizada para Vercel.

## 🚀 Despliegue Inmediato en Vercel

1.  **Sube este código a GitHub**:
    *   Crea un repositorio nuevo en GitHub.
    *   Sube los archivos de esta carpeta.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin TU_URL_DEL_REPO
    git push -u origin main
    ```

2.  **Conecta con Vercel**:
    *   Ve a [Vercel.com](https://vercel.com) -> "Add New Project".
    *   Selecciona tu repositorio de GitHub.
    *   **Framework Preset**: Next.js.
    *   **Build Command**: Dejar por defecto (`next build`).
    *   Haz clic en **Deploy**.

## ⚙️ Configuración del Proyecto

### Núcleo del Sistema (`Un Solo Archivo`)
Toda la lógica de negocio, generación de rutas, contenido y componentes reside en:
`app/[[...slug]]/page.tsx`

### Personalización
1.  **Afiliados**:
    *   Abre `app/[[...slug]]/page.tsx`.
    *   Busca la función `CTA` o el componente `NavBar`.
    *   Reemplaza los enlaces `https://cryptoayuda.com/go/...` con tus links reales.

2.  **Escalabilidad a 10,000 Páginas**:
    *   Por defecto, `generateStaticParams` en `page.tsx` genera todas las combinaciones.
    *   ⚠️ **Nota**: En la capa gratuita de Vercel, el tiempo de build es limitado. Si tienes timeouts, reduce los arrays `PAISES` o `EXCHANGES` temporalmente, o usa ISR (Incremental Static Regeneration) eliminando `generateStaticParams` (el sitio se generará bajo demanda).

## 💰 Monetización
*   **Affiliates**: Integrados en los botones de "Reclamar Bono".
*   **Ads**: Puedes insertar bloques de AdSense dentro de la función `getContent` en `page.tsx`.

## 🛠 Comandos Locales
```bash
npm install
npm run dev
```
Visita `http://localhost:3000`
