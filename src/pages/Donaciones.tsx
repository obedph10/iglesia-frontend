import { Helmet } from "react-helmet-async";
import { Heart } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";

export default function Donaciones() {

  return (
    <>
      <Helmet>
        <title>Donaciones - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Apoya nuestra misión con tus donaciones. Juntos podemos hacer la diferencia." />
      </Helmet>

      <Hero title="Donaciones" subtitle="Tu generosidad transforma vidas y comunidades." size="sm" />

      <section className="border-b border-gray-100 bg-gradient-to-r from-primary-600 to-primary-800 py-12 text-white">
        <div className="container-page text-center">
          <Heart className="mx-auto mb-4 h-10 w-10 text-primary-200" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-100">
            "Cada uno dé como propuso en su corazón, no con tristeza ni por necesidad, porque Dios ama al dador alegre."
          </p>
          <p className="mt-2 text-sm text-primary-300">
            2 Corintios 9:7
          </p>
        </div>
      </section>

      <Section
        title="Formas de Donar"
        subtitle="Ofrecemos diferentes opciones para que puedas contribuir."
      >
        <div className="rounded-xl bg-gray-50 p-12 text-center">
          <p className="text-lg text-gray-500">Próximamente encontrarás aquí las opciones para donar.</p>
        </div>
      </Section>
    </>
  );
}
