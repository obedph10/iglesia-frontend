import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "../../services/contact";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";

const MESSAGE = "¡Hola! Quiero más información sobre la iglesia.";

export default function WhatsAppButton() {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  // Limpiar el número de teléfono (quitar +, espacios, guiones)
  const cleanPhone = siteSettings?.phone?.replace(/\D/g, "") || "573000000000";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#128C7E] hover:scale-110 active:scale-95 ring-4 ring-white/20"
      aria-label="WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
