import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </motion.div>
  );
}
