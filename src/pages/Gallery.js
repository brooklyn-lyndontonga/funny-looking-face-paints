// src/pages/Gallery.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../stylesheets/gallery.css';

const Gallery = () => {
  const images = useMemo(() => [
    { src: '/images/paint1.jpg', alt: 'Butterfly design' },
    { src: '/images/paint2.jpg', alt: 'Tiger face' },
    { src: '/images/paint3.jpg', alt: 'Unicorn rainbow' },
    { src: '/images/paint4.jpg', alt: 'Spiderman mask' },
  ], []);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images, setSelectedIndex]);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images, setSelectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage, selectedIndex]);

  return (
    <div className="gallery-container">
      <h2>Our Face Painting Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            onClick={() => openModal(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;