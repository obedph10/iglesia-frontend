import { Helmet } from "react-helmet-async";
import { HelpingHand } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";

export default function Alianzas() {

  return (
    <>
      <Helmet>
        <title>Alianzas y Proyectos Comunitarios - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Conoce nuestras alianzas y proyectos de impacto social sin ánimo de lucro." />
      </Helmet>

      <Hero
        title="Alianzas y Proyectos Comunitarios"
        subtitle="Trabajando juntos por una sociedad mejor."
        size="sm"
      />

      <Section
        title="Nuestras Alianzas"
        subtitle="Colaboramos con organizaciones comprometidas con el bienestar social."
      >
        <div className="rounded-xl bg-gray-50 p-12 text-center">
          <HelpingHand className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg text-gray-500">Próximamente compartiremos nuestras alianzas y proyectos.</p>
        </div>
      </Section>
    </>
  );
}
