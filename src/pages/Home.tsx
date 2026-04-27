import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Cross, HelpingHand } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import VideoPlayer from "../components/multimedia/VideoPlayer";
import { getSermons } from "../services/sermons";
import { getEvents } from "../services/events";
import { getSiteSettings } from "../services/contact";

export default function Home() {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  const features = [
    {
      icon: Heart,
      title: siteSettings?.home_pillar_1_title || "Fe y Esperanza",
      desc: siteSettings?.home_pillar_1_desc || "Un lugar para fortalecer tu relación con Dios y encontrar propósito en tu vida.",
    },
    {
      icon: Users,
      title: siteSettings?.home_pillar_2_title || "Comunidad",
      desc: siteSettings?.home_pillar_2_desc || "Somos una familia unida en el amor de Cristo, apoyándonos mutuamente.",
    },
    {
      icon: Cross,
      title: siteSettings?.home_pillar_3_title || "Enseñanza",
      desc: siteSettings?.home_pillar_3_desc || "Predicaciones basadas en la Palabra de Dios para transformar vidas.",
    },
    {
      icon: HelpingHand,
      title: siteSettings?.home_pillar_4_title || "Servicio",
      desc: siteSettings?.home_pillar_4_desc || "Llevamos esperanza a nuestra comunidad a través de proyectos de impacto social.",
    },
  ];

  const { data: sermonsData } = useQuery({
    queryKey: ["sermons-home"],
    queryFn: () => getSermons({ ordering: "-date" }),
  });

  const { data: eventsData } = useQuery({
    queryKey: ["events-home"],
    queryFn: () => getEvents({ featured: "true" }),
  });

  const recentSermons = sermonsData?.results?.slice(0, 3) || [];
  const featuredEvents = eventsData?.results?.slice(0, 3) || [];

  return (
    <>
      <Helmet>
        <title>Iglesia Cristiana La Roca</title>
        <meta name="description" content="Iglesia Cristiana La Roca - Un lugar de fe, esperanza y amor. Únete a nuestra comunidad." />
      </Helmet>

      <Hero
        title={siteSettings?.home_title || "Bienvenidos a la Iglesia Cristiana La Roca"}
        subtitle={siteSettings?.home_subtitle || "Un lugar donde la fe cobra vida. Te invitamos a ser parte de nuestra comunidad."}
        size="lg"
      >
        <Link to="/quienes-somos" className="btn-primary">Conócenos</Link>
        <Link to="/predicaciones" className="btn-secondary bg-white/10 text-white border-white hover:bg-white/20">Predicaciones</Link>
      </Hero>

      <Section title="Nuestro Propósito" subtitle="En La Roca encontramos un hogar espiritual donde crecer juntos.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {recentSermons.length > 0 && (
        <Section title="Últimas Predicaciones" dark>
          <div className="grid gap-8 md:grid-cols-3">
            {recentSermons.map((sermon) => (
              <Card key={sermon.id}>
                <VideoPlayer
                  youtubeUrl={sermon.youtube_url}
                  title={sermon.title}
                  thumbnail={sermon.image || undefined}
                />
                <div className="p-4">
                  <p className="text-xs text-primary-600 font-medium">{sermon.speaker}</p>
                  <h3 className="mt-1 font-semibold text-gray-900">{sermon.title}</h3>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/predicaciones" className="btn-secondary">
              Ver todas las predicaciones <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {featuredEvents.length > 0 && (
        <Section title="Próximos Eventos" subtitle="No te pierdas nuestras actividades y encuentros.">
          <div className="grid gap-8 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <Card key={event.id}>
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 capitalize">
                    {event.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/eventos" className="btn-primary">
              Ver todos los eventos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      <Section
        title="Apoya Nuestra Misión"
        subtitle="Tu generosidad nos permite seguir impactando vidas y comunidades."
        className="bg-gradient-to-br from-primary-50 to-accent-50"
      >
        <div className="text-center">
          <p className="mx-auto mb-8 max-w-xl text-gray-600">
            Cada donación nos ayuda a mantener nuestras actividades y proyectos comunitarios.
            Juntos podemos hacer la diferencia.
          </p>
          <Link to="/donaciones">
            <Button variant="accent">Quiero Donar</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
