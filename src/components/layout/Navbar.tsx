import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ChurchLogo } from "../icons/ChurchLogo";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
  { to: "/vision-mision", label: "Visión y Misión" },
  { to: "/predicaciones", label: "Predicaciones" },
  { to: "/eventos", label: "Eventos" },
  { to: "/galeria", label: "Galería" },
  { to: "/donaciones", label: "Donaciones" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm transition-all duration-300">
      <div className="container-page">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex flex-col items-start hover:opacity-80 transition-opacity" aria-label="Inicio - Iglesia Cristiana La Roca">
            <ChurchLogo className="h-14 w-auto" color="#252e78" />
            <span className="text-xs font-medium italic text-primary-600 tracking-wide -mt-0.5">Un encuentro con Dios</span>
          </Link>

          <button
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname === link.to ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-gray-100 pb-4 pt-2 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                aria-current={location.pathname === link.to ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
