const locale = "es-ES";

export function formatDate(date: string | Date, format: "long" | "short" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "long") {
    return d.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
