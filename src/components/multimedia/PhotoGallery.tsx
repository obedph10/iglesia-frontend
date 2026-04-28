import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { GalleryImage } from "../../types";

interface PhotoGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function PhotoGallery({ images, className = "" }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      <div className={`relative overflow-visible ${className}`}>
        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!px-8 sm:!px-12"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative flex h-full flex-col overflow-hidden rounded-xl cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title || "Galería"}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {img.title && (
                  <div className="bg-gray-50 px-4 py-2">
                    <p className="text-sm font-medium text-gray-700">{img.title}</p>
                  </div>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev !absolute left-0 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 transition-colors !m-0 after:!text-2xl z-10" aria-label="Anterior" />
        <button className="swiper-button-next !absolute right-0 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 transition-colors !m-0 after:!text-2xl z-10" aria-label="Siguiente" />
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedIndex > 0 && (
              <button
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {selectedIndex < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={images[selectedIndex].image}
              alt={images[selectedIndex].title || "Galería"}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images[selectedIndex].title && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2">
                <p className="text-center text-white">{images[selectedIndex].title}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
