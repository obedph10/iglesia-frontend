import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Routes location={location}>
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
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
}
