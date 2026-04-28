import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  image?: string;
  videoUrl?: string;
  size?: "sm" | "md" | "lg";
}

export default function Hero({
  title,
  subtitle,
  children,
  image,
  videoUrl,
  size = "md",
}: HeroProps) {
  const heights = {
    sm: "min-h-[40vh]",
    md: "min-h-[60vh]",
    lg: "min-h-[80vh]",
  };

  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${heights[size]}`}>
      {videoUrl ? (
        <div className="absolute inset-0">
          <iframe
            src={videoUrl}
            className="h-full w-full object-cover"
            style={{ pointerEvents: "none" }}
            allow="autoplay; encrypted-media"
            title="Hero Video"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
      )}

      <div className="container-page relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>

      {size === "lg" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      )}
    </section>
  );
}
