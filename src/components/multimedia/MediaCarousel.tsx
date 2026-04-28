import { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface MediaCarouselProps {
  items: unknown[];
  renderItem: (item: unknown, index: number) => ReactNode;
  className?: string;
}

export default function MediaCarousel({ items, renderItem, className = "" }: MediaCarouselProps) {

  return (
    <div className={`relative overflow-visible ${className}`}>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        spaceBetween={16}
        slidesPerView="auto"
        className="!px-16"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }} className="!w-96">
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev !absolute left-4 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 transition-colors !m-0 after:!text-2xl z-10" />
      <button className="swiper-button-next !absolute right-4 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 transition-colors !m-0 after:!text-2xl z-10" />
    </div>
  );
}
