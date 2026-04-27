import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import VideoPlayer from "../components/multimedia/VideoPlayer";
import { getSermons, getSeries } from "../services/sermons";
import { formatDate } from "../utils/dateFormat";

export default function Predicaciones() {
  const { data: sermonsData, isLoading } = useQuery({
    queryKey: ["sermons"],
    queryFn: () => getSermons({ ordering: "-date" }),
  });

  const { data: series } = useQuery({
    queryKey: ["series"],
    queryFn: getSeries,
  });

  const sermons = sermonsData?.results || [];

  return (
    <>
      <Helmet>
        <title>Predicaciones - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Escucha nuestras predicaciones y mensajes de la Palabra de Dios." />
      </Helmet>

      <Hero title="Predicaciones" subtitle="Mensajes que transforman vidas. Escucha la Palabra de Dios." size="sm" />

      {series && series.length > 0 && (
        <section className="border-b border-gray-100 bg-gray-50 py-8">
          <div className="container-page">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-primary-600 px-4 py-1.5 text-sm font-medium text-white">
                Todas
              </span>
              {series.map((s) => (
                <span
                  key={s.id}
                  className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <Section>
        {isLoading ? (
          <LoadingSpinner />
        ) : sermons.length === 0 ? (
          <EmptyState
            icon={<Calendar className="h-12 w-12" />}
            title="Próximamente encontrarás aquí nuestras predicaciones."
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Card key={sermon.id}>
                <VideoPlayer
                  youtubeUrl={sermon.youtube_url}
                  title={sermon.title}
                  thumbnail={sermon.image || undefined}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-primary-600">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{sermon.speaker}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{sermon.title}</h3>
                  {sermon.series_name && (
                    <span className="mt-1 inline-block text-xs font-medium text-accent-600">
                      {sermon.series_name}
                    </span>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
