import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  imageUrl: string;
  additionalImages?: string[];
  productName: string;
}

export function ProductImageGallery({ imageUrl, additionalImages, productName }: ProductImageGalleryProps) {
  const images = [imageUrl, ...(additionalImages || [])].filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    setZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    setZoomed(false);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, handlePrev, handleNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-3">
        {/* Main Image */}
        <motion.div
          className="aspect-square bg-secondary/30 rounded-2xl border border-border p-6 flex items-center justify-center cursor-zoom-in relative overflow-hidden group"
          onClick={() => setLightboxOpen(true)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt={`${productName} - View ${selectedIndex + 1}`}
              className="w-full h-full object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-foreground/0 group-hover:text-foreground/40 transition-colors" />
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden p-1.5 transition-all ${
                  i === selectedIndex
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 bg-secondary/20"
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => { setLightboxOpen(false); setZoomed(false); }}
            />

            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => setZoomed(!zoomed)}
              >
                {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => { setLightboxOpen(false); setZoomed(false); }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 z-10 rounded-full bg-background/80 backdrop-blur-sm h-10 w-10"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm h-10 w-10"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Image */}
            <div
              className={`relative z-[5] w-[85vw] h-[75vh] flex items-center justify-center ${
                zoomed ? "cursor-crosshair" : "cursor-zoom-in"
              }`}
              onClick={() => !zoomed && setZoomed(true)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`${productName} - View ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: zoomed ? 2.5 : 1,
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
            </div>

            {/* Bottom Thumbnails in Lightbox */}
            {images.length > 1 && (
              <div className="absolute bottom-6 z-10 flex gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-xl">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedIndex(i); setZoomed(false); }}
                    className={`w-12 h-12 rounded-md border-2 overflow-hidden p-1 transition-all ${
                      i === selectedIndex
                        ? "border-primary shadow-sm"
                        : "border-transparent hover:border-primary/50 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
