import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, AlertCircle } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import VideoPlayer from "../components/multimedia/VideoPlayer";
import MediaCarousel from "../components/multimedia/MediaCarousel";
import { getSermons, getSeries } from "../services/sermons";
import { formatDate } from "../utils/dateFormat";
import type { Sermon } from "../types";

export default function Predicaciones() {
  const { data: sermonsData, isLoading, isError: sermonsError, error: sermonsErrorObj } = useQuery({
    queryKey: ["sermons"],
    queryFn: () => getSermons({ ordering: "-date" }),
  });

  const { data: series, isError: seriesError } = useQuery({
    queryKey: ["series"],
    queryFn: getSeries,
  });

  const sermons = sermonsData?.results || [];
  const errorMessage = sermonsErrorObj instanceof Error ? sermonsErrorObj.message : "Error al cargar predicaciones";

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
        {sermonsError ? (
          <EmptyState
            icon={<AlertCircle className="h-12 w-12 text-red-500" />}
            title="Error al cargar predicaciones"
            subtitle={errorMessage}
          />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : sermons.length === 0 ? (
          <EmptyState
            icon={<Calendar className="h-12 w-12" />}
            title="Próximamente encontrarás aquí nuestras predicaciones."
          />
        ) : (
          <MediaCarousel
            items={sermons}
            renderItem={(sermon) => {
              const s = sermon as Sermon;
              return (
                <Card>
                  <VideoPlayer
                    youtubeUrl={s.youtube_url}
                    title={s.title}
                    thumbnail={s.image || undefined}
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-primary-600">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{s.speaker}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">{s.title}</h3>
                    {s.series_name && (
                      <span className="mt-1 inline-block text-xs font-medium text-accent-600">
                        {s.series_name}
                      </span>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(s.date)}</span>
                    </div>
                  </div>
                </Card>
              );
            }}
          />
        )}
      </Section>
    </>
  );
}
