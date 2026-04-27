import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  youtubeUrl: string;
  title?: string;
  thumbnail?: string;
  className?: string;
}

export default function VideoPlayer({ youtubeUrl, title, thumbnail, className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(youtubeUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl bg-gray-900 ${className}`}>
      <AnimatePresence>
        {!playing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full w-full cursor-pointer"
            onClick={() => setPlaying(true)}
          >
            <img
              src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title || "Video thumbnail"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:scale-110">
                <Play className="ml-1 h-8 w-8" />
              </div>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full"
          >
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
              title={title || "Video"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



