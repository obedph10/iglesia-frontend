import { APIError } from "../services/api";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido";
};

export const getHttpStatusMessage = (status?: number): string => {
  const messages: Record<number, string> = {
    400: "Solicitud inválida",
    401: "No autorizado",
    403: "Acceso denegado",
    404: "Recurso no encontrado",
    429: "Demasiadas solicitudes. Intenta más tarde.",
    500: "Error del servidor. Intenta más tarde.",
    503: "Servicio no disponible",
  };

  return messages[status || 500] || "Error desconocido";
};
