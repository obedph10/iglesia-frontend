import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Globe, Users, HelpingHand, ExternalLink } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import { getAlliances } from "../services/alliances";

const categoryLabels: Record<string, string> = {
  educacion: "Educación",
  alimentacion: "Alimentación",
  vivienda: "Vivienda",
  salud: "Salud",
  deporte: "Deporte y Recreación",
  arte: "Arte y Cultura",
  ambiente: "Medio Ambiente",
  emprendimiento: "Emprendimiento",
  otro: "Otro",
};

export default function Alianzas() {
  const { data: alliances, isLoading } = useQuery({
    queryKey: ["alliances"],
    queryFn: getAlliances,
  });

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
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : !alliances || alliances.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-12 text-center">
            <HelpingHand className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-lg text-gray-500">Próximamente compartiremos nuestras alianzas y proyectos.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {alliances.map((alliance, i) => (
              <motion.div
                key={alliance.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
                  {alliance.logo ? (
                    <img
                      src={alliance.logo}
                      alt={alliance.name}
                      className="h-24 w-24 rounded-xl object-contain"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-primary-50">
                      <Users className="h-12 w-12 text-primary-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{alliance.name}</h3>
                    <div className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: alliance.description }} />
                    {alliance.website && (
                      <a
                        href={alliance.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        Visitar sitio web <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary-600">{alliance.project_count}</p>
                    <p className="text-sm text-gray-500">proyectos</p>
                  </div>
                </div>

                {alliance.projects && alliance.projects.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {alliance.projects.map((project) => (
                      <Card key={project.id}>
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-44 w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary-100 to-accent-50">
                            <Globe className="h-14 w-14 text-primary-300" />
                          </div>
                        )}
                        <div className="p-5">
                          <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                            {categoryLabels[project.impact_category] || project.impact_category}
                          </span>
                          <h4 className="mt-3 font-semibold text-gray-900">{project.title}</h4>
                          <div className="mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: project.description }} />
                          {project.location && (
                            <p className="mt-3 text-sm text-gray-500">📍 {project.location}</p>
                          )}
                          {project.volunteers_needed > 0 && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-primary-600">
                              <Users className="h-4 w-4" />
                              <span>Necesitamos {project.volunteers_needed} voluntarios</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
