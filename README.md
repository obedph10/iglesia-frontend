# Iglesia Frontend

React 18 + TypeScript + Vite frontend for Iglesia Cristiana La Roca.

## 🚀 Quick Start

### With Docker
```bash
docker-compose up --build -d
```

App available at `http://localhost:5173`

### Local Development
```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── pages/              # Route-level components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contacto.tsx
│   ├── Donaciones.tsx
│   ├── Predicaciones.tsx
│   ├── Eventos.tsx
│   ├── Galeria.tsx
│   ├── Alianzas.tsx
│   └── NotFound.tsx
├── components/         # Domain-organized UI components
│   ├── layout/        # Header, Footer, Navigation
│   ├── donation/      # Donation form & campaigns
│   ├── events/        # Event cards & filters
│   ├── gallery/       # Image gallery
│   ├── icons/         # Custom SVG icons
│   ├── ui/            # Base UI components (Button, Card, etc.)
│   └── multimedia/    # Video, audio players
├── services/          # API client (React Query + Axios)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── assets/           # Images, fonts, logos
└── App.tsx
```

## 🎨 Styling

- **Tailwind CSS** for utility classes
- **Custom CSS** in `index.css` (scrollbar, selection color)
- **Colors** defined in `tailwind.config.ts`:
  - Primary: #252e78
  - CTA: #286aa6
  - Secondary: #4161a0
  - Section: #ABCAE0

## 📦 Key Dependencies

- **React Router v6** - SPA routing
- **React Query v5** - Server state management & caching
- **Axios** - HTTP client
- **React Hook Form + Zod** - Form validation
- **Framer Motion** - Animations
- **React Helmet Async** - SEO
- **Lucide React** - Icons

## 🔗 API Integration

Frontend proxies requests to backend via:
- Docker: `http://localhost:80/api/` (Nginx)
- Local: `http://localhost:8000/api/` (Django dev server)

Configured in `vite.config.ts`:
```js
proxy: {
  '/api/': 'http://localhost:8000'
}
```

## 🚀 Build Commands

```bash
npm run dev        # Dev server with hot reload
npm run build      # TypeScript check + production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

## 📱 Pages

- **Home** - Landing page with hero, features, testimonials
- **About** - Church history, mission, vision
- **Predicaciones** - Sermon list with series filtering
- **Eventos** - Event calendar and details
- **Galería** - Image galleries by category
- **Donaciones** - Active campaigns with donation forms
- **Alianzas** - Partnership info with impact projects
- **Contacto** - Contact form with site settings

## 🎯 Performance

- Home page eagerly loaded (no spinner on first "/" visit)
- React Query cache: `gcTime: 10m`, `retry: 1`
- Lazy loading for non-critical pages
- Image optimization
- Bundle size monitoring

## 🔐 SEO

- Meta tags via React Helmet
- Canonical URLs
- OG tags for social sharing
- Mobile viewport configured

## 🌐 Browser Support

- Chrome, Firefox, Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
