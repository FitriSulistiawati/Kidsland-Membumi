import { useState } from "react";
import "./ImageGallery.css";

export type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
};

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  eyebrow?: string;
}

export default function ImageGallery({
  images,
  title,
  eyebrow,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1,
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1,
      );
    }
  };

  return (
    <div className="gallery">
      {(eyebrow || title) && (
        <div className="gallery__header">
          {eyebrow && <p className="gallery__eyebrow">{eyebrow}</p>}
          {title && <h2 className="gallery__title">{title}</h2>}
        </div>
      )}

      <div className="gallery__grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery__item"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openLightbox(index);
              }
            }}
          >
            <img src={image.src} alt={image.alt} className="gallery__image" />
            {image.title && (
              <div className="gallery__overlay">
                <p className="gallery__overlay-text">{image.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="gallery__lightbox" onClick={closeLightbox}>
          <div
            className="gallery__lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <button
              className="gallery__lightbox-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="gallery__lightbox-image"
            />

            <button
              className="gallery__lightbox-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="gallery__lightbox-counter">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
