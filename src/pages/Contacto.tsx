import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Hero from "../components/ui/Hero";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { sendContactMessage, getSiteSettings } from "../services/contact";
import { getErrorMessage } from "../utils/errorHandler";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().optional(),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;


export default function Contacto() {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  const contactInfo = useMemo(() => [
    { icon: MapPin, label: "Dirección", value: siteSettings?.address || "Dirección de la iglesia, Ciudad", href: siteSettings?.google_maps_url },
    { icon: Phone, label: "Teléfono", value: siteSettings?.phone || "+57 300 000 0000" },
    { icon: Mail, label: "Email", value: siteSettings?.email || "info@iglesialaroca.com", href: siteSettings?.email ? `mailto:${siteSettings.email}` : undefined },
    { icon: Clock, label: "Horario de Cultos", value: siteSettings?.schedule || "Miércoles 7:00 PM · Sábados 7:00 PM · Domingos 10:00 AM" },
  ], [siteSettings]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Contacto - Iglesia Cristiana La Roca</title>
        <meta name="description" content="Contáctanos. Estaremos encantados de atenderte." />
      </Helmet>

      <Hero title="Contacto" subtitle="Estamos aquí para ti. Escríbenos o visítanos." size="sm" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Envíanos un Mensaje</h2>
            <p className="mt-2 text-gray-600">
              Cuéntanos cómo podemos orar por ti o si tienes alguna pregunta.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label className="form-label">Nombre *</label>
                <input
                  {...register("name")}
                  className="form-input"
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="form-input"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="form-label">Teléfono</label>
                  <input
                    {...register("phone")}
                    className="form-input"
                    placeholder={siteSettings?.phone || "+57 300 000 0000"}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Asunto *</label>
                <input
                  {...register("subject")}
                  className="form-input"
                  placeholder="¿Sobre qué deseas contactarnos?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="form-label">Mensaje *</label>
                <textarea
                  {...register("message")}
                  className="form-input"
                  placeholder="Escribe tu mensaje aquí..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
                {mutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Enviando...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </>
                )}
              </Button>

              {mutation.isSuccess && (
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                  Mensaje enviado con éxito. Te responderemos pronto.
                </div>
              )}

              {mutation.isError && (
                <div className="flex gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">Error al enviar el mensaje</p>
                    <p className="mt-1 text-red-600">{getErrorMessage(mutation.error)}</p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Información de Contacto</h2>

            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 h-64">
              {siteSettings?.google_maps_url ? (
                <iframe
                  title="Ubicación Iglesia La Roca"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.113543232817!2d-75.5562867!3d6.2487661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428807d800001%3A0x6b3065672807f3ef!2sCl.%2045d%20%2312-50%2C%20Buenos%20Aires%2C%20Medell%C3%ADn%2C%20La%20Milagrosa%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1714100000000!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-gray-100 text-gray-400 w-full h-full">
                  <MapPin className="h-8 w-8" />
                  <span className="ml-2 text-sm">Mapa de Google Maps aquí</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
