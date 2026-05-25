export type Unit = "metric" | "imperial";

function mmToIn(n: number): string {
  const inches = n / 25.4;
  return `${inches.toFixed(inches < 10 ? 2 : 1)} in`;
}

function convertImperial(value: string): string {
  let out = value;
  // "A x B x C mm" or "A × B × C mm" → all dims in inches
  out = out.replace(
    /(\d+(?:\.\d+)?)(\s*[x×]\s*)(\d+(?:\.\d+)?)(\s*[x×]\s*)(\d+(?:\.\d+)?)\s*mm/gi,
    (_, a, s1, b, s2, c) => {
      const ai = parseFloat(a) / 25.4;
      const bi = parseFloat(b) / 25.4;
      const ci = parseFloat(c) / 25.4;
      const f = (n: number) => (n < 10 ? n.toFixed(2) : n.toFixed(1));
      return `${f(ai)}${s1}${f(bi)}${s2}${f(ci)} in`;
    }
  );
  out = out.replace(
    /(\d+(?:\.\d+)?)(\s*[x×]\s*)(\d+(?:\.\d+)?)\s*mm/gi,
    (_, a, s1, b) => {
      const ai = parseFloat(a) / 25.4;
      const bi = parseFloat(b) / 25.4;
      const f = (n: number) => (n < 10 ? n.toFixed(2) : n.toFixed(1));
      return `${f(ai)}${s1}${f(bi)} in`;
    }
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*mm\/s/gi, (_, n) =>
    `${(parseFloat(n) / 25.4).toFixed(2)} in/s`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*m\/min/gi, (_, n) =>
    `${Math.round(parseFloat(n) * 39.3701)} ipm`
  );
  out = out.replace(/(±?)(\d+(?:\.\d+)?)\s*mm/gi, (_, sign, n) =>
    `${sign}${mmToIn(parseFloat(n))}`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*kg/gi, (_, n) =>
    `${Math.round(parseFloat(n) * 2.2046)} lbs`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*(?:tons|ton)\b/gi, (_, n) =>
    `${Math.round(parseFloat(n) * 1.10231)} US tons`
  );
  out = out.replace(/(\d+(?:\.\d+)?)\s*L\b/g, (_, n) =>
    `${(parseFloat(n) * 0.264172).toFixed(1)} gal`
  );
  return out;
}

export function convertValue(value: string, unit: Unit): string {
  // Handle pre-baked "metric (imperial)" pairs: pick the relevant half.
  const parenMatch = value.match(/^(.*?)\s*\(([^()]+)\)\s*(.*)$/);
  if (parenMatch) {
    const [, before, inside, after] = parenMatch;
    const insideHasImperial = /\b(in|ft|lbs?|ipm|gal|US tons)\b|"/.test(inside);
    const beforeHasMetric = /\b(mm|cm|m\/min|kg|L)\b/.test(before);
    if (insideHasImperial && beforeHasMetric) {
      const rest = after ? ` ${after}` : "";
      return unit === "metric" ? `${before}${rest}`.trim() : `${inside}${rest}`.trim();
    }
  }
  if (unit === "metric") return value;
  return convertImperial(value);
}