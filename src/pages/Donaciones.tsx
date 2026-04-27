import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import DonationInfo from "../components/donation/DonationInfo";
import { getDonationOptions } from "../services/donations";
import { getSiteSettings } from "../services/contact";

export default function Donaciones() {
  const { data: options, isLoading } = useQuery({
    queryKey: ["donation-options"],
    queryFn: getDonationOptions,
  });

  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

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
            "{siteSettings?.donations_bible_verse || "Cada uno dé como propuso en su corazón, no con tristeza ni por necesidad, porque Dios ama al dador alegre."}"
          </p>
          <p className="mt-2 text-sm text-primary-300">
            {siteSettings?.donations_bible_reference || "2 Corintios 9:7"}
          </p>
        </div>
      </section>

      <Section
        title="Formas de Donar"
        subtitle="Ofrecemos diferentes opciones para que puedas contribuir."
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : (
          <DonationInfo options={options || []} />
        )}
      </Section>

      <section className="bg-gray-50 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">¿Por qué donar?</h3>
            <div className="mt-4 space-y-4 text-gray-600">
              <p className="whitespace-pre-wrap">
                {siteSettings?.donations_why_donate || "Tus donaciones nos permiten mantener nuestras instalaciones, apoyar proyectos misioneros, ayudar a familias en situación de vulnerabilidad y continuar llevando el mensaje de esperanza a más personas.\n\nCada aporte, sin importar su tamaño, hace una gran diferencia."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
