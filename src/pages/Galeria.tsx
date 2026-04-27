import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import PhotoGallery from "../components/multimedia/PhotoGallery";
import { getGalleryImages, getGalleryCategories } from "../services/gallery";

export default function Galeria() {
  const { data: imagesData, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGalleryImages({}),
  });

  const { data: categories } = useQuery({
    queryKey: ["gallery-categories"],
    queryFn: getGalleryCategories,
  });

  const images = imagesData?.results || [];

  return (
    <>
      <Helmet>
        <title>Galería - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Galería de fotos de nuestros eventos, cultos y actividades comunitarias." />
      </Helmet>

      <Hero title="Galería" subtitle="Momentos que reflejan la bendición de Dios en nuestra comunidad." size="sm" />

      {categories && categories.length > 0 && (
        <section className="border-b border-gray-100 bg-gray-50 py-6">
          <div className="container-page">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-600 px-4 py-1.5 text-sm font-medium text-white cursor-pointer">
                Todas
              </span>
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {cat.name} ({cat.image_count})
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <Section>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-12 text-center">
            <p className="text-lg text-gray-500">Próximamente encontrarás aquí nuestras fotografías.</p>
          </div>
        ) : (
          <PhotoGallery images={images} />
        )}
      </Section>
    </>
  );
}
