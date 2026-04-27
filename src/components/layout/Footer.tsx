import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { TikTokIcon } from "../icons/TikTokIcon";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "../icons/SocialIcons";
import { ChurchLogo } from "../icons/ChurchLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "../../services/contact";

const quickLinks = [
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/vision-mision", label: "Visión y Misión" },
  { to: "/predicaciones", label: "Predicaciones" },
  { to: "/eventos", label: "Eventos" },
];

const moreLinks = [
  { to: "/galeria", label: "Galería" },
  { to: "/donaciones", label: "Donaciones" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/contacto", label: "Contacto" },
];


export default function Footer() {
  const year = new Date().getFullYear();
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
  });

  const dynamicSocialLinks = [
    { href: siteSettings?.youtube_url, label: "YouTube", icon: YouTubeIcon },
    { href: siteSettings?.facebook_url, label: "Facebook", icon: FacebookIcon },
    { href: siteSettings?.instagram_url, label: "Instagram", icon: InstagramIcon },
    { href: siteSettings?.tiktok_url, label: "TikTok", icon: TikTokIcon },
  ].filter(link => link.href && link.href !== "#" && link.href.trim() !== "");

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center">
              <ChurchLogo className="h-20 w-auto" color="#ffffff" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Iglesia Cristiana La Roca. Un lugar donde puedes encontrar esperanza, comunidad y el amor de Dios.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Enlaces</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Más</h3>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                {siteSettings?.google_maps_url ? (
                  <a 
                    href={siteSettings.google_maps_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {siteSettings.address || "Dirección de la iglesia, Ciudad"}
                  </a>
                ) : (
                  <span>{siteSettings?.address || "Dirección de la iglesia, Ciudad"}</span>
                )}
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <span>{siteSettings?.phone || "+57 300 000 0000"}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                {siteSettings?.email ? (
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors">
                    {siteSettings.email}
                  </a>
                ) : (
                  <span>info@iglesialaroca.com</span>
                )}
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              {dynamicSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {year} Iglesia Cristiana La Roca. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="#" className="transition-colors hover:text-white">
              Privacidad
            </Link>
            <Link to="#" className="transition-colors hover:text-white">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
