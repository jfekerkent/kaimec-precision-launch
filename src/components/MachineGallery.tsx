import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MachineGalleryProps {
  images: string[];
  model: string;
}

export default function MachineGallery({ images, model }: MachineGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fade, setFade] = useState(false);

  const switchImage = useCallback((index: number) => {
    setFade(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(false);
    }, 150);
  }, []);

  const lightboxPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const lightboxNext = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  const isPlaceholder = (src: string) => src.startsWith("placeholder:");

  const renderImage = (src: string, className: string) => {
    if (isPlaceholder(src)) {
      return (
        <div className={`flex items-center justify-center bg-[#1a1a1a] ${className}`}>
          <span className="text-primary font-bold text-sm text-center px-4">{model}</span>
        </div>
      );
    }
    return <img src={src} alt={model} className={`object-cover ${className}`} />;
  };

  return (
    <>
      {/* Main image */}
      <div
        className="aspect-[4/3] overflow-hidden cursor-pointer relative"
        onClick={() => setLightboxOpen(true)}
      >
        <div className={`h-full w-full transition-opacity duration-150 ${fade ? "opacity-0" : "opacity-100"}`}>
          {renderImage(images[activeIndex], "h-full w-full")}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-1.5 px-3 py-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => switchImage(i)}
              className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-colors ${
                i === activeIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/40"
              }`}
            >
              {renderImage(src, "h-full w-full")}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-foreground/80 hover:text-foreground z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          >
            <X className="h-8 w-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-foreground/80 hover:text-foreground z-10"
                onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                className="absolute right-4 text-foreground/80 hover:text-foreground z-10"
                onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {renderImage(images[activeIndex], "max-w-full max-h-[85vh] object-contain")}
          </div>
        </div>
      )}
    </>
  );
}
