import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin } from "lucide-react";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import MediaCarousel from "../components/multimedia/MediaCarousel";
import { getEvents } from "../services/events";
import { formatDate } from "../utils/dateFormat";
import type { Event } from "../types";

export default function Eventos() {
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents({ ordering: "date" }),
  });

  const events = eventsData?.results || [];

  return (
    <>
      <Helmet>
        <title>Eventos - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Conoce nuestros próximos eventos y actividades." />
      </Helmet>

      <Hero title="Eventos" subtitle="Únete a nuestras actividades y encuentros especiales." size="sm" />

      <Section>
        {isLoading ? (
          <LoadingSpinner />
        ) : events.length === 0 ? (
          <EmptyState
            icon={<Calendar className="h-12 w-12" />}
            title="No hay eventos programados por el momento."
            subtitle="Vuelve pronto para conocer nuestras actividades."
          />
        ) : (
          <MediaCarousel
            items={events}
            renderItem={(event) => {
              const e = event as Event;
              return (
                <Card hover={false}>
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.title}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50">
                      <Calendar className="h-16 w-16 text-primary-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium capitalize text-primary-700">
                      {e.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">{e.title}</h3>
                    {e.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{e.description}</p>
                    )}
                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary-500" />
                        <span>{formatDate(e.date, "long")}</span>
                      </div>
                      {e.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary-500" />
                          <span>{e.time}</span>
                        </div>
                      )}
                      {e.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary-500" />
                          <span>{e.location}</span>
                        </div>
                      )}
                    </div>
                    {e.registration_link && (
                      <a
                        href={e.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-4 w-full"
                      >
                        Registrarme
                      </a>
                    )}
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
