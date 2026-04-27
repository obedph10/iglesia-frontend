import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Iglesia Cristiana La Roca</title>
      </Helmet>

      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Página no encontrada</h2>
        <p className="mt-2 text-gray-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="btn-primary mt-8"
        >
          <Home className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Link>
      </div>
    </>
  );
}
