import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const VisionMision = lazy(() => import("./pages/VisionMision"));
const Predicaciones = lazy(() => import("./pages/Predicaciones"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Donaciones = lazy(() => import("./pages/Donaciones"));
const Alianzas = lazy(() => import("./pages/Alianzas"));
const Contacto = lazy(() => import("./pages/Contacto"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/vision-mision" element={<VisionMision />} />
          <Route path="/predicaciones" element={<Predicaciones />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/alianzas" element={<Alianzas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
