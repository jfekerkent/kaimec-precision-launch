import dustCollectorImg from "@/assets/dust-collector-todc-4l.png";
import airCompressorImg from "@/assets/screw-air-compressor.png";
import autoLoaderImg from "@/assets/auto-loader.png";

const accessories = [
  {
    id: "Dust / Smoke Collector",
    name: "Dust / Smoke Collector",
    subtitle: "Pulse Filter Cartridge",
    image: dustCollectorImg,
    specs: [
      ["Filtration Efficiency", "99.99% efficiency, capturing particles down to 0.3–0.5 μm"],
      ["Filter Cartridges", "High-quality imported (Toray, AHLSTROM) with long service life"],
      ["Pulse Jet Cleaning", "Automatic ash/dust cleaning extends filter life, no manual maintenance"],
      ["Build Quality", "Heavy-duty reinforced steel shell handles high negative pressure safely"],
      ["Smart Controls", "LCD control screen, maintenance reminders, overload alarms, EtherCAT support"],
      ["Size", '65" × 60" × 92"'],
      ["Weight", "1,870 lb"],
      ["Certifications", "UL 508, CSA 22.2"],
    ] as [string, string][],
  },
  {
    id: "Screw Type Air Compressor",
    name: "Screw Type Air Compressor",
    subtitle: "20HP · With Refrigerated Dryer",
    image: airCompressorImg,
    specs: [
      ["Power Input", "480V 60Hz 3Ph"],
      ["Air Capacity", "81 CFM (with refrigerated dryer)"],
      ["Pressure", "232 PSI"],
      ["Noise Level", "70 ± 2 dB(A)"],
      ["Tank", "Integrated air receiver (ASME)"],
      ["Dimensions", "70 × 38 × 62 in (L×W×H)"],
      ["Includes", "Integrated refrigerated dryer"],
      ["Certifications", "UL 508, CSA 22.2"],
    ] as [string, string][],
  },
  {
    id: "Automatic Loader",
    name: "Automatic Loader",
    subtitle: "Gantry Type Sheet Loading System",
    image: autoLoaderImg,
    specs: [
      ["Type", "Gantry type automatic sheet loading"],
      ["Function", "Loads new sheets onto the second pallet (table) automatically"],
      ["Compatibility", "Fits FLO w/2 tables / FLC / FLP models"],
      ["Operation", "Reduces manual handling & cycle time"],
      ["Control", "Synchronized with laser cutting cycle"],
    ] as [string, string][],
  },
];

interface Props {
  background?: string;
  excludeIds?: string[];
}

export default function OptionalAccessoriesSection({ background = "bg-background", excludeIds = [] }: Props) {
  const visible = accessories.filter((a) => !excludeIds.includes(a.id));
  return (
    <section className={`py-20 ${background}`}>
      <div className="container">
        <div className="max-w-3xl mb-12">
          <p className="section-label mb-3 text-primary">Recommended Optional Accessories</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">Enhance Your Setup</h2>
          <p className="text-muted-foreground text-lg mt-3">
            Add optional accessories to complete your configuration.
          </p>
        </div>
        <div className={`grid gap-6 grid-cols-1 ${visible.length === 2 ? "sm:grid-cols-2 max-w-4xl mx-auto" : visible.length === 1 ? "sm:grid-cols-1 max-w-xl mx-auto" : "sm:grid-cols-3"}`}>
          {visible.map((a) => (
            <div
              key={a.id}
              className="border border-border rounded-lg overflow-hidden flex flex-col bg-card"
            >
              <div className="aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6">
                <img src={a.image} alt={a.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-foreground leading-tight">{a.name}</h3>
                <p className="text-xs text-primary font-semibold mt-1 uppercase tracking-wide">
                  {a.subtitle}
                </p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  {a.specs.map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="font-semibold text-foreground/80 min-w-[110px]">{k}:</dt>
                      <dd className="text-muted-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}