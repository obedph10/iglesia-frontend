import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import Hero from "../components/ui/Hero";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "../services/contact";

export default function VisionMision() {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  return (
    <>
      <Helmet>
        <title>Visión y Misión - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Conoce nuestra visión y misión como iglesia." />
      </Helmet>

      <Hero title="Visión y Misión" subtitle="Nuestro propósito y hacia dónde nos dirigimos." size="sm" />

      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-primary-100 bg-primary-50/50 p-8 lg:p-10"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Visión</h2>
              <div className="mt-4 text-lg leading-relaxed text-gray-600 whitespace-pre-line">
                {siteSettings?.vision ? (
                  <p>{siteSettings.vision}</p>
                ) : (
                  <>
                    <p>
                      Ser una iglesia que transforma vidas y comunidades a través del amor de Cristo,
                      extendiendo el Reino de Dios con fe, esperanza y acción social.
                    </p>
                    <p className="mt-4">
                      Convertirnos en un referente de unidad, compasión y servicio en nuestra ciudad y más allá.
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-accent-100 bg-accent-50/50 p-8 lg:p-10"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent-600 text-white">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Misión</h2>
              <div className="mt-4 text-lg leading-relaxed text-gray-600 whitespace-pre-line">
                {siteSettings?.mission ? (
                  <p>{siteSettings.mission}</p>
                ) : (
                  <>
                    <p>
                      Predicar el Evangelio de Jesucristo con poder y autoridad, discipulando a cada
                      creyente para que cumpla su propósito en Dios.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2">
                      <li>Fortalecer la fe de nuestra congregación a través de la enseñanza de la Palabra.</li>
                      <li>Servir a nuestra comunidad con proyectos de impacto social y ayuda al necesitado.</li>
                      <li>Formar líderes comprometidos con los valores del Reino de Dios.</li>
                      <li>Ser luz en medio de las tinieblas, llevando esperanza a los que sufren.</li>
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 text-white">
        <div className="container-page text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg italic text-gray-300"
          >
            "Porque somos hechura suya, creados en Cristo Jesús para buenas obras"
          </motion.p>
          <p className="mt-2 text-primary-400">Efesios 2:10</p>
        </div>
      </section>
    </>
  );
}
