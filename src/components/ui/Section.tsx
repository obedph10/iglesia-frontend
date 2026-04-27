import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${dark ? "bg-gray-900 text-white" : "bg-white"} ${className}`}
    >
      <div className="container-page">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            {title && (
              <h2 className={`text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-gray-900"}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`mt-4 text-lg ${dark ? "text-gray-300" : "text-gray-600"}`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
