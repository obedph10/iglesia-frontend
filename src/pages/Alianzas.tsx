import { Helmet } from "react-helmet-async";
import { HelpingHand } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import EmptyState from "../components/ui/EmptyState";

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
        <EmptyState
          icon={<HelpingHand className="h-12 w-12 text-primary-500" />}
          title="Próximamente"
          subtitle="Compartiremos nuestras alianzas y proyectos."
        />
      </Section>
    </>
  );
}
