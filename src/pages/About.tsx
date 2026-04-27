import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Church, Scroll, Shield } from "lucide-react";
import Section from "../components/ui/Section";
import Hero from "../components/ui/Hero";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "../services/contact";

export default function About() {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  const values = [
    {
      icon: Church,
      title: "Nuestra Historia",
      desc: siteSettings?.about_us || "La Iglesia Cristiana La Roca nace del llamado de Dios a establecer un lugar donde la comunidad pueda encontrar esperanza, sanidad y propósito. Fundada sobre la Roca que es Cristo, nuestra iglesia ha sido un faro de luz en medio de la ciudad.",
    },
    {
      icon: Scroll,
      title: "Nuestra Fe",
      desc: siteSettings?.our_faith || "Creemos en la Santa Trinidad: Dios Padre, Dios Hijo (Jesucristo) y Dios Espíritu Santo. Creemos que la Biblia es la Palabra inspirada de Dios, nuestra guía de fe y conducta. Creemos en la salvación por gracia mediante la fe en Jesucristo.",
    },
    {
      icon: Shield,
      title: "Nuestra Declaración de Fe",
      desc: siteSettings?.faith_declaration || "Afirmamos nuestra fe en Jesucristo como único Señor y Salvador. Creemos en el poder transformador del Evangelio, en la oración, en la comunión de los santos y en la gran comisión de llevar el mensaje de salvación a toda criatura.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quiénes Somos - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Conoce nuestra historia, fe y lo que creemos en la Iglesia Cristiana La Roca." />
      </Helmet>

      <Hero title="Quiénes Somos" subtitle="Conoce nuestra historia, nuestra fe y nuestro propósito." size="sm" />

      <Section>
        <div className="space-y-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <v.icon className="h-12 w-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{v.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-to-r from-primary-800 to-primary-700 py-20">
        <div className="container-page text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold sm:text-4xl"
          >
            "Sobre esta roca edificaré mi iglesia"
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-primary-100"
          >
            Mateo 16:18
          </motion.p>
        </div>
      </section>
    </>
  );
}
