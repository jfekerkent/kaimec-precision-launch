export type Unit = "metric" | "imperial";

export function convertValue(value: string, unit: Unit): string {
  if (unit === "metric") return value;
  let out = value.replace(/(\d+(?:\.\d+)?)\s*m\/min/g, (_, n) =>
    `${Math.round(parseFloat(n) * 39.3701)} ipm`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*mm/g, (_, n) => {
    const inches = parseFloat(n) / 25.4;
    return `${inches.toFixed(inches < 10 ? 2 : 1)} in`;
  });
  out = out.replace(/(\d+(?:\.\d+)?)\s*kg/g, (_, n) =>
    `${Math.round(parseFloat(n) * 2.2046)} lb`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*(?:tons|ton)\b/gi, (_, n) =>
    `${Math.round(parseFloat(n) * 1.10231)} US tons`
  );
  return out;
}