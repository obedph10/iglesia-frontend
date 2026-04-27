import logoTransparente from "../../assets/logo-trim.png";

export function ChurchLogo({
  className = "h-10 w-auto",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  const isLight = color === "#ffffff" || color === "white";

  return (
    <img
      src={logoTransparente}
      alt="Iglesia Cristiana La Roca"
      className={className}
      style={isLight ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}
