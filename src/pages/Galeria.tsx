import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import PhotoGallery from "../components/multimedia/PhotoGallery";
import { getGalleryImages, getGalleryCategories } from "../services/gallery";

export default function Galeria() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: imagesData, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGalleryImages({}),
  });

  const { data: categories } = useQuery({
    queryKey: ["gallery-categories"],
    queryFn: getGalleryCategories,
  });

  const images = imagesData?.results || [];
  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images;

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
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-600 shadow-sm hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-600 shadow-sm hover:bg-primary-50 hover:text-primary-700"
                  }`}
                >
                  {cat.name} ({selectedCategory === cat.id ? filteredImages.length : cat.image_count})
                </button>
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
        ) : filteredImages.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-12 text-center">
            <p className="text-lg text-gray-500">{selectedCategory ? "No hay fotografías en esta categoría." : "Próximamente encontrarás aquí nuestras fotografías."}</p>
          </div>
        ) : (
          <PhotoGallery images={filteredImages} />
        )}
      </Section>
    </>
  );
}
